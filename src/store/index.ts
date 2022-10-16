import { createContext, useContext } from 'react';
import { HomeStore } from './modules/home';
import { AboutStore } from './modules/about';

export class AppStore {
  home: HomeStore;

  about: AboutStore;

  constructor() {
    this.home = new HomeStore(this);
    this.about = new AboutStore(this);
  }
}

const appStore = new AppStore();

export const createStore = () => appStore;
export const RootContext = createContext<AppStore>(appStore);
export const useStore = <T extends keyof AppStore>(key: T): AppStore[T] => {
  const root = useContext(RootContext);

  return root[key];
};
