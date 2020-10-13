/* eslint-disable global-require, @typescript-eslint/no-explicit-any */
import { CreateElement, RenderContext } from 'vue';

function lazy(AsyncView: any) {
  const AsyncHandler = () => ({
    component: AsyncView,
    delay: 400,
    timeout: 10000,
    // loading: require('../components/loading.vue').default,
    // error: require('../components/error.vue').default,
  });

  return Promise.resolve({
    functional: true,
    render: (h: CreateElement, { data, children }: RenderContext) => h(AsyncHandler, data, children),
  });
}

export {
  lazy,
};
