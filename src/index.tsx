import React from 'react';
import ReactDom from 'react-dom';
import './index.scss';

const hello = `${process.env.HELLO} frontend`;

const App = () => <div>{hello}</div>;

const root = document.createElement('div');

root.id = 'root';
document.body.appendChild(root);

ReactDom.render(<App />, root);
