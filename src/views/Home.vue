<template lang="pug">
section.hero.is-fullheight
    Navbar
    .hero-body
        .container.has-text-centered
            .columns.is-centered.is-vcentered
                .column.is-8
                    p.title CTF Stats
                    p.subtitle The new CTF stats page, powered by Amazon AWS.

                    a.button.is-primary.mx-1(href="/stats") Find a player
                    a.button.mx-1(href="https://www.github.com/NineOneFive/ctf-stats-web")
                        span.icon
                            i.fab.fa-github 
                        span Github
                            
    .hero-foot.mb-20

section.container.mt-6
    .block
        .columns.is-centered
            .column.is-5
                h1.title.blue Metrics
                h2.subtitle.is-5.has-text-grey Over 250 players tracked daily, with a public API for developers.
            .column.is-5
                Metrics

section#featured
    .container.my-6.py-6
        .block.has-text-centered
            p.title Projects Using CTF Stats
            .divider
        .columns.is-centered.block
            .column.is-4
                .card
                    .card-content
                        .content
                            p.title.is-3 Winston
                            p.subtitle.is-5 The PUG Discord bot

                            p The stats API powers the 
                                code /playerstats
                                | command as well as the Game of Stats, where you guess a player based on their playtime by class.
                            
                            a.button.is-primary(href="https://github.com/TomD53/PUG-Bot", target="_blank") View Project


section.container
    p.title.blue Information (FAQ)

    .block
        p
            strong How often do the player stats get updated?
        p Every day at midnight (EST)
    
    .block
        p
            strong What happened to the old site?
        p Well, it's been completely redone. I used to use Google Firebase and Github Pages, but those weren't as flexible as I would have preferred.
        | The old process to update stats also used to be having my laptop calculate everything overnight and hoping nothing broke, so really cumbersome.
    
    .block
        p
            strong What's special about this one?
        p It auto-updates itself, and runs on Amazon AWS, so I can do a lot more cool things with it. Your data is also now downloaded in seconds instead of minutes.

footer.footer.mt-6
    .content.has-text-centered
        p By 915
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Metrics from '@/components/Metrics.vue';

export default { 
    name: "Home",
    components: {Navbar, Metrics},
};
</script>

<style lang="scss" scoped>
    @import '@/main.scss';
    // .home {
    //     background: url('../assets/dots1.png');
    //     background-size: cover;
    // }

    .hero {
        background: url('../assets/dots2.jpg');
        background-size: cover;
    }

    .button.is-primary, .button.is-primary:hover {
        color: white;
    }

    .hero-foot {
        // height: 20px;
        // background: linear-gradient(to bottom, #00000000, #FFFFFF) !important;
    }

    .hero {
        clip-path: polygon(0% 0%, 100% 0%, 100% 90%, 0% 100%);
    }

    .title.blue {
        color: darken($primary, 5%);
        font-family: 'Courier New', Courier, monospace;
    }

    #featured {
        background: #fbfbfb;
    }

    .divider {
        height: 3px;
        background: $primary;
        margin: 0 auto;
        width: 60px;
    }
</style>
