import * as effector from 'effector-logger';

const root = effector.createDomain('root');

root.onCreateStore((store) => {
  const snapshot = localStorage.getItem(store.shortName);
  if (snapshot !== null) store.setState(JSON.parse(snapshot));

  let isFirstSkipped = false;

  store.watch((newState) => {
    if (isFirstSkipped) {
      localStorage.setItem(store.shortName, JSON.stringify(newState));
    }
    isFirstSkipped = true;
  });

  return store;
});

export const createEvent = root.event;
export const createEffect = root.effect;
export const createStore = root.store;
export const createDomain = root.domain;
