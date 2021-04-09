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
import {formatDuration, titleCaseWord, formatLargeNumber, round} from '@/util';

const generalStats = ['playtime']
const pvpStats = ["kills", "deaths", "kdr", "damage_dealt", "damage_received", "damage_ratio"]
const objectiveStats = ["flags_stolen", "flags_captured", "capture_success", "flags_recovered", "time_with_flag", "carrier_kills"]
const kitStats = {
    "ARCHER": ["headshots"],
    "ASSASSIN": ['assassination_attempts'],
    "ELF": ['flash_bombs', 'headshots'],
    "NINJA": ['flash_bombs'],
    "MEDIC": ['hp_restored']
}

const specialStatTypes = {
    "playtime": "time",
    "time_with_flag": "time",

    "damage_dealt": "largeN",
    "damage_received": "largeN",
    "hp_restored": "largeN",
    "kills": "largeN",
    "deaths": "largeN",

    "kdr": "decimal",
    "damage_ratio": "decimal",

    "capture_success": "percent"
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

            else if (s == 'kdr') return "KDR"

            else if (this.kit == "ELF" && (s == 'flash_bombs' || s == 'headshots')) return this.fancyStat('reflected_' + s)

            else return s.split('_').map(it => titleCaseWord(it)).join(' ')
        },
        fancyValue(s) {
            let v = this.stats[s]

            let t = (s in specialStatTypes) ? specialStatTypes[s] : ''

            if (t == "time") {
                return formatDuration(v)
            } else if (t == "largeN") {
                return formatLargeNumber(v)
            } else if (t == "decimal") {
                return round(v, 1000)
            } else if (t == "percent") {
                return (100 * round(v, 1000)).toFixed(3) + "%"
            } else {
                return v
            }
        }
    }
}
</script>