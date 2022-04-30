import { createApp } from './createApp';
import './index.scss';

const root = document.getElementById('root');

if (root) {
  const { app, router } = createApp();

  router.isReady().then(() => {
    app.mount('#root');
  });
} else {
  console.error('Root element #root not found');
}
