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

    // if (v > 60 * 60 * 24) {
    //     let q = Math.floor(v / (3600 * 24))
    //     newv += q + 'd ';
    //     v -= q * 3600 * 24;
    // }

    // if (v > 3600) {
    //     let q = Math.floor(v / (3600))
    //     newv += q + 'h ';
    //     v -= q * 3600;
    // }

    // if (v > 60) {
    //     let q = Math.floor(v / (60))
    //     newv += q + 'm ';
    //     v -= q * 60;
    // }

    // let q = Math.floor(v)
    // newv += q + 's';

    // return newv;
}

export function formatLargeNumber(v) {
    if (v < 0)
        return '-' + formatLargeNumber(v)
    
    else if (v == 0)
        return '0'

    else {
        let suffixes = ['', 'k', 'M', 'B', 'T']
        let power = suffixes.length - 1
        while (v < Math.pow(10, 3 * power)) {
            power -= 1;
        }

        return '' + round(v / Math.pow(10, 3*power), 1000) + suffixes[power]
    }
}

export function round(v, resolution) {
    return Math.round(v * resolution) / resolution;
}

export function titleCaseWord(it) {
    return it.charAt(0).toUpperCase() + it.slice(1).toLowerCase()
}