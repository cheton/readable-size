# readable-size [![build status](https://travis-ci.org/cheton/readable-size.svg?branch=master)](https://travis-ci.org/cheton/readable-size) [![Coverage Status](https://coveralls.io/repos/github/cheton/readable-size/badge.svg?branch=master)](https://coveralls.io/github/cheton/readable-size?branch=master)
[![NPM](https://nodei.co/npm/readable-size.png?downloads=true&stars=true)](https://www.npmjs.com/package/readable-size)

Converts bytes into human readable size units: B, KB, MB, GB, TB, PB, EB, ZB, YB.

## Installation

```bash
npm install --save readable-size
```

## Examples

```js
readableSize(1); // '1 B'
readableSize(1023); // '1023 B'
readableSize(1024); // '1.00 KB'
readableSize(1025); // '1.00 KB'
readableSize(1000000); // '976 KB'
readableSize(1023999); // '999 KB'
readableSize(1024000); // '0.97 MB'
readableSize(1048575); // '0.99 MB'
readableSize(1048576); // '1.00 MB'
readableSize(1048577); // '1.00 MB'
readableSize(1000000000); // '953 MB'
readableSize(1048575999); // '999 MB'
readableSize(1048576000); // '0.97 GB'
readableSize(1073741823); // '0.99 GB'
readableSize(1073741824); // '1.00 TB'
```

### Output

The output is one of `'string'`, `'array'`, `'object'`, or function type.

#### 'string'

```js
readableSize(1024, { output: 'string' }); // '1.00 KB'
readableSize(1024, { output: 'string', format: '{{size}} ({{unit}})' }); // '1.00 (KB)'
```

#### 'array'

```js
readableSize(1024, { output: 'array' }); // [ '1.00', 'KB' ]
```

#### 'object'

```js
readableSize(1024, { output: 'object' }); // { size: '1.00', unit: 'KB' }
```

#### function

```js
readableSize(999, { // '999 bytes'
    output: ({ size, unit }) => {
        unit = { B: 'bytes' }[unit] || unit;
        return `${size} ${unit}`;
    }
});
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
readableSize(999, options); // '999 B'
readableSize(1000, options); // '1,000 B'
readableSize(1024, options); // '1.00 KB'
```

#### French

```js
const options = {
    separator: {
        thousands: ' ',
        decimal: ',',
    }
};
readableSize(999, options); // '999 B'
readableSize(1000, options); // '1 000 B'
readableSize(1024, options); // '1,00 KB'
```

#### Dutch

```js
const options = {
    separator: {
        thousands: '.',
        decimal: ',',
    }
};
readableSize(999, options); // '999 B'
readableSize(1000, options); // '1.000 B'
readableSize(1024, options); // '1,00 KB'
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

_*('string')*_ The output is defined by the format string, default is `'{{size}} {{unit}}'`

_*('array')*_ The output is `[size, unit]`

_*('object')*_ The output is `{ size, unit }`

_*(function)*_ A user-defined output function:

```js
format: ({ size, unit }) => {
    unit = { 'B': 'bytes' }[unit] || unit;
    return `${size} ${unit}`;
}
```

### format

_*(string)*_ The format string, default is `'{{size}} {{unit}}'`

## License

MIT
