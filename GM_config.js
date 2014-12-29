// ==UserScript==
// @name        GM_config (eight's version)
// @description	A library to help you set up configure in greasemonkey script.
// @namespace   eight04.blogspot.com
// @include     http*
// @version     0.2.1
// @grant       GM_setValue
// @grant		GM_getValue
// @license		MIT
// ==/UserScript==

var GM_config = function(){

	"use strict";

	var config = {
		title: null,
		settings: null
	}, dialog, css;

	function element(tag, attr, children) {
		var e, key, i;

		e = document.createElement(tag);

		if (attr) {
			for (key in attr) {
				e.setAttribute(key, attr[key]);
			}
		}

		if (children) {
			if (!Array.isArray(children)) {
				children = [children];
			}
			for (i = 0; i < children.length; i++) {
				if (typeof children[i] == "string") {
					children[i] = document.createTextNode(children[i]);
				}
				e.appendChild(children[i]);
			}
		}

		return e;
	}

	function getValue(key, type) {
		var value;

		if (typeof GM_getValue != "undefined") {
			value = GM_getValue(key);
		} else {
			value = localStorage.getItem(key);
		}
		if (value == null) {
			return null;
		}
		switch(type) {
			case "number":
				return +value;
			case "checkbox":
				return value == "true";
			default:
				return value;
		}
	}

	function setValue(key, value) {
		if (typeof GM_setValue != "undefined") {
			GM_setValue(key, value);
		} else {
			localStorage.setItem(key, value.toString());
		}
	}

	function read() {
		var key, s;
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
		for (key in config.settings) {
			s = config.settings[key];
			if (s.value == null) {
				setValue(key, s.default);
			} else {
				setValue(key, s.value);
			}
		}
	}

	function createDialog(title) {
		var dialog;

		dialog = element("div", {"class": "config-dialog"}, [
			element("div", {"class": "config-dialog-content"}, [
				element("div", {"class": "config-dialog-head"}, title),
				element("div", {"class": "config-dialog-body"}),
				element("div", {"class": "config-dialog-footer"})
			])
		]);

		return {
			element: dialog,
			body: dialog.querySelector(".config-dialog-body"),
			footer: dialog.querySelector(".config-dialog-footer")
		};
	}

	function close(saveFlag) {
		var key, s;

		if (!dialog) {
			return;
		}
		dialog.element.parentNode.removeChild(dialog.element);
		dialog = null;

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
			}
			s.element = null;
		}

		if (saveFlag) {
			save();
		}

		if (GM_config.onclose) {
			GM_config.onclose(saveFlag);
		}
	}

	function open() {
		var key, s, btn, group;

		if (!css) {
			var cssString = ".config-dialog{position:fixed;top:0;left:0;right:0;bottom:0;vertical-align:middle;text-align:center;background:rgba(0,0,0,.5);overflow:auto;z-index:99999}.config-dialog:before{content:\"\";display:inline-block;height:100%;vertical-align:middle}.config-dialog .btn-default+.btn-default{margin-left:15px}.config-dialog *,.config-dialog :after,.config-dialog :before{box-sizing:border-box}.config-dialog a{transition:all .2s linear}.config-dialog a:link,.config-dialog a:visited{color:#707070}.config-dialog a:active,.config-dialog a:hover{color:#0a53f8}.config-dialog body{font-size:16px;font-family:\"Helvetica Neue\",Helvetica,Arial,\"微軟正黑體\",sans-serif;color:#3d3d3d;padding:0;margin:0;line-height:1}.config-dialog h1,.config-dialog h2,.config-dialog h3,.config-dialog h4,.config-dialog h5,.config-dialog h6{margin-top:30px;margin-bottom:15px;font-weight:700}.config-dialog h1 small,.config-dialog h2 small,.config-dialog h3 small,.config-dialog h4 small,.config-dialog h5 small,.config-dialog h6 small{font-size:70%;color:#8a8a8a}.config-dialog h1{font-size:260%}.config-dialog h2{font-size:215%;border-bottom:1px solid gray;padding-bottom:.25em}.config-dialog h3{font-size:170%}.config-dialog h4{font-size:125%}.config-dialog h5{font-size:100%}.config-dialog h6{font-size:85%}.config-dialog p{margin-top:.9375em;margin-bottom:.9375em;line-height:1.55}.config-dialog button,.config-dialog input,.config-dialog select,.config-dialog textarea{font-size:inherit;font-family:inherit;line-height:inherit;margin:0;padding:0;vertical-align:middle;height:2em;color:inherit;background-color:transparent;border:none}.config-dialog button:focus,.config-dialog input:focus,.config-dialog select:focus,.config-dialog textarea:focus{outline:0}.config-dialog :-moz-placeholder,.config-dialog ::-moz-placeholder{opacity:1}.config-dialog :invalid{outline:0;box-shadow:none}.config-dialog textarea{height:auto;line-height:1.55;padding-top:.225em;padding-bottom:.225em}.config-dialog select{cursor:pointer;line-height:1.55}.config-dialog select[multiple]{height:auto}.config-dialog button{cursor:pointer;text-align:center;background-image:none}.config-dialog button::-moz-focus-inner{border:0;padding:0}.config-dialog img{vertical-align:text-bottom;max-width:100%;max-height:100%}.config-dialog code{font-family:Menlo,Monaco,Consolas,\"Courier New\",\"細明體\",monospace;background-color:#f0f0f0;font-size:90%;padding:.25em}.config-dialog pre{margin-top:1em;margin-bottom:1em;font-family:Menlo,Monaco,Consolas,\"Courier New\",\"細明體\",monospace}.config-dialog small{font-size:90%}.config-dialog hr{border:none;border-top:1px solid gray;margin:15px 0}.config-dialog ::selection{background-color:rgba(255,169,46,.4)}.config-dialog ::-moz-selection{background-color:rgba(255,169,46,.4)}.config-dialog fieldset,.config-dialog legend{border:0;margin:0;padding:0}.config-dialog input[type=checkbox],.config-dialog input[type=radio]{padding:0}.config-dialog .row-gap>fieldset>legend{position:relative;top:15px}.config-dialog input.ng-invalid,.config-dialog input.ng-invalid:focus,.config-dialog input.ng-invalid:hover,.config-dialog select.ng-invalid,.config-dialog select.ng-invalid:focus,.config-dialog select.ng-invalid:hover,.config-dialog textarea.ng-invalid,.config-dialog textarea.ng-invalid:focus,.config-dialog textarea.ng-invalid:hover{border-color:#cb1b1b}.config-dialog input[type=checkbox].ng-invalid,.config-dialog input[type=checkbox].ng-invalid:focus,.config-dialog input[type=checkbox].ng-invalid:hover,.config-dialog input[type=radio].ng-invalid,.config-dialog input[type=radio].ng-invalid:focus,.config-dialog input[type=radio].ng-invalid:hover{box-shadow:0 0 0 1px #cb1b1b}.config-dialog ::-webkit-input-placeholder{color:#c9c9c9}.config-dialog ::-moz-placeholder{color:#c9c9c9}.config-dialog :-ms-input-placeholder{color:#c9c9c9}.config-dialog :-moz-placeholder{color:#c9c9c9}.config-dialog .form-group{margin-top:1em;margin-bottom:1em}.config-dialog .row>.form-group{margin:0}.config-dialog label,.config-dialog legend{vertical-align:bottom}.config-dialog label+.checkbox,.config-dialog label+.form-control,.config-dialog label+.input-group,.config-dialog label+.radio,.config-dialog legend+.checkbox,.config-dialog legend+.form-control,.config-dialog legend+.input-group,.config-dialog legend+.radio{margin-top:.3em}.config-dialog .form-control{border:1px solid gray;border-radius:.1875em;width:100%;line-height:1;display:inline-block;padding-left:.5em;padding-right:.5em;color:#707070;transition:.2s all linear}.config-dialog .form-control:hover{border-color:#ccc}.config-dialog .form-control:focus{border-color:#0a53f8;color:#242424}.config-dialog .form-control[disabled]{background-color:#f0f0f0;border-color:#ccc;cursor:not-allowed}.config-dialog .form-control[disabled]:active,.config-dialog .form-control[disabled]:hover{border-color:#ccc}.config-dialog .checkbox,.config-dialog .radio{position:relative}.config-dialog .checkbox input[type=checkbox],.config-dialog .checkbox input[type=radio],.config-dialog .radio input[type=checkbox],.config-dialog .radio input[type=radio]{color:inherit;position:absolute;width:auto;height:auto;top:0;bottom:0;left:0;margin:auto 0}.config-dialog .checkbox label,.config-dialog .radio label{display:inline-block;padding-left:1.5em;cursor:pointer;line-height:1.55;transition:.2s all linear}.config-dialog .checkbox label:hover,.config-dialog .radio label:hover{color:#707070}.config-dialog .form-inline .checkbox,.config-dialog .form-inline .form-group,.config-dialog .form-inline .radio,.config-dialog .form-inline button,.config-dialog .form-inline fieldset,.config-dialog .form-inline input,.config-dialog .form-inline select{display:inline-block;vertical-align:middle;width:auto;margin:0}.config-dialog .btn-default{border:1px solid gray;border-radius:.1875em;transition-property:border-color,box-shadow;transition-duration:.2s;transition-timing-function:linear;padding-left:.5em;padding-right:.5em;min-width:4.25em}.config-dialog .btn-default:hover{border-color:#ccc}.config-dialog .btn-default:focus{color:#3d3d3d;border-color:#0a53f8}.config-dialog .btn-default:active{border-color:#0a53f8;box-shadow:inset .12em .12em .5em #dedede}.config-dialog .btn-default[disabled]{background-color:#f0f0f0;border-color:#ccc;cursor:not-allowed}.config-dialog .btn-default[disabled]:active,.config-dialog .btn-default[disabled]:hover{border-color:#ccc}.config-dialog .btn-sm{border:1px solid gray;border-radius:.1875em;transition-property:border-color,box-shadow;transition-duration:.2s;transition-timing-function:linear;width:2em;line-height:.8}.config-dialog .btn-sm:hover{border-color:#ccc}.config-dialog .btn-sm:focus{color:#3d3d3d;border-color:#0a53f8}.config-dialog .btn-sm:active{border-color:#0a53f8;box-shadow:inset .12em .12em .5em #dedede}.config-dialog .btn-sm[disabled]{background-color:#f0f0f0;border-color:#ccc;cursor:not-allowed}.config-dialog .btn-sm[disabled]:active,.config-dialog .btn-sm[disabled]:hover{border-color:#ccc}.config-dialog .btn-close{width:1em;height:1em;vertical-align:baseline;color:#707070}.config-dialog .btn-close:hover{color:inherit}.config-dialog .btn-circle{display:inline-block;width:1.25em;height:1.25em;text-align:center;line-height:1.25;font-size:80%;vertical-align:baseline;border-radius:50%;border:1px solid #707070;margin:-1px 0;color:#707070}.config-dialog .btn-circle:hover{color:inherit;border-color:inherit}.config-dialog .btn-block{display:block;width:100%}.config-dialog .btn-group{display:inline-block;border:1px solid gray;border-radius:.1875em}.config-dialog .btn-group>*{display:table-cell;vertical-align:middle;white-space:nowrap;border-width:0 1px;border-radius:0;margin-right:-1px}.config-dialog .btn-group>:first-child{margin-left:-1px}.config-dialog-content{text-align:left;display:inline-block;vertical-align:middle;background:#fff;margin:30px;padding:30px;box-shadow:0 0 30px #000}.config-dialog-head{font-weight:700;font-size:120%}";
			css = element("style", {"id": "config-css"}, cssString);
			document.head.appendChild(css);
		}

		if (!dialog) {
			dialog = createDialog(config.title);
			for (key in config.settings) {
				s = config.settings[key];

				s.element = element("input", {"id": key, "type": s.type});

				switch (s.type) {
					case "number":
						s.element.classList.add("form-control");
						s.element.value = s.value.toString();
						group = [
							element("label", {"for": key}, s.label),
							s.element
						];
						break;
					case "checkbox":
						s.element.checked = s.value;
						group = element("div", {"class": "checkbox"}, [
							s.element,
							element("label", {"for": key}, s.label)
						]);
						break;
					default:
						s.element.value = s.value;
						s.element.classList.add("form-control");
						group = [
							element("label", {"for": key}, s.label),
							s.element
						];
				}

				dialog.body.appendChild(
					element("div", {"class": "form-group"}, group)
				);
			}

			btn = element("button", {"class": "btn-default"}, "Save");
			btn.onclick = function() {
				close(true);
			};
			dialog.footer.appendChild(btn);

			btn = element("button", {"class": "btn-default"}, "Cancel");
			btn.onclick = function() {
				close();
			};
			dialog.footer.appendChild(btn);

			document.body.appendChild(dialog.element);
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
		get: function(key) {
			var con;

			if (key) {
				return config.settings[key].value;
			} else {
				con = {};
				for (key in config.settings) {
					con[key] = config.settings[key].value;
				}
				return con;
			}
		}
	};

	return GM_config;
}();
