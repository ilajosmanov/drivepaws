<script lang="ts">
import Vue from 'vue';
import SignupForm from '../components/SignupForm.vue';
import SigninForm from '../components/SigninForm.vue';
import DButton from '../shared/DButton.vue';
import { loginSubmitted } from '../models/signin';

export default Vue.extend({
  name: 'Auth',

  components: {
    SignupForm,
    SigninForm,
    DButton,
  },

  computed: {
    is() {
      return this.$route.query.type || 'SignupForm';
    },
  },

  methods: {
    handleSubmit() {
      if (this.is === 'SignupForm') {
        console.log('Do something...');
      } else {
        loginSubmitted();
      }
    },
  },
});
</script>

<template>
  <div class="view auth-view">
    <h1 class="auth-view__title">
      Вітаємо у команді!
    </h1>

    <p class="auth-view__description">
      Дякуємо, що обрали SavePaws.
      Для того, аби почати роботу, Вам
      треба зареєструватися чи увійти.
    </p>

    <component :is="is" />

    <DButton
      class="auth-view__submit"
      form="form"
      native-type="submit"
      @click="handleSubmit"
    >
      Підтвердити
    </DButton>
  </div>
</template>

<style lang="scss" scoped>
.auth-view {
  padding: 32px 52px 23px;
  text-align: center;

  display: flex;
  flex-direction: column;
}

.auth-view__title {
  @include font-size(25, 30);
  font-weight: normal;
}

.auth-view__description {
  margin-top: 18px;
  @include font-size(16, 24)
}

.auth-view__submit {
  margin-top: auto;
}
</style>
