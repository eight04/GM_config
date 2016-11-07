GM_config
=========
A library to help you set up configure in greasemonkey script.

This project is a rewrite of [sizzlemctwizzle/GM_config][1] and use the interface similar to [GM_config (JoeSimmons)][2] (the legacy interface of [sizzlemctwizzle/GM_config][1]).

[1]: https://github.com/sizzlemctwizzle/GM_config
[2]: https://greasyfork.org/en/scripts/1884-gm-config

Features
--------
* Create a dialog to show, edit settings.
* Reset settings to default.
* Save setting depends on different domains.
* Import, export settings.
	- Note: export function will only grab settings on current domain.
* Supported input type:
	- checkbox (boolean)
	- number (number)
	- text (string)
	- textarea (string)
	- radio (string)
	- select (string or array)

Demo
----

* [demo](https://rawgit.com/eight04/GM_config/master/demo/demo.html)
* [demo2](https://rawgit.com/eight04/GM_config/master/demo/demo2.html) - use `GM_init.setup()`.

API
---

### Methods

#### GM_config.init(title, configDefinition)

##### title

The title of the config dialog.

##### configDefinition

The definition is a map object look like:
```
{
	key: {
		label: "the label of the input",
		
		// input type. could be text, number, checkbox, textarea, radio, or
		// select.
		type: "text",
		
		// could be String, Number, Boolean, or Array. See following example.
		default: "default value"
	}
}
```
Example:
```
{
	text: {
		label: "Text field",
		type: "text",
		default: "a string"
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
	multipleSelect: {
		label: "Multiple select",
		type: "select",
		default: ["n1", "n3"],
		options: {
			n1: "1",
			n2: "2",
			n3: "3"
		},
		multiple: true
	}
}
```

#### GM_config.open()

Open config dialog.

#### GM_config.get([key])

If `key` is not setted, return a key-value map of the config.  
If `key` is a string, return the config value of the key.  
If `key` is an object, copy all properties from the config to the object.

#### GM_config.setup(configDefinition, saveCallback)

This is a helper function to do a simple setup.
```
function setup(options, saveCallback) {
	GM_config.init(GM_info.script.name, options);
	GM_config.onload = loadCallback;
	GM_registerMenuCommand(GM_info.script.name + " - Configure", GM_config.open);
	saveCallback();
}
```
* Note that saveCallback will be called once during the setup.

### Properties

#### GM_config.onclose = function(saveFlag)

Called when the dialog is closed.

##### saveFlag

`true` if the user pressed "Save" button.

#### GM_config.onload = function

Called when the config is saved.

Build
-----
Using NodeJS, Bower, Grunt:
```
npm install
bower install
grunt
```

Todos
-----
* Create dialog with htmlString?
* Add `white-space: nowrap` to dialog footer.
* Refactor
	- Pull out createInput from createInputs.
	- Pull out grabDialogSetting from close.

License
-------
LGPL version 3 or any later version; http://www.gnu.org/copyleft/lgpl.html

Changelog
---------
* 2.1.0 (Aug 7, 2015)
	- Support radio.
	- Support select.
	- Update end2end.
* 2.0.4 (Jul 3, 2015)
	- Fix dialog container style.
* 2.0.3 (Jun 18, 2015)
	- Fix dialog footer style.
* 2.0.2 (Jun 18, 2015)
	- Add license header to source.
* 2.0.1 (Jun 18, 2015)
	- Update meta data.
* 2.0.0 (Jun 18, 2015)
	- Change folder structure.
* 1.3.0 (Jun 18, 2015)
	- Add import, export feature.
	- Add local setting feature.
	- Fix the flickering of opening, closing dialog.
* 1.2.0 (Jun 15, 2015)
	- Add transition animation.
* 1.1.1 (Jun 15, 2015)
	- Drop `document.open, document.close`.
* 1.1.0 (Jun 15, 2015)
	- Use iframe.
	- Remove localStorage fallback.
* 1.0.0 (Jun 13, 2015)
	- Fix license issue.
* 0.3.1 (Apr 16, 2015)
	- Now you can pass a reference object to `GM_config.get()`.
* 0.3.0 (Apr 13, 2015)
	- Support textarea.
* 0.2.2 (Dec 29, 2014)
	- Fix bugs in setValue.
* 0.2.1 (Dec 29, 2014)
	- Add z-index to config-dialog.
* 0.2.0 (Dec 29, 2014)
	- Return config object after init.
* 0.1.0 (Dec 29, 2014)
	- First release.
