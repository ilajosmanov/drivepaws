<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'AuthFormWrapper',

  props: {
    title: {
      type: String,
      required: true,
    },
    redirectTo: {
      type: String,
      required: true,
    },
    linkLabel: {
      type: String,
      required: true,
    },
  },
});
</script>

<template functional>
  <form
    id="form"
    class="auth-form-wrapper"
    @submit.prevent.stop
  >
    <h2 class="auth-form-wrapper__title">
      {{ props.title }}
    </h2>

    <slot />

    <RouterLink
      :to="{
        name: 'Auth',
        query: { type: props.redirectTo }
      }"
      class="auth-form-wrapper__link"
    >
      {{ props.linkLabel }}
    </RouterLink>
  </form>
</template>

<style lang="scss" scoped>
.auth-form-wrapper {
  margin-top: 32px;
}

.auth-form-wrapper__title {
  @include font-size(20, 24);
  font-weight: normal;
}

.auth-form-wrapper__link {
  color: #007AFF;
  @include font-size(16, 24);
  margin-top: 32px;
  display: inline-block;
  text-decoration: none;
}
</style>

<style lang="scss">
.auth-form-wrapper__item {
  margin-top: 18px;
}
</style>
