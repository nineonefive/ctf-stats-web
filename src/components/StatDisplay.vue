<template lang="pug">
.tile.is-ancestor
    .tile.is-12
        .tile
            .tile.is-parent
                article.tile.box.is-child.notification.is-white
                    p.title General
                    .content
                        p(v-for="s in general", :key="s")
                            span
                                strong {{ fancyStat(s) }}&nbsp;&nbsp;
                            span.has-text-grey {{ fancyValue(s) }}
            .tile.is-parent
                article.tile.box.is-child.notification.is-white
                    p.title PvP
                    .content
                        p(v-for="s in pvp", :key="s")
                            span
                                strong {{ fancyStat(s) }}&nbsp;&nbsp;
                            span.has-text-grey {{ fancyValue(s) }}
.tile.is-ancestor
    .tile.is-12
        .tile
            .tile.is-parent
                article.tile.box.is-child.notification.is-white
                    p.title Objective
                    .content
                        p(v-for="s in objective", :key="s")
                            span
                                strong {{ fancyStat(s) }}&nbsp;&nbsp;
                            span.has-text-grey {{ fancyValue(s) }}
            .tile.is-parent(v-if="kit in special")
                article.tile.box.is-child.notification.is-white
                    p.title Class Specific
                    .content
                        p(v-for="s in special[kit]", :key="s")
                            span
                                strong {{ fancyStat(s) }}&nbsp;&nbsp;
                            span.has-text-grey {{ fancyValue(s) }}

</template>

<script>
const generalStats = ['playtime']
const pvpStats = ["kills", "deaths", "damage_dealt", "damage_received"]
const objectiveStats = ["flags_stolen", "flags_captured", "flags_recovered", "time_with_flag", "carrier_kills"]
const kitStats = {
    "ARCHER": ["headshots"],
    "ASSASSIN": ['assassination_attempts'],
    "ELF": ['flash_bombs', 'headshots'],
    "NINJA": ['flash_bombs'],
    "MEDIC": ['hp_restored']
}
export default {
    name: "StatDisplay",
    props: ["kit", "stats"],
    data() {
        return {
            general: generalStats,
            pvp: pvpStats,
            objective: objectiveStats,
            special: kitStats
        }
    },
    methods: {
        fancyStat(s) {
            if (s == 'hp_restored') return "HP Restored"

            else if (this.kit == "ELF" && (s == 'flash_bombs' || s == 'headshots')) return this.fancyStat('reflected_' + s)

            else return s.split('_').map(it => it.charAt(0).toUpperCase() + it.slice(1).toLowerCase()).join(' ')
        },
        fancyValue(s) {
            let v = this.stats[s]
            if (s == 'playtime' || s == 'time_with_flag') {
                let newv = ''
                if (v > 60 * 60 * 24) {
                    let q = Math.floor(v / (3600 * 24))
                    newv += q + 'd ';
                    v -= q * 3600 * 24;
                }

                if (v > 3600) {
                    let q = Math.floor(v / (3600))
                    newv += q + 'h ';
                    v -= q * 3600;
                }

                if (v > 60) {
                    let q = Math.floor(v / (60))
                    newv += q + 'm ';
                    v -= q * 60;
                }

                let q = Math.floor(v)
                newv += q + 's';

                return newv;
            } else if (s == 'damage_dealt' || s == 'damage_received' || s == 'hp_restored') {
                let suffixes = ['', 'k', 'M', 'B', 'T']
                let power = 4
                while (v < Math.pow(10, 3 * power)) {
                    power -= 1;
                }

                return '' + Math.round(v / Math.pow(10, 3 * (power - 1)))/1e3 + suffixes[power]
            } else {
                return v
            }
        }
    }
}
</script>