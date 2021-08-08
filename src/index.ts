import 'reflect-metadata'; // reflect metadata support, uninstall if you do not need
import { world } from '@/aliase';

export const hello = `${process.env.HELLO} ${world}`;

console.log(hello);
