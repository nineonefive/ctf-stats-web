<template>
  <Navbar />
  <router-view />
</template>

<script>
import Navbar from '@/components/Navbar.vue';

export default { name: "App", components: {Navbar} };
</script>

<style lang="scss">
* {
  max-width: 100vw;
}
</style>
