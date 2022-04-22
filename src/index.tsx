import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';

const hello = `${process.env.HELLO} frontend`;

const App = () => <div>{hello}</div>;
const container = document.createElement('div');

container.id = 'root';
document.body.appendChild(container);

const root = createRoot(container);

root.render(<App />);
