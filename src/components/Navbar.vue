<template lang="pug">
nav.navbar.is-transparent(role="navigation", aria-label="main-navigation")
    .container
        .navbar-brand
            a.navbar-item(href="/")
                strong CTF Stats

            a.navbar-burger(
                :class="{ 'is-active': active }", 
                role="button", 
                aria-label="menu", 
                :aria-expanded="active", 
                data-target="menu", 
                @click="doclick")

                span(aria-hidden="true")
                span(aria-hidden="true")
                span(aria-hidden="true")

        .navbar-menu#menu(:class="{ 'is-active': active }")
            .navbar-end
                a.navbar-item(href="/") Home
                a.navbar-item(href="/stats") Stats
                a.navbar-item(href="/experiments") Experiments
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
  // color: black;
}

nav {
  // background: linear-gradient(to bottom, #FFFFFF55, #FFFFFF00);
  background: white !important;
}
</style>