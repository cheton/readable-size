const units = [
    'B',
    'KB',
    'MB',
    'GB',
    'TB',
    'PB',
    'EB',
    'ZB',
    'YB'
];

const defaults = {
    delimiters: {
        thousands: ',',
        decimal: '.'
    },
    format: '{{size}} {{unit}}',
    output: 'string'
};

const readableFilesize = (value, options) => {
    const {
        delimiters = defaults.delimiters,
        format = defaults.format,
        output = defaults.output
    } = { ...options };

    if (!Number.isInteger(value)) {
        throw new TypeError(`"value" must be an integer: ${value}`);
    }

    if (value < 0) {
        throw new TypeError(`"value" is invalid: ${value}`);
    }

    let size = String(0);
    let unit = units[0];

    if (value > 0) {
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

    if (typeof delimiters === 'object') {
        const parts = size.split('.');

        if (delimiters.thousands && parts[0] && parts[0].length > 3) {
            parts[0] = parts[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, delimiters.thousands);
        }
        if (delimiters.decimal) {
            size = parts.join(delimiters.decimal);
        } else {
            size = parts.join('.');
        }
    }

    if (output === 'array') {
        return [size, unit];
    } else if (output === 'object') {
        return { size, unit };
    } else {
        return String(format)
            .replace('{{size}}', size)
            .replace('{{unit}}', unit);
    }
};

export default readableFilesize;
