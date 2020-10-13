<script lang="ts">
import Vue from 'vue';
import AuthFormWrapper from './AuthFormWrapper.vue';
import DSelect from '../shared/DSelect.vue';
import DInput from '../shared/DInput.vue';

export default Vue.extend({
  name: 'SignupForm',

  components: {
    AuthFormWrapper,
    DSelect,
    DInput,
  },

  computed: {
    options: () => [
      { label: 'Водій', value: 'driver' },
      { label: 'Адміністратор', value: 'admin' },
    ],
  },
});
</script>

<template>
  <AuthFormWrapper
    title="Реєстрація"
    redirect-to="SigninForm"
    link-label="Або увійти"
  >
    <DSelect class="auth-form-wrapper__item">
      <option
        disabled
        selected
      >
        Посада
      </option>
      <option
        v-for="(i, key) in options"
        :key="key"
        :value="i.value"
      >
        {{ i.label }}
      </option>
    </DSelect>

    <DInput
      label="Номер телефону"
      type="tel"
      class="auth-form-wrapper__item"
    />
  </AuthFormWrapper>
</template>
