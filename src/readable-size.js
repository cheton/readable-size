const units = [
    'B',
    'KB',
    'MB',
    'GB',
    'TB',
    'PB',
    'EB',
    'ZB',
    'YB',
];

const defaults = {
    separator: {
        thousands: ',',
        decimal: '.',
    },
    output: 'string',
    format: '{{size}} {{unit}}',
};

const readableSize = (value, options) => {
    const {
        separator = false,
        format = defaults.format,
        output = defaults.output,
    } = { ...options };

    if (!Number.isInteger(value)) {
        throw new TypeError(`"value" must be an integer: ${value}`);
    }

    if (value > Number.MAX_SAFE_INTEGER) {
        // The largest exact integral value is 2^53 - 1, or 9007199254740991.
        // In ES6, this is defined as Number.MAX_SAFE_INTEGER.
        throw new Error(`"value" exceeds the integer range (${Number.MAX_SAFE_INTEGER}): ${value}`);
    }

    if (value < 0) {
        throw new TypeError(`"value" is invalid: ${value}`);
    }

    let size = String(value);
    let unit = units[0];

    if (value >= 1024) {
        let u = Math.floor(Math.log(value) / Math.log(1024));
        if (u >= units.length) {
            u = units.length - 1;
        }

        size = value / Math.pow(1024, u);
        if (((u + 1) < units.length) && size >= 1000) {
            size /= 1024;
            ++u;
        }

        if (size >= 100 || u === 0) {
            size = String((Math.floor(size * 1) / 1).toFixed(0));
        } else if (size >= 10) {
            size = String((Math.floor(size * 10) / 10).toFixed(1));
        } else {
            size = String((Math.floor(size * 100) / 100).toFixed(2));
        }

        unit = units[u];
    }

    if (typeof separator === 'object' || separator === true) {
        const {
            thousands = defaults.separator.thousands,
            decimal = defaults.separator.decimal,
        } = { ...separator };

        const parts = size.split(defaults.separator.decimal);

        if (thousands && parts[0] && parts[0].length > 3) {
            parts[0] = parts[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, thousands);
        }
        if (decimal) {
            size = parts.join(decimal);
        } else {
            size = parts.join(defaults.separator.decimal);
        }
    }

    if (output === 'array') {
        return [size, unit];
    }

    if (output === 'object') {
        return { size, unit };
    }

    return (typeof format === 'function')
        ? format({ size, unit })
        : String(format).replace('{{size}}', size).replace('{{unit}}', unit);
};

export default readableSize;
