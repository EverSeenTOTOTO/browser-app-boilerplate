import fetch from 'isomorphic-fetch';
import { makeAutoObservable } from 'mobx';
import type { AppStore } from '..';

export type HomeState = {
  name: string
};

export class HomeStore {
  name = '';

  root: AppStore;

  constructor(root: AppStore) {
    makeAutoObservable(this);
    this.root = root;
  }

  async fetchName() {
    const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/name`);

    this.name = await res.text();
  }
}
