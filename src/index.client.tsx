import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { createRoutes } from './routes';
import { createStore } from './store';
import './styles/index.scss';

const container = document.getElementById('root');
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
const store = createStore();
const routes = createRoutes();

root.render(<BrowserRouter>
    <App store={store} routes={routes}/>
  </BrowserRouter>);
