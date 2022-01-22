import { createApp } from 'vue';
import App from '@/App.vue';
import './index.scss';

const root = document.createElement('div');

root.id = 'root';
document.body.appendChild(root);

const app = createApp(App);

app.mount(root);
