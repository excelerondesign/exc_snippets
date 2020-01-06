[ ] output nothing when logic doesn't pass
example

```html
<a class="[[+idx:is_then=`2,class`]]></a>
```

expected output

```html
<a class=""></a> <a class="class"></a>
```

actual output

```html
<a class="1"></a> <a class="class"></a>
```
