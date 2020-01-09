const class_prefix = 'js-hide_';
const controls = [
	...document.getElementsByClassName(class_prefix + 'input'),
	...document.getElementsByClassName(class_prefix + 'conditional')
];

/*
function createConfig(controller) {
	const {
		dataset: {
			hideControls: hideId,
			hideEvent = 'change',
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
	if (expects === undefined || value === expects) {
		return targets.forEach(target => changeVisibility(target));
	}
	if (value !== expects)
		return targets.forEach(target => changeVisibility(target, true));

	return;
}

function changeVisibility(target, shouldBeHidden) {
	console.log(shouldBeHidden);
	if (shouldBeHidden !== undefined)
		return target.setAttribute('hidden', shouldBeHidden);

	return !target.hidden ? (target.hidden = true) : (target.hidden = false);
}
*/
applyControllers(controls);

class controlHidden {
	/**
	 * optional config object to pass in
	 * @param {Object} options
	 */
	constructor(options) {
		this.DEFAULTS = {
			debug: true,
			css: true,
			prefix: 'js-hide_',
			input_suffix: 'input',
			conditional_suffix: 'conditional',
			get inputs() {
				return [...this.byClass(this.prefix + this.input_suffix)];
			},
			get conditionals() {
				return [...this.byClass(this.prefix + this.conditional_suffix)];
			}
		};
		/**
		 * CONFIG
		 * @param debug turn on or off errors
		 * @param css if true, css styles will default to plugin else ignored
		 * @param prefix use a custom class prefix
		 * * This plugin takes advantage of separate suffixes for separate uses
		 * * input_suffix is aimed at inputs that control parts of the page but will not be seen
		 * * conditional_suffix can be interacted with and therefore can be seen
		 * @param input_suffix use a custom class suffix
		 * @param conditional_suffix use a custom class suffix
		 *
		 * @param inputs takes an array of DOM elements to watch
		 * @param conditionals takes an array of DOM elements to watch and evaluate
		 */
		this.CONFIG = Object.assign(this.DEFAULTS, options);

		//* Generates an array of DOM Elements from the given arrays
		this.controls = [...this.CONFIG.inputs, ...this.CONFIG.conditionals];

		//* Checks to see if styles need to be added
		this.CONFIG.css && this.addCSS();
	}

	addCSS() {
		const el = document.createElement('style');
		el.innerText = `
        
        `;
	}

	byClass(str) {
		return document.getElementsByClassName(str);
	}

	changeVisibility(target, shouldBeHidden) {
		/* option for manual control */
		if (shouldBeHidden !== undefined)
			return target.setAttribute('hidden', shouldBeHidden);

		/* Otherwise, toggle hidden attribute */
		return !target.hidden
			? target.setAttribute('hidden', true)
			: target.setAttribute('hidden', false);
	}

	generateConfig(controller) {
		const {
			dataset: { hideControls: hideId, hideEvent = 'change', hideExpects }
		} = controller;

		return {
			controller,
			name: controller.getAttribute('name'),
			controls: hideId,
			targets: [
				...document.getElementsByClassName(
					this.CONFIG.class_prefix + hideId
				)
			],
			event: hideEvent,
			expects: hideExpects
		};
	}

	applyControllers(controllers) {
		const configs = controllers.map(this.generateConfigs);

		configs.forEach(config =>
			config.controller.addEventListener(config.event, () =>
				this.changeVisibilityForTargets(config)
			)
		);
	}

	changeVisibilityForTargets(controllerConfig) {
		const {
			targets,
			controller: { value },
			expects
		} = controllerConfig;
		/*?
		 * if there is no expected value
		 * or
		 * if the current value is the same as the expected value
		 *
		 * then change the visibility of all the targets
		 */

		if (expects === undefined || value === expects) {
			return targets.forEach(target => this.changeVisibility(target));
		}

		/*?
		 * else if the value is not the same as expected value
		 *
		 * hide all targets
		 */
		if (value !== expects)
			return targets.forEach(target =>
				this.changeVisibility(target, true)
			);

		/*? check if we're still developing the website */

		/*
		 * TODO: Add debug messaging for dev mode
		 */
		return;
	}
}
