import { test } from 'tap';
import readableFilesize from '../src';

test('assertion', (t) => {
    try {
        readableFilesize(null);
    } catch (e) {
        t.equal(e.message, '"value" must be an integer: null');
    }

    try {
        readableFilesize(undefined);
    } catch (e) {
        t.equal(e.message, '"value" must be an integer: undefined');
    }

    try {
        readableFilesize(-1);
    } catch (e) {
        t.equal(e.message, '"value" is invalid: -1');
    }

    t.end();
});

test('output as string', (t) => {
    t.equal(readableFilesize(0), '0 B');
    t.equal(readableFilesize(1), '1 B');
    t.equal(readableFilesize(Math.pow(1000, 1) - 1), '999 B');
    t.equal(readableFilesize(Math.pow(1000, 1)), '0.97 KB');
    t.equal(readableFilesize(Math.pow(1000, 1) + 1), '0.97 KB');
    t.equal(readableFilesize(Math.pow(1024, 1) - 1), '0.99 KB');
    t.equal(readableFilesize(Math.pow(1024, 1)), '1.00 KB');
    t.equal(readableFilesize(Math.pow(1024, 1) + 1), '1.00 KB');
    t.equal(readableFilesize(Math.pow(1000, 2) - 1), '976 KB');
    t.equal(readableFilesize(Math.pow(1000, 2)), '976 KB');
    t.equal(readableFilesize(Math.pow(1000, 2) + 1), '976 KB');
    t.equal(readableFilesize(Math.pow(1024, 1) * 1000 - 1), '999 KB');
    t.equal(readableFilesize(Math.pow(1024, 1) * 1000), '0.97 MB');
    t.equal(readableFilesize(Math.pow(1024, 1) * 1000 + 1), '0.97 MB');
    t.equal(readableFilesize(Math.pow(1024, 2) - 1), '0.99 MB');
    t.equal(readableFilesize(Math.pow(1024, 2)), '1.00 MB');
    t.equal(readableFilesize(Math.pow(1024, 2) + 1), '1.00 MB');

    t.end();
});
