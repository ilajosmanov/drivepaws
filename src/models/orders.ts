/* eslint-disable no-await-in-loop, no-restricted-syntax, no-underscore-dangle */
import {
  createStore,
  attach,
  Effect,
  createEvent,
  guard,
} from 'effector-logger';
import { OrderResponse } from '../api/types/order';
import {
  fxRequestAuthorized, HttpNetworkError,
  newOrder,
  orderCanceled,
  orderTaken,
} from '../api';

const fxFetchOrders: Effect<void, {results: OrderResponse[]; totalCount: number}, HttpNetworkError> = attach({
  effect: fxRequestAuthorized,
  mapParams: () => ({
    method: 'GET' as const,
    path: '/order',
  }),
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

const $isLoading = fxFetchOrders.pending;

const $orders = createStore<OrderResponse[]>([]);
const $isOrderTaken = createStore(false);

$isOrderTaken
  .on(fxTakeOrder, () => true)
  .on([fxFinishOrder, fxCancelOrder], () => false);

$orders
  .on(fxFetchOrders.doneData, (_, { results }) => results.map((order) => ({
    ...order,
    address: '',
  })))
  .on(fxFetchOrder.doneData, (state, order) => {
    const isOrderExist = state.find((item) => item._id === order._id);

    if (isOrderExist) {
      return state;
    }
    return [...state, order];
  })
  .on(newOrder, (state, order) => [{ ...order, address: 'Test address' }, ...state])
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
