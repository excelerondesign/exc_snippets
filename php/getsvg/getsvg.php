<?php
$input = $modx->getOption('input', $scriptProperties, '');
$title = $modx->getOption('title', $scriptProperties, '');
$label = $modx->getOption('label', $scriptProperties, '');

$rand = rand(1, 100);

$id_default = 'svg_' . $rand;
$id = $modx->getOption('id', $scriptProperties, $id_default);

$class_default = 'svg-' . $rand;
$classes = $modx->getOption('classes', $scriptProperties, $class_default);
$classNames = 'svg svg--replaced ' . $classes;

$doc = new DomDocument;

if (!$doc->Load($input)) return "Not a valid XML document";

$tag = $doc->getElementsByTagName('svg')->item(0);

if (!empty($label)) {
    $tag->setAttribute('aria-label', $label);
} else {
    $tag->setAttribute('aria-hidden', 'true');
}

$tag->setAttribute('id', $id);
$tag->setAttribute('role', 'image');
$tag->setAttribute('class', $classNames);

return $doc->saveXML();
