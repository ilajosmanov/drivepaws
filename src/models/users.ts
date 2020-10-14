import {
  attach,
  createStore,
  Effect,
  createEvent,
  guard,
} from 'effector-logger';
import { fxRequestAuthorized, HttpNetworkError } from '../api';

const fxFetchUserInfo: Effect<void, User, HttpNetworkError> = attach({
  effect: fxRequestAuthorized,
  mapParams: () => ({
    method: 'GET' as const,
    path: '/auth/driver',
  }),
});

const userLoaded = createEvent();

const $userInfo = createStore<User | null>(null);

$userInfo.on(fxFetchUserInfo.doneData, (_, userInfo) => userInfo);

guard(userLoaded, {
  filter: $userInfo.map((state) => state === null),
  target: fxFetchUserInfo,
});

type User = {
  _id: string;
  phone: string;
  name: string;
  carPlates: string;
  createdAt: string;
};

export {
  userLoaded,
};
