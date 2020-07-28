(function checkIE() {
	if (document.documentMode === undefined) return;
	var className = ' compatibility-popup-visible ';
	// prettier-ignore
	if ((' ' + document.getElementById('compatPopUp').className + ' ').indexOf(className) < 0)
		document.getElementById('compatPopUp').className += className;
})();
