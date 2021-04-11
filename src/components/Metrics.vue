<template lang="pug">
.block(v-if="loaded")
    .level
        .level-item.has-text-centered(v-for="(metric, idx) in fancyMetrics", :key="idx")
            div
                p.heading {{ metric.title }}
                p.title#tracked {{ metric.value }}
</template>

<script>
import {metricsApi} from '@/api';
import {formatMemory, formatLargeNumber} from '@/util';

let metrics = {
    "users": {
        title: "Players Tracked",
        display: (v) => formatLargeNumber(v, 1)
    },
    "data": {
        title: "Data Ingested",
        display: formatMemory
    },
    "data_provided": {
        title: "Data Provided",
        display: formatMemory
    },
    "api_calls": {
        title: "API Calls",
        display: (v) => formatLargeNumber(v, 1)
    }
}

export default {
    name: "Metrics",
    data() {
        return {
            metrics: {},
            task: null
        }
    },
    mounted() {
        this.updateMetrics()
        this.task = setInterval(this.updateMetrics, 3000)
    },
    beforeUnmount() {
        clearInterval(this.task)
    },
    computed: {
        fancyMetrics() {
            if (Object.keys(this.metrics).length == 0) return []

            return Object.keys(metrics).filter(it => it in this.metrics).map(name => ({
                "title": metrics[name].title,
                "value": this.metrics[name]
            }))
        },
        loaded() {
            return this.fancyMetrics.length == Object.keys(metrics).length
        }
    },
    methods: {
        updateMetrics() {
            Object.keys(metrics).forEach(it => {
                fetch(`${metricsApi}?metric=${it}`, {
                    method: "GET"
                }).then(res => res.json())
                .then(n => this.metrics[it] = metrics[it].display(n))
            })
        }
    }
}
</script>