# Memoize

A small script to help memoize more complex function that give unique outputs for each input.

Example:

```js
const difficultFunction = m(function (arg) {
	// Lot of really hard to do stuff
});

difficultFunction(100); // runs function
difficultFunction(200); // runs function
difficultFunction(100); // uses cache
difficultFunction(300); // runs function
difficultFunction(100); // uses cache
```
