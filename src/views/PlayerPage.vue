<template lang="pug">
.block(:class="{centered: searchMode}")
    .container
        .columns
            .column.is-one-fifth
            .column
                .block
                    form(id="search", @submit.prevent="search")
                        input.input(type="text", placeholder="Find a player", v-model="name")
                    .message.is-danger(v-if="error !== ''")
                        .message-body {{ error }}
                transition(name="fade")
                    .block(v-if="searchMode && playersTracked > 0")
                        .level
                            .level-item.has-text-centered
                                div
                                    p.heading Tracked Players
                                    p.title#tracked {{ playersTrackedFancy }}
            .column.is-one-fifth
.block
    .content(v-if="player")
        Player(:player="player")
</template>

<script>
import Player from '@/components/Player.vue';
import { playerApi } from '@/api';
import {formatLargeNumber} from '@/util';

export default { 
    name: "PlayerPage",
    components: {Player},
    data() { 
        return {
            player: null, 
            error: '',
            name: '',
            playersTracked: 0,
            searchMode: this.$route.params.player == null
        }; 
    },
    computed: {
        playersTrackedFancy() {
            return formatLargeNumber(this.playersTracked)
        }
    },
    mounted(){
        document.title = "Find a Player | CTF Stats"

        if (this.$route.params.player) {
            this.loadPlayer(this.$route.params.player)
        }

        this.loadTrackedPlayers()
    },
    methods: {
        search(){
            if (this.player)
                window.location.href = "/stats/" + this.name;
            else {
                window.history.pushState({}, "", "/stats/" + this.name)
                this.loadPlayer(this.name)
                this.name = ""
                this.searchMode = false
            }
        },
        loadPlayer(player) {
            fetch(playerApi + "?name=" + player, {
                method: "GET"
            }).then(res => res.json())
            .then(data => {
                if (typeof data == 'string') {
                    this.error = data
                } else {
                    this.player = data
                    this.error = ''
                }
            })
        },
        loadTrackedPlayers() {
            fetch(playerApi + "?users", {
                method: "GET"
            }).then(res => res.json())
            .then(n => {
                this.playersTracked = n
            })
        }
    }
};
</script>

<style lang="scss" scoped>
    .container {
        margin-top: 2rem;
    }

    input {
        margin: 0rem auto;
        width: 80%;
        display: block;
    }

    .message {
        display: block;
        width: 80%;
        margin: 1rem auto;
    }

    @media screen and (min-width: 1024px) {
        .centered {
            transform: translateY(25vh);
        }

        .block {
            transition: transform 0.2s;
        }
    }

    .fade-enter-active {
        transition: opacity .6s;
    }

    .fade-leave-active {
        transition: opacity 0.2s;
    }

    .fade-enter-from, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
</style>