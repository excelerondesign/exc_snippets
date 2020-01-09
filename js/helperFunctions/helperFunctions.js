/*
    * Is array empty? comparable to not_empty() in php
    ? checks if array is empty, if not, then it returns the given argument back as an array
*/
const not_empty = arr => arr.length !== 0 && [...arr];
