# rip-out

A simple module that allows you to clone an object and rip out the keys that you
don't want in it. This can be useful when you want to spread props in React but
remove your custom properties.

### Installation

The package is released in the public npm registry and can be installed by
running:

```
npm install --save rip-out
```
### Usage

The module exposes a single function as interface. The following arguments are
accepted by the function:

- The object that needs to be cloned and cleaned
- The rest of the arguments should be the keys that need to be removed from the
  object.

##### Example

```js
import rip from 'rip-out';

const obj = { foo: 'foo', bar: 'bar', baz: 'baz' };
const res = rip(obj, 'bar', 'baz'); // { foo: 'foo' };
```

## License

MIT
