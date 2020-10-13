<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'OrderItem',

  props: {
    address: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    injury: {
      type: Boolean,
      required: false,
    },
  },
});
</script>

<template functional>
  <router-link
    class="order-item"
    :to="{
      name: 'OrderDetails',
      params: {
        id: props.id
      }
    }"
  >
    <p class="order-item__address">
      {{ props.address }}
    </p>
    <p class="order-item__quantity">
      Кількість тварин: {{ props.quantity }};

      <span
        v-if="props.injury"
        class="order-item__injury"
      >
        Є травми
      </span>
    </p>
    <p class="order-item__id">
      ID заявки: <span>
        {{ props.id }}
      </span>
    </p>
  </router-link>
</template>

<style lang="scss" scoped>
.order-item {
  display: block;
  width: 100%;

  text-decoration: none;
  background: var(--light);
  box-shadow: 0px -1px 10px rgba(0, 0, 0, 0.15), 0px 4px 10px rgba(0, 0, 0, 0.15);
  border-radius: 20px;
  padding: 16px;
  margin-bottom: 24px;

  color: var(--secondary);
}

.order-item__address {
  @include font-size(20, 24);
}

.order-item__quantity {
  @include font-size(16, 24);
  margin-top: 12px;
}

.order-item__injury {
  color: var(--danger);
  margin-left: 5px;
}

.order-item__id {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 16px;
}
</style>
