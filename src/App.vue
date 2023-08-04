<template>
  <div class="main-container" v-if="authIsReady">
    <div class="app-container">
      <Leftbar />
      <router-view />
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';
import Leftbar from './components/Leftbar.vue';

export default {
    setup() {
        const store = useStore();
        return {
            authIsReady: computed(() => store.state.authIsReady)
        };
    },
    components: { Leftbar }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Montserrat', sans-serif;
}

.app-container {
  display: flex;
  min-height: 100vh;
}
</style>
