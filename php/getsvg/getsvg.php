<?php
if (!$input) return 'No Input';

// create a random 5 char string
$rand = hash('ripemd160', rand(1, 100));
$rand = substr($rand, 5, 5);

// get script properties
$id = $modx->getOption('id', $scriptProperties, "svg_{$rand}");
$classes = $modx->getOption('classes', $scriptProperties, '');
$debug = $modx->getOption('debug', $scriptProperties, false);

// get file contents
$svg = file_get_contents($input);

// checks the mime content type of the input to make sure it is an SVG
$isSvgMime = mime_content_type($input) === 'image/svg+xml';

// checks if the xmlns link is present
$isSvgContent = preg_match('/xmlns="http:\/\/www.w3.org\/2000\/svg"/', $svg, $output_array);

// checks if is an svg element
$isSvgEl = preg_match('/<svg.*\/svg>/', $svg, $output_array);

$hasID = preg_match('/ id=/', $svg, $output_array);
// $modx->log(modX::LOG_LEVEL_ERROR, );
// Tests logic above
if ($isSvgMime || $isSvgContent || $isSvgEl) {

    // Removes HTML comments
    $svg = preg_replace("/<!--(.|\\s)*?-->/", "", $svg);

    // Removes the xml tag
    $svg = preg_replace("/<\?(.|\\s)*?\?>/", "", $svg);

    if ($hasID) {
        // if it has an id replace it with a random one
        $svg = preg_replace("/id=\"(?:(?!\").)*?\"/", "id='{$id}'", $svg, 1);
    } else {
        $svg = preg_replace("/>/", "id='{$id}'>", $svg, 1);
    }
    if ($hasAlt) {
        $svg = preg_replace("/>", "aria-label='{addslashes($alt)}'");
    }
    $svg = preg_replace("/>/", " class='svg svg--replaced {$classes}'>", $svg, 1);

    // return it to the page
    $output = $svg;
} else {
    // otherwise just return the string below
    $output = "Not an SVG: {$input}";
}
return $output;
