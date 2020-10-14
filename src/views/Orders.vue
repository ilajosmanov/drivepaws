<script lang="ts">
import Vue from 'vue';
import OrderItem from '../components/OrderItem.vue';
import DLoader from '../shared/DLoader.vue';
import { $orders, $isLoading, orderLoaded } from '../models/orders';

export default Vue.extend({
  name: 'Orders',

  effector: {
    $orders,
    $isLoading,
  },

  components: {
    DLoader,
    OrderItem,
  },

  computed: {
    orders() {
      return this.$orders.map((order) => ({
        ...order,
        injury: !!order.injury,
      }));
    },
  },

  created() {
    orderLoaded();
  },
});
</script>

<template>
  <div class="view orders-view">
    <p
      v-if="!$isLoading && !$orders.length"
      class="orders-view__empty"
    >
      Немає заявок
    </p>

    <DLoader v-if="$isLoading" />

    <template v-else>
      <OrderItem
        v-for="order in orders"
        :id="order._id"
        :key="order._id"
        :address="order.address"
        :quantity="order.quantity"
        :injury="order.injury"
      />
    </template>
  </div>
</template>

<style lang="scss" scoped>
.orders-view {
  padding: 16px;
}

.orders-view__empty {
  text-align: center;
  @include font-size(22, 24);
}
</style>
