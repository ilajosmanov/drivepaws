import {
  Effect,
  createEvent,
  forward,
  sample,
  createEffect,
} from 'effector';
import { attach, createDomain } from 'effector-logger';
import { router } from '../router';
import { fxRequestInternal, HttpNetworkError } from '../api';
import { tokenUpdated } from './session';

const model = createDomain();

const fxLogin: Effect<LoginPayload, LoginResponse, HttpNetworkError> = attach({
  effect: fxRequestInternal,
  mapParams: (body) => ({
    body,
    method: 'POST' as const,
    path: '/auth/driver/login',
  }),
});

const loginSubmitted = createEvent();

const $phone = model.store('');
const $password = model.store('');

sample({
  source: { $phone, $password },
  clock: loginSubmitted,
  fn: ({ $phone: phone, $password: password }) => ({
    phone,
    password,
  }),
  target: fxLogin,
});

forward({
  from: fxLogin.doneData.map(({ token }) => token),
  to: tokenUpdated,
});

sample({
  source: fxLogin.done,
  target: createEffect(async () => {
    await router.push({
      name: 'Orders',
    });
  }),
});

type LoginPayload = {
  phone: string;
  password: string;
}

type LoginResponse = {
  carPlates: string;
  createdAt: string;
  name: string;
  phone: string;
  token: string;
  _id: string;
}

export {
  $phone,
  $password,
  loginSubmitted,
};
