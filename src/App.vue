<script lang="ts">
import Vue from 'vue';
import { sockedCreated } from './api';
import { userLoaded } from './models/users';

export default Vue.extend({
  name: 'App',

  created() {
    userLoaded();
    sockedCreated();
  },
});
</script>

<template>
  <div id="app">
    <main class="maincontent">
      <RouterView />
    </main>
  </div>
</template>

<style lang="scss">
@import "./assets/scss/vars";

[v-cloak] {
  display: none;
}

*, *::before, *::after {
  box-sizing: border-box;
}

html, body {
  width: 100%;
  height: 100%;
}

html {
  font-size: 16px;
  font-family: "Rubik", sans-serif;
  color: var(--dark);
}

body {
  margin: 0;

  display: flex;

  overflow: hidden;
}

#app {
  flex: 1 0;
  display: grid;
  grid-template-rows: 1fr;
}

.maincontent {
  display: grid;
  grid-template: "main";

  background: var(--light);

  position: relative;
  z-index: 0;
  overflow-x: hidden;

  > .view {
    background: var(--light);
    grid-area: main;
    position: relative;
    height: 100%;
    overflow-y: auto;
    scroll-behavior: smooth;
  }

  > :first-child {
    z-index: 1;
  }
}

button {
  font-family: inherit;
}

h1,
h2,
h3,
h4,
h5,
h6,
p {
  margin: 0;
  color: inherit;
}
</style>
