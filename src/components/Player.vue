<template lang="pug">
.block
    .columns
        .column.is-one-fifth
            .container(v-if="data")
                article.panel.is-primary
                    p.panel-heading Class
                    .kits
                        a.panel-block(v-for="k in kits", :key="k", :class="{'is-active': kit.toLowerCase() == k.toLowerCase()}", @click="kit = k.toUpperCase()") 
                            span.panel-icon
                                img(:src="`/assets/class-icons/${k.toLowerCase()}.png`", alt="k")
                            | {{ k }}
        .column
            .block
                .card(v-if="player")
                    .card-content
                        .media
                            .media-left
                                figure.image.is64x64
                                    img(:src="'http://cravatar.eu/avatar/' + player.uuid + '/64.png'", :alt="player.name")
                            .media-content
                                p.title.is-4 {{ player.name }}
                                transition(name="fade")
                                    p.subtitle.is-6.has-text-grey(v-if="status != ''", v-html="status")
            transition(name="fadey")
                .block(v-if="data")
                    .tabs.is-toggle.is-centered
                        ul
                            li(v-for="t in ['Casual', 'Competitive']", :class="{'is-active': mode === t}", :key="t", @click="mode = t") 
                                a
                                    span {{ t }}
                    .content#stats(v-if="data[mode.toLowerCase()]")
                        StatDisplay(:stats="data[mode.toLowerCase()][kit]", :kit="kit")
        .column.is-one-fifth

transition(name="fadey")
    .block(v-if="newPlayer")
        .content.has-text-centered
            .block
                p.title Oh, you seem new here..
                p.subtitle.has-text-grey Try downloading your data?

                button.button.is-primary(@click="requestDownload", :class="{'is-loading': downloading}", :disabled="downloading") Request Download

            .block(v-if="downloadMsg !== ''")
                small.has-text-grey 
                    i {{ downloadMsg }}

</template>

<script>
import {playerApi, newPlayerApi} from '@/api';
import StatDisplay from '@/components/StatDisplay.vue';

export default { 
    name: "Player", 
    props: ["player"],
    components: {StatDisplay},
    data() {
        return {
            status: '',
            newPlayer: false,
            data: null,
            error: '',
            mode: 'Casual',
            kit: 'ARCHER',
            downloading: false,
            downloadMsg: ''
        }
    },
    computed: {
        kits() {
            if (!this.data)
                return []
            return Object.keys(this.data[this.mode.toLowerCase()]).sort().map(it => it.charAt(0).toUpperCase() + it.slice(1).toLowerCase())
        }
    },
    mounted() {
        document.title = this.player.name + ' | CTF Stats'

        fetch(playerApi + "?id=" + this.player.id, {
            method: "GET"
        }).then(res => res.json())
        .then(data => {
            if (typeof data == "string"){
                this.error = data
            } else {
                if (!data.data.casual) {
                    this.status = 'No data available'
                    this.newPlayer = true
                    return
                }

                this.data = data.data
                let last = data.last_game
                let dt = data.last_played - last;
                if (dt == 0)
                    this.status = "Up to date"
                else
                    this.status = `Last tracked <a href="https://www.brawl.com/games/ctf/lookup/${last}" style="color: #00d6dd">${last}</a> (${dt} games ago)`
            }
        })
    },
    methods: {
        requestDownload() {
            this.downloading = true
            fetch(newPlayerApi + "?id=" + this.player.id, {
                method: "GET"
            })
            this.downloadMsg = "Telling the server to do something..."
            setTimeout(() => this.downloadMsg = "Praying this works...", 5000)
            setTimeout(() => this.downloadMsg = "Really hoping nothing broke...", 10000)
            setTimeout(() => this.downloadMsg = "Refreshing the page #soon...", 15000)
            setTimeout(() => window.location.reload(), 20000)
        }
    }
};
</script>

<style lang="scss" scoped>
    h4 {
        margin-bottom: 0.2rem;
    }

    .media {
        margin: 1rem 0rem;
    }

    .button {
        color: white;
    }

    .fadey-enter-active, .fadey-leave-active {
        transition: all .6s;
    }
    .fadey-enter-from, .fadey-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
        transform: translateY(1rem);
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .6s;
    }
    .fade-enter-from, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }

    .panel-heading {
        color: white!important;
    }

    .panel {
        margin-left: 1rem;
    }

    .panel-block {
        &.is-active {
            color: #00d6dd;
        }
    }

    @media screen and (max-width: 764px) {
        .panel {
            margin-left: 0.5rem;
            .kits {
                max-height: 30vh;
                overflow-x: hidden;
            }
        }
    }
</style>