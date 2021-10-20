import './index.scss';

const hello = `${process.env.HELLO} frontend`;
const root = document.createElement('div');

root.id = 'root';
root.innerHTML = hello;

document.body.appendChild(root);
