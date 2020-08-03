# A Copy and Pasteable Internet Explorer Warning Popup

Features a generic popup with bland styling that is easy to override. All styles have a specificity that maxes out at `0 0 2 0`.

Copy and past the code below just below the opening of your `body`, and you're all set. Make sure any CSS, HTML, or JS you add is compatible with IE 11 or further.

```html
<div class="compatibility-popup" aria-hidden id="compatPopUp">
	<div class="compatibility-message">
		<p class="compatibility-title">
			Thank You<br />
			for Visiting our Site
		</p>
		<p class="compatibility-subtitle">
			Unfortunately, we do not support your browser. To continue using our
			website, please switch to a modern browser. These include
			<a
				href="https://www.apple.com/safari/"
				rel="noreferrer noopener"
				target="_blank"
				>Safari</a
			>,
			<a
				href="https://www.microsoft.com/en-us/edge"
				rel="noreferrer noopener"
				target="_blank"
				>Edge</a
			>,
			<a
				href="https://www.mozilla.org/en-US/firefox/new/"
				rel="noopener noreferrer"
				target="_blank"
				>Firefox</a
			>, and
			<a
				href="https://www.google.com/chrome/"
				target="_blank"
				rel="noopener noreferrer"
				>Chrome</a
			>.
		</p>
	</div>
	<div class="compatibility-backdrop"></div>
</div>
<style>
	.compatibility-popup {
		visibility: hidden;
		display: none;
		position: relative;
	}
	.compatibility-popup-visible {
		display: block;
		visibility: visible;
	}
	.compatibility-popup > .compatibility-message {
		background-color: #fff;
		max-width: 45vw;
		margin: 0 auto;
		width: 100%;
		padding: 1rem 1.5rem;
		position: relative;
		z-index: 10;
		border-radius: 10px;
		display: block;
	}
	.compatibility-message > .compatibility-title {
		font-size: 2.5rem;
		font-weight: 100;
		word-spacing: -1px;
	}
	.compatibility-message > .compatibility-subtitle {
		font-size: 1.25rem;
		font-weight: 400;
		letter-spacing: -0.5px;
	}
	.compatibility-message a {
		text-decoration: underline dashed;
		color: #0d6efd;
	}
	.compatibility-message a:hover {
		text-decoration: unset;
		color: #024dbc;
	}
	.compatibility-message a:visited {
		text-decoration: underline dashed;
		color: #024dbc;
	}
	.compatibility-message a:visited:hover {
		color: #0d6efd;
	}
	.compatibility-message a:focus {
		outline: 2px dashed #0d6efd;
		text-decoration: unset;
		color: #0d6efd;
	}
	.compatibility-message a:visited:focus {
		color: #024dbc;
	}
	.compatibility-popup > .compatibility-backdrop {
		margin-top: 0;
		height: 100vh;
		width: 100vw;
		background-color: rgba(0, 0, 0, 0.3);
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
	}
</style>
<script>
	(function checkIE() {
		if (document.documentMode === undefined) return;
		var className = ' compatibility-popup-visible ';
		// prettier-ignore
		if ((' ' + document.getElementById('compatPopUp').className + ' ').indexOf(className) < 0) document.getElementById('compatPopUp').className += className;
	})();
</script>
```

## Explanation

The plugin checks for the existence of the property `document.documentMode`. This emits the mode that Internet Explorer is using to interpret the document. It was implemented in version 8 of Internet Explorer and was removed in Edge.
