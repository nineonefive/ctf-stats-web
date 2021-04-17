<template lang="pug">
.card
    .card-content
        .media
            .media-left
                figure.image.is-64x64
                    img(src="http://cravatar.eu/avatar/2779cb1f10344b8da8407bb41d54ce79/64.png", width=64, alt="Miskey")
            .media-content
                p.title Miskernet&nbsp;
                    span.tag.is-rounded v1.0
        .content
            p Ever wonder what Miskey thinks about a map? Probably not, but Miskernet classifies CTF maps based on their map stats.. 
                | to match Miskey's opinion.

            p.heading Try it out
            .columns
                .column.is-one-third
                    form(@submit.prevent="test") 
                        .field
                            label.label Map
                            .control
                                .select
                                    select(v-model="selected")
                                        option(v-for="map in maps", :key="map.name") {{ map.name }}
                        .field
                            .control
                                button.button.is-primary Test
                .column
                    pre(v-if="classification.length > 0") {{ classification }}

            p.heading For Developers

            .block
                p.subtitle.is-6 Endpoint

                code {{ endpoint }}?id=&lt;map id&gt;

            .block
                p.subtitle.is-6 JSON Response

                pre.
                    {
                        id: Number,
                        name: String,
                        ...
                        stats: {
                            Casual: &lt;map stats&gt;,
                            Competitive: &lt;map stats&gt;
                        },
                        classification: {
                            Casual: String,
                            Competitive: String
                        }
                    }
</template>

<script>
const maps = [
    {name: "Blackout 2020", id: 440174},
    {name: "Lowrise", id: 1196},
    {name: "Airlock III", id: 70907},
    {name: "Waitomo Caves", id: 362115},
    {name: "Winds of Change", id: 433425}
]

export default {
    name: "Miskernet",
    data() {
        return {
            endpoint: "https://qfrxaan0kh.execute-api.us-east-1.amazonaws.com/default/miskernet",
            maps: maps,
            selected: maps[0].name,
            classification: ""
        }
    },
    methods: {
        test() {
            let id = this.maps.filter(it => it.name == this.selected)[0].id

            fetch(`${this.endpoint}?id=${id}`, {
                method: "GET",
                mode: "cors"
            }).then(res => res.json())
            .then(data => {
                this.classification = JSON.stringify(data.classification)
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .heading {
        margin-bottom: 1rem;
    }

    .button {
        color: white;
    }

    .columns {
        margin: 1rem 0rem;
    }
</style>