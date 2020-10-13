<script lang="ts">
import Vue from 'vue';

const types = ['primary', 'secondary'];

export default Vue.extend({
  name: 'DButton',

  props: {
    type: {
      type: String,
      default: 'primary',
      validator: (prop) => types.includes(prop),
    },
    nativeType: {
      type: String,
      default: 'button',
    },
  },

  computed: {
    tag(): string {
      return this.$attrs.to ? 'router-link' : 'button';
    },
  },
});
</script>

<template>
  <component
    :is="tag"
    class="s-button"
    :class="[type]"
    v-bind="$attrs"
    :type="nativeType"
    v-on="$listeners"
  >
    <slot />
  </component>
</template>

<style lang="scss" scoped>
.s-button {
  cursor: pointer;
  font-family: "Rubik", sans-serif;
  border: none;
  background: none;
  box-shadow: none;
  padding: 0;
  text-decoration: none;

  font-size: 16px;
  line-height: 1.25;
  font-weight: 500;

  display: inline-flex;
  justify-content: center;
  align-items: center;
  min-width: 200px;
  padding: 15px;
  border-radius: 33px;
  transition:
    background .2s linear,
    border-color .2s linear,
    color .2s linear;

  &.primary {
    color: var(--light);
    background: var(--primary);
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 100%), var(--primary);

    &:focus,
    &:hover,
    &:active {
      background: linear-gradient(
        180deg,
      rgba(255, 255, 255, 0.4) 0%,
      rgba(255, 255, 255, 0) 100%
      ),
      var(--primary-light);
    }
  }

  &[disabled] {
    pointer-events: none;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.4) 0%,
      rgba(255, 255, 255, 0) 100%),
      rgba(51, 51, 51, 0.2
    );
    cursor: no-drop;
  }

  &.secondary {
    border: 1px solid var(--primary);
    color: var(--primary);
    padding: 14px 15px;

    &:focus,
    &:hover,
    &:active {
      background: var(--primary);
      border-color: transparent;
      background: linear-gradient(
        180deg,
      rgba(255, 255, 255, 0.4) 0%,
      rgba(255, 255, 255, 0) 100%
      ),
      var(--primary-light);
      color: var(--light);
    }
  }
}
</style>
