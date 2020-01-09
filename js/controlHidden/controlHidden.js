const class_prefix = 'js-hide_';
const controls = [
	...document.getElementsByClassName(class_prefix + 'input'),
	...document.getElementsByClassName(class_prefix + 'conditional')
];

function createConfig(controller) {
	const {
		dataset: {
			hideControls: hideId,
			hideEvent = 'change' /* jshint ignore:line */,
			hideExpects
		}
	} = controller;

	return {
		controller,
		name: controller.getAttribute('name'),
		controls: hideId,
		targets: [...document.getElementsByClassName(class_prefix + hideId)],
		event: hideEvent,
		expects: hideExpects
	};
}

function applyControllers(arr) {
	const configs = arr.map(createConfig);

	console.group('Check configs');
	configs.forEach(config => console.log(config.name, config));
	console.groupEnd();
	console.log('End configs');

	configs.forEach(config =>
		config.controller.addEventListener(config.event, () =>
			changeVisibilityForTargets(config)
		)
	);
}

function changeVisibilityForTargets({
	targets,
	controller: { value },
	expects
}) {
	// jshint ignore:line

	/*
	 * if there is no expected value
	 * or
	 * if the current value is the same as the expected value
	 *
	 * then change the visibility of all the targets
	 */

	if (expects === undefined || value === expects) {
		return targets.forEach(target => changeVisibility(target));
	}

	/*
	 * else if the value is not the same as expected value
	 *
	 * hide all targets
	 */
	if (value !== expects)
		return targets.forEach(target => changeVisibility(target, true));

	/* check if we're still developing the website */
	DEV_ENV && console.error('Value did not match expected: ', [...targets]);

	return;
}

function changeVisibility(target, shouldBeHidden) {
	console.log(shouldBeHidden);
	/* option for manual control */
	if (shouldBeHidden !== undefined)
		return target.setAttribute('hidden', shouldBeHidden);

	/* Otherwise, toggle hidden attribute */
	return !target.hidden ? (target.hidden = true) : (target.hidden = false);
}

applyControllers(controls);

function controlHidden() {
	this.DEFAULTS = {
		class_prefix: 'js-hide_',
		input_suffix: 'input',
		conditional_suffix: 'conditional'
	};
}
