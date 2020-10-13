/* eslint-disable no-await-in-loop, no-restricted-syntax */
import {
  createStore,
  attach,
  Effect,
  createEffect,
  sample,
} from 'effector-logger';
import { fxGeocode } from '../core/gmaps';
import { fxRequestAuthorized, HttpNetworkError } from '../api';

const fxFetchOrders: Effect<void, {results: OrderResponse[]; totalCount: number}, HttpNetworkError> = attach({
  effect: fxRequestAuthorized,
  mapParams: () => ({
    method: 'GET' as const,
    path: '/order',
  }),
});

const fxParseAddress = createEffect<OrderResponse[], Order[]>({
  handler: async (payload) => {
    const orders: Order[] = [];

    for (const item of payload) {
      const result = await fxGeocode({
        lat: item.location[0],
        lng: item.location[1],
      });

      orders.push({
        ...item,
        address: result[0].formatted_address,
      });
    }

    return orders;
  },
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

const $isLoading = fxFetchOrders.pending;

const $orders = createStore<Order[]>([]);
const $isOrderTaken = createStore(false);

$isOrderTaken
  .on(fxTakeOrder, () => true)
  .on([fxFinishOrder, fxCancelOrder], () => false);

$orders
  .on(fxFetchOrders.doneData, (_, { results }) => results.map((order) => ({
    ...order,
    address: '',
  })))
  .on(fxParseAddress.doneData, (_, results) => results);

sample({
  source: $orders,
  clock: fxFetchOrders.done,
  target: fxParseAddress,
});

type OrderResponse = {
  canWait: boolean;
  createdAt: string;
  documents: string[];
  injury: string;
  location: number[];
  name: string;
  orderStatus: number;
  phone: string;
  quantity: number;
  _id: string;
}

export type Order = OrderResponse & {
  address: string;
}

export {
  $orders,
  fxFetchOrders,
  fxTakeOrder,
  fxFinishOrder,
  fxCancelOrder,
  $isLoading,
  $isOrderTaken,
};
