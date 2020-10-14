<script lang="ts">
import Vue from 'vue';
import DButton from '../shared/DButton.vue';
import {
  $orders,
  $isOrderTaken,
  fxTakeOrder,
  fxFinishOrder,
  fxCancelOrder,
} from '../models/orders';
import { OrderResponse } from '../api/types/order';

export default Vue.extend({
  name: 'OrderDetails',

  effector: {
    $orders,
    $isOrderTaken,
  },

  components: {
    DButton,
  },

  props: {
    id: {
      type: String,
      required: true,
    },
  },

  data: () => ({
    currentOrder: null as OrderResponse | null,
  }),

  created() {
    // eslint-disable-next-line no-underscore-dangle
    const order = this.$orders.find((i) => i._id === this.id);

    if (order) {
      this.currentOrder = { ...order };
    }
  },

  methods: {
    async handleSubmit(type: 'take' | 'cancel' | 'finish') {
      switch (type) {
        case 'take': {
          await fxTakeOrder(this.id);
          break;
        }
        case 'finish': {
          await fxFinishOrder(this.id);

          this.$router.push({
            name: 'Orders',
          });
          break;
        }
        case 'cancel': {
          await fxCancelOrder(this.id);

          this.$router.push({
            name: 'Orders',
          });
          break;
        }
        default: {
          console.error('Unknown action');
        }
      }
    },
  },
});
</script>

<template>
  <div class="view order-details-view">
    <header class="order-details-view__header">
      <button
        v-if="!$isOrderTaken"
        class="order-details-view__backward"
        @click="$router.push({
          name: 'Orders'
        })"
      >
        <img src="../assets/vector/arrow-down.svg">
      </button>

      <h1 class="order-details-view__title">
        Заявка
      </h1>
    </header>

    <div class="order-details-view__container">
      <div class="order-details-view__item">
        <p class="order-details-view__label">
          Адреса
        </p>

        <div class="order-details-view__body order-details-view__body--address">
          {{ currentOrder.address }}
        </div>
      </div>

      <div class="order-details-view__item">
        <p class="order-details-view__label">
          Очікування служби
        </p>

        <div class="order-details-view__body">
          {{ currentOrder.isWait ? 'Так' : 'Ні' }}
        </div>
      </div>

      <div
        v-if="currentOrder.injury.length"
        class="order-details-view__item"
      >
        <p class="order-details-view__label">
          Опис тварини
        </p>

        <div class="order-details-view__body">
          {{ currentOrder.injury }}
        </div>
      </div>

      <div
        v-if="currentOrder.documents.length"
        class="order-details-view__item"
      >
        <p class="order-details-view__label">
          Фото
        </p>

        <div class="order-details-view__body">
          <ul class="order-details-view__list">
            <li
              v-for="(photo, key) in currentOrder.documents"
              :key="key"
              class="order-details-view__list-item"
            >
              <img :src="photo">
            </li>
          </ul>
        </div>
      </div>

      <div class="order-details-view__item">
        <p class="order-details-view__label">
          Ім'я
        </p>

        <div class="order-details-view__body">
          {{ currentOrder.name }}
        </div>
      </div>

      <div class="order-details-view__item">
        <p class="order-details-view__label">
          Номер телефону
        </p>

        <div class="order-details-view__body">
          <a
            :href="`tel:${currentOrder.phone}`"
            class="order-details-view__link"
          >
            {{ currentOrder.phone }}
          </a>
        </div>
      </div>
    </div>

    <div class="order-details-view__item order-details-view__item--submit">
      <DButton
        v-if="!$isOrderTaken"
        class="order-details-view__submit"
        @click="handleSubmit('take')"
      >
        Прийняти заявку
      </DButton>

      <template v-else>
        <DButton
          class="order-details-view__submit"
          @click="handleSubmit('finish')"
        >
          Забрав тварину
        </DButton>
        <DButton
          class="order-details-view__submit"
          type="secondary"
          @click="handleSubmit('cancel')"
        >
          Скасувати заявку
        </DButton>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.order-details-view {
  display: flex;
  flex-direction: column;
  padding-bottom: 23px;
}

.order-details-view__header {
  position: sticky;
  left: 0;
  top: 0;
  width: 100%;
  height: 70px;

  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.order-details-view__title {
  font-weight: normal;
  @include font-size(25, 30);
}

.order-details-view__backward {
  position: absolute;
  left: 0;
  top: 0;
  width: 50px;
  height: 100%;
  background: none;
  border: none;

  img {
    transform: rotate(90deg);
  }
}

.order-details-view__container {
  padding: 0 48px;
  flex: 1 0 auto;
}

.order-details-view__item {
  margin-top: 18px;
}

.order-details-view__label {
  @include font-size(14, 20);
  letter-spacing: -0.24px;
}

.order-details-view__body {
  margin-top: 6px;
  @include font-size(16, 24);
}

.order-details-view__list {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 1fr;
  grid-gap: 18px 25px;
  padding: 0;
}

.order-details-view__list-item {
  display: flex;
  justify-content: center;
  align-items: center;

  img {
        max-width: 100%;
    object-fit: cover;
    object-position: center;
    border-radius: 10px;
  }
}

.order-details-view__link, .order-details-view__body--address {
  text-decoration: none;
  color: #2D9CDB;
  @include font-size(16, 24);
}

.order-details-view__item--submit {
  margin-top: auto;
  align-self: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
}

.order-details-view__submit {
  margin-top: 16px;
}
</style>
