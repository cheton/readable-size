import { test } from 'tap';
import readableSize from '../src';

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

test('exceptions', (t) => {
    try {
        readableSize(null);
    } catch (e) {
        t.equal(e.message, '"value" must be an integer: null');
    }

    try {
        readableSize(undefined);
    } catch (e) {
        t.equal(e.message, '"value" must be an integer: undefined');
    }

    try {
        readableSize(-1);
    } catch (e) {
        t.equal(e.message, '"value" is invalid: -1');
    }

    try {
        readableSize(Number.MAX_SAFE_INTEGER + 1);
    } catch (e) {
        t.equal(e.message, `"value" exceeds the integer range (${Number.MAX_SAFE_INTEGER}): ${Number.MAX_SAFE_INTEGER + 1}`);
    }

    t.end();
});

test('separator', (t) => {
    t.test('no separators', (t) => {
        const options = { separator: false };
        t.equal(readableSize(999, options), '999 B');
        t.equal(readableSize(1000, options), '1000 B');
        t.equal(readableSize(1024, options), '1.00 KB');

        t.end();
    });

    t.test('default separators', (t) => {
        const options = { separator: true };
        t.equal(readableSize(999, options), '999 B');
        t.equal(readableSize(1000, options), '1,000 B');
        t.equal(readableSize(1024, options), '1.00 KB');

        t.end();
    });

    t.test('default separators', (t) => {
        const options = { separator: { } };
        t.equal(readableSize(999, options), '999 B');
        t.equal(readableSize(1000, options), '1,000 B');
        t.equal(readableSize(1024, options), '1.00 KB');

        t.end();
    });

    // English
    t.test('English separators', (t) => {
        const options = {
            separator: {
                thousands: ',',
                decimal: '.',
            }
        };
        t.equal(readableSize(999, options), '999 B');
        t.equal(readableSize(1000, options), '1,000 B');
        t.equal(readableSize(1024, options), '1.00 KB');

        t.end();
    });

    // French
    t.test('French separators', (t) => {
        const options = {
            separator: {
                thousands: ' ',
                decimal: ',',
            }
        };
        t.equal(readableSize(999, options), '999 B');
        t.equal(readableSize(1000, options), '1 000 B');
        t.equal(readableSize(1024, options), '1,00 KB');

        t.end();
    });

    // Dutch
    t.test('Dutch separators', (t) => {
        const options = {
            separator: {
                thousands: '.',
                decimal: ',',
            }
        };
        t.equal(readableSize(999, options), '999 B');
        t.equal(readableSize(1000, options), '1.000 B');
        t.equal(readableSize(1024, options), '1,00 KB');

        t.end();
    });

    t.end();
});

test('output to string', (t) => {
    t.equal(readableSize(0), '0 B');
    t.equal(readableSize(1), '1 B');

    t.equal(readableSize(Math.pow(1000, 1) - 1), '999 B');
    t.equal(readableSize(Math.pow(1000, 1)), '1000 B');
    t.equal(readableSize(Math.pow(1000, 1) + 1), '1001 B');
    t.equal(readableSize(Math.pow(1024, 1) - 1), '1023 B');
    t.equal(readableSize(Math.pow(1024, 1)), '1.00 KB');
    t.equal(readableSize(Math.pow(1024, 1) + 1), '1.00 KB');

    // The largest exact integral value is 2^53 - 1, or 9007199254740991.
    for (let i = 2; i < 6; ++i) {
        const n1 = Math.floor((Math.pow(1000, i) - 1) / Math.pow(1024, i - 1));
        const u1 = units[i - 1];
        t.equal(readableSize(Math.pow(1000, i) - 1), `${n1} ${u1}`);
        t.equal(readableSize(Math.pow(1000, i)), `${n1} ${u1}`);
        t.equal(readableSize(Math.pow(1000, i) + 1), `${n1} ${u1}`);
        t.equal(readableSize(Math.pow(1024, i - 1) * 1000 - 1), `999 ${u1}`);

        const u2 = units[i];
        t.equal(readableSize(Math.pow(1024, i - 1) * 1000), `0.97 ${u2}`);
        t.equal(readableSize(Math.pow(1024, i - 1) * 1000 + 1), `0.97 ${u2}`);
        t.equal(readableSize(Math.pow(1024, i) - 1), `0.99 ${u2}`);
        t.equal(readableSize(Math.pow(1024, i)), `1.00 ${u2}`);
        t.equal(readableSize(Math.pow(1024, i) + 1), `1.00 ${u2}`);
    }

    t.end();
});

