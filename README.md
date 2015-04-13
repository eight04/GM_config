GM_config
=========
A library to help you set up configure in greasemonkey script.

Features
--------
* Simple API to init config.
* Can save boolean(checkbox), integer(number), and text.

Test Psage
---------
https://rawgit.com/eight04/GM_config/master/demo.html

Usage Examples
--------------
```
GM_config.init(
	"Title",
	{
		"optionName": {
			"label": "An option",
			"type": "checkbox",		// 'checkbox', 'number', 'text'
			"default": true
		},
		"option2Name": {
			"label": "Another option",
			"type": "number",
			"default": 100
		}
	}
);

GM_config.onclose = function(){
	// callback function...
};

GM_config.open();	// Open config dialog

GM_config.get();
/*
->
{
	optionName: true,
	option2Name: 100
}
*/

```

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
* It may conflict with some CSS rules in original webpage. Use iframe instead?
* Remove localStorage compatibility?
* Add ability to configure settings by domains.

Changelog
---------
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
