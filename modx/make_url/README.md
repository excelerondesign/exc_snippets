#### TODO

- [ ] Check if is page id
- [ ] Handle actual links
- [ ] Handle scheme & other arguments

##### Possible scheme solution
```php
<?php
$scheme = $modx->getOption('scheme', $scriptProperties, -1);

return $modx->makeURL($input, $context, $params, $scheme);
```
