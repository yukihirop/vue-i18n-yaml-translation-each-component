<template>
  <div id="nav">
    <router-link to="/">{{ $t("link.home") }}</router-link> |
    <router-link to="/about">{{ $t("link.about") }}</router-link>
  </div>
  <button @click="changeLocale">Change Locale</button>
  <router-view />
</template>

<script lang="ts">
import { getCurrentInstance, onMounted } from "vue";
export default {
  setup() {
    const vm = getCurrentInstance()!.proxy!;
    
    function changeLocale(){
      vm.$i18n.locale = (vm.$i18n.locale === 'ja') ? 'en' : 'ja';
    }
    return {
      changeLocale
    };
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
