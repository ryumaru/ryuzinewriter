/*	RYUZINE WRITER CONFIG FILE
	Version 1.0
	
	Load this file before editor.config.js and writer.js
*/

var RYU = RYU || {};

RYU.config = {	
	importStyles : "thisissue.css", // Default stylesheet to import
	myStyles : 1, 	// 	Ask for custom file name
	wysiwyg  : 1, 	// 	Xinha Editor Loading 0=never | 1 = auto
	zoomable : 0, 	// 	Zoom Setting for Android and iOS 5+ (strongly recommend against zooming)
	noobnags : 0, 	// 	Non-critical Confirm/Alert boxes 0 = Off | 1 = On (turn off if they annoy you)
	tabindex : 0, 	// 	Enable/Disable Tab Key (enabled = problems, but go for it if you like)
	filenew	 : 1,	//	0 = File > New = Template | 1 = File > Clear = Empty Editor
	xfileman : 1,  	// 	Enable/Disable Extended File Manager plugin (only works with PHP server!)
	// LOCALIZATION SETTINGS 	//
	language : "en",		// ISO 639-1 language code

	// THEME SETTINGS 			//
	swapThemes : 0,			// Swap themes based on device type 1 = yes | 0 = no
	// If you leave any blank the default theme will be used for that device //
	// First item is the webapp UI theme, second item is the editor skin	//
	deskTheme: "urban",		// 	Theme for Unspecified Desktop/Laptop OS
	winTheme : "writer",			// Theme for Windows Desktops
	macTheme : "writer",	// Theme for Macintosh Desktops
	nixTheme : "",					// Theme for Linux Systems 
	iOSTheme : "paperbot",	// Theme for iOS devices
	andTheme : "paperbot",			// Theme for Android Devices
	wOSTheme : "",					// Theme for webOS Devices
	bbtTheme : "",					// Theme for BlackBerry Tablet
	wp7Theme : "urban",			// Theme for Windows Phone 7.x
	w8mTheme : "urban",			// Theme for IE 10+ in "Metro/Modern" mode	
/* 	DEFAULT ADD-ONS LIST IN CONFIG BUILDER 
	Located in /addons folder for publications
	This list is ONLY used if xfileman=0 above
	and will not check to see if add-on exists.
*/
addonsList : ['depthfx','iscroll','lightbox','localize','ovr','ryulightbox','socialwidget','themeset'],
/*	DEVICE LIST FOR SIMULATOR */
deviceList : [
	["iPhone 6","phone","iOS","iphone6"],
	["iPhone 6+","phone","iOS","iphone6plus"],
	["iPhone 5/5s/5c","phone","iOS","iphone5"],
	["iPhone 4/4s","phone","iOS","iphone4"],
	["iPad Air","tablet","iOS","ipad_air"],
	["HTC One","phone","Android4","htc_one"],
	["Samsung S4","phone","TouchWiz2","samsung_s4"],
	["Samsung S5","phone","TouchWiz3","samsung_s5"],
	["Samsung GalaxyTab 3","tablet","TouchWiz2","galaxytab3"],
	["Samsung GalaxyTab 4","tablet","TouchWiz3","galaxytab4"],
	["Nokia Lumia 920","phone","WP7","lumia920"],
	["Kindle Fire HDX","tablet","FireOS","kindle"],
	["Surface 3","tablet","W8M","surface3"],
	["Surface Pro 3","tablet","W8M","surface_pro3"]
],
AddOns : [
	'iscroll',
	'epub',
//	'themeset'
]
};
// WYSIWYG Editor //
_editor_url  = "ryuzinewriter/xinha4ryuzine/" 
if(RYU.config.AddOns.indexOf('localize')!=-1){_editor_lang = RYU.config.language;}	// assumes entering a valid code  
_editor_icons = "Tango";