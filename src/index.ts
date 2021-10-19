import 'reflect-metadata'; // reflect metadata support, uninstall if you do not need
import { world } from '@/aliase';
import './demo.scss';

const hello = `${process.env.HELLO} ${world}`;

const div = document.createElement('div');
div.classList.add('demo');
div.innerHTML = hello;

document.body.appendChild(div);
