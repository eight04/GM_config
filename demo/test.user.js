/* globals GM_config */
// ==UserScript==
// @name        GM_config Test Script
// @version     0.1.0
// @namespace   eight04.blogspot.com
// @description GM_config Test Script
// @include     http*
// @require     ../dist/GM_config.js
// @grant       GM_addStyle
// @grant       GM_registerMenuCommand
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       unsafeWindow
// ==/UserScript==

GM_config.init("GM_config Test", {
	text: {
		label: "Text field",
		type: "text",
		default: "sadfasdf"
	},
	number: {
		label: "Number field",
		type: "number",
		default: 12345
	},
	checkbox: {
		label: "Checkbox field",
		type: "checkbox",
		default: true
	},
	textarea: {
		label: "Textarea field",
		type: "textarea",
		default: "multi\nline"
	}
});

function output() {
	document.querySelector(".output").textContent = JSON.stringify(GM_config.get(), null, 4);
}

document.querySelector(".open-config").addEventListener("click", GM_config.open);

GM_config.onclose = output;

output();
