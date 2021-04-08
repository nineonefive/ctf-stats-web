<template lang="pug">
.block
    .container
        .columns
            .column.is-one-fifth
            .column
                .block
                    form(id="search", @submit.prevent="search")
                        input.input(type="text", placeholder="Find a player", v-model="name")
                    .message.is-danger(v-if="error !== ''")
                        .message-body {{ error }}
            .column.is-one-fifth
.block
    .content(v-if="player")
        Player(:player="player")
</template>

<script>
import Player from '@/components/Player.vue';
import { playerApi } from '@/api';

export default { 
    name: "PlayerPage",
    components: {Player},
    data() { 
        return {
            player: null, 
            error: ''
        }; 
    },
    mounted(){
        document.title = "Find a Player | CTF Stats"

        if (this.$route.params.player) {
            fetch(playerApi + "?name=" + this.$route.params.player, {
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
    },
    methods: {
        search(){
            window.location.href = "/stats/" + this.name;
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
</style>