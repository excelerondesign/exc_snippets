/**
 * Memoize - Memoize complex or taxing functions
 * - connor
 */

// unminified
function memo(func) {
	const cache = {};
	return (arg) => {
		if (arg in cache) return cache[arg];
		cache[arg] = func(arg);
		return cache[arg];
	}
}

// unminified w/ global cache object
function memo(func, win = window) {
	win.memo.cache = win.memo.cache || {};
	win.memo.cache[func.name] = {};
	const cache = win.memo.cache[func.name];
	return (arg) => {
		if (arg in cache) return cache[arg];
		cache[arg] = func(arg);
		return cache[arg];
	}
}


// minified (70b)
function m(n,i=this){var r={};return i=>i in r?r[i]:(r[i]=n(i))||r[i]}
// global cache object (114b)
function m(m,n=this){n.m.c=n.m.c||{},n.m.c[m.name]={};var c=n.m.c[m.name];return n=>n in c?c[n]:(c[n]=m(n))||c[n]}