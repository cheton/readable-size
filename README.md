# readable-filesize [![build status](https://travis-ci.org/cheton/readable-filesize.svg?branch=master)](https://travis-ci.org/cheton/readable-filesize) [![Coverage Status](https://coveralls.io/repos/github/cheton/readable-filesize/badge.svg?branch=master)](https://coveralls.io/github/cheton/readable-filesize?branch=master)
[![NPM](https://nodei.co/npm/readable-filesize.png?downloads=true&stars=true)](https://www.npmjs.com/package/readable-filesize)

Converts bytes into human readable size units: B, KB, MB, GB, TB, PB, EB, ZB, YB.

## Installation

```bash
npm install --save readable-filesize
```

## Examples

```js
readableFilesize(1); // '1 B'
readableFilesize(1023); // '1023 B'
readableFilesize(1024); // '1.00 KB'
readableFilesize(1025); // '1.00 KB'
readableFilesize(1000000); // '976 KB'
readableFilesize(1023999); // '999 KB'
readableFilesize(1024000); // '0.97 MB'
readableFilesize(1048575); // '0.99 MB'
readableFilesize(1048576); // '1.00 MB'
readableFilesize(1048577); // '1.00 MB'
readableFilesize(1000000000); // '953 MB'
readableFilesize(1048575999); // '999 MB'
readableFilesize(1048576000); // '0.97 GB'
readableFilesize(1073741823); // '0.99 GB'
readableFilesize(1073741824); // '1.00 TB'
```

### Formatted Output

```js
readableFilesize(999, { // '999 bytes'
    format: ({ size, unit }) => {
        unit = { B: 'bytes' }[unit] || unit;
        return `${size} ${unit}`;
    }
});
readableFilesize(1024, { output: 'string' }); // '1.00 KB'
readableFilesize(1024, { output: 'array' }); // [ '1.00', 'KB' ]
readableFilesize(1024, { output: 'object' }); // { size: '1.00', unit: 'KB' }
```

### Separators

#### English

```js
const options = {
    separator: {
        thousands: ',',
        decimal: '.',
    }
};
readableFilesize(999, options); // '999 B'
readableFilesize(1000, options); // '1,000 B'
readableFilesize(1024, options); // '1.00 KB'
```

#### French

```js
const options = {
    separator: {
        thousands: ' ',
        decimal: ',',
    }
};
readableFilesize(999, options); // '999 B'
readableFilesize(1000, options); // '1 000 B'
readableFilesize(1024, options); // '1,00 KB'
```

#### Dutch

```js
const options = {
    separator: {
        thousands: '.',
        decimal: ',',
    }
};
readableFilesize(999, options); // '999 B'
readableFilesize(1000, options); // '1.000 B'
readableFilesize(1024, options); // '1,00 KB'
```

## Options

### separator

_*(boolean)*_ Enable separators, default is `false`

_*(object)*_ Specifies the thousands and decimal separators, default is:

```js
separator: {
    thousands: ',',
    decimal: '.'
}
```

### output

_*(string)*_ One of `'array'`, `'object'`, or `'string'`, default is `'string'`

### format

_*(string)*_ The format string, default is `'{{size}} {{unit}}'`

_*(function)*_ The format function:

```js
format: ({ size, unit }) => {
    unit = { 'B': 'bytes' }[unit] || unit;
    return `${size} ${unit}`;
}
```

## License

MIT
