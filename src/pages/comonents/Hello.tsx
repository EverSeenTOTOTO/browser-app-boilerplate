import { useStore } from '@/store';
import { observer } from 'mobx-react-lite';

const Hello = observer(() => {
  const home = useStore('home');

  // Suspense allows you throw promises from your React components when
  // it needs something that is not ready yet (fetching data, lazily importing components, etc).
  // These promises are caught at the “Suspense boundary” — whenever a promise
  // is thrown from rendering a Suspense sub-tree, React pauses rendering
  // that sub-tree until the promise is resolved, and then tries again.
  // eslint-disable-next-line @typescript-eslint/no-throw-literal
  if (!home.name) throw home.fetchName(); // simulate context.read() in official demo

  return <div>hello {home.name}</div>;
});

export default Hello;
