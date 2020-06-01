<?php
if (!function_exists('assign_attr')) {
    function assign_attr($el, $attr, $val)
    {
        $el->setAttribute($attr, $val);
    }
}

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
    assign_attr($tag, 'aria-label', $label);
} else {
    assign_attr($tag, 'aria-hidden', 'true');
}

assign_attr($tag, 'id', $id);
assign_attr($tag, 'role', 'image');
assign_attr($tag, 'class', $classNames);

return $doc->saveXML();
