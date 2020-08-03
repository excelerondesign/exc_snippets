function inlineWorker(fn) {
	const script = `(${fn.toString()})();`;
	const workerBlob = new Blob([script]);
	const workerURL = URL.createObjectURL(workerBlob);
	const worker = new Worker(workerURL);
	return worker;
}
