<template lang="pug">
.block(:class="{centered: searchMode}")
    .container
        .columns
            .column.is-one-fifth
            .column
                .block
                    form(id="search", @submit.prevent="search")
                        .field
                            input.input(type="text", placeholder="Find a player", v-model="name", :class="{'is-danger': searchMessage}")
                            p.help.is-danger(v-if="searchMessage") {{ searchMessage }}
                    .message.is-danger(v-if="error")
                        .message-body {{ error }}
                transition(name="fade", v-if="searchMode")
                    Metrics
            .column.is-one-fifth
.block
    .content(v-if="player")
        Player(:player="player")
</template>

<script>
import Player from '@/components/Player.vue';
import { playerApi } from '@/api';

import Metrics from '@/components/Metrics';

export default { 
    name: "PlayerPage",
    components: {Player, Metrics},
    data() { 
        return {
            player: null, 
            error: '',
            name: '',
            searchMode: this.$route.params.player == null
        }; 
    },
    computed: {
        searchMessage() {
            if (this.name.length > 16) {
                return "Player names must be at most 16 characters"
            }

            else if (this.name.length > 0 && (/[^a-zA-Z0-9_]/g).test(this.name)) {
                return "Player names can only contain letters, numbers, and underscores"
            }

            return ""
        }
    },
    mounted(){
        document.title = "Find a Player | CTF Stats"

        if (this.$route.params.player) {
            this.loadPlayer(this.$route.params.player)
        }
    },
    methods: {
        search(){
            if (this.searchMessage || !this.name.length)
                return
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
        }
    }
};
</script>

<style lang="scss" scoped>
    .container {
        margin-top: 2rem;
    }

    .field {
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