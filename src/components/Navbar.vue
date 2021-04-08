<template>
  <nav
    class="navbar is-light"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="navbar-brand">
      <a class="navbar-item" href="/"><strong>CTF Stats</strong></a>

      <a
        role="button"
        class="navbar-burger"
        :class="{ 'is-active': active }"
        aria-label="menu"
        aria-expanded="false"
        data-target="menu"
        @click="doclick">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="menu" class="navbar-menu" :class="{ 'is-active': active }">
      <div class="navbar-start">
        <a class="navbar-item" href="/"> Home </a>

        <a class="navbar-item" href="/stats"> Stats </a>
      </div>
    </div>
  </nav>
</template>

<script>
export default { 
    name: "Navbar", 
    data() { 
        return { 
            active: false 
        }; 
    },
    methods: {
        doclick() {
            this.active = !this.active
        }
    }
};
</script>

<style lang="scss" scoped>
a:hover {
  color: black;
}
</style>