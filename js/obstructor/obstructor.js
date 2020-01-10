//TODO: figure out a better name...
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
		 * @param css if true, css styles will default to plugin else ignored, false assumes you have your own
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
		this.controllers = [...this.CONFIG.inputs, ...this.CONFIG.conditionals];

		//* Checks to see if styles need to be added
		this.CONFIG.css && this.addCSS();

		this.applyControllers(this.controllers);
	}

	addCSS() {
		const el = document.createElement('style');
		el.innerText = `
        ${this.CONFIG.prefix + this.CONFIG.input_suffix} {
            position: absolute;
            overflow: hidden;
            height: 1px;
            width: 1px;
            margin: -1px;
            padding: 0;
            border: 0;
            clip: rect(1px 1px 1px 1px);
            clip: rect(1px, 1px, 1px, 1px);
        }
        `;
		return document.head.appendChild(el);
	}

	byClass(str) {
		return document.getElementsByClassName(str);
	}

	changeVisibility(target, shouldBeHidden) {
		/* option for manual control */
		if (shouldBeHidden !== undefined)
			return target.setAttribute('hidden', shouldBeHidden);

		/* Otherwise, toggle hidden attribute */
		return !target.getAttribute('hidden')
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
			targets: [...this.byClass(this.CONFIG.class_prefix + hideId)],
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

		//TODO: todo Add debug messaging for dev mode
		return;
	}
}
