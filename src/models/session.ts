import { createStore, createEvent } from '../core/storage';

const tokenUpdated = createEvent<string>();

const $token = createStore<string>('');
const $isAuthorized = $token.map((t) => t.length > 0);

$token
  .on(tokenUpdated, (_, token) => token);

export {
  $token,
  $isAuthorized,

  tokenUpdated,
};
