[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/teniryte/swamper/graphs/commit-activity) [![Maintaner](https://img.shields.io/badge/Maintainer-teniryte-blue)](https://img.shields.io/badge/maintainer-teniryte-blue) [![Website shields.io](https://img.shields.io/website-up-down-green-red/http/shields.io.svg)](https://swamper.sencort.com/) [![made-with-Markdown](https://img.shields.io/badge/Made%20with-Markdown-1f425f.svg)](http://commonmark.org) [![made-for-VSCode](https://img.shields.io/badge/Made%20for-VSCode-1f425f.svg)](https://code.visualstudio.com/) [![GitHub license](https://img.shields.io/github/license/teniryte/swamper.svg)](https://github.com/teniryte/swamper/blob/master/LICENSE) [![Profile views](https://gpvc.arturio.dev/teniryte)](https://gpvc.arturio.dev/teniryte) [![GitHub contributors](https://img.shields.io/github/contributors/teniryte/swamper.svg)](https://GitHub.com/teniryte/swamper/graphs/contributors/) [![GitHub issues](https://img.shields.io/github/issues/teniryte/swamper.svg)](https://GitHub.com/teniryte/swamper/issues/)

[![GitHub forks](https://img.shields.io/github/forks/teniryte/swamper.svg?style=social&label=Fork&maxAge=2592000)](https://GitHub.com/teniryte/swamper/network/) [![GitHub stars](https://img.shields.io/github/stars/teniryte/swamper.svg?style=social&label=Star&maxAge=2592000)](https://GitHub.com/teniryte/swamper/stargazers/) [![GitHub watchers](https://img.shields.io/github/watchers/teniryte/swamper.svg?style=social&label=Watch&maxAge=2592000)](https://GitHub.com/teniryte/swamper/watchers/) [![GitHub followers](https://img.shields.io/github/followers/teniryte.svg?style=social&label=Follow&maxAge=2592000)](https://github.com/teniryte?tab=followers)

# swamper

Tool for [**swamper webpack loader**](https://github.com/teniryte/swamper-loader)

Swamper is a webpack loader and wrapper around [**worker-loader**](https://github.com/webpack-contrib/worker-loader) web workers loader.

## Webpack Loader

```sh
yarn add swamper-loader
```

```js
// ...
{
  test: /\.worker\.(c|m)?js$/i,
  use: [
    {
      loader: 'worker-loader',
      options: {
        publicPath: '/scripts/workers/',
      },
    },
    {
      loader: 'swamper-loader',
    },
  ],
},
// ...
```

## Swamper

```sh
yarn add swamper
```

> `math.worker.js`

```js
export default class MathWorker {
  async add(a, b) {
    return a + b;
  }
}
```

> `index.js`

```js
import swamper from 'swamper';

import MathWorker from './math.worker';

swamper(MathWorker).then(async worker => {
  const result = await worker.add(1, 2);
  console.log(result); // 3
});
```
