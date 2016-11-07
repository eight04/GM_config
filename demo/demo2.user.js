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

GM_config.setup({
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
	},
	radio: {
		label: "Select your language",
		type: "radio",
		default: "en",
		options: {
			en: "English",
			tw: "Traditional Chinese",
			cn: "Simplified Chinese"
		}
	},
	select: {
		label: "Choose a color",
		type: "select",
		default: "orange",
		options: {
			red: "Red",
			orange: "Orange",
			yellow: "Yellow"
		}
	},
	select2: {
		label: "Multiple select",
		type: "select",
		default: [],
		options: {
			n1: "1",
			n2: "2",
			n3: "3"
		},
		multiple: true
	}
}, function () {
	document.querySelector(".output").textContent = JSON.stringify(GM_config.get(), null, 4);
});
