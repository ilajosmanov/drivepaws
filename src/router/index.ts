import Vue from 'vue';
import VueRouter, { NavigationGuardNext, Route, RouteConfig } from 'vue-router';
import { lazy } from './lib/lazy';

Vue.use(VueRouter);

const beforeEnter = (to: Route, from: Route, next: NavigationGuardNext<Vue>) => {
  if (!from.name) {
    next({
      name: 'Orders',
    });
    return;
  }
  next();
};

const routes: RouteConfig[] = [
  {
    path: '/orders',
    name: 'Orders',
    component: () => lazy(import('../views/Orders.vue')),
  },
  {
    path: '/',
    name: 'Root',
    component: {
      render: (h) => h('RouterView'),
    },
    redirect: {
      name: 'Orders',
    },
    beforeEnter,
  },
  {
    path: '/orders/:id/details',
    name: 'OrderDetails',
    component: () => lazy(import('../views/OrderDetails.vue')),
    props: ({ params }) => ({
      id: params.id,
    }),
    beforeEnter,

  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => lazy(import('../views/Auth.vue')),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export {
  router,
};
