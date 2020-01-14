<?php
$output = $input;
//? If URL has a question mark, add & first
//? else add ? first
strpos($input, '?') ? $output .= '&' . $options : $output .= '?' . $options;
return $output;
