export function formatDuration(v) {
    const timeunits = {
        "y": 3600 * 24 * 365,
        "d": 3600 * 24,
        "h": 3600,
        "m": 60,
        "s": 1
    }

    let newv = []

    for (var unit in timeunits) {
        if (v > timeunits[unit]) {
            let dt = timeunits[unit]
            let q = Math.floor(v / dt)
            newv.push(q + unit)
            v -= q * dt
        }
    }

    return newv.join(' ')
}

export function formatLargeNumber(v, places=2) {
    if (v < 0)
        return '-' + formatLargeNumber(v)
    
    else if (v == 0)
        return '0'

    else {
        let suffixes = ['', 'k', 'M', 'B', 'T']
        let power = suffixes.length - 1
        while (v < Math.pow(1000, power)) {
            power -= 1;
        }

        if (power == 0)
            return v

        return '' + round(v / Math.pow(1000, power), 1000).toFixed(places) + suffixes[power]
    }
}

export function formatMemory(v) {
    if (v < 0)
        return '-' + formatMemory(v)
    
    else if (v == 0)
        return '0B'

    else {
        let suffixes = ['B', 'kB', 'MB', 'GB', 'TB']
        let power = suffixes.length - 1
        while (v < Math.pow(1024, power)) {
            power -= 1;
        }

        return '' + round(v / Math.pow(1024, power), 1024).toFixed(2) + ' ' + suffixes[power]
    }
}

export function round(v, resolution) {
    return Math.round(v * resolution) / resolution;
}

export function titleCaseWord(it) {
    return it.charAt(0).toUpperCase() + it.slice(1).toLowerCase()
}