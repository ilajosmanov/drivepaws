<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'DTabs',

  props: {
    value: {
      type: Number,
      default: 1,
    },
  },

  data: () => ({
    position: 0,
  }),

  methods: {
    handleSwitchMarker(e: Event) {
      const target = e.target as HTMLButtonElement;
      const currentTarget = e.currentTarget as HTMLDivElement;

      const { width } = currentTarget.getBoundingClientRect();
      const position = target.getBoundingClientRect().left - currentTarget.getBoundingClientRect().left;

      this.position = (position / width) * 100;
      this.$emit('input', +target.value);
    },
  },
});
</script>

<template>
  <div
    class="orders-view__tabs"
    @click="handleSwitchMarker"
  >
    <div
      class="orders-view__tabs-marker"
      :style="{
        left: `${position}%`
      }"
      aria-hidden="true"
    />

    <button
      class="orders-view__tabs-btn"
      :class="{'orders-view__tabs-btn--active': value === 1}"
      value="1"
    >
      Усі заявки
    </button>
    <button
      class="orders-view__tabs-btn"
      :class="{'orders-view__tabs-btn--active': value === 2}"
      value="2"
    >
      Мої заявки
    </button>
  </div>
</template>

<style lang="scss" scoped>
.orders-view__tabs {
  display: flex;
  height: 40px;
  margin-bottom: 32px;
  position: relative;
  border-radius: 20px;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;

    width: 100%;
    height: 100%;
    border: 1px solid var(--primary);
    border-radius: 20px;
  }
}

.orders-view__tabs-marker {
  width: 50%;
  height: 100%;

  position: absolute;
  left: 0;
  top: 0;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 100%), #F0A10F;
  border-radius: 20px;
  transition: left .2s ease-in-out;
}

.orders-view__tabs-btn {
  cursor: pointer;
  flex: 1 0;
  color: var(--primary);
  font-weight: 500;
  border: none;
  padding: 0;
  background: none;
  position: relative;
  z-index: 2;
  transition: color .3s ease-in-out;

  @include font-size(16, 20);
}

.orders-view__tabs-btn--active {
  color: var(--light);
}
</style>
