# swamper

Tool for Web Workers

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
export class MathWorker {
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
