# dou-fetch [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> Load dou documents

## Installation

```sh
$ npm install --save dou-loader
```

## Usage

```js
const douFetch = require('dou-fetch');

douFetch()
  .then(
    res => {
      console.log(res)
    }
  )
  .catch(
    err => {
      console.error(err)
    }
  )
```
## License

MIT © [amimaro]()


[npm-image]: https://badge.fury.io/js/dou-loader.svg
[npm-url]: https://npmjs.org/package/dou-loader
[travis-image]: https://travis-ci.org/amimaro/dou-loader.svg?branch=master
[travis-url]: https://travis-ci.org/amimaro/dou-loader
[daviddm-image]: https://david-dm.org/amimaro/dou-loader.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/amimaro/dou-loader
