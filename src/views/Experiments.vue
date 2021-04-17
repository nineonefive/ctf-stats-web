<template lang="pug">
.block
    .hero.is-info
        .hero-body 
            p.title Experiments
            p Here's a collection of random things I've made, you're welcome to try them out or use them in projects. Click on a card to view more.
.container
    .block.experiment
        Miskernet
        
</template>

<script>
import Miskernet from '@/components/Miskernet.vue';

export default {
    name: "Experiments",
    components: {Miskernet},
    mounted() {
        document.title = "Experiments | CTF Stats"
    }
}
</script>

<style lang="scss" scoped>

    @media screen and (max-width: 763px) {
        .container {
            margin: 1rem;
        }
    }

    @media screen and (min-width: 764px) {
        .experiment {
            margin-left: 2rem;
        }

        .container {
            margin-top: 1rem;
            margin-bottom: 1rem;
        }
    }
</style>