test('output to array', (t) => {
    const options = {
        output: 'array'
    };

    t.deepEqual(readableSize(0, options), ['0', 'B']);
    t.deepEqual(readableSize(1, options), ['1', 'B']);

    t.deepEqual(readableSize(Math.pow(1000, 1) - 1, options), ['999', 'B']);
    t.deepEqual(readableSize(Math.pow(1000, 1), options), ['1000', 'B']);
    t.deepEqual(readableSize(Math.pow(1000, 1) + 1, options), ['1001', 'B']);
    t.deepEqual(readableSize(Math.pow(1024, 1) - 1, options), ['1023', 'B']);
    t.deepEqual(readableSize(Math.pow(1024, 1), options), ['1.00', 'KB']);
    t.deepEqual(readableSize(Math.pow(1024, 1) + 1, options), ['1.00', 'KB']);

    // The largest exact integral value is 2^53 - 1, or 9007199254740991.
    for (let i = 2; i < 6; ++i) {
        const n1 = Math.floor((Math.pow(1000, i) - 1) / Math.pow(1024, i - 1));
        const u1 = units[i - 1];
        t.deepEqual(readableSize(Math.pow(1000, i) - 1, options), [n1, u1]);
        t.deepEqual(readableSize(Math.pow(1000, i), options), [n1, u1]);
        t.deepEqual(readableSize(Math.pow(1000, i) + 1, options), [n1, u1]);
        t.deepEqual(readableSize(Math.pow(1024, i - 1) * 1000 - 1, options), ['999', u1]);

        const u2 = units[i];
        t.deepEqual(readableSize(Math.pow(1024, i - 1) * 1000, options), ['0.97', u2]);
        t.deepEqual(readableSize(Math.pow(1024, i - 1) * 1000 + 1, options), ['0.97', u2]);
        t.deepEqual(readableSize(Math.pow(1024, i) - 1, options), ['0.99', u2]);
        t.deepEqual(readableSize(Math.pow(1024, i), options), ['1.00', u2]);
        t.deepEqual(readableSize(Math.pow(1024, i) + 1, options), ['1.00', u2]);
    }

    t.end();
});

test('output to object', (t) => {
    const options = {
        output: 'object'
    };

    t.deepEqual(readableSize(0, options), { size: '0', unit: 'B' });
    t.deepEqual(readableSize(1, options), { size: '1', unit: 'B' });

    t.deepEqual(readableSize(Math.pow(1000, 1) - 1, options), { size: '999', unit: 'B' });
    t.deepEqual(readableSize(Math.pow(1000, 1), options), { size: '1000', unit: 'B' });
    t.deepEqual(readableSize(Math.pow(1000, 1) + 1, options), { size: '1001', unit: 'B' });
    t.deepEqual(readableSize(Math.pow(1024, 1) - 1, options), { size: '1023', unit: 'B' });
    t.deepEqual(readableSize(Math.pow(1024, 1), options), { size: '1.00', unit: 'KB' });
    t.deepEqual(readableSize(Math.pow(1024, 1) + 1, options), { size: '1.00', unit: 'KB' });

    // The largest exact integral value is 2^53 - 1, or 9007199254740991.
    for (let i = 2; i < 6; ++i) {
        const n1 = Math.floor((Math.pow(1000, i) - 1) / Math.pow(1024, i - 1));
        const u1 = units[i - 1];
        t.deepEqual(readableSize(Math.pow(1000, i) - 1, options), { size: n1, unit: u1 });
        t.deepEqual(readableSize(Math.pow(1000, i), options), { size: n1, unit: u1 });
        t.deepEqual(readableSize(Math.pow(1000, i) + 1, options), { size: n1, unit: u1 });
        t.deepEqual(readableSize(Math.pow(1024, i - 1) * 1000 - 1, options), { size: '999', unit: u1 });

        const u2 = units[i];
        t.deepEqual(readableSize(Math.pow(1024, i - 1) * 1000, options), { size: '0.97', unit: u2 });
        t.deepEqual(readableSize(Math.pow(1024, i - 1) * 1000 + 1, options), { size: '0.97', unit: u2 });
        t.deepEqual(readableSize(Math.pow(1024, i) - 1, options), { size: '0.99', unit: u2 });
        t.deepEqual(readableSize(Math.pow(1024, i), options), { size: '1.00', unit: u2 });
        t.deepEqual(readableSize(Math.pow(1024, i) + 1, options), { size: '1.00', unit: u2 });
    }

    t.end();
});

test('output format', (t) => {
    t.test('format string', (t) => {
        const options = {
            format: '{{size}} ({{unit}})',
        };

        t.equal(readableSize(999, options), '999 (B)');
        t.equal(readableSize(1000, options), '1000 (B)');
        t.equal(readableSize(1024, options), '1.00 (KB)');

        t.end();
    });

    t.test('output function', (t) => {
        const options = {
            output: function({ size, unit }) {
                unit = {
                    'B': 'bytes',
                }[unit] || unit;

                return `${size} ${unit}`;
            },
        };

        t.equal(readableSize(999, options), '999 bytes');
        t.equal(readableSize(1000, options), '1000 bytes');
        t.equal(readableSize(1024, options), '1.00 KB');

        t.end();
    });

    t.end();
});
