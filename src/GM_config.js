// ==UserScript==
// @name        GM_config (eight's version)
// @description	A library to help you set up configure in greasemonkey script.
// @namespace   eight04.blogspot.com
// @version     2.0.0
// @grant       GM_setValue
// @grant		GM_getValue
// @license		LGPL version 3 or any later version; http://www.gnu.org/copyleft/lgpl.html
// @copyright   2015+, eight <https://github.com/eight04/GM_config>
// @homepageURL https://github.com/eight04/GM_config
// @supportURL  https://github.com/eight04/GM_config/issues
// ==/UserScript==

var GM_config = function(){

	"use strict";

	var config = {
		title: null,
		settings: null,
		local: false
	}, dialog, css, GM_config;

	function addChild(e, children) {
		if (!children) {
			return;
		}

		if (!Array.isArray(children)) {
			children = [children];
		}

		var i;
		for (i = 0; i < children.length; i++) {
			if (typeof children[i] == "string") {
				children[i] = document.createTextNode(children[i]);
			}
			e.appendChild(children[i]);
		}
	}

	function element(tag, attr, children) {
		var e, key, key2;

		e = document.createElement(tag);

		if (attr) {
			for (key in attr) {
				if (typeof attr[key] == "boolean") {
					if (attr[key]) {
						e.setAttribute(key, "");
					} else {
						e.removeAttribute(key);
					}

				} else if (key == "event") {
					for (key2 in attr[key]) {
						e["on" + key2] = attr[key][key2];
					}

				} else {
					e.setAttribute(key, attr[key]);
				}
			}
		}

		addChild(e, children);

		return e;
	}

	function frag(children) {
		var fragment = document.createDocumentFragment();
		addChild(fragment, children);
		return fragment;
	}

	function getValue(key) {
		if (config.local) {
			key = location.hostname + "/" + key;
		}
		return GM_getValue(key);
	}

	function setValue(key, value) {
		if (config.local) {
			key = location.hostname + "/" + key;
		}
		GM_setValue(key, value);
	}

	function read() {
		var key, s;
		config.local = GM_getValue(location.hostname, false);
		for (key in config.settings) {
			s = config.settings[key];
			s.value = getValue(key, s.type);
			if (s.value == null) {
				s.value = s.default;
			}
		}
	}

	function save() {
		var key, s;
		GM_setValue(location.hostname, config.local);
		for (key in config.settings) {
			s = config.settings[key];
			if (s.value == null) {
				setValue(key, s.default);
			} else {
				setValue(key, s.value);
			}
		}
	}

	function destroyDialog() {
		dialog.element.classList.remove("config-dialog-ani");
		setTimeout(function() {
			document.body.classList.remove("config-dialog-open");
			document.body.style.paddingRight = "";
			dialog.element.parentNode.removeChild(dialog.element);
			dialog = null;
		}, 220);
	}

	function createDialog(title) {
		var iframe = element("iframe", {"class": "config-dialog-content"});
		var modal = element("div", {"class": "config-dialog", "tabindex": "-1"}, [
			element("style", null, "body.config-dialog-open { padding-right: " + (window.innerWidth - document.documentElement.offsetWidth) + "px; }"),
			iframe
		]);

		var head = element("div", {"class": "config-dialog-head"}, title);
		var body = element("div", {"class": "config-dialog-body"});
		var footer = element("div", {"class": "config-dialog-footer form-inline"});

		var style = element("style", null, getConfigCssString());

		document.body.classList.add("config-dialog-open");
		document.body.appendChild(modal);

		function manipulateIframe() {
			var doc = iframe.contentDocument;
			doc.head.appendChild(style);
			doc.body.appendChild(head);
			doc.body.appendChild(body);
			doc.body.appendChild(footer);
		}

		iframe.contentWindow.onload = manipulateIframe;

		manipulateIframe();

		function render() {
			var body = iframe.contentDocument.body,
				w = body.offsetWidth,
				h = body.scrollHeight;

			iframe.style.width = w + "px";
			iframe.style.height = h + "px";
			modal.focus();

			modal.classList.add("config-dialog-ani");
		}

		return {
			element: modal,
			head: head,
			body: body,
			footer: footer,
			render: render
		};
	}

	function close(saveFlag) {
		var key, s;

		if (!dialog) {
			return;
		}
		destroyDialog();

		for (key in config.settings) {
			s = config.settings[key];
			if (saveFlag) {
				switch (s.type) {
					case "number":
						s.value = +s.element.value;
						break;
					case "checkbox":
						s.value = s.element.checked;
						break;
					default:
						s.value = s.element.value;
				}
				// Create inputs
			}
			// Create inputs
			s.element = null;
		}

		if (saveFlag) {
			save();
		}

		if (GM_config.onclose) {
			GM_config.onclose(saveFlag);
		}
	}

	function getConfigCssString() {
		return "@@CONFIGCSS";
	}

	function getCssString() {
		return "@@CSS";
	}

	function setupDialogValue (reset, imports) {
		var key, setting, value;

		for (key in config.settings) {
			setting = config.settings[key];

			if (reset) {
				value = setting.default;
			} else {
				if (imports && imports[key] != undefined) {
					value = imports[key];
				} else {
					value = setting.value;
				}
			}

			switch (setting.type) {
				case "number":
					setting.element.value = value.toString();
					break;

				case "checkbox":
					setting.element.checked = value;
					break;

				default:
					setting.element.value = value;
					break;
			}
		}
	}

	function createInputs(dialog) {
		var key, s, group;

		for (key in config.settings) {
			s = config.settings[key];

			if (s.type == "textarea") {
				s.element = element("textarea", {"id": key});
				s.element.classList.add("form-control");
				group = [
					element("label", {"for": key}, s.label),
					s.element
				];
			} else {
				s.element = element("input", {"id": key, "type": s.type});

				switch (s.type) {
					case "number":
						s.element.classList.add("form-control");
						group = [
							element("label", {"for": key}, s.label),
							s.element
						];
						break;
					case "checkbox":
						group = element("div", {"class": "checkbox"}, [
							s.element,
							element("label", {"for": key}, s.label)
						]);
						break;
					default:
						s.element.classList.add("form-control");
						group = [
							element("label", {"for": key}, s.label),
							s.element
						];
				}
			}

			dialog.body.appendChild(
				element("div", {"class": "form-group"}, group)
			);
		}
	}

	function createFooter(dialog) {
		var local = config.local;

		dialog.footer.appendChild(frag([
			element("button", {"class": "btn-default", event: {
				click: function () {
					config.local = local;
					close(true);
				}
			}}, "Save"),

			element("button", {"class": "btn-default", event: {
				click: function() {
					close();
				}
			}}, "Cancel"),

			element("button", {class: "btn-default", event: {
				click: function() {
					setupDialogValue(true);
				}
			}}, "Default"),

			element("label", {class: "radio"}, [
				element("input", {type: "radio", name: "working-scope", checked: !local, event: {
					change: function () {
						local = !this.checked;
					}
				}}),
				"Global setting"
			]),

			element("label", {class: "radio"}, [
				element("input", {type: "radio", name: "working-scope", checked: local, event: {
					change: function () {
						local = this.checked;
					}
				}}),
				"On " + location.hostname
			])
		]));
	}

	function exportSetting() {
		var exports = JSON.stringify(getConfigObj());
		prompt("Copy:", exports);
	}

	function importSetting() {
		var imports = prompt("Paste your setting:"), setting;
		if (!imports) {
			return;
		}
		try {
			setting = JSON.parse(imports);
		} catch (err) {
			alert("Invalid JSON!");
			return;
		}
		setupDialogValue(false, setting);
	}

	function createHead(dialog) {
		dialog.head.appendChild(frag([
			element("button", {class: "btn-sm", event: {
				click: exportSetting
			}}, "Export"),
			element("button", {class: "btn-sm", event: {
				click: importSetting
			}}, "Import")
		]));
	}

	function open() {
		if (!css) {
			css = element("style", {"id": "config-css"}, getCssString());
			document.head.appendChild(css);
		}

		if (!dialog) {
			dialog = createDialog(config.title);

			// Create head
			createHead(dialog);

			// Create inputs
			createInputs(dialog);

			// Setup values
			setupDialogValue();

			// Create footer
			createFooter(dialog);

			// Render
			dialog.render();
		}
	}

	function getConfigObj(key) {
		var con;

		if (typeof key == "string") {
			return config.settings[key].value;
		} else {
			if (typeof key == "object") {
				con = key;
			} else {
				con = {};
			}
			for (key in config.settings) {
				con[key] = config.settings[key].value;
			}
			return con;
		}
	}

	GM_config = {
		init: function(title, settings) {
			config.title = title;
			config.settings = settings;
			read();
			return GM_config.get();
		},
		open: open,
		close: close,
		get: getConfigObj
	};

	return GM_config;
}();
