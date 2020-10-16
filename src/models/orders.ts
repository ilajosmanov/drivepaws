/* eslint-disable no-await-in-loop, no-restricted-syntax, no-underscore-dangle */
import {
  createStore,
  attach,
  Effect,
  createEvent,
  guard,
  createEffect,
} from 'effector-logger';
import { OrderResponse } from '../api/types/order';
import {
  fxRequestAuthorized, HttpNetworkError,
  newOrder,
  orderCanceled,
  orderTaken,
} from '../api';

const fxFetchActiveOrders: Effect<void, {results: OrderResponse[]; totalCount: number}, HttpNetworkError> = attach({
  effect: fxRequestAuthorized,
  mapParams: () => ({
    method: 'GET' as const,
    path: '/order',
  }),
});

const fxFetchFinishedOrders: Effect<void, {results: OrderResponse[]; totalCount: number}, HttpNetworkError> = attach({
  effect: fxRequestAuthorized,
  mapParams: () => ({
    method: 'GET' as const,
    path: '/order/finished',
  }),
});

const fxFetchOrders = createEffect({
  handler() {
    fxFetchActiveOrders();
    fxFetchFinishedOrders();
  },
});

const fxFetchOrder: Effect<string, OrderResponse, HttpNetworkError> = attach({
  effect: fxRequestAuthorized,
  mapParams: (id) => ({
    method: 'GET' as const,
    path: `/driver-order/${id}`,
  }),
});

const fxTakeOrder: Effect<string, boolean, HttpNetworkError> = attach({
  effect: fxRequestAuthorized,
  mapParams: (id) => ({
    method: 'POST' as const,
    path: `/driver-order/${id}/take`,
  }),
});

const fxFinishOrder: Effect<string, boolean, HttpNetworkError> = attach({
  effect: fxRequestAuthorized,
  mapParams: (id) => ({
    method: 'POST' as const,
    path: `/driver-order/${id}/finish`,
  }),
});

const fxCancelOrder: Effect<string, boolean, HttpNetworkError> = attach({
  effect: fxRequestAuthorized,
  mapParams: (id) => ({
    method: 'POST' as const,
    path: `/driver-order/${id}/cancel`,
  }),
});

const orderLoaded = createEvent();

const $isLoading = fxFetchActiveOrders.pending;

const $orders = createStore<OrderResponse[]>([]);
const $isOrderTaken = createStore(false);

$isOrderTaken
  .on(fxTakeOrder, () => true)
  .on([fxFinishOrder, fxCancelOrder], () => false);

$orders
  .on(fxFetchActiveOrders.doneData, (state, { results }) => [...results, ...state])
  .on(fxFetchFinishedOrders.doneData, (state, { results }) => [...results, ...state])
  .on(fxFetchOrder.doneData, (state, order) => {
    const isOrderExist = state.find((item) => item._id === order._id);

    if (isOrderExist) {
      return state;
    }
    return [...state, order];
  })
  .on(newOrder, (state, order) => [order, ...state])
  .on([orderTaken, orderCanceled], (state, id) => state.filter((i) => i._id !== id));

guard(orderLoaded, {
  filter: $orders.map((orders) => !orders.length),
  target: fxFetchOrders,
});

export {
  $orders,
  orderLoaded,
  fxTakeOrder,
  fxFinishOrder,
  fxCancelOrder,
  $isLoading,
  $isOrderTaken,
};
