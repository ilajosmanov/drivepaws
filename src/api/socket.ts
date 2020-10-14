import io from 'socket.io-client';
import {
  createEffect,
  createEvent,
  createStore,
  guard,
  sample,
} from 'effector-logger';
import { OrderResponse } from './types/order';
import { $token } from '../models/session';

const endpoint = process.env.VUE_APP_SOCKET_URL as string;

const sockedCreated = createEvent();
const socketConnect = createEvent();
const socketDisconnect = createEvent();

const socketConnected = createEvent();
const socketDisconnected = createEvent();
const orderTaken = createEvent<string>();
const orderCanceled = createEvent<string>();
const newOrder = createEvent<OrderResponse>();

const fxInitSocket = createEffect<string, SocketIOClient.Socket>({
  handler: (token) => io(`${endpoint}/orders`, {
    transports: ['polling', 'websocket'],
    query: `authorization=${token}`,
  }),
});

const fxSocketConnect = createEffect<SocketIOClient.Socket | null, void>({
  handler(socket) {
    if (socket) {
      socket.connect();
    }
  },
});

const fxSocketDisconnect = createEffect<SocketIOClient.Socket | null, void>({
  handler: (socket) => {
    if (socket) {
      socket.disconnect();
    }
  },
});

const $socket = createStore<SocketIOClient.Socket | null>(null);

const $isSocketConnected = $socket.map((state) => state && state.connected);

$socket.on(fxInitSocket.doneData, (_, instance) => instance);

$socket.watch((instance) => {
  if (instance) {
    instance.on('connect', socketConnected);
    instance.on('disconnect', socketDisconnected);

    instance.on('new-order', newOrder);
    instance.on('order-taken', orderTaken);
    instance.on('order-canceled', orderCanceled);
  }
});

sample({
  source: $token,
  clock: sockedCreated,
  target: fxInitSocket,
});

sample({
  source: fxInitSocket.done,
  target: socketConnect,
});

sample({
  source: $socket,
  clock: guard(socketConnect, {
    filter: $isSocketConnected.map((state) => !state),
  }),
  target: fxSocketConnect,
});

sample({
  source: $socket,
  clock: guard(socketDisconnect, {
    filter: $isSocketConnected.map(Boolean),
  }),
  target: fxSocketDisconnect,
});

// socket.on('order-canceled', orderCanceled);

export {
  sockedCreated,
  socketDisconnect,

  newOrder,
  orderTaken,
  orderCanceled,
};
