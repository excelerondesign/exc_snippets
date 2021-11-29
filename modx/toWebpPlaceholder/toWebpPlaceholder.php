<?php
/**
 * @property {string} prefix - the prefix for the webp placeholder
 * @property {string} replacePath - the part of the file path to search for where the appendPath can be inserted
 * @property {string='webp/'} [appendPath] - the folder that the webp versions are stored in
 */
$optArr = explode('&', $options);

$options = [];
foreach($optArr as $opt) {
	$param = @explode('=', $opt);
	array_walk($param, function(&$v) { return $v = trim($v); });
	
	if (isset($param[1])) {
		$options[$param[0]] = $param[1];
	} else {
		$options[$param[0]] = '';
	}
}


$replacePath = $options['replacePath'];

$appendPath = empty($options['appendPath']) ? 'webp/' : $options['appendPath'];
$insertPath = empty($options['force']) ? $replacePath.$appendPath : $appendPath;

$filePath = str_replace($replacePath, $insertPath, $input);
$filePath = preg_replace('/.(jpg|jpeg|png|gif)$/', '.webp', $filePath);

if (!isset($options['prefix'])) {
	$modx->log(MODX::LOG_LEVEL_ERROR, "[toWebpPlaceholder] Prefix option wasn't set.");
	$modx->log(MODX::LOG_LEVEL_ERROR, print_r($options, true));
} else {
	$placeholderKey = $options['prefix'].'-webp';
	
	if (!file_exists($filePath)) {
		$modx->log(MODX::LOG_LEVEL_ERROR, "[toWebpPlaceholder] File at $filePath does not exist.");
	} else {
		$modx->toPlaceholder($placeholderKey, $filePath);
	}
}

return ' ';