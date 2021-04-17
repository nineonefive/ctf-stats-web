<template lang="pug">
.container
    .block
        .content
            p.title Experiments
            p Here's a collection of random things I've made, you're welcome to try them out or use them in projects.
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
    .container {
        margin: 1rem;
    }

    @media screen and (min-width: 764px) {
        .experiment {
            margin-left: 2rem;
        }
    }
</style>