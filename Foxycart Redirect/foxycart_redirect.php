<?php
/*!
 * MODX Foxycart Redirect FormIt Hook
 * (c) 2020 Exceleron Designs, MIT License, https://excelerondesigns.com
 * Author: Ryan Babka
 */

$value_array = $_POST;

if(empty($foxycart_subdomain)){
    $modx->log(modX::LOG_LEVEL_ERROR, "Must include subdomain \'subdomain.foxycart.com\'.");
    return false;
}

$url = "https://{$foxycart_subdomain}.foxycart.com/cart?";

$parameter_array = [];

if($empty)  $parameter_array[] = "empty=true";

if(!empty($cart)) $parameter_array[] = "cart={$cart}";

$remove_values = preg_replace("/\s+/", "", $remove_values);

$remove = explode(',', $remove_values);
foreach($remove as $value) {
    unset($value_array[$value]);
}

$hidden_values = preg_replace("/\s+/", "", $hidden_values);

$hidden = explode(',', $hidden_values);


foreach($value_array as $key => $value){
    if(in_array($key, $hidden)) $key = "h:{$key}";
    $value = urlencode($value);
    $parameter_array[] = "{$key}={$value}";
}

if($foxycart_debug) {
    $modx->log(modX::LOG_LEVEL_ERROR, 'Base URL: ' . $url);
    $modx->log(modX::LOG_LEVEL_ERROR, 'Values: ' . print_r($value_array, true));
    $modx->log(modX::LOG_LEVEL_ERROR, 'Parameter Values: ' . print_r($parameter_array, true));
}

$parameter_string = implode('&', $parameter_array);

// $modx->log(modX::LOG_LEVEL_ERROR, $parameter_string);

header("Location: {$url}{$parameter_string}");

return true;
