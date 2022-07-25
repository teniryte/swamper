# swamper

Tool for **swamper webpack loader**(https://github.com/teniryte/swamper-loader)

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
