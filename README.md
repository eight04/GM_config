Scroll like Opera
=================
An userscript to provide Opera(old) like scrolling behavior.

Features
--------
* Scroll horizontally when the cursor hover on horizontal scrollbar.
* Scroll horizontally if there is only one horizontal scrollbar.
* Scroll `overflow: hidden` content.

Test page
---------
<https://rawgit.com/eight04/scroll-like-opera/master/demo.html>

Todos
-----
* Better behavior when scrolling to top/bottom.
* Get wrong value if zooming the page.
* Need a better way to detect scrollbar. Current method doesn't work in Firefox's responsive design mode.
* Chrome doesn't fire wheel event when cursor hover on window scrollbar.

Changelog
---------
* 2.0.0 (Dec 24, 2014):
	- Stop detecting scrollbar anymore and don't scroll `overflow:hidden` element anymore.
* 1.0.4 (Dec 23, 2014):
	- Fix typo.
* 1.0.3 (Dec 23, 2014):
	- Fix inline element.
* 1.0.2 (Dec 23, 2014):
	- Fix menu name.
* 1.0.1 (Dec 23, 2014):
	- Correct name.
* 1.0.0 (Dec 23, 2014):
	- First release.
* 0.1.0 (Dec 19, 2014):
	- Initial version.
