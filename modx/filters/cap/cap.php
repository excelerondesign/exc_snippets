<?php
//? split up string by space
$words = explode(' ', $input);
$output = '';
foreach ($words as $word) {
    //? capitalize letter of each word
    $word = ucfirst($word);
    //? concat with $output
    $output .= $word;
}
//? return $output
return $output;
