# Memoize

A small script to help memoize more complex function that give unique outputs for each input.

Example:

```js
const difficultFunction = m(function (arg) {
	// Lot of really hard to do stuff
});

difficultFunction(100); // runs function, adds to cache
difficultFunction(200); // runs function, adds to cache
difficultFunction(100); // uses cache
difficultFunction(300); // runs function, adds to cache
difficultFunction(100); // uses cache
```

You can also use a "global cache" version, if you are having trouble and need to debug the outputs. You must use named functions with this version though.

```js
const difficultFunction = m(function difficultFunction(arg) {
	// creates global cache at window.m.c
	// then creates a function specific cache at window.m.c[function.name]
	// so much difficult computing
	// cache response
});

difficultFunction(100); // window.m.c.difficultFunction = { 100: /* the output */ }
difficultFunction(200); // run function, cache = { 100: /* output 1 */, 200: /* output 2 */ }
difficultFunction(100); // window.m.c.difficultFunction['100']

const differentFunction = m(function differentFunction(arg) {
	// other stuff
});

differentFunction('test'); // window.m.c = { difficultFunction: { 100, 200,}, differentFunction: { test: /* result* / } };
```

## Important Note

Because this is such a simple snippet, you may run into type issues. Not every argument can be "shadowed" into an appropriate type for an object key. Be sure to check that when you are using the `m()` function.
