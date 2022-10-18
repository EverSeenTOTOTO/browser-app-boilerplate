import { Writable } from 'node:stream';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { App, RenderContext } from './App';
import { createStore } from './store';
import { createRoutes } from './routes';

const createStream = (ctx: RenderContext) => {
  const writable = new Writable({
    write(chunk, encoding, callback) {
    /**
     * We should collect newly changed app style here, pseudo code:
     *
     * let rules = generateNewStyleRulesSinceLastCall();
     * if (rules) {
     *   // Write it before the HTML to ensure that the CSS is available and
     *   // blocks display before the HTML that shows it.
     *   ctx.res.write('<style>' + rules + '</style>');
     * }
     *
     * When it comes to app state, things will be more complicated, e.g. our app have independent render units which fetch state by themselves,
     * we need to determine which states are changed between two fractional writes, collect and may or may not inject them into somewhere appropriately.
     * */

      // Finally write whatever React tried to write.
      ctx.res.write(chunk, encoding, callback);
    },
  });

  writable.on('close', () => ctx.res.end());

  return writable;
};

export async function render(context: RenderContext) {
  const ctx = context as Required<RenderContext>;
  const { req, res, template } = ctx;

  const store = createStore();
  const routes = createRoutes();
  const wrappedRes = createStream(ctx);

  ctx.store = store;
  ctx.routes = routes;

  // convert template to stream manually
  const [headPart, tailPart] = template.split(/<!--app-html-->/); // see index.html

  let didError = false;
  const stream = ReactDOMServer.renderToPipeableStream(
      <StaticRouter location={req.originalUrl}>
        <App store={ctx.store} routes={routes} />
      </StaticRouter>,
      {
        onShellReady() {
          res.statusCode = didError ? 500 : 200;
          res.setHeader('Content-type', 'text/html');

          // first send head part
          wrappedRes.write(headPart.trim());
          // then rendered content
          stream.pipe(wrappedRes);
          // finally send rest of template
          wrappedRes.write(tailPart.trim()); // FIXME: the content will be <html><head><body><content></body></html><suspense content>
        },
        onShellError(error) {
          console.error(error);
          // Something errored before we could complete the shell so we emit an alternative shell.
          res.statusCode = 500;
          res.send(ctx.template); // fallback to csr
        },
        onError(error) {
          didError = true;
          console.error(error);
        },
      },
  );

  return ctx;
}
