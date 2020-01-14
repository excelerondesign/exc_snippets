<?php
$options = explode(',', $options);

$is = $options[0];
$output = $options[1];

if ($input === $is) {
    $output = ' ';
}

return $output;
