<template lang="pug">
.tile.is-ancestor(v-for="cset in categories")
    .tile.is-12
        .tile
            .tile.is-parent(v-for="(category, idx) in cset", :key="idx")
                article.tile.box.is-child.notification.is-white
                    p.title {{ category.name }}
                    .content
                        p(v-for="s in category['stats']", :key="s")
                            span {{ fancyStat(s) }}&nbsp;&nbsp;
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
            general: {
                "name": "General",
                "stats": generalStats
            },
            pvp: {
                "name": "PvP",
                "stats": pvpStats
            },
            objective: {
                "name": "Objective",
                "stats": objectiveStats
            }
        }
    },
    computed: {
        special() {
            if (!(this.kit in kitStats))
                return {}
            return {
                "name": "Class-Specific",
                "stats": kitStats[this.kit]
            }
        },
        categories() {
            let group = 3
            let categories = [this.general, this.pvp, this.objective, this.special].filter(it => Object.keys(it).length > 0)
            let s = []
            for (var i = 0; i < categories.length; i += group)
                s.push(categories.slice(i, i+group))
            
            return s
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