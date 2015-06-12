GM_config
=========
A library to help you set up configure in greasemonkey script.

This project is a rewrite of [sizzlemctwizzle/GM_config][1] and use the interface similar to [GM_config (JoeSimmons)][2].

[1]: https://github.com/sizzlemctwizzle/GM_config
[2]: https://greasyfork.org/en/scripts/1884-gm-config

Features
--------
* Simple API to init config.
* Can save boolean(checkbox), integer(number), and text.

Test Page
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
			"type": "checkbox",		// 'checkbox', 'number', 'text', 'textarea'
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

License
-------
LGPL version 3 or any later version; http://www.gnu.org/copyleft/lgpl.html

Changelog
---------
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
