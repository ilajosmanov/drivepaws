<script lang="ts">
import Vue from 'vue';
import OrderItem from '../components/OrderItem.vue';
import DLoader from '../shared/DLoader.vue';
import DTabs from '../shared/DTabs.vue';
import { $orders, $isLoading, orderLoaded } from '../models/orders';

export default Vue.extend({
  name: 'Orders',

  effector: {
    $orders,
    $isLoading,
  },

  components: {
    DTabs,
    DLoader,
    OrderItem,
  },

  data: () => ({
    currentTab: 1,
  }),

  computed: {
    orders() {
      return this.$orders
        .map((order) => ({ ...order, injury: !!order.injury }))
        .filter((order) => order.orderStatus === this.currentTab);
    },
  },

  created() {
    orderLoaded();
  },
});
</script>

<template>
  <div class="view orders-view">
    <DLoader v-if="$isLoading" />

    <template v-else>
      <DTabs v-model="currentTab" />

      <OrderItem
        v-for="order in orders"
        :id="order._id"
        :key="order._id"
        :address="order.locationName || ''"
        :quantity="order.quantity"
        :injury="order.injury"
      />
    </template>

    <p
      v-if="!$isLoading && !orders.length"
      class="orders-view__empty"
    >
      Немає заявок
    </p>
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
