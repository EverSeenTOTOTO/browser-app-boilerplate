import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { createRoutes } from './routes';
import { createStore } from './store';
import './styles/index.scss';

const container = document.getElementById('root');
const store = createStore();
const routes = createRoutes();

hydrateRoot(container!, <BrowserRouter>
    <App store={store} routes={routes}/>
  </BrowserRouter>);
