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
	}

	function open() {
		var key, s, btn, group, cssString;

		if (!css) {
			css = document.querySelector("#config-css");
		}
		
		if (!css) {
			cssString = ".btn-default,.form-control{font-size:inherit;font-family:inherit;line-height:inherit;margin:0;padding:0;vertical-align:middle;height:2em;color:inherit;background-color:transparent;border:none}@media \0screen{input{padding-top:.4375em}input[type=checkbox],input[type=radio]{padding-top:0}select{padding-bottom:.25em}select[multiple]{padding-bottom:0}}.btn-default{cursor:pointer;text-align:center;background-image:none}.form-group{margin-top:1em;margin-bottom:1em}.row>.form-group{margin:0}label,legend{line-height:1;display:inline-block}label+.checkbox,label+.form-control,label+.input-group,label+.radio,legend+.checkbox,legend+.form-control,legend+.input-group,legend+.radio{margin-top:.3em}.form-control{display:block;width:100%}.checkbox,.radio{position:relative}.checkbox input[type=checkbox],.checkbox input[type=radio],.radio input[type=checkbox],.radio input[type=radio]{color:inherit;position:absolute;width:auto;height:auto;top:0;bottom:0;left:0;margin:auto 0}.checkbox label,.radio label{display:inline-block;padding-left:1.5em;cursor:pointer;line-height:1.55}.form-inline .checkbox,.form-inline .form-group,.form-inline .radio,.form-inline button,.form-inline fieldset,.form-inline input,.form-inline select{display:inline-block;vertical-align:middle;width:auto;margin:0}.input-group>*>*>*{display:block}.input-group-addon{height:2em}.input-group-addon>*{vertical-align:middle;height:100%}.input-group-addon>:before{content:\"\";display:inline-block;height:100%;vertical-align:middle}.btn-block{display:block;width:100%}.btn-group{display:inline-block}.btn-close{width:1em;height:1em;vertical-align:baseline}.btn-circle{display:inline-block;width:1.25em;height:1.25em;text-align:center;line-height:1.25;font-size:80%;vertical-align:baseline;border-radius:50%}a:link,a:visited{color:#707070}a:active,a:hover{color:#0a53f8}.btn-default{border:1px solid gray;border-radius:.1875em;transition-property:border-color,box-shadow;transition-duration:.2s;transition-timing-function:linear;padding-left:.5em;padding-right:.5em;min-width:4.25em}.btn-default:hover{border-color:#ccc}.btn-default:focus{color:#3d3d3d;border-color:#0a53f8}.btn-default:active{border-color:#0a53f8;box-shadow:inset .12em .12em .5em #dedede}.btn-default[disabled]{background-color:#f0f0f0;border-color:#ccc;cursor:not-allowed}.btn-default[disabled]:active,.btn-default[disabled]:hover{border-color:#ccc}.form-control{border:1px solid gray;border-radius:.1875em;padding-left:.5em;padding-right:.5em;color:#707070;transition:.2s all linear}.form-control:hover{border-color:#ccc}.form-control:focus{border-color:#0a53f8;color:#242424}.form-control[disabled]{background-color:#f0f0f0;border-color:#ccc;cursor:not-allowed}.form-control[disabled]:active,.form-control[disabled]:hover{border-color:#ccc}.navbar-brand:link,.navbar-brand:visited{color:inherit}.navbar-brand:active,.navbar-brand:hover{color:#3d3d3d}.navbar-link:link,.navbar-link:visited{color:inherit}.navbar-link:active,.navbar-link:hover{color:#3d3d3d}.nav-list>*>:link,.nav-list>*>:visited{color:#707070}.nav-list>*>:active,.nav-list>*>:hover{color:#3d3d3d}.nav-tab>*>:link,.nav-tab>*>:visited{color:#707070}.nav-tab>*>:active,.nav-tab>*>:hover{color:#3d3d3d}.nav-tree>.active>a:active,.nav-tree>.active>a:hover,.nav-tree>.active>a:link,.nav-tree>.active>a:visited,.nav-tree>:hover>a:active,.nav-tree>:hover>a:hover,.nav-tree>:hover>a:link,.nav-tree>:hover>a:visited{color:#0a53f8}.nav-pill>*>:link,.nav-pill>*>:visited{color:#707070}.nav-pill>*>:active,.nav-pill>*>:hover{color:#3d3d3d}.config-dialog{position:fixed;top:0;left:0;right:0;bottom:0;vertical-align:middle;text-align:center;background:rgba(0,0,0,.5);overflow:auto}.config-dialog:before{content:\"\";display:inline-block;height:100%;vertical-align:middle}.config-dialog *{box-sizing:border-box}.config-dialog-content{text-align:left;display:inline-block;vertical-align:middle;background:#fff;margin:30px;padding:30px;box-shadow:0 0 30px #000}.config-dialog-head{font-weight:700;font-size:120%}.btn-default+.btn-default{margin-left:15px}";
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
						console.log(s.value);
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

	return {
		init: function(title, settings) {
			config.title = title;
			config.settings = settings;
			read();
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
}();
