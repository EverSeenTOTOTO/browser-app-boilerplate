import { createApp } from 'vue';
import App from '@/App.vue';
import './index.scss';

const root = document.getElementById('root');

if (root) {
  const app = createApp(App);

  app.mount(root);
} else {
  console.error('Root element #root not found');
}
