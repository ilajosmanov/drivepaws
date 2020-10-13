<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'DInput',

  inheritAttrs: false,

  props: {
    label: {
      type: String,
      default: null,
    },
  },

  computed: {
    handlers(): Record<string, Function | Function[]> {
      return {
        ...this.$listeners,
        input: this.handleInput,
      };
    },
  },

  methods: {
    handleInput(e: Event) {
      if (e.target instanceof HTMLInputElement) {
        this.$emit('input', e.target.value);
      }
    },
  },
});
</script>

<template>
  <label class="d-input">
    <span
      v-if="label"
      class="d-input__label"
    >
      {{ label }}
    </span>

    <input
      v-bind="$attrs"
      class="d-input__control"
      v-on="handlers"
    >
  </label>
</template>

<style lang="scss" scoped>
.d-input {
  display: block;
  text-align: left;
}

.d-input__label {
  color: var(--secondary);
  @include font-size(14, 20);
  letter-spacing: -0.24px;

  display: block;
  margin-bottom: 4px;
  margin-left: 10px;
  width: 100%;
}

.d-input__control {
  appearance: none;
  border: 1px solid rgba(51, 51, 51, 0.2);
  border-radius: 14px;

  width: 100%;
  padding: 10px 15px;

  @include font-size(16, 24);
}
</style>
