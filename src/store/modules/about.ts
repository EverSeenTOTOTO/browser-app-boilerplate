/* eslint-disable import/no-cycle */
import { makeAutoObservable } from 'mobx';
import { AppStore } from '..';

export class AboutStore {
  count = 0

  root: AppStore

  constructor(root: AppStore) {
    makeAutoObservable(this);
    this.root = root;
  }

  increment() {
    this.count++;
  }
}
