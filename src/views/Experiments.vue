<template lang="pug">
section.hero.is-fullheight.is-bold
    Navbar
    .hero-body 
        .container
            .columns.is-vcentered
                .column.is-5.is-offset-1
                    h1.title.is-1 Experiments
                    h2.subtitle.is-5.has-text-grey Here's a collection of random things I've made. You're welcome to try them out or use them in projects. Click on a card to view more.
                .column.is-5.is-offset-1
                    img.beaker(src="/assets/beaker.svg", width=500)
    .dot.is-1.is-hidden-touch
    .dot.is-2.is-hidden-touch
    .dot.is-3.is-hidden-touch
section.experiments
    .container
        .block.experiment
            Miskernet
        
</template>

<script>
import Miskernet from '@/components/experiments/Miskernet.vue';
import Navbar from '@/components/Navbar.vue';

import anime from 'animejs';

export default {
    name: "Experiments",
    components: {Miskernet, Navbar},
    mounted() {
        document.title = "Experiments | CTF Stats";

        anime({
            targets: ".dot",
            translateX: function() {
                return anime.random(-10, 10)
            },
            translateY: function() {
                return anime.random(-10, 10)
            },
            easing: 'easeInOutQuad',
            direction: 'alternate',
            loop: true
        })
    }
}
</script>

<style lang="scss" scoped>
    @import "../main.scss";

    // @media screen and (max-width: 763px) {
    //     .container {
    //         margin: 1rem;
    //     }
    // }

    // @media screen and (min-width: 764px) {
    //     .experiment {
    //         margin-left: 2rem;
    //     }

    //     .container {
    //         margin-top: 1rem;
    //         margin-bottom: 1rem;
    //     }
    // }

    .title {
        color: darken($primary, 5%);
        font-family: 'Courier New', Courier, monospace;
    }

    .beaker {
        transform: rotate(20deg);
        width: 65%;
    }

    .experiments {
        // background: lighten($primary, 55%);
        padding: 1rem;
        margin-top: 1rem;
    }

    .hero {
        background-size: 40px 40px;
        background-image:
            linear-gradient(to right, rgb(219, 255, 252) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(219, 255, 252) 1px, transparent 1px);
    }

    .divider {
        width: 70%;
        margin: 0 auto;
        height: 5px;
        background: linear-gradient(to right, #fff, #ddd, #fff);
        border-radius: 1px;
    }

    .dot {
        position: absolute;
        border-radius: 50%;
        box-shadow: 10px 10px 5px #eee;

        &.is-1 {
            width: 75px;
            height: 75px;
            background: #54ffd4da;
            top: 30%;
            left: 60%;
        }

        &.is-2 {
            width: 30px;
            height: 30px;
            background: #bbff38a0;
            top: 25%;
            left: 75%;
        }

        &.is-3 {
            width: 150px;
            height: 150px;
            background: linear-gradient(to right, #bbff38a0, #54ffd4da);
            top: 70%;
            left: 40%;
        }
    }
</style>