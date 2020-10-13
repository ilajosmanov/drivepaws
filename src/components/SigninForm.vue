<script lang="ts">
import Vue from 'vue';
import AuthFormWrapper from './AuthFormWrapper.vue';
import DInput from '../shared/DInput.vue';
import { $phone, $password } from '../models/signin';

export default Vue.extend({
  name: 'SignupForm',

  effector: {
    $phone,
    $password,
  },

  components: {
    AuthFormWrapper,
    DInput,
  },
});
</script>

<template>
  <AuthFormWrapper
    title="Увійти"
    redirect-to="SignupForm"
    link-label="Або зареєструватись"
  >
    <DInput
      v-model="$phone"
      label="Номер телефону"
      autocomplete="phone"
      type="tel"
      class="auth-form-wrapper__item"
      required
    />

    <DInput
      v-model="$password"
      label="Пароль"
      type="password"
      autocomplete="current-password"
      class="auth-form-wrapper__item"
      required
    />
  </AuthFormWrapper>
</template>
