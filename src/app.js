import App from './App.svelte';
import 'whatwg-fetch' // fetch polyfill for IE 11

const app = new App({
	target: document.body,
});

export default app;
