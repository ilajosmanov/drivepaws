<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'DSelect',

  inheritAttrs: false,

  props: {
    disable: {
      type: Boolean,
      default: false,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<template>
  <div
    class="d-select"
    :class="{
      'd-select--disable': disable,
      'd-select--multiple': multiple,
    }"
  >
    <select
      class="d-select__control"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <slot />
    </select>
  </div>
</template>

<style lang="scss" scoped>
.d-select {
  position: relative;
  background-color: #fff;
  background-image: linear-gradient(to top, #f9f9f9, #fff 33%);

  border: 1px solid rgba(51, 51, 51, 0.2);
  border-radius: 14px;

  @include font-size(16, 24);

  display: grid;
  grid-template-areas: "select";
  align-items: center;

  &:not(.select--multiple)::after {
    content: "";

    width: 22px;
    height: 12px;
    margin-right: 16px;

    background-image: url('../assets/vector/arrow-down.svg');

    grid-area: select;
    justify-self: end;
  }
}

.d-select--disable {
  cursor: not-allowed;
  background-color: #eee;
  background-image: linear-gradient(to top, #ddd, #eee 33%);
}

.d-select__control {
  appearance: none;
  background-color: transparent;
  border: none;
  padding: 10px 16px;
  margin: 0;
  width: 100%;
  font-family: inherit;
  font-size: inherit;
  cursor: inherit;
  line-height: inherit;
  outline: none;
  grid-area: select;

  [multiple] {
    padding-right: 0;

    option {
      white-space: normal;
      height: 6rem;
    }
  }

  &::-ms-expand {
    display: none;
  }
}
</style>
