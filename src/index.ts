import './index.scss';

const hello = `${import.meta.env.VITE_HELLO} frontend`;
const root = document.getElementById('root');

if (root) {
  root.innerHTML = hello;

  document.body.appendChild(root);
} else {
  console.error('Root element #app not found');
}
