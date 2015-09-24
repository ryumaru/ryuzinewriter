/*
RYUZINE WRITER
Version: 1.0
Author: K.M. Hansen
Author URI: http://www.kmhcreative.com
License: MPL 2.0
License URI: https://www.mozilla.org/MPL/2.0/
Copyright: 2011-2015 K.M. Hansen & Ryu Maru (software@ryumaru.com)
Program URI: http://www.ryumaru.com/ryuzine

DESCRIPTION: Ryuzine(tm) aka "Ryuzine Reader," turns a properly formatted HTML document
into a page-flipping digital magazine-stye webapp. The "Ryuzine" and "Ryu Maru" logos are 
trademarks of Ryu Maru.  App icon designs copyright 2015 K.M. Hansen.

NOTES: Load editor.config.js and writer.config.js files before this file.
Ryuzine Writer uses a customized version of Xinha HTML Editor, which is available under
the htmlArea license (based on BSD license).
*/

DEBUG = true;	// set to true for console.log output
var	RYU = RYU || {};
RYU = function() {
	// Default Values //
	var _lc = function(string) {string.toString();return string;};	// RYU._lc() like php echo
	var version = "1.0";
	var addonsscroll = null;	var optscroll = null;		var aboutscroll = null;
	var sheetscroll = null;	var galleryscroll = null;	var scrollHolder;				
	var css3d = 0;			var config = undefined;		var p_toggle = 0;			
	var W = null;			var H = null;				var inputMethod = "mousedown";
	var zoomed = 0;			var defaultTheme = "";		var p=0;
	var x=1;				var z=0;					var events=0;
	var prevW=0;			var prevH=0;				var aCheck=null;
	var ctog = 1;			var buildwait = 2000;		var exists = false;
	var hidecontrols = null;var slidecontrols = null;	var upboxtimer = null;
	var paneltimer = null;	var toolcheck = null;		var toolcactch = null;
	var splashoff = null; 	var splashout = null;		var splashload = null;
	var handle = null;		var adtrigger = null;		var splashcatch = null;
	// Simulator Variables
	var extsrc = 0 // Simulator External Source (1 = true)
	var r = 0;	   // Default Roatation (0 = landscape)
	var u = 0;
	var t = "phone";
	var d = 0;	   // Default Device
	var dView = 0; // App View
	var dSim = 1;  // Device Simulation
	var devH = 0;
	var devW = 0;
	var customProfile = "phone"; // default custom profile
	var customOS = "iOS";		 // default device OS profile
	var customOSadds = [];		 // array of custom OS profiles
	var customDevices = [];
	var uEv = 0; // Unique Element Buttons: 0 = hide | 1 = show
	var autoAdjust = 1;
	// Output Options Variables
	var opt_cache = 1;
	var opt_lang = "en";
	var opt_local = 0;
	var opt_IE = 0;
	var opt_round = 0;
	var opt_config = "ryuzine.config.js";
	var opt_themename = "";
	var opt_edition = "thisissue.css";
	var opt_css = "";
	var opt_js = "";
	var opt_touchsim = 0;
	var opt_loadwhen = 0;
	var opt_iscroll = 0;
	var opt_inpage = 0;
	// Writer UI Elements
	var mySource = {};
	var mySourceFrame = {};
	var myOutput = {};
	var myCSS = {};
	var myDevice = {};
	var myWindow = {};
	var myScreen = {};
	var myStatus = {};
	var myNavBar = {};
	var myTabBar = {};
	var myTabStat = {};
	var devSelect = {};
	var alertCSS = {};
	var hide_dialogs = [];
	var selected_addons = [];
	var addons_info = {}; 	// place to store addon info data	
	// Document Properties Variables
	var doc_title 	= "";	// "title" tag
	var doc_author	= "";	// meta="author"
	var doc_applogo	= "";	// app logo URL
	var doc_summary = "";	// meta="description" (155 char limit)
	var doc_keywords= "";	// meta="keywords"
	var doc_version = "";	// meta generator tag
	var doc_social_src = 0;
	var doc_social 	= "";
	var doc_link	= "";
	var doc_welcome = "";
	var doc_banner	= "";
	var doc_boxad	= "";
	var doc_splash	= "";
	var doc_goodbye	= "";
	var doc_copyright="";
	var doc_converted = 0; // assume document has not been converted
var bmarkData = [];
function initBmarkData() {
	// Used in Config Generator //
		bmarkData = [[],[]];
		bmarkData[0][0] = "Ryuzine User Forums";
		bmarkData[0][1] = "http://www.ryumaru.com/forum/";
		
		bmarkData[1][0] = "Ryu Maru Website";
		bmarkData[1][1] = "http://www.ryumaru.com";
}
initBmarkData();
var cat_masthead = "";
var rackData = [];
function initRackData() {
		rackData = [[]];
		rackData[0][0] = "Catalog 1";
		rackData[0][1] = "catalog1.htm";
}
var current_catalog = "";	// filename of catalog loaded in RackBuilder
initRackData();
var mediaType = [];
function initMediaTypes() {		
		mediaType = [];  // Media Type = Button
		mediaType.length = 5;
		for (var m=0; m < mediaType.length; m++) {
			mediaType[m] = [];
		}
		mediaType[0][0] = "Ryuzine";
		mediaType[0][1] = "Read Now";
		
		mediaType[1][0] = "Download";
		mediaType[1][1] = "Download"; 
		
		mediaType[2][0] = "PDF";
		mediaType[2][1] = "Download";
		
		mediaType[3][0] = "Print";
		mediaType[3][1] = "$ Buy Now";
		
		mediaType[4][0] = "Website";
		mediaType[4][1] = "View Site";
}
initMediaTypes();
var rackCategory = [];
function initRackCategories() {
		rackCategory = [[],[],[],[],[],[],[]];
		// second entry is not used, just there so it can use same function //
		rackCategory[0][0] = "Comic";
		rackCategory[0][1] = "";
		
		rackCategory[1][0] = "Magazine";
		rackCategory[1][1] = "";
		
		rackCategory[2][0] = "Book";
		rackCategory[2][1] = ""; 
		
		rackCategory[3][0] = "Website";
		rackCategory[3][1] = "";
		
		rackCategory[4][0] = "Newsletter";
		rackCategory[4][1] = "";
		
		rackCategory[5][0] = "Fanzine";
		rackCategory[5][1] = "";
		
		rackCategory[6][0] = "Manga";
		rackCategory[6][1] = "";
}	
initRackCategories();	
var rackBuilder = [];
		initRack();

if (!window.console) window.console = {};
if (!window.console.log || DEBUG == false) window.console.log = function () {};
				
// IE Complains if these are not defined outside of a function
	var cssdisabled = false;var cssTransitionsSupported = false;
	var cssTransform=getsupportedprop(['transform', 'MozTransform', 'WebkitTransform', 'msTransform', 'OTransform']);
	var cssTransitionDelay=getsupportedprop(['transitionDelay', 'MozTransitionDelay', 'WebkitTransitionDelay', 
	'msTransitionDelay','OTransitionDelay']);
	var cssTransitionDuration=getsupportedprop(['transitionDuration','MozTransitionDuration','WebkitTransitionDuration','msTransitionDuration','OTransitionDuration']);
	var css3borderRadius=getsupportedprop(['borderRadius','MozBorderRadius','WebkitBorderRadius']);
	var css3dCapable = getsupportedprop(['perspective','MozPerspective','WebkitPerspective','msPerspective','OPerspective']);
	var nativeScroll = getsupportedprop(['overflowScrolling','WebkitOverflowScrolling']);	

// Get Environment Variables store in device object  //
// Desktop OS does not really matter as much as the  //
// browser version, so using browser as OS is okay.  //
var device = {};
 if (navigator.userAgent.match(/Android/i)) {
	var ver = navigator.userAgent.match(/Android ./i);
	ver = ver[0].split(" ");
	ver = parseFloat(ver[1]);
	device.OS = "Android";
	device.Platform = "Android";
	device.v = ver;
} else if ( navigator.userAgent.match(/Chrome/i) ) {
		device.Platform = "Chrome"; // Check first since UA string contains Safari
		var fullVersion  = ''+parseFloat(navigator.appVersion); 
		var majorVersion = parseInt(navigator.appVersion,7);
		var verOffset = navigator.userAgent.indexOf("Chrome");
		fullVersion = navigator.userAgent.substring(verOffset+7);
		device.v = parseInt(''+fullVersion,10);
} else if (navigator.userAgent.match(/wOSBrowser/i) || navigator.userAgent.match(/webOS/i)) {
	device.Platform = "webOS"; // check first since UA string contains Safari
} else if (navigator.userAgent.match(/RIM/i) || navigator.userAgent.match(/PlayBook/i) || navigator.userAgent.match(/BlackBerry/i)) {
	device.Platform = "BBOS";	// check first since UA string contains Safari
} else if (navigator.userAgent.match(/Safari/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/iPad/i) ) {
	if (navigator.userAgent.match(/iOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/iPad/i) ) {
		device.OS = "iOS";
		device.Platform = "iOS";
		var fullVersion = navigator.appVersion;
		fullVersion = fullVersion.split("OS ");
		var majorVersion = parseInt(fullVersion[1]);
		if (majorVersion > 7) { // iOS 8.x userAgent string reports as v 10
			if (navigator.appVersion.match(/Version/gi)) {	// browser view
				fullVersion  = navigator.appVersion.split("Version/");
				majorVersion = parseInt(fullVersion[1]);	// point value is not accurate anyway
			} else {	// appView so no version value!
				majorVersion = 8;	// we will just have to assume it is at least v 8.0	
			}
		}
		device.v = majorVersion; // This is OS major version, not browser version
		if (!navigator.userAgent.match(/Safari/)) { // App View
			device.app = 1;
		} else { // Browser View, get actual browser version
			var fullVersion = navigator.appVersion;
			fullVersion = fullVersion.split("/");
			var majorVersion = parseInt(fullVersion[2]);
			device.subv = majorVersion;
		}
	} else {
		device.Platform = "Safari";
		var fullVersion  = ''+parseFloat(navigator.appVersion); 
		var majorVersion = parseInt(navigator.appVersion,7);
		var verOffset = navigator.userAgent.indexOf("Safari");
		fullVersion = navigator.userAgent.substring(verOffset-6);
		device.v = parseInt(''+fullVersion,10);
	}
} else if (navigator.userAgent.match(/MSIE/i)){
	if (navigator.userAgent.match(/IEMobile/i)) {
		device.OS = "Windows Phone";
		device.Platform = "WP7";
		iScroll = undefined; // iScroll does not work with Windows Phone
	} else {
		device.Platform = "IE";
	}
	if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)){ //test for MSIE x.x;
		device.v = new Number(RegExp.$1) // capture x.x portion and store as a number
	}
	if (device.v < 9 || device.v == 10) { 
		iScroll = undefined; // Legacy IE cannot use this anyway
		if (device.v >= 10) { // Try to figure out if it is in "Metro" mode
			device.metro = function() {
				var metro = 0;
				try { metro = !!new ActiveXObject("htmlfile"); // Might be desktop mode with plugins disabled
				} catch (e) {
					metro = 0;
				}
				if (metro != 0) {
					if(window.innerWidth == screen.width && window.innerHeight == screen.height) {
						metro = 1; // It is probably in Metro mode, but may still be desktop in fullscreen mode
					} else {
						metro = 0;
					}
				}
				return metro;
			}
		}
	}
} else if (navigator.userAgent.match(/Firefox/i)) {
	device.Platform = "Firefox" // Desktop Firefox
} else if (navigator.userAgent.match(/Fennec/i)) {
	device.Platform = "FFM"; // FireFox Mobile
} else if ( navigator.userAgent.match(/Opera/i) || window.opera ) {
		device.Platform = "Opera";
        var fullVersion = window.opera.version();
		device.v = parseInt(''+fullVersion,10);
		var subVersion = fullVersion.split('.');
		device.subv = subVersion[1];
} else {
	device.Platform = "Desktop";
}
if (navigator.userAgent.match(/Windows/i)) { device.OS = "Windows";}
	else if (navigator.userAgent.match(/Macintosh/i)) { device.OS = "Mac";}
	else if (navigator.userAgent.match(/Linux/i)) { device.OS = "Linux";}
	else {};
	// check if browser is accepting cookies //
	storeMasterCookie();
	storeIntelligentCookie('test','cookie value');
// 		CONFIG FILE VARIABLES 	//
	if (typeof RYU.config != "undefined") {
		var config = RYU.config;
	} else {
		console.log('Error: Configuration file not found!');
	}
// 		CONFIG FILE VARIABLES 	//
	if (config != undefined) {
		config.zoompan = config.zoomable;
			var maxzoom = config.maxzoom;
		var AddOns = config.AddOns;
	// Writer-specific variables (make backwards compatible to old config files)
		config.importStyles;
		config.rzw_styles 	= config.myStyles;
		config.rzw_wysiwyg 	= config.wysiwyg;
		config.rzw_noobnags = config.noobnags;
		config.rzw_tabindex = config.tabindex;
		config.rzw_filenew	= config.filenew;
		var xfileman = config.xfileman;
		if (!Get_Cookie("deviceList")) {
			// just use config.deviceList
		} else {
			customDevices = JSON.parse(Get_Cookie("deviceList"));
			console.log('Get_Cookie = '+customDevices);
		}
		for (var cd=0; cd < customDevices.length; cd++) {
			config.deviceList.push(customDevices[cd]);
		}
		config.addonsList = config.addonsList;
		// Set-Up Guided Help
		var helpcards = 42;
		var card = []
		for (var c=0; c < helpcards; c++) {
			card[c] = [];
		}
		card[0][0] = "Guided Tour<br/><br/>Navigate with button on bubble or Play All above.";
		card[0][1] = "RYU.helpPlay(0);"
		card[0][2] = "RYU.guidedHelp(1);RYU.slideSpace(0);";
		
		card[1][0] = "The START Screen has shortcuts to common tasks.";
		card[1][1] = "RYU.guidedHelp(0);";
		card[1][2] = "RYU.guidedHelp(2);RYU.slideSpace(1);";
		
		card[2][0] = "The EDITOR is where you create and update your Ryuzine publications.";
		card[2][1] = "RYU.guidedHelp(1);RYU.slideSpace(0);";
		card[2][2] = "RYU.guidedHelp(3);";
		
		card[3][0] = "FILE<br/>Start fresh, from a template or open &amp; edit a file";
		card[3][1] = "RYU.guidedHelp(2);";
		card[3][2] = "RYU.guidedHelp(4);RYU.toggleDialog('add-template');";
		
		card[4][0] = "TEMPLATE<br/>Enter info &amp; select elements to include in your magazine.";
		card[4][1] = "RYU.guidedHelp(3);RYU.toggleDialog('add-template',0);";
		card[4][2] = "RYU.guidedHelp(5);RYU.toggleDialog('add-template',0);RYU.toggleDialog('loadpage',1);";
		
		card[5][0] = "OPEN FILE<br/>to import and edit existing files.";
		card[5][1] = "RYU.guidedHelp(4);RYU.toggleDialog('loadpage',0);RYU.toggleDialog('add-template',1);";
		card[5][2] = "RYU.guidedHelp(6);RYU.toggleDialog('loadpage',0);if(document.getElementById('chooser').value=='wip_newsample.htm'){RYU.selectFile(0);}";
		
		card[6][0] = "Use the Editor Window to add or modify the content.";
		card[6][1] = "RYU.guidedHelp(5);RYU.toggleDialog('loadpage',1);";
		card[6][2] = "RYU.guidedHelp(7);RYU.uniqueElements();";
		
		card[7][0] = "ELEMENTS<br/>Inserts Ryuzine specific elements in Editor.";
		card[7][1] = "RYU.guidedHelp(6);";
		card[7][2] = "RYU.guidedHelp(8);RYU.splitView(1);";
		
		card[8][0] = "SPLIT VIEW<br/>Directly edit code and preview changes at the same time.";
		card[8][1] = "RYU.guidedHelp(7);RYU.splitView();";
		card[8][2] = "RYU.guidedHelp(9);RYU.splitView();";
		
		card[9][0] = "OPTIONS<br/>Customize the output format of your magazine.";
		card[9][1] = "RYU.guidedHelp(8);RYU.splitView(1);";
		card[9][2] = "RYU.guidedHelp(10);RYU.toggleDialog('output-options',1);";
		
		card[10][0] = "OPTIONS<br/>Easily set up which features your publication will support.";
		card[10][1] = "RYU.guidedHelp(9);RYU.toggleDialog('output-options',0);";
		card[10][2] = "RYU.guidedHelp(11);RYU.outputOptions();RYU.toggleDialog('output-options',0);";
		
		card[11][0] = "BUILD!<br/>Processes your Editor content into Ryuzine format.";
		card[11][1] = "RYU.guidedHelp(10);RYU.toggleDialog('output-options',1);";
		card[11][2] = "RYU.guidedHelp(12);RYU.clearSimulator();RYU.refreshSrc();RYU.slideSpace(2);RYU.reWrite();";
		
		card[12][0] = "OUTPUT<br/>Ryuzine code is generated automatically.";
		card[12][1] = "RYU.guidedHelp(11);RYU.slideSpace(1);";
		card[12][2] = "RYU.guidedHelp(13);";
		
		card[13][0] = "HTML</br>Export box has the Ryuzine webapp code in it.";
		card[13][1] = "RYU.guidedHelp(12);";
		card[13][2] = "RYU.guidedHelp(14);";
		
		card[14][0] = "SAVE!<br/>Individual component files or Packaged Publications.";
		card[14][1] = "RYU.guidedHelp(13);";
		card[14][2] = "RYU.guidedHelp(15);RYU.toggleDialog('package-options',1);";
		
		card[15][0] = "PACKAGE<br/>Choose small, standard, or custom packages to ZIP";
		card[15][1] = "RYU.guidedHelp(14);RYU.toggleDialog('package-options',0);"
		card[15][2] = "RYU.guidedHelp(16);RYU.toggleDialog('package-options',0);RYU.slideSpace(3);";
		
		card[16][0] = "SIMULATOR<br/>Preview your Ryuzine as various devices will show it.";
		card[16][1] = "RYU.guidedHelp(15);RYU.toggleDialog('package-options',1);RYU.slideSpace(2);";
		card[16][2] = "RYU.guidedHelp(17);";
		
		card[17][0] = "DEVICE LIST<br/>Choose from many simulated device profiles.";
		card[17][1] = "RYU.guidedHelp(16);";
		card[17][2] = "RYU.guidedHelp(18);";
		
		card[18][0] = "ADD DEVICES<br/>Create custom profiles for other simulated devices.";
		card[18][1] = "RYU.guidedHelp(17);";
		card[18][2] = "RYU.guidedHelp(19);RYU.toggleDialog('customize',1);";
		
		card[19][0] = "Enter device profile data and submit. Profiles are stored for future sessions.";
		card[19][1] = "RYU.guidedHelp(18);RYU.toggleDialog('customize',0);";
		card[19][2] = "RYU.guidedHelp(20);RYU.toggleDialog('customize',0);RYU.rotateDevice();";
		
		card[20][0] = "ROTATE<br/>Switch devices between portrait and landscape orientations.";
		card[20][1] = "RYU.guidedHelp(19);RYU.toggleDialog('customize',1);RYU.rotateDevice();";
		card[20][2] = "RYU.guidedHelp(21);RYU.rotateDevice();";
		
		card[21][0] = "VIEWS<br/>Change simulator from browser mode, app view, and more.";
		card[21][1] = "RYU.guidedHelp(20);RYU.rotateDevice();";
		card[21][2] = "RYU.guidedHelp(22);";
		
		card[22][0] = "ZOOM<br/>Shrink, Magnify, and Fit Simulator to your screen.";
		card[22][1] = "RYU.guidedHelp(21);";
		card[22][2] = "RYU.guidedHelp(23);RYU.slideSpace(4);";
		
		card[23][0] = "CONFIGURE!<br/>Easily create custom issue configuration files.";
		card[23][1] = "RYU.guidedHelp(22);RYU.slideSpace(3);";
		card[23][2] = "RYU.guidedHelp(24);";
		
		card[24][0] = "Select the Configuration Settings you want to use for your publication.";
		card[24][1] = "RYU.guidedHelp(23);RYU.swapAppTab('configuration','configuration_tab0','configuration_section0');";
		card[24][2] = "RYU.guidedHelp(25);RYU.swapAppTab('configuration','configuration_tab1','configuration_section1');";
		
		card[25][0] = "TABS move from one configuration section to another.";
		card[25][1] = "RYU.guidedHelp(24);RYU.swapAppTab('configuration','configuration_tab0','configuration_section0');";
		card[25][2] = "RYU.guidedHelp(26);";
		
		card[26][0] = "BUILD<br/>Instantly writes your custom configuration for you.";
		card[26][1] = "RYU.guidedHelp(25);";
		card[26][2] = "RYU.guidedHelp(27);RYU.buildConfigFile();";
		
		card[27][0] = "EXPORT<br/>Configuration file code appears in export box.";
		card[27][1] = "RYU.guidedHelp(26);RYU.slideSpace(4);";
		card[27][2] = "RYU.guidedHelp(28);";
		
		card[28][0] = "RYUZINE RACK<br/>Data Catalog files are easy to build and edit.";
		card[28][1] = "RYU.guidedHelp(27);";
		card[28][2] = "RYU.guidedHelp(29);RYU.slideSpace(5);";

		card[29][0] = "EDIT DATA<br/>Using Data Builder is similar to editing a spreadsheet.";
		card[29][1] = "RYU.guidedHelp(28);RYU.slideSpace(2);";
		card[29][2] = "RYU.guidedHelp(30);";

		card[30][0] = "LOAD<br/>Existing Data Catalogs";
		card[30][1] = "RYU.guidedHelp(29);";
		card[30][2] = "RYU.guidedHelp(31);RYU.toggleDialog('loadrack',1);";

		card[31][0] = "CATALOGS are HTML files with simple tables in them.";
		card[31][1] = "RYU.guidedHelp(30);RYU.slideSpace(2);RYU.toggleDialog('loadrack',0);";
		card[31][2] = "RYU.guidedHelp(32);RYU.addRackData();RYU.toggleDialog('loadrack',0);";

		card[32][0] = "ADD ITEMS<br/>Appends a new row to the end of the Data Catalog.";
		card[32][1] = "RYU.guidedHelp(31);RYU.toggleDialog('loadrack',1);";
		card[32][2] = "RYU.guidedHelp(33);";
		
		card[33][0] = "DELETE ROW<br/>Tap the X at the end of any row to delete the row.";
		card[33][1] = "RYU.guidedHelp(32);RYU.addRackData();"
		card[33][2] = "RYU.guidedHelp(34);";
		
		card[34][0] = "Media Type &amp; Category lists can also be customized for each catalog.";
		card[34][1] = "RYU.guidedHelp(33);";
		card[34][2] = "RYU.guidedHelp(35);RYU.toggleDialog('edittypes',1);";

		card[35][0] = "These lists are synchronized with the Configuration Builder.";
		card[35][1] = "RYU.guidedHelp(34);RYU.toggleDialog('edittypes',0);";
		card[35][2] = "RYU.guidedHelp(36);RYU.toggleDialog('edittypes',0);";
		
		card[36][0] = "BUILD<br/>Catalogs are built automatically with just a click!";
		card[36][1] = "RYU.guidedHelp(35);RYU.toggleDialog('edittypes',1);";
		card[36][2] = "RYU.guidedHelp(37);RYU.getRackData(1);";
		
		card[37][0] = "EXPORT<br/>Data Catalog code prints out to the Export box.";
		card[37][1] = "RYU.guidedHelp(36);RYU.slideSpace(5);";
		card[37][2] = "RYU.guidedHelp(38);";
		
		card[38][0] = "OPTIONS<br/>Shows additional settings.";
		card[38][1] = "RYU.guidedHelp(37);";
		card[38][2] = "RYU.guidedHelp(39);RYU.togglePanel('opt_panel');";
		
		card[39][0] = "OPTIONS<br/>Let you set preferences for how Ryuzine Writer works for you.";
		card[39][1] = "RYU.guidedHelp(38);RYU.togglePanel('opt_panel');";
		card[39][2] = "RYU.guidedHelp(40);RYU.togglePanel('addons_panel');";
		
		card[40][0] = "ADD-ONS<br/>Optional and third-party add-ons with workspaces can be accessed here.";
		card[40][1] = "RYU.guidedHelp(39);RYU.togglePanel('addons_panel');";
		card[40][2] = "RYU.guidedHelp(41);RYU.togglePanel('all');";
		
		card[41][0] = "THANK YOU!<br/>for trying Ryuzine Writer!<br/><br/>Full Manual Available Online.";
		card[41][1] = "RYU.guidedHelp(40);";
		card[41][2] = "RYU.helpPlay(0);RYU.slideSpace(0);";
		var swapThemes = config.swapThemes;
			var deskTheme = config.deskTheme;
			var winTheme = config.winTheme;
			var macTheme = config.macTheme;
			var nixTheme = config.nixTheme;
			var iOSTheme = config.iOSTheme;
			var andTheme = config.andTheme;
			var bbtTheme = config.bbtTheme;
			var wp7Theme = config.wp7Theme;
			var wp8Theme = config.wp8Theme;
	} else {
		alert(''+RYU._lc('Error: configuration file missing!')+'');
	}
	if (xfileman==1) {
		// assume if this is turned on we are running from a server with PHP,
		// set vars to be consistent with Ryuzine Press, except here we are not
		// actually getting the URL via PHP we're getting it with javascript;
		var php = { baseurl : location.href.substring(0, location.href.lastIndexOf("/")) };
		RYU.php = php;
	}
	// for Writer we need baseurl regardless of PHP availability
	var baseurl = location.href.substring(0, location.href.lastIndexOf("/"))+'/';	// req. trailing slash
	// 	If user set a preference prefer that over config file //
	
		if (!Get_Cookie("rzw_animate")) {
			config.animate = 1;
		} else {
			config.animate = Get_Cookie("rzw_animate");
		}
			// Old Safari and Opera cannot handle animations but thinks it can //
			if ( ((device.Platform == "Safari" || device.Platform == "iOS") && device.v < 4) || (device.Platform == "Opera" && device.v < 15) ) {
				config.animate=0;
			}	
		
		if (!Get_Cookie("rzw_nscroll")) {
			if ( (device.Platform=="iOS" && nativeScroll != undefined) || (device.Platform=="Android" && device.v > 2) ) {
				config.nscroll = 1;
			} else {
				config.nscroll = 0;
			}	
		} else {
			config.nscroll=Get_Cookie("rzw_nscroll");
		}

		if (!Get_Cookie("rzw_zoompan")) {
			// Use config file settings
		} else {
			config.zoompan=Get_Cookie("rzw_zoompan");
			if (config.zoompan == 0) {
				config.nscroll = 0;
			}
		}
		// over-ride for Android or some touch targets won't fire
		if (device.Platform=="Android") {
			config.zoompan = 1;
		}
	// Writer-specific Cookies	
		if (!Get_Cookie("rzw_myStyles")) {
			// Use Config File Setting // 
		} else { 
			config.rzw_styles = Get_Cookie("rzw_myStyles")*1; 
		}

		if (!Get_Cookie("rzw_wysiwyg")) {
			// Use Config File Setting // 
		} else { 
			config.rzw_wysiwyg = Get_Cookie("rzw_wysiwyg")*1; 
		}

		if (!Get_Cookie("rzw_zoomable")) {
			// Use Config File Setting // 
		} else { 
			config.zoompan = Get_Cookie("rzm_zoomable")*1; 
		}

		if (!Get_Cookie("rzw_noobnags")) {
			// Use Config File Setting // 
		} else { 
			config.rzw_noobnags = Get_Cookie("rzw_noobnags")*1; 
		}

		if (!Get_Cookie("rzw_hide_dialogs")) {
			// Empty Array 
		} else { 
			hide_dialogs = [Get_Cookie("rzw_hide_dialogs")]; 
		}

		if (!Get_Cookie("rzw_tabindex")) {
			// Use Config File Setting // 
		} else { 
			config.rzw_tabindex = Get_Cookie("rzw_tabindex")*1; 
		}

var metacontent="";
function zoomSet() {
	if ( ('ontouchstart' in document.documentElement) || device.Platform == "WP7" || device.Platform == "FFM" ) {
		if (config.zoompan == 1) {
			metacontent = "initial-scale=1.0,minimum-scale=1.0,maximum-scale=10,user-scalable=yes";
		} else {
			metacontent = "initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no";
		}
	} else {
		metacontent = "width=device-width,height=device-height";
	}
	if (!document.getElementById('zooming')) {} else {
		document.getElementById('zooming').content=metacontent;
	}
}
zoomSet();

//********** ADDONS FUNCTIONS **************//
var addon = {};
addon.register = function(obj) {
	// Error catch a missing name
	if (!obj.name) {
		console.log('ADDON.REGISTER: .name object is missing!  No idea what addon this is, bailing and loading next one...');
		loadAddOns(addon_loaded+1);
		return;
	}
	if (obj.name=='register') {
		console.log('ADDON.REGISTER ERROR: "register" is a reserved addon object.  No Add-On can use that name.');
		return;
	}
	// addon[key] should exist, assume it doesn't and check anyway
	var exists = 0;
	for (var a=0; a < Object.keys(addon).length; a++) {
		if (Object.keys(addon)[a]==obj.name) { 
			console.log('ADDON.REGISTER: addon key exists!');
			exists = 1;}
	}
	if (exists==0) {
		console.log('ADDON.REGISTER: addon key does NOT exist, making it now...');
		addon[''+obj.name+''] = {};	// add empty object
	}
	// now get the index of the addon from main config
	var index = 0;
	for (var a=0; a < AddOns.length; a++) {
		if (obj.name == AddOns[a]) { obj.index = a; index = a; }
	}
	console.log('ADDON.REGISTER: addon.index = '+obj.index);
	// copy all passed object keys to addon object
	for (var k=0; k < Object.keys(obj).length; k++) {	// get all keys to that object and key values
		addon[''+obj.name+''][''+Object.keys(obj)[k]+'']=obj[''+Object.keys(obj)[k]+''];
		console.log('ADDON.REGISTER: object '+k+': '+addon[''+obj.name+''][''+Object.keys(obj)[k]+'']);
	}
	// switch from passed object to addon object
	obj = addon[''+obj.name+''];
	console.log('ADDON.REGISTER: obj = '+obj);
	// passed object is gone, now working with actual addon object
	if (!obj.info) {
		 obj.info = {
			name 	: ""+obj.name+"",
			version	: "0",
			author	: "Unknown",
			url		: "",
			license	: "Unknown",
			about	: "There is no description for this add-on."
		}
	};
		if (obj.requires) {
			for (var r=0; r < obj.requires.length; r++) {
				var check = obj.requires[r].split('?');
				var found = 0;
				// check if requires current webapp
				if ( (check[0]=='ryuzinereader' && document.getElementById('ryuzinereader')) || 
					 (check[0]=='ryuzinerack'	&& document.getElementById('ryuzinerack'))	 ||
				     (check[0]=='ryuzinerack' 	&& document.getElementById('ryuzinerack')) 	 || 
				     (check[0]=='ryuzinewriter' && document.getElementById('ryuzinewriter')) ) {
					found = 1;
					if (check[1]!=null && parseFloat(version) < parseFloat(check[1])) {
						found = 0;
					}
				// check if excludes current webapp
				} else if ( (check[0]=='!ryuzinereader' && document.getElementById('ryuzinereader')) ||
							(check[0]=='!ryuzinepress'	&& document.getElementById('ryuzinepress'))	 ||
							(check[0]=='!ryuzinerack'	&& document.getElementById('ryuzinerack')  ) ||
							(check[0]=='!ryuzinewriter' && document.getElementById('ryuzinewriter')) ) {
					found = 2;
				// check if conflicts with another add-on
				} else if ( check[0].match(/!/gi) ) {
					found = 1;	// assume this add-on can load
					check[0] = check[0].split('!')[1];
					for (var k=0; k < Object.keys(addon).length; k++) {
						if (check[0]==Object.keys(addon)[k].toString()) {
							found = 3;		// conflicting add-on found!
							if (check[1]!=null && parseFloat(addon[''+Object.keys(addon)[k]+''].info.version) < parseFloat(check[1])) {
								found = 1;	// specific version NOT found, good to load
							}
						}
					}
				} else {
					for (var k=0; k < Object.keys(addon).length; k++) {
						if (check[0]==Object.keys(addon)[k].toString()) {
							found = 1;
							if (check[1]!=null && parseFloat(addon[''+Object.keys(addon)[k]+''].info.version) < parseFloat(check[1])) {
								found = 0;
							}
						}
					}
				}
				if (found!=1) {
					if (found == 0) {
						console.log('*** ADDON.REQUIRES ERROR: Add-on "'+obj.name+'" depends on Add-On "'+obj.requires[r]+'", which could not be found.  Check main config file, adjust load order if necessary, verify compatible version is loading.');
					}
					if (found == 2) {
						console.log('*** ADDON.REQUIRES: Add-on "'+obj.name+'" does not support this Ryuzine web-app');
					}
					if (found == 3) {
						console.log('*** ADDON.REQUIRES ERROR: Add-on "'+check[0]+'", which has already loaded, conflicts with Add-On "'+obj.name+'"');
					}
					for (var k=Object.keys(obj).length-1; k > -1; k--) {
						if (Object.keys(obj)[k] == 'name' || Object.keys(obj)[k] == 'index' || Object.keys(obj)[k] == 'info' || Object.keys(obj)[k] == 'requires') {
						} else {
							delete obj[''+Object.keys(obj)[k]+''];
						}
					}
					obj.disabled = 1;
				}
			}
		};
		if (obj.inject) {	// we have injection
			if (obj.inject.js && Array.isArray(obj.inject.js)) {	// we have script(s) to inject
				for (var j=obj.inject.js.length-1; j >= 0; j--) {
					if (Array.isArray(obj.inject.js[j]) && obj.inject.js[j].length > 0) {
						if (obj.inject.js[j][1]==null) {
							obj.inject.js[j][1] = 0;
						} else if (obj.inject.js[j][1]==3 || obj.inject.js[j][1]==4) {
							if (obj.inject.js[j][3] != null && obj.inject.js[j][3] != '') {
								var check = obj.inject.js[j][3].split('?');
								var found = 0;	// assume dependency is not met
								for (var r=0; r < document.getElementsByTagName('script').length; r++) {	
									var src = document.getElementsByTagName('script')[r].src.split('/');
										src = src[src.length-1].split('?');
									if (check[0]==src[0]) { 
										found = 1;
										if (check[1]!=null && parseFloat(src[1]) < parseFloat(check[1])) {
											found = 0;
										}
									}
								}
								if (found==0) {
									console.log('ADDON.REGISTER ERROR: Add-On "'+obj.name+'" has a script with an unmet dependency for "'+obj.inject.js[j][3]+'", check load order in main config file and/or add-on script version.');
								}
							} else {
								console.log('ADDON.REGISTER ERROR: Add-On "'+obj.name+'" has a script with an undefined dependency');
							}
						}
					} else { 
						// not correct format, remove it from inject.js
						obj.inject.js.splice(j,1);
					}
				}
			}
			if (obj.inject.css && Array.isArray(obj.inject.css)) {
				for (var c=obj.inject.css-1; c >=0; c--) {
					if (Array.isArray(obj.inject.css[c]) && obj.inject.css[c].length > 0) {
						if (obj.inject.css[c][3] == null) {
							obj.inject.css[c][3] = 0;
						} else if (obj.inject.css[c][3] != null && obj.inject.css[c][3] != '') {
							var check = obj.inject.css[c][3].split('?');
							var found = 0;	// assume dependency is not met
							for (var r=0; r < document.getElementsByTagName('link').length; r++) {
								var src = document.getElementsByTagName('link')[r].href.split('/');
									src = src[src.length-1].split('?');
								if (check[0]==src[0]) { 
									found = 1;
									if (check[1]!=null && parseFloat(src[1]) < parseFloat(check[1])) {
										found = 0;
									}
								}
							}
							if (found==0) {
								console.log('ADDON.REGISTER ERROR: Add-On "'+obj.name+'" has a stylesheet with an unmet dependency for "'+obj.inject.css[c][3]+'", check load order in main config file and/or add-on stylesheet version.');
							}
						} else {
							console.log('ADDON.REGISTER ERROR: Add-On "'+obj.name+'" has a script with an undefined dependency');
						}
					} else {
						// not correct format, remove from inject.css
						obj.inject.css.splice(c,1);
					}
				}				
			}
			addonInjector(obj);
		}
		if (obj.install) {	// install a bundled add-on for Ryuzine Reader or Rack
			RYU.fileOps(11,obj.install,obj.name);
		}
		if (obj.ui) {
			if (obj.ui.panels) {
				for (var p=0; p < obj.ui.panels.length; p++) {
					addPanel(
						obj.ui.panels[p][0],
						obj.name+'_'+obj.ui.panels[p][1],
						obj.ui.panels[p][2],
						obj.ui.panels[p][3],
						obj.ui.panels[p][4]
					);
				}
			}
			if (obj.ui.dialogs) {
				for (var d=0; d < obj.ui.dialogs.length; d++) {
					addDialogBox(
						obj.name+'_'+obj.ui.dialogs[d][0],
						obj.ui.dialogs[d][1],
						obj.ui.dialogs[d][2],
						obj.ui.dialogs[d][3],
						obj.ui.dialogs[d][4],
						obj.ui.dialogs[d][5]
					);	
				}
			}
			if (obj.ui.controls) {
				for (var t=0; t < obj.ui.controls.length; t++) {
					console.log('ADDON.REGISTER control #'+t);
					addControl(
						obj.ui.controls[t][0],
						obj.name+'_'+obj.ui.controls[t][1],
						obj.ui.controls[t][2],
						obj.ui.controls[t][3],
						obj.ui.controls[t][4],
						obj.ui.controls[t][5],
						obj.ui.controls[t][6],
						obj.ui.controls[t][7]
					);
				}
								
			}
			if (obj.ui.workspaces) {
				for (var w=0; w < obj.ui.workspaces.length; w++) {
					addWorkspace(
						obj.name+'_'+obj.ui.workspaces[w][0],
						obj.ui.workspaces[w][1],
						obj.ui.workspaces[w][2],
						obj.ui.workspaces[w][3]
					);
				}
			}
		}
		if (obj.actions && typeof obj.actions == 'function') {
				obj.actions();
		}	
	loadAddOns(index+1);
}
var addon_optData = [];	
var iscrollers = [];
var optEvent = {};
var regback = addon.register;	// back-up register function
var addon_loaded = null;
var addon_timer;
function loadAddOns(a) {
	console.log('LOAD ADDONS: clearing timer from previous addon...');
	clearTimeout(addon_timer);
	if (addon.register != regback) { addon.register = regback;};	// if someone overwrote register, restore it
	if (a==null) { a = 0; };
	if (a < AddOns.length) {
		if (!document.getElementById('AddOn_'+AddOns[a])) {	// script is not loaded yet
			addon_loaded = a;					// used for check in register
			if (AddOns[a]=='register'){ console.log('LOAD ADDONS: "register" is a reserved addon object.');
			}else{
			addon[''+AddOns[a]+''] = {};		// empty addon object to be filled
			addon[''+AddOns[a]+''].index = a;	// pass config index into it
			console.log('LOAD ADDONS: loading AddOn '+AddOns[a]);
			var inject = document.createElement('script');
				inject.setAttribute('id','AddOn_'+AddOns[a]);
				inject.src = 'ryuzinewriter/addons/'+AddOns[a]+'/'+AddOns[a]+'.config.js';
			document.getElementsByTagName('head')[0].appendChild(inject);
			};
			addon_timer=setTimeout(function(){
				console.log('LOAD ADDONS: checking if script loaded...');
				if(addon[''+AddOns[a]+''].name != AddOns[a]){
					console.log('LOAD ADDONS: '+AddOns[a]+' did not load, loading next addon');
					loadAddOns(a+1);
				}
			},1000);	// if addon[key].name does not exist after 1 sec, assume script did not load	
		}
	}
}
// injector stand-in (needs replacing for indexing)
function addonInjector(obj) {
	var head  = document.getElementsByTagName('head')[0];
	var links = head.getElementsByTagName('link');
	var headcss = [];
	for (var c=0; c < links.length; c++) {
		if (links[c].getAttribute('rel')=='stylesheet') {
			headcss.push(links[c]);
		}
	}
	if (obj.inject.js && obj.inject.js.length > 0) {
		for (var j=0; j < obj.inject.js.length; j++) {
			var js = document.createElement('script');
				js.src = 'ryuzinewriter/addons/'+obj.name+'/'+obj.inject.js[j][0];
			if (obj.inject.js[j][2]!=null) {
				js.id = obj.inject.js[j][2];
			}
			if (obj.inject.js[j][1]==1) {
				head.insertBefore(js,headcss[0]);
			} else {
				head.appendChild(js);
			}
		}
	}
	if (obj.inject.css && obj.inject.css.length > 0) {
		for (var c=0; c < obj.inject.css.length; c++) {
			var css = document.createElement('link');
				css.setAttribute('rel','stylesheet');
				css.setAttribute('type','text/css');
				css.href = 'ryuzinewriter/addons/'+obj.name+'/'+obj.inject.css[c][0];
			if (obj.inject.css[c][2]!=null) {
				css.id = obj.inject.css[c][2];
			}
			if (obj.inject.css[c][1]==1) {
				head.insertBefore(css,headcss[0]);
			} else {
				head.appendChild(css);
			}
		}
	}
}
var addPanel = function(type,id,label,location) {
	if (location==''||location==undefined) {
		location = 'left';
	}
	var panel = document.createElement('div');
		panel.id = id+'_panel';
		if (type==''||type==undefined) { type = 'a';}
		panel.className = 'panel '+type+' '+location+' out';
	var panelbar = document.createElement('div');
		panelbar.className="titlebar";
		paneltitle = document.createElement('h1');
		paneltitle.className="title l10n";
		paneltitle.innerHTML = label || 'Custom Panel';
		panelclose = document.createElement('div');
		panelclose.id=id+'_done';
		panelclose.className='button type2 right done';
		panelclose.innerHTML='<p><span class="symbol"></span><span class="label l10n">'+RYU._lc('Done')+'</span></p>';
		panelclose.addEventListener(iDown,function(){RYU.togglePanel(''+id+'_panel');},false);
	panelbar.appendChild(paneltitle);
	panelbar.appendChild(panelclose);
	panel.appendChild(panelbar);
	var panelarea = document.createElement('div');
		panelarea.className = 'area';
		panelarea.innerHTML = '<div class="scrollbox"></div>';
	panel.appendChild(panelarea);
	document.getElementById('upbox').appendChild(panel);
	console.log('ADD PANEL: '+id+'_panel has been created');
}
var firstclass = 0;
// UI Control Factory
var addControl = function(type,id,label,action,state,cookie,location,name,classes,section) {
	// Rectify empty location to default (Options Panel)
	if (location=='' || location==undefined) { 
		location = 'opt_panel'; 
		insert = 1;
	} else { insert = 0; }
	// filter out invalid start screen controls
	if (location=='start' && (type != 'button3' || type != 'button4')) {
		type = 'button3';
	}
	console.log('ADD CONTROL: location = '+location);
	if (document.getElementById(''+location+'').getElementsByClassName('area')[0].getElementsByClassName('scrollbox').length > 0) { // iScroll container		
		panel = document.getElementById(''+location+'').getElementsByClassName('area')[0].getElementsByClassName('scrollbox')[0];
	} else {
		panel = document.getElementById(''+location+'').getElementsByClassName('area')[0];
	}
	if (section != null) {
		panel = document.getElementById(''+section+'');
		insert = 0;
	}
	var n = addon_optData.length;
	var droplist = [];
	addon_optData[n] = [];
	addon_optData[n][0] = type;
	addon_optData[n][1] = id;
	addon_optData[n][2] = label;
	if (action==null) {
			addon_optData[n][3] = function(){};	// dummy function
	}else{	addon_optData[n][3] = action;}
	if (Array.isArray(state)) {
		console.log('ADD CONTROL: State is array, moving to droplist.  state = 0');
		droplist = state;
		state = 0;
	}
	if (cookie == 1) {	// look for a cookie then
		if (!Get_Cookie(''+id+'')) {
			if (config[''+id+'']) {
				console.log('ADD CONTROL: config['+id+'] exists, state = '+config[''+id+'']);
				state = config[''+id+''];
			} else {
				if (state == null) { state = 1; } // assume we want it ON if we loaded the add-on
			}
			console.log('ADD CONTROL: No Cookie Found, setting state = '+state);
		} else {
			state = Get_Cookie(''+id+'');
			console.log('ADD CONTROL: Cookie found, setting state = '+state);
		}
	} else { 
		cookie = 0;
	}
	if (state == null) { state = 1; } 	// assume we want it enabled;
	addon_optData[n][4] = state;
	addon_optData[n][5] = cookie;
	addon_optData[n][6] = location;
	
	function getListElement() {
			if (insert==1 && firstclass==0) {
				if (!document.getElementById('party3opts')) {
					var list_element = document.createElement('ul');
						list_element.id ='party3opts';
						list_element.className='opts';
				} else {
					var list_element = document.getElementById('party3opts');
				}
			} else if (insert==1 && firstclass==1) {
				var list_element = document.getElementById('opts');
			} else {
				if (!document.getElementById(location+'_optlist')) {
					var list_element = document.createElement('ul');
						list_element.id = location+'_optlist';
						list_element.className = 'opts';	
				} else {
					var list_element = document.getElementById(location+'_optlist');
				}
			}
		return list_element;
	}
	// BUTTONS
	switch(type) {
		case 'button1':
		case 'button2':
		case 'button3':
		case 'button4':
			switch(type) {
				case 'button4' :
					var t='type4';
				break;
				case 'button3' :
					var t='type3';
				break;
				case 'button2' :
					var t='type2';
				break;
				default:	// button1
					var t='type1';
			}
			var btn = document.createElement('div');
				btn.id = id;
				btn.className = 'button '+t+'';
				btn.innerHTML = '<p><span class="symbol"></span><span class="label l10n">'+RYU._lc(label)+'</span></p>';
				btn.addEventListener(eDown,optEvent[''+id+'']=action,false);	
			if (type=='button1'||type=='button2') {	// use button bar
				var aoid = id.split('_')[0];
				if (!document.getElementById(''+aoid+'_buttonbox')) {
					var bar = document.createElement('div');
					bar.id = aoid+'_buttonbox';
					bar.className = 'buttonbox';
				} else {
					var bar = document.getElementById(''+aoid+'_buttonbox');
				}
				btn.className = btn.className+' left';
				bar.appendChild(btn);
				el = bar;
			} else {
				el = btn;
			}
		break;
		case 'text':
			var txt = document.createElement('p');
				txt.id = id;
				if (classes!=null) {
				txt.className = 'smallprint '+classes;
				}else{
				txt.className = 'smallprint';
				}
				if (action!=null) {
				txt.addEventListener(eDown,optEvent[''+id+'']=action,false);
				}
				txt.innerHTML = label;
				el = txt;
		break;
		case 'select':
		case 'drop':
		case 'list':
		case 'multi':
			var ul = getListElement();
			var li = document.createElement('li');
				li.id = id+'_li';
				li.className = 'opt-li';
			var item = document.createElement('span');
				item.className="optitem l10n";
				item.innerHTML = RYU._lc(label);
				li.appendChild(item);
			var val = document.createElement('p');	// used by drop
			var drop = document.createElement('select');
				drop.id = id;
				drop.addEventListener('change',action,false);
			if (type=='list'||type=='multi') {
				drop.addEventListener('mousedown',function(){event.stopPropagation();},false);
				drop.addEventListener('touchstart',function(){event.stopPropagation();},false);
				drop.className='listbox';
				drop.size = '2';};
			if (type=='multi') {drop.setAttribute('multiple',true);}
			var val_text  = droplist[0][1];
			var sel_state = droplist[0][0];
			for (var i=0; i < droplist.length; i++) {
				var opt = document.createElement('option');
					opt.value = droplist[i][0];
					opt.innerHTML = droplist[i][1];
					if (droplist[i][2]!=null && state==0) {
						opt.setAttribute('selected','true');
						val_text  = droplist[i][1];
						sel_state = droplist[i][0];
					}
					drop.appendChild(opt);
			}
			console.log('sel_state = '+sel_state);
			if (state == 0) { state = sel_state;}
			console.log('state = '+state);
			if (type=='drop') {
			var sw = document.createElement('div');
				sw.className="opt-switch opt-drop opt-off";
				drop.addEventListener('change',function(x){return function(){RYU.setOptGhostList(''+x+'');};}(id),false);
				drop.addEventListener('mousedown',function(){event.stopPropagation()},false);
				drop.addEventListener('touchstart',function(){event.stopPropagation()},false);		
				sw.appendChild(drop);
				val.innerHTML = val_text;
				sw.appendChild(val);
				li.appendChild(sw);
			} else {
				li.appendChild(drop);
			}
			
				ul.appendChild(li);
				el = ul;	
		break;	
		case 'checkbox':
			var ul = getListElement();
			var li = document.createElement('li');
				li.id = id+'_li';
				li.className = 'opt-li';
			var item = document.createElement('span');
				item.className = 'optitem l10n';
				item.innerHTML = RYU._lc(label);
				li.appendChild(item);
			var checkbox = document.createElement('input');
				checkbox.className = 'opt-switch opt-check opt-off';
				checkbox.type = 'checkbox';
				if (name!=null) {checkbox.name = name;}
				if (!Array.isArray(state)) {
					if (state=='1') { state = [1,1];
					}else{ state = [0,0];}
				}
				checkbox.value = state[0];
				if (state[1]==1) { checkbox.checked = true; }				
				li.appendChild(checkbox);
				ul.appendChild(li);
				el = ul;
		break;
		case 'radio':
			var ul = getListElement();
			var li = document.createElement('li');
				li.id = id+'_li';
				li.className = 'opt-li';
			var item = document.createElement('span');
				item.className = 'optitem l10n';
				item.innerHTML = RYU._lc(label);
				li.appendChild(item);
			var radio = document.createElement('input');
				radio.className = 'opt-switch opt-radio opt-off';
				radio.type = 'radio';
				if (name!=null) { radio.name = name; }
				if (state=='1') { radio.checked = true; }
				li.appendChild(radio);
				ul.appendChild(li);
				el = ul;
		break;
		case 'toggle':
			// add data to array //
			var ul = getListElement();
			var li = document.createElement('li');
				li.id = 'opt_'+id+'_li';
				li.className = 'opt-li';
			var span = document.createElement('span');
				span.id = 'opt_'+id+'_label';
				span.className = 'optitem l10n';
				span.innerHTML = RYU._lc(label);
			if (state==1) { var opt_state='opt-on';}else{var opt_state='opt-off';}
			var div = document.createElement('div');
				div.id='opt_'+id;
				div.className = 'opt-switch '+opt_state;
				div.innerHTML = '<span class="symbol"></span><span class="label"></span>';
				div.addEventListener(eDown,optEvent[''+id+''] = function(x){return function(){RYU.toggleOptSwitch(''+x+'');}}(id));
				li.appendChild(span);li.appendChild(div);
				ul.appendChild(li);
			el = ul;
		break;
		default:
			// do nothing
	}
	if (cookie == 1) {	// set cookie in front of cookie monster
		console.log('Set_Cookie('+id+','+state+')');
		Set_Cookie(''+addon_optData[n][1]+'',''+state+'');
	}
		config[''+id+''] = state;			// create config setting
	if (insert==1 && firstclass==0) {	// check if default location has header
		if (!document.getElementById('addonheader')) {
		var head = document.createElement('h2');
			head.id='addonheader';
			head.className = 'smallprint l10n';
			head.innerHTML = RYU._lc('Add-On Settings');	
			panel.appendChild(head);
		};
	}
	// Now insert the element at location:
	panel.appendChild(el);
	
	for (var i=0; i < iscrollers.length; i++) {
		onRebind(iscrollers[i][1]);
	}
}	

var addWorkspace = function(id,label,content,toolbar) {
	var tabs_html, section_html = '';
	var navsets = document.getElementsByClassName('navset').length;
	var wspace_nav = document.createElement('div');
		wspace_nav.id = "navset"+navsets; 
		wspace_nav.className = "addon_ws navset nav_deck";
	var wspace_bar = document.createElement('div');
		wspace_bar.className="titlebar";
	var	wspace_title = document.createElement('h1');
		wspace_title.className="title l10n";
		wspace_title.innerHTML = RYU._lc(label);
	wspace_bar.appendChild(wspace_title);
	wspace_nav.appendChild(wspace_bar);
	if (Array.isArray(toolbar)) {
		if (toolbar.length > 12) { 
			toolbar.length = 12;
			console.log('WARNING: Custom Workspace Adds > 12 Toolbar Buttons!  Discarding extras...');
		}
		for (var t=0; t < toolbar.length; t++) {
			// type,id,label,action,classes
			if (toolbar[t][0]=='button1' || toolbar[t][0]=='button2') {	// only type 1 & 2 are valid
				if (toolbar[t][4]==null) { var align = 'left'} else { 
					if (!toolbar[t][4].match(/left/gi) && !toolbar[t][4].match(/right/gi)) {
						toolbar[t][4] = 'left '+toolbar[t][4];
					}
					var align = toolbar[t][4];
				}
				var btn = document.createElement('div');
					btn.id = toolbar[t][1];
					btn.className = 'button '+align+'';
					btn.innerHTML = '<p><span class="symbol"></span><span class="label l10n">'+toolbar[t][2]+'</span></p>';
					btn.addEventListener(eDown,toolbar[t][3],false);	
				wspace_nav.appendChild(btn);
			}
		}
	}
	document.getElementById('navbar0').appendChild(wspace_nav);
	var wspace = document.createElement('div');
		wspace.id = id+'_ws';
		wspace.className = 'addon_ws workspace ws_deck';
	var wspace_area = document.createElement('div');
		wspace_area.className = "area";
	var wspace_sbox = document.createElement('div');
		wspace_sbox.className = "scrollbox";

	var tabs = false;
	if (Array.isArray(content) && content[0].length == 2) {
		tabs = true;
	}
	
	if (tabs) {	// we have tabs and section to build
		var wspace_tabs = document.createElement('ul');
			wspace_tabs.className = "tabs";
		wspace_area.className = "area tabsections";
		for (var t=0, z=10; t < content.length; t++,z--) {
				var wspace_tab = document.createElement('li');
					wspace_tab.id = id+'_tab'+t;
					wspace_tab.className = "tab l10n";
					wspace_tab.setAttribute('style','z-index:'+z+';');
					wspace_tab.innerHTML = RYU._lc(content[t][0]);
					wspace_tab.addEventListener(eDown,function(x){return function(){RYU.swapAppTab(id+'_ws',id+'_tab'+x,id+'_section'+x);}}(t),false);				
				wspace_tabs.appendChild(wspace_tab);
				var wspace_sec = document.createElement('div');
					wspace_sec.id = id+'_section'+t;
					wspace_sec.className = 'tabsection';
					if (typeof content[t][1] == "string") {
					wspace_sec.innerHTML = content[t][1];
					} else {
					//	UI Builder, do after workspace is appended to DOM
					}
				if (t==0) { wspace_sec.setAttribute('style','display:block;');}
				wspace_sbox.appendChild(wspace_sec);
		}
		wspace.appendChild(wspace_tabs);
	} else if (typeof content == "string") {
		wspace_sbox.innerHTML = content;
	} else {
		// UI builder with no tabs or sections, do after workspace is appended to DOM
	}
	wspace_area.appendChild(wspace_sbox);
	wspace.appendChild(wspace_area);
	document.getElementById('sheet').appendChild(wspace);
	// now that it is in the DOM we can use UI Builder
	if (tabs) {
		for (var t=0; t < content.length; t++) {
			if (Array.isArray(content[t][1])) {	// if section is an array it has multiple UI controls in it
				for (var h=0; h < content[t][1].length; h++) {
					addControl(content[t][1][h][0],content[t][1][h][1],content[t][1][h][2],content[t][1][h][3],content[t][1][h][4],content[t][1][h][5],id+'_ws',content[t][1][h][7],content[t][1][h][8],id+'_section'+t);					
				}
			} else {
				// it was a string and is already written in
			}
		}
	} else if (Array.isArray(content)) {	// ui builder
		for (var t=0; t < content.length; t++) {
			addControl(content[t][0],content[t][1],content[t][2],content[t][3],content[t][4],content[t][5],id+'_ws',content[t][7],content[t][8]);
		}
	} else {	
		// it was a string and already got written in
	}
	workspace[navsets] = id+'_ws';	// add to workspace array
	addControl('button3',id,label,function(){RYU.slideSpace(navsets);RYU.togglePanel('all');},0,0,'addons_panel');
	
	if (hasClass(document.getElementById('addonsbutton'),'empty')) { removeClass(document.getElementById('addonsbutton'),'empty');};
}

function setOptGhostList(i,_set) {
	if (isNaN(i)) {  // if i is not the index number find by id
		for (var a=0; a < addon_optData.length; a++) {
			if (addon_optData[a][1] == i) {
				i = a;
			}
		}
	}
	var drop = document.getElementById(''+addon_optData[i][1]+'');
	if (_set==1) {	// set the list to a predetermined value
		// look for a cookie
		if (!Get_Cookie(''+addon_optData[i][1]+'')) {	// if no stored value
			if (config[''+addon_optData[i][1]+'']) {	// see if config object exists
				drop.value = config[''+addon_optData[i][1]+''];	// if it does, use its value
			}
		} else {
			drop.value = Get_Cookie(''+addon_optData[i][1]+'');	// set list to stored value
			config[''+addon_optData[i][1]+''] = Get_Cookie(''+addon_optData[i][1]+'');	// pass to config
		}
	} else {	// find selected value and store in config
		config[''+addon_optData[i][1]+''] = ''+drop.value+'';
	}
	for (var d=0; i < drop.options.length; d++) {
		if (drop.options[d].value === drop.value) {
			drop.selectedIndex = d;
			break;
		}
	}
	drop.parentNode.getElementsByTagName('p')[0].innerHTML=drop.options[drop.selectedIndex].text;
	// if cookies are enabled for this list, store value
	if (addon_optData[i][5]==1) { 
		Set_Cookie(''+addon_optData[i][1]+'',''+drop.value+''); 
	}	
}

function toggleOptSwitch(i,dir) {
	if (isNaN(i)) {  // if i is not the index number find by id
		for (var a=0; a < addon_optData.length; a++) {
			if (addon_optData[a][1] == i) {
				i = a;
			}
		}
	}
	if (dir==null) {
		if (hasClass(document.getElementById('opt_'+addon_optData[i][1]+''),'opt-on') ) {
			dir = '0';
		} else {
			dir = '1';
		}
	}
	if (dir=='0') {
		document.getElementById('opt_'+addon_optData[i][1]+'').className="opt-switch opt-off";
		if (addon_optData[i][5]==1) { Set_Cookie(addon_optData[i][1],'0'); }
		config[''+addon_optData[i][1]+''] = 0;
		addon_optData[i][4]=0;
	} else {
		document.getElementById('opt_'+addon_optData[i][1]+'').className="opt-switch opt-on";
		if (addon_optData[i][5]==1) { Set_Cookie(addon_optData[i][1],'1'); }
		config[''+addon_optData[i][1]+''] = 1;
		addon_optData[i][4]=1;
	}
	// Do function if any //
	if (typeof addon_optData[i][3] == 'string') { // it is a string, use evil eval()!
		console.log('TOGGLE: consider wrapping "'+addon_optData[i][3]+'" in an anonymous function rather than sending a string');
		var fn = function() { return eval(addon_optData[i][3]) }();
	} else {
		addon_optData[i][3]();
	}
}

var dialogs = [];
function addDialogBox(id,title,contents,action,persist,hide) {
	var n = dialogs.length;
	dialogs[n] = [];
	dialogs[n][0] = id;
	dialogs[n][1] = title;
	dialogs[n][2] = contents;
	dialogs[n][3] = action;
	dialogs[n][4] = persist;
	dialogs[n][5] = hide;
}



function toggleDialog(id) {
	console.log('toggleDialog('+id+')');
	if (id=='all') {
		var openones = document.getElementsByClassName('ryudialog');
		for (var r=0; r < openones.length; r++) {
			if (hasClass(openones[r],'in')) {
				toggleDialog(''+openones[r].id+'');
			}
		}
		return;
	}
	// find dialog by ID
	var n = null;
	for (var d=0; d < dialogs.length; d++) {
		if (dialogs[d][0] == id) { var n = d; }
	}
	console.log('index of '+id+' = '+n+'');
	if (n==null) { 
		if (id == 'about') { aboutDialog();}	// build about dialog first then trigger this
		return; }	// dialog could not be found, bail	
	var hidden = false;
	for (var h=0; h < hide_dialogs.length; h++) {
		if ( id == hide_dialogs[h]) {
			hidden = true;
		}
	}
	// See if this dialog already exists or not		
	if (!document.getElementById(''+id+'')) {	// we need to make it and open it
		if (config.rzw_noobnags == '0') {	// if noobnags is OFF see if user hid this dialog 
			if (hidden==true) { return; }	// user hid this
		}
	// Build Shade Box
	if (!document.getElementById('shade_box')) {
		var shade_box = document.createElement('div');
			shade_box.id = "shade_box";
			shade_box.addEventListener(iDown,function(){RYU.toggleDialog(''+id+'');},false);
			document.getElementsByTagName('body')[0].appendChild(shade_box);
	}	
	var dialog_box = document.createElement('div');
		dialog_box.id = id;
		dialog_box.className = 'ryudialog in';
	var dialog_title = document.createElement('div');
		dialog_title.className="titlebar";
		var title_h1 = document.createElement('h1');
			title_h1.className="title";
			title_h1.innerHTML = RYU._lc(dialogs[n][1]);
		var xout = document.createElement('div');
			xout.className = 'xdialog button type2 right';
			xout.innerHTML = '<p><span class="symbol"></span><span class="label l10n">'+RYU._lc('Close')+'</span></p>';
			xout.addEventListener(iDown,function(){RYU.toggleDialog(''+id+'');},false);
		dialog_title.appendChild(title_h1);
		dialog_title.appendChild(xout);
	var dialog_textbox = document.createElement('div');
		dialog_textbox.className = 'area';
	var dialog_scrollbox = document.createElement('div');
		dialog_scrollbox.className="scrollbox";
		if (typeof dialogs[n][2] == 'string') {
			dialog_scrollbox.innerHTML=''+unescape(dialogs[n][2])+'';
		}
		dialog_textbox.appendChild(dialog_scrollbox);
		dialog_box.appendChild(dialog_title);
		dialog_box.appendChild(dialog_textbox);
		if (dialogs[n][5]!=null && dialogs[n][5]!='0' && dialogs[n][5]!='') {	// if option to hide, add control
			dialogs[n][3].unshift(['checkbox',id+'_hide','Do not show this again',function(){RYU.hideDialog(this,''+id+'');}]);
		}		
		if (dialogs[n][3]!=null && dialogs[n][3]!='') {
			dialog_textbox.className = 'area action';
			var action = document.createElement('div');
			action.className = 'actionbar';			
			if (Array.isArray(dialogs[n][3])) {
				if ( (dialogs[n][5]!=null && dialogs[n][5]!='0' && dialogs[n][5]!='') && dialogs[n][3].length > 3) {
					dialogs[n][3].length = 3;
					console.log('WARNING: Dialogs with option to hide may only have up to TWO Action Buttons!  Discarding extras...');
				}
				if ( (dialogs[n][5]==null || dialogs[n][5]=='0' || dialogs[n][5]=='') && dialogs[n][3].length > 6) { 
					dialogs[n][3].length = 6;
					console.log('WARNING: Dialogs may only have SIX Action Buttons!  Discarding extras...');
				}
				for (var t=0; t < dialogs[n][3].length; t++) {
					// type,id,label,action,classes
					if (dialogs[n][3][t][0]=='button1' || dialogs[n][3][t][0]=='button2' || dialogs[n][3][t][0]=='checkbox') {	// only type 1 & 2 are valid
						if (dialogs[n][3][t][4]==null) { var align = 'left'} else { 
							if (!dialogs[n][3][t][4].match(/left/gi) && !dialogs[n][3][t][4].match(/right/gi)) {
								dialogs[n][3][t][4] = 'left '+dialogs[n][3][t][4];
							}
							var align = dialogs[n][3][t][4];
						}
						if (dialogs[n][3][t][0]=='button1' || dialogs[n][3][t][0]=='button2') {
							var btn = document.createElement('div');
								btn.id = dialogs[n][3][t][1];
								btn.className = 'button '+align+'';
								btn.innerHTML = '<p><span class="symbol"></span><span class="label l10n">'+RYU._lc(dialogs[n][3][t][2])+'</span></p>';
								btn.addEventListener(eDown,dialogs[n][3][t][3],false);	
							action.appendChild(btn);
						} else {
							var checkblock = document.createElement('div');
								checkblock.className = 'hidebox left';
							var checkbox = document.createElement('input');
								checkbox.id = dialogs[n][3][t][1];;
								checkbox.type = 'checkbox';
								if (hidden==true) { checkbox.setAttribute('checked','true');}
								checkbox.addEventListener(eDown,dialogs[n][3][t][3],false);
							var spanbox = document.createElement('span');
								spanbox.className = 'label l10n';
								spanbox.innerHTML = RYU._lc(dialogs[n][3][t][2]);
							checkblock.appendChild(checkbox);
							checkblock.appendChild(spanbox);
							action.appendChild(checkblock);
						}
					}
				}
			}
			dialog_box.appendChild(action);
		}
		document.getElementsByTagName('body')[0].appendChild(dialog_box);
		if (Array.isArray(dialogs[n][2])) {	// ui builder
			for (var t=0; t < dialogs[n][2].length; t++) {
				addControl(dialogs[n][2][t][0],dialogs[n][2][t][1],dialogs[n][2][t][2],dialogs[n][2][t][3],dialogs[n][2][t][4],dialogs[n][2][t][5],id,dialogs[n][2][t][7],dialogs[n][2][t][8]);
			}
		}
		iScrollApply(''+id+''); 
	} else { // dialog exists
		console.log('dialog '+id+' exists');
		if (document.getElementById(''+id+'').className == 'ryudialog out') { // it is closed, so open it
			if (config.rzw_noobnags == '0') {	// if noobnags is OFF see if user hid this dialog 
				if (hidden==true) { return; }	// user hid this dialog
			}
			// Build Shade Box
			if (!document.getElementById('shade_box')) {
				var shade_box = document.createElement('div');
					shade_box.id = "shade_box";
					shade_box.addEventListener(iDown,function(){RYU.toggleDialog(''+id+'');},false);
					document.getElementsByTagName('body')[0].appendChild(shade_box);
			}	
			document.getElementById(''+id+'').className =  'ryudialog in';
		} else {
			if (dialogs[n][4]=='1') { // persistent dialog, just close it
				document.getElementById(''+id+'').className = 'ryudialog out';
			} else {	// non-persistent dialog, remove it from DOM
				for (var i=0; i < iscrollers.length; i++) {
					if (iscrollers[i][0] == id && iscrollers[i][1] != null) {
						iscrollers[i][1].destroy();
						iscrollers[i][1] = null;
					}
				}
				document.getElementsByTagName('body')[0].removeChild(document.getElementById(''+id+''));
			}
			// remove shade box
			document.getElementsByTagName('body')[0].removeChild(document.getElementById('shade_box'));
		}	
	}
}
/* Simple toggle for hide/show setting */
function hideDialog(box,n) {
	if (config.rzw_noobnags == '1') {
		alert(''+RYU._lc('Hiding dialogs is being overidden, go to OPTIONS > SHOW ALL DIALOGS and turn it OFF to allow hiding')+'');
	}
	if (box.checked) {	// is being unchecked
		for (var h=hide_dialogs.length-1; h>-1;h--) {
			if (n==hide_dialogs[h]) {
				hide_dialogs.splice(h,1);	// remove this dialog from hide_dialogs array
			}
		}
	} else {
		var hidden = false;	// assume dialog is not already hidden
		for (var h=0; h < hide_dialogs.length; h++) {
			if (n==hide_dialogs[h]) {
				hidden = true;	// dialog index found in hidden_dialogs array
			}
		}
		if (hidden == false) {	// was not hidden, so now hide it
			hide_dialogs.push(''+n+'');
		}
	}
	Set_Cookie('rzw_hide_dialogs',hide_dialogs);
}
		
//********** Utility Functions *************//
function isEven(value) {
return (value%2 == 0);
}
var winSize = function() {
  if(typeof ( window.innerWidth ) == 'number') {
		winSize = function() { // Replaces itself with the correct answer
			//Non-IE or IE9
			var W = window.innerWidth;
			var H = window.innerHeight;
			return {W:W,H:H};}
	} 
	else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) { 
		winSize = function() {
			//IE 6+ in 'standards compliant mode'
			var W = document.documentElement.clientWidth;
			var H = document.documentElement.clientHeight;
			return {W:W,H:H}; // Return values as objects
		}} 
	else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
		winSize = function() {
			//IE 4 compatible
			var W = document.body.clientWidth;
			var H = document.body.clientHeight;
			return {W:W,H:H}; // Return values as objects
		}
	}
}
// Run it to find method //
winSize();
function getsupportedprop(proparray){
    var root=document.documentElement //reference root element of document
    for (var i=0; i<proparray.length; i++){ //loop through possible properties
        if (typeof root.style[proparray[i]]=="string"){ //if the property value is a string (versus undefined)
            return proparray[i]; //return that string
        }
    }
}

// ClassName Manipulators
function hasClass(el,name) {
   return new RegExp('(\\s|^)'+name+'(\\s|$)').test(el.className);
}
function addClass(el,name) {
   if (!hasClass(el, name)) { el.className += (el.className ? ' ' : '') +name; }
}
function removeClass(el,name){
   if (hasClass(el,name)) {
      el.className=el.className.replace(new RegExp('(\\s|^)'+name+'(\\s|$)'),' ').replace(/^\s+|\s+$/g, '');
   }
}
// get CSS property and return JS version
function getStyle(el,styleProp) {
	var y = "";
	var x = document.getElementById(el);
	if (window.getComputedStyle) {
		styleProp = styleProp.replace(/([A-Z])/g, "-$1").toLowerCase(); // Convert JS prop to CSS prop
		y = document.defaultView.getComputedStyle(x,null).getPropertyValue(styleProp);
	} else if (x.currentStyle) {
		styleProp = styleProp.replace(/\-(\w)/g, function (strMatch, p1){
			return p1.toUpperCase(); // convert CSS prop to JS prop
		});
		y = x.currentStyle[styleProp];
	}
	return y;
}
// 	******** EVENT PROCESSING ***********//
//	These are exposed as function for add-ons to use //
function iEvent() {
	if ('ontouchstart' in document.documentElement && device.Platform != "webOS" ) {
		var iClick = "touchstart";
		var iDown = "touchstart";
		var iUp = "touchend";
		var iMove = "touchmove";
		var iOver = "touchstart";
		var iOut = "touchend";
	} else {
		var iClick = "click";
		var iDown = "mousedown";
		var iUp = "mouseup";
		var iMove = "mousemove";
		var iOver = "mouseover";
		var iOut = "mouseout";
	}
	if (typeof IScroll != "undefined") {
		var eDown = "tap";
	} else {
		var eDown = iDown;
	}
	return {
		iClick	: iClick,
		iDown 	: iDown,
		iUp		: iUp,
		iMove	: iMove,
		iOver	: iOver,
		iOut	: iOut,
		eDown	: eDown
	
	}
}
// Set Events for Ryuzine
var iClick	= iEvent().iClick;
var iDown 	= iEvent().iDown;
var iUp 	= iEvent().iUp;
var iMove 	= iEvent().iMove;
var iOver 	= iEvent().iOver;
var iOut 	= iEvent().iOut;
var eDown	= iEvent().eDown;


// Default Prevention/Restoration //
function defaultPrevention() {
	if (device.Platform == "Android") {
		window.scrollTo(0,0);
	}
	preventDefault();
}

function preventDefault(element) {
	if (element==null) { var element = document };
		element.ontouchstart = function (event) {
    if (!event.elementIsEnabled) {event.preventDefault();}
	}
	element.ontouchmove = function (event) {
    if (!event.elementIsEnabled) {event.preventDefault();}
	}
	element.ontouchend = function (event) {
    if (!event.elementIsEnabled) {event.preventDefault();}
	}
}

function restoreDefault(element) {

	if (element==null) { var element = document };
	element.ontouchstart = function (event) {
    if (!event.elementIsEnabled) {event.elementIsEnabled = true;}
	}
	element.ontouchmove = function (event) {
    if (!event.elementIsEnabled) {event.elementIsEnabled = true;}
	}
	element.ontouchend = function (event) {
    if (!event.elementIsEnabled) {event.elementIsEnabled = true;}
	}
}

function onRebind (scroller) {
	// Here modify the DOM in any way, eg: by adding LIs to the scroller UL
	if (typeof iScroll != "undefined") {
		if (scroller != null) {
			setTimeout(function () {scroller.refresh();}, 0);
			scroller.scrollTo(0,0);
		}
	}
};

function docPropReset() {
	doc_title=doc_author=doc_summary=doc_keywords=doc_version=doc_social=doc_link=doc_welcome=doc_banner=doc_splash=doc_goodbye=doc_copyright="";
	doc_social_src=doc_converted=0;
}

var appTab = [];

function fixlayout(b) {
	if (b==null) {
		alert(''+RYU._lc('Ryuzine Writer will now attempt to reload and reset the UI.')+'');
	}
	document.getElementById('writer_layout').href = "ryuzinewriter/css/blank.css";
	document.getElementById('writer_layout').href = "ryuzinewriter/css/writer.css";
	setTimeout(function(){
	document.getElementById('start').className="workspace ws_deck";
	document.getElementById('editor').className="workspace ws_deck";
	document.getElementById('export').className="workspace ws_deck";
	document.getElementById('simulator').className="workspace ws_deck";
	document.getElementById('configuration').className="workspace ws_deck";
	document.getElementById('databuilder').className="workspace ws_deck";
	var navs = document.getElementsByClassName('navset');
		for (var n=navs.length-1; n >= 0; n--) {
			navs[n].className="navset nav_out";
		}
	},1);
	setTimeout(function(){
		RYU.slideSpace(5);
		RYU.slideSpace(4);
		RYU.slideSpace(3);
		RYU.slideSpace(2);
		RYU.slideSpace(1);
		RYU.slideSpace(0);
		},1000);
	setTimeout(function(){
		document.getElementById('start').className="workspace ws_in";
	},5000);
}

// Tab Key Interrupter //
function keydown(event) {  
        var code;  
        var e;  
        if (document.all) {  
            if (!event) {  
                var e = window.event;  
                code = e.keyCode;  
            }  
        }  
        else if (event.which) {  
        code = event.which;  
        e = event;  
        }
        if ( code == 69 && e.ctrlKey && e.shiftKey ) { // CTRL + SHIFT + E = Editor
        	RYU.slideSpace(1);
        }
        if ( code == 88 && e.ctrlKey && e.shiftKey ) { // CTRL + SHIFT + X = eXport
        	RYU.slideSpace(2);
        }
        if ( code == 83 && e.ctrlKey && e.shiftKey ) { // CTRL + SHIFT + S = Simulator
        	RYU.slideSpace(3);
        }
        if ( code == 67 && e.ctrlKey && e.shiftKey ) { // CTRL + SHIFT + C = Config
        	RYU.slideSpace(4);
        }
        if ( code == 82 && e.ctrlKey && e.shiftKey ) { // CTRL + SHIFT + R = Rack Data
        	RYU.slideSpace(5);
        }
        if ( code == 72 && e.ctrlKey && e.shiftKey ) { // CTRL + SHIFT + H = Help
        	RYU.helpPlay(1);
        }
        if ( code == 36 && e.shiftKey && e.ctrlKey ) { // CTRL + SHIFT + HOME = Start
        	RYU.slideSpace(0);
        }
        if ( code == 27) { // ESC dialogs
        	toggleDialog('all');
        }
        if ( code == 27 && e.shiftKey ) { // Shift + Escape
			fixlayout();
        }
        if (config.rzw_tabindex==0 && code == 9) {	// Tab Key
        	//Prevent Tabs except in RackBuilder Table
        	if (document.activeElement) {
        		var focused = document.activeElement;
				if(focused.parentNode.parentNode.parentNode.parentNode.id=="rackdata") {
					if (focused.id=="lastcell"){
						document.getElementById('rackdata').getElementsByTagName('input')[0].focus();
						return false;}
				} else {
				return false;
				}
        	}  
        } 
        if (document.activeElement.id=="chooser" || document.activeElement.id=="chooser2" || document.activeElement.id=="chooser3" || document.activeElement.id=="chooser4") {
        	var box = document.activeElement;
    		var dialog = box.parentNode.parentNode.parentNode.parentNode.parentNode.id;
        	if (code == 13) {
			RYU.toggleDialog(''+dialog+'',0);
				if (box.id=="chooser") {
					RYU.selectFile(0);RYU.slideSpace(1);
				} else if (box.id=="chooser2") {
					RYU.selectFile(1);RYU.slideSpace(2);				
				} else if (box.id=="chooser3") {
					RYU.loadURL2Sim();
				} else if (box.id=="chooser4") {
					RYU.cat2data(''+document.getElementById(''+box.id+'').value+'');
				} else {
				}
			  	
        	}
        } 
    }  

function init() {
	// UI ELEMENTS HERE 
	body = document.getElementsByTagName('body')[0];
		up_box = document.getElementById('upbox');
		opt_slide = document.getElementById('opt_panel');
		opt_list = document.getElementById('optlist');
		addons_slide = document.getElementById('addons_panel');
		addons_list = document.getElementById('addonslist');
		controls = document.getElementById('tabbar0');
		light_box = document.getElementById('lightbox');
		lightshade = document.getElementById('shade');
		sh = document.getElementById('sheet');

	// Get UI Theme (if any) //
	if (!document.getElementById('ui_theme')) {
		if (swapThemes == 1) {
			themeline = document.getElementsByTagName('head')[0].innerHTML;
			themeline = themeline + '\n<link rel="stylesheet" type="text/css" href="" id="ui_theme" />\n';
			document.getElementsByTagName('head')[0].innerHTML = themeline;
		} else {}
		defaultTheme = ""+RYU.baseurl+"ryuzinewriter/theme/writer/writer.css";
	} else { 
		// knock off any anchor link from URL
		var locale = window.location.href; locale = locale.split('#'); locale = locale[0];
		if (document.getElementById('ui_theme').href == locale) {
			defaultTheme = ""+RYU.baseurl+"ryuzinewriter/theme/writer/writer.css";
		} else {
		defaultTheme = document.getElementById('ui_theme').href;
		}
	}
	// Set Theme initial ON/OFF State //
	if (defaultTheme.length == 0 && swapThemes == 0 ) {
		config.rzw_themeset = 0;
	} else {
		if (!Get_Cookie("rzw_themeset")) {
		config.rzw_themeset = 1;
		} else {
		config.rzw_themeset=Get_Cookie("rzw_themeset");
		}
	}
	if (config.rzw_themeset==1 && splashad == 0) {
//		splashad = 1;	// introduce 1 sec delay to reflow for theme
	}
	if (config.rzw_filenew == 1) {
		document.getElementById('ed_file_operations').getElementsByTagName('option')[1].innerHTML = 'Clear Editor';
	}

// build default options
var option = [ [],[],[],[],[],[],[],[],[],[] ];
option[0][0] = "toggle";
option[0][1] = "rzw_styles";
option[0][2] = "Auto-import Master Styles";
option[0][3] = function(){alert(''+RYU._lc('Setting takes effect after reloading Ryuzine Writer.')+'');};
option[0][4] = config.rzw_styles;

option[1][0] = "toggle";
option[1][1] = "rzw_wysiwyg";
option[1][2] = "Rich Text Editor"
option[1][3] = function(){alert(''+RYU._lc('Setting takes effect after reloading Ryuzine Writer.')+'');};
option[1][4] = config.rzw_wysiwyg;

option[2][0] = "toggle";
option[2][1] = "rzw_noobnags";
option[2][2] = "Show All Dialogs";
option[2][3] = function(){};
option[2][4] = config.rzw_noobnags;

option[3][0] = "toggle";
option[3][1] = "rzw_nscroll";
option[3][2] = "Native Scrolling";
option[3][3] = function(){RYU.scrollToggle();};
option[3][4] = config.nscroll;

option[4][0] = "toggle";
option[4][1] = "rzw_zoompan";
option[4][2] = "Zoom &#38; Pan";
option[4][3] = function(){RYU.zoomSet();};
option[4][4] = config.zoompan;

option[5][0] = "toggle";
option[5][1] = "rzw_themeset";
option[5][2] = "Theme UI";
option[5][3] = function(){themeToggle();};
option[5][4] = config.rzw_themeset;

option[6][0] = "toggle";
option[6][1] = "rzw_tabkey";
option[6][2] = "Normal Tab Key";
option[6][3] = function(){};
option[6][4] = config.rzw_tabindex;

option[7][0] = "button3";
option[7][1] = "tourguide";
option[7][2] = "Guided Tour";
option[7][3] = function(){RYU.helpPlay(1);RYU.togglePanel('opt_panel');};
option[7][4] = null;

option[8][0] = "button3";
option[8][1] = "aboutbutton";
option[8][2] = "About Ryuzine";
option[8][3] = function(){RYU.toggleDialog('about');};
option[8][4] = null;

option[9][0] = "button4";
option[9][1] = 'altoptdone';
option[9][2] = 'Close';
option[9][3] = function(){RYU.togglePanel(5);};
option[9][4] = null;

firstclass = 1;
for (var n=0; n < option.length; n++) {
	if (option[n][0]=='toggle') { var cookie = 1;}else{var cookie = 0;}
	addControl(
		option[n][0],
		option[n][1],
		option[n][2],
		option[n][3],
		option[n][4],
		cookie
	);
};
firstclass = 0;

// Add Dialogs //
var rzw_dialogs = document.getElementsByClassName('ryudialog');
for (var d=0; d < rzw_dialogs.length; d++) {
	addDialogBox(''+rzw_dialogs[d].id+'','','','',1);
	var xout = rzw_dialogs[d].getElementsByClassName('xdialog')[0];
	xout.addEventListener(iDown,function(id){return function(){RYU.toggleDialog(''+id+'');}}(rzw_dialogs[d].id),false); 
}
// Write the Help Documentation //
writeHelp();
// Load any AddOns //
loadAddOns();
	if (document.getElementsByTagName('iframe').length > 0) {
		// IFRAMEs will break Native Scrolling //
		config.nscroll = 0;
	}
	// iScroll 5 Compatibility Fix //
	if (typeof IScroll != "undefined") {
		iScroll = IScroll;
	}
	// Set iScroll Option
	if (!Get_Cookie("iscroll_iscroll")) {
		if (typeof iScroll != "undefined") {
			config.iscroll_iscroll = 1;
		} else {
			config.iscroll_iscroll = 0;
		}
	} else {
		config.iscroll_iscroll=Get_Cookie("iscroll_iscroll");
	}

	// Tab Index and UI Fix Listener //
	document.onkeydown = keydown;  
	winSize();
	var size = winSize();
	W = size.W;
	H = size.H;
	if (device.Platform == "Android" && device.v < 3) {
		document.getElementById('preview').style.display="none";
	}
	if (!document.getElementById('zooming')) {
		var metazoom = document.createElement('meta');
		metazoom.setAttribute('name','viewport');
		metazoom.setAttribute("content",metacontent);
		metazoom.setAttribute('id','zooming');
		document.getElementsByTagName('head')[0].appendChild(metazoom);
	} else {
		document.getElementById('zooming').content = metacontent;
	}
	
	if (window.innerWidth < 720) {
		document.getElementById('tourguide').style.display = "none";
	}

	alertCSS = document.getElementById('alert_text');
	mySource = document.getElementById('inputBox');
	mySourceFrame = document.getElementById('sourceframe');
	myOutput = document.getElementById('outputBox');
	myCSS = document.getElementById('stylesBox');

	myDevice = document.getElementById('device');
	myWindow = document.getElementById('preview');
	myScreen = document.getElementById('screen');
	myStatus = document.getElementById('statusbar');
	myNavBar = document.getElementById('navbar');
	myTabBar = document.getElementById('tabbar');
	myTabStat = document.getElementById('tabstatus');
	
	appTab[0] = document.getElementById('simulator');
	appTab[1] = document.getElementById('editor');
	
	devSize();
	devSelect = document.getElementById('device_selector');
	devSelector();
	adjustBox();
	
	
	add2ConfigList(0,1);
	add2ConfigList(1,1);
	add2ConfigList(2,1);
	add2ConfigList(3,1);
	
	addRackData(1); // create table with a blank entry

	// Attach Events //
	window.addEventListener('resize',function(){RYU.adjustBox();RYU.resize_panels();},false);
	window.addEventListener('orientationchange',function(){RYU.resize_panels();},false);
    document.getElementById('under_glass').addEventListener(iDown,function(){RYU.togglePanel('all');},false);
	document.getElementById('helpbutton').addEventListener(iDown,function(){RYU.helpPlay(1);RYU.togglePanel('opt_panel');},false);
		if (device.Platform=="webOS" || (device.Platform=="iOS" && device.v < 5) || (device.Platform=="Android" && device.v < 3) ) {
			document.getElementById('opt_rzw_wysiwyg_li').style.display="none";
			document.getElementById('opt_rzw_styles_li').style.display="none";
		} 
	if ( (nativeScroll != undefined && nativeScroll != null) || (device.Platform=="Android" && device.v > 2) ) {
	} else {
		document.getElementById('opt_rzw_zoompan_li').style.display="none";
		document.getElementById('opt_rzw_nscroll_li').style.display="none";
		config.nscroll = 0;
		config.zoompan = 0;
	}
	if ( swapThemes == 0 || (swapThemes==1 && dynTheme() == "") ) {
		config.rzw_themeset = 0;
		document.getElementById('opt_rzw_themeset_label').className="optitem opt-disabled";
	} else {
	}
	// set initial state
	themeToggle(config.rzw_themeset);
	/* mobile interface setting disabled on purpose
	zoomToggle(config.zoompan);
	scrollToggle(config.nscroll);
	iScrollToggle(config.iscroll_iscroll);	
	*/
	/***** CONTROL BAR BUTTONS *****/
	// Start  //
	document.getElementById("b_start").addEventListener(iDown,function(){RYU.slideSpace(0);},false);
	document.getElementById("b_start1").addEventListener(iDown,function(){RYU.slideSpace(0);},false);
	// Editor //
	document.getElementById("ed_file_operations").onchange = function(){var f=(this.value || this.options[this.selectedIndex].value);RYU.fileOps(f);this.selectedIndex=0;};
	document.getElementById("ed_splitter").onchange = function(){var f=(this.value || this.options[this.selectedIndex].value);RYU.splitView(f);this.selectedIndex=0;};
	document.getElementById("ed_build").addEventListener(iDown,function(){RYU.outputOptions();RYU.clearSimulator();RYU.refreshSrc();RYU.slideSpace(3);RYU.reWrite();},false);
	document.getElementById("ed_opt").addEventListener(iDown,function(){RYU.toggleDialog('output-options',1);},false);
	document.getElementById("ed_refresh").addEventListener(iDown,function(){RYU.refreshSrc();});
	
	document.getElementById("ed_sim").addEventListener(iDown,function(){RYU.clearSimulator();RYU.slideSpace(3);setTimeout('RYU.updatePreview(0);',1000);},false);
	document.getElementById("fill_refresh").addEventListener(iDown,function(){RYU.clearSimulator();RYU.slideSpace(3);setTimeout('RYU.updatePreview(0);',1000);},false);
	// next one is not actually for RyuzineRack - it is return from Fill View in Simulator //
	document.getElementById("back2rack").addEventListener(iDown,function(){RYU.toggleDropBar();RYU.popOut(0);},false);
	document.getElementById("droptab").addEventListener(iDown,function(){RYU.toggleDropBar();},false);
	
	document.getElementById("device_selector").onchange = function(){document.getElementById('device_opt_label').innerHTML=this.options[this.selectedIndex].innerHTML;RYU.switchDevice(this.options[this.selectedIndex].value);return false};
	document.getElementById("sim_add").addEventListener(iDown,function(){RYU.toggleDialog('customize',1);},false);
	document.getElementById("sim_rotate").addEventListener(iDown,function(){RYU.rotateDevice();},false);
	document.getElementById("view_style").onchange = function(){document.getElementById('view_opt_label').innerHTML=this.options[this.selectedIndex].innerHTML;RYU.viewDrop(this.options[this.selectedIndex].value);return false;}
	document.getElementById("zoom_factor").onchange = function(){document.getElementById('zoom_opt_label').innerHTML=this.options[this.selectedIndex].innerHTML;RYU.zoomFactor(this.options[this.selectedIndex].value);return false;}
	document.getElementById("sim_load").addEventListener(iDown,function(){RYU.toggleDialog('loadurl',1);},false);
	
	document.getElementById("cfg_reset").addEventListener(iDown,function(){RYU.resetConfigFile();},false);
	document.getElementById("cfg_build").addEventListener(iDown,function(){RYU.buildConfigFile();},false);
	
	document.getElementById("rack_sel_file").onchange = function(){
		var f=(this.value || this.options[this.selectedIndex].value);
		if (f==1) {RYU.newRackCat();
		} else if (f==2) { RYU.fileOps(10);
		} else if (f==3) {
			RYU.getRackData(1);
			RYU.fileOps(8);
		} else {};
	};
	document.getElementById("db_add").addEventListener(iDown,function(){RYU.addRackData();},false);
	document.getElementById("rack_sel_edit").onchange = function(){
		var f=(this.value || this.options[this.selectedIndex].value);
		if (f==1) {RYU.toggleDialog('addrows',1);
		} else if (f==2) {RYU.toggleDialog('edittypes',1);
		} else if (f==3) { RYU.toggleDialog('editcats',1);
		} else {};
	};
	document.getElementById("rack_build").addEventListener(iDown,function(){RYU.getRackData(1);});

			// Start Screen Buttons //
			document.getElementById("startbutton1").addEventListener(iDown,function(){RYU.toggleDialog('add-template',1)},false);
			document.getElementById("startbutton2").addEventListener(iDown,function(){RYU.fileOps(3)},false);
			document.getElementById("startbutton3").addEventListener(iDown,function(){RYU.toggleDialog('loadzine',1)},false);
			document.getElementById("startbutton4").addEventListener(iDown,function(){RYU.slideSpace(4)},false);
			document.getElementById("startbutton5").addEventListener(iDown,function(){RYU.slideSpace(5)},false);
			document.getElementById("startbutton6").addEventListener(iDown,function(){RYU.toggleDialog('loadurl',1)},false);
			// Export Section Tabs //
			document.getElementById("export_tab0").addEventListener(iDown,function(){RYU.swapAppTab('export','export_tab0','export_section0');},false);
			document.getElementById("export_tab1").addEventListener(iDown,function(){RYU.swapAppTab('export','export_tab1','export_section1');},false);
			document.getElementById("export_tab2").addEventListener(iDown,function(){RYU.swapAppTab('export','export_tab2','export_section2');},false);
			document.getElementById("export_tab3").addEventListener(iDown,function(){RYU.swapAppTab('export','export_tab3','export_section3');},false);
			// Configuration Section Tabs //
			document.getElementById("configuration_tab0").addEventListener(iDown,function(){RYU.swapAppTab('configuration','configuration_tab0','configuration_section0');},false);
			document.getElementById("configuration_tab1").addEventListener(iDown,function(){RYU.swapAppTab('configuration','configuration_tab1','configuration_section1');},false);
			document.getElementById("configuration_tab2").addEventListener(iDown,function(){RYU.swapAppTab('configuration','configuration_tab2','configuration_section2');},false);
			document.getElementById("configuration_tab3").addEventListener(iDown,function(){RYU.swapAppTab('configuration','configuration_tab3','configuration_section3');},false);
	
	// Tab Bar Buttons
	document.getElementById('addonsbutton').addEventListener(iDown,function(){RYU.togglePanel('addons_panel');},false);
			document.getElementById('addonsdone').addEventListener(iDown,function(){RYU.togglePanel('addons_panel');},false);
	document.getElementById('optbutton').addEventListener(iDown,function(){RYU.togglePanel('opt_panel');},false);
		document.getElementById('optdone').addEventListener(iDown,function(){RYU.togglePanel('opt_panel');},false);

		iScrollToggle(config.iscroll_iscroll);	
		
	// Add Style Inputs
		document.getElementById("newstyle_tab0").addEventListener(iDown,function(){RYU.swapAppTab('newstyle','newstyle_tab0','newstyle_section0');},false);
		document.getElementById("newstyle_tab1").addEventListener(iDown,function(){RYU.swapAppTab('newstyle','newstyle_tab1','newstyle_section1');},false);
		document.getElementById("newstyle_tab2").addEventListener(iDown,function(){RYU.swapAppTab('newstyle','newstyle_tab2','newstyle_section2');},false);

		var sec = ['pos','pad','margin','bordersize'];
		var box = ['top','left','bottom','right','top_units','left_units','bottom_units','right_units'];
		for (var s=0; s < sec.length; s++) {
				document.getElementById('css_object_'+sec[s]+'_linked').addEventListener('change',function(){RYU.cssLinkCheck(this);},false);
			for (var b=0; b < box.length; b++) {
				console.log('css_object_'+sec[s]+'_'+box[b]);
				document.getElementById('css_object_'+sec[s]+'_'+box[b]).addEventListener('change',function(){RYU.cssLinkCheck(this);},false);
			}
		}
		var inputs = document.getElementById('newstyle').getElementsByTagName('input');
		var select = document.getElementById('newstyle').getElementsByTagName('select');
		for (var i=0; i < inputs.length; i++) {
			inputs[i].addEventListener('change',function(){RYU.buildCustomCSS();},false);
		}
		for (var s=0; s < select.length; s++) {
			select[s].addEventListener('change',function(){RYU.buildCustomCSS();},false);
		}
	
	if (xfileman==1) {
		// swap out SAVE instructions //
		document.getElementById('instruct0').style.display="none";
		document.getElementById('instruct1').style.display="block";
		// Remove JS Open File Form //
		document.getElementById('file_chooser').innerHTML="";
		// Insert Open_File ScanDir //
		var scan_dir = document.createElement('iframe');
		scan_dir.setAttribute('id','file_list');
		scan_dir.setAttribute('style','display:none;');
		scan_dir.src="ryuzinewriter/php/scandir.php";
 		document.getElementById('scandir').appendChild(scan_dir);
		// Insert Save_WIP dialog //
		var wip_box = document.createElement('iframe');
		wip_box.setAttribute('id','save_wip_frame');
		wip_box.setAttribute('scrolling','no');
		wip_box.src = "ryuzinewriter/php/save_wip.php";
		document.getElementById('wip_input').appendChild(wip_box);
		// Insert Save File button and dialog //
		document.getElementById('ex_file').style.display="block";
		var save_box = document.createElement('iframe');
		save_box.setAttribute('id','save_file_frame');
		save_box.setAttribute('scrolling','no');
		save_box.src = "ryuzinewriter/php/save_file.php";
		document.getElementById('save_input').appendChild(save_box);
		// Insert Package Builder //
		var pack_it = document.createElement('iframe');
		pack_it.setAttribute('id','build_package_frame');
		pack_it.setAttribute('style','height:240px;');
		pack_it.src = "ryuzinewriter/php/build_package.php";
		document.getElementById('packaging').appendChild(pack_it);
		// insert image folder list
		setTimeout(function(){
			var image_folders = document.getElementById('file_list').contentWindow.images;
			var image_list = document.getElementById('imagefolder_name');
			for (var i=0; i < image_folders.length; i++) {
				var image_opt = document.createElement('option');
					image_opt.value = image_folders[i];
					image_opt.innerHTML = image_folders[i];
				image_list.appendChild(image_opt);
			};
		},1000);
		// insert list of add-ons in Config Builder
		setTimeout(function(){
			RYU.config.addonsList = document.getElementById('file_list').contentWindow.addons;
			for (var a=0; a < RYU.config.addonsList.length;a++) {
				readConfig(RYU.config.addonsList[a]);
			}
			if ( parseInt((RYU.config.addonsList.length/4)*1000) > buildwait) {
				buildwait = parseInt( (RYU.config.addonsList.length/4)*1000);
			}
		},1000);	

		// insert list of themes in Config Builder
		setTimeout(function(){
			var themes_pull = document.getElementById('file_list').contentWindow.themes;
			var themes_list = document.getElementById('config_themes_list');
			var platforms_list = [
				['deskTheme','Desktop General/Fallback'],
				['winTheme' ,'Windows Systems'],
				['macTheme' ,'Mac OSX Systems'],
				['nixTheme' ,'Linux Systems'],
				['iOSTheme' ,'iOS Devices'],
				['andTheme' ,'Android Devices'],
				['wp7Theme' ,'Windows Phone 7'],
				['w8mTheme' ,'Windows 8 Metro/Modern UI'],
				['bbtTheme' ,'BlackBerry Devices']
				];
			var themes_html = "";
			for (var p=0; p < platforms_list.length; p++) {
				themes_html = themes_html + '<select id="'+platforms_list[p][0]+'" name="'+platforms_list[p][0]+'">'+
				'<option value="">NONE</option>';
				for (var t=0; t < themes_pull.length; t++) {
					themes_html = themes_html + '<option value="'+themes_pull[t]+'">'+themes_pull[t]+'</option>';
				}
				themes_html = themes_html + '</select> '+platforms_list[p][1]+'<br/>';
			}
			themes_list.innerHTML = themes_html;
		},1000);

	} else {
		// remove save file option from editor menu
		var ops = document.getElementById('ed_file_operations').getElementsByTagName('option');
		document.getElementById('ed_file_operations').removeChild(ops[ops.length-1]);
		// remove save catalog from rackbuilder menu
		ops = document.getElementById('rack_sel_file').getElementsByTagName('option');
		document.getElementById('rack_sel_file').removeChild(ops[ops.length-1]);
		// use static list of addons from config file
		for (var a=0; a < RYU.config.addonsList.length;a++) {
			readConfig(RYU.config.addonsList[a]);
		}
		if ( parseInt( (RYU.config.addonsList.length/4)*1000 ) > buildwait) {
			buildwait = parseInt( (RYU.config.addonsList.length/4)*1000);
		}
	}
	setTimeout(function(){buildConfigAddonsList(RYU.config.addonsList);},buildwait);


function readConfig(addon_name) {
	var url = baseurl+'/ryuzine/addons/'+addon_name+'/'+addon_name+'.config.js';
	var jsonFile = new XMLHttpRequest();
	jsonFile.open("GET",url,true);
	jsonFile.send();
	jsonFile.onreadystatechange = function(){
		exists = false;	// assume it doesn't
		if (jsonFile.readyState== 4 && jsonFile.status == 200){
			addons_info[''+addon_name+'']={};
			var file_parsed = jsonFile.responseText.split(/\n/);
			for (var f=1; f < 7; f++) {
				file_parsed[f] = file_parsed[f].replace(/\'|\"|,/gi,'');
				var info_line  = file_parsed[f].split(/:(?!\/\/)/);
				// if info_line didn't split data is missing, make placeholders...
				if (info_line.length<2){ info_line = ['',''];}
				addons_info[''+addon_name+''][''+info_line[0].toLowerCase().trim()+'']=''+info_line[1].trim()+'';
			}
		}
	}
}
function buildConfigAddonsList(addons_pull) {
	// first check that addon_info entries exist
	for (var a=0; a < addons_pull.length; a++) {
		if (!addons_info[''+addons_pull[a]+'']) {
			addons_info[''+addons_pull[a]+'']={};	// create empty object
			var about = '<span style="color:red;">The config file for this add-on is missing.  If loaded it will not work.  You should remove it from the /addons folder.</span>';
		} else {
			var about = 'The config file did not contain information about this add-on.';
		}
		// now, catch missing or empty info
		var fillinfo = [
			["name" 	, ''+addons_pull[a]+''],
			["version" 	, "Unknown"],
			["author" 	, "Unknown"],
			["url" 		, "#"],
			["license" 	, "Unknown"],
			["about" 	, about]
		];
		// and populate empty entries with default data
		for (var f=0; f < fillinfo.length; f++) {
			if (!addons_info[''+addons_pull[a]+''][''+fillinfo[f][0]] || addons_info[''+addons_pull[a]+''][''+fillinfo[f][0]+'']==null) {
				addons_info[''+addons_pull[a]+''][''+fillinfo[f][0]+''] = fillinfo[f][1];
			}		
		}
	}
	// Buildy buildy!
	var addons_list = document.getElementById('config_addons_list');
	var addons_html = '<table class="wp-list-table widefat plugins" id="available_addons">\n'+
	'<thead>\n'+
	'	<tr>\n'+
	'		<th scope="col" class="manage-column column-cb check-column">\n'+
	'			<label class="screen-reader-text" for="cb-select-all-1">Select All</label>\n'+
	'			<input type="checkbox" onclick="if(this.checked){RYU.all_addons_selected(true);}else{RYU.all_addons_selected(false);}">\n'+
	'		</th>\n'+
	'		<th scope="col" class="manage-column column-name">Add-On</th>\n'+
	'		<th scope="col" class="manage-column column-description">Description</th>\n'+
	'	</tr>\n'+
	'</thead>\n'+
	'<tbody>\n';
	for (var a=0; a < addons_pull.length; a++) {
		if (addons_pull[a]!='socialwidget') { // socialwidget is automatic if no wp widget loads
		addons_html+='<tr class="inactive"><th scope="row" class="check-column">'+
		'<input type="checkbox" value="'+addons_pull[a]+'" onclick="if(this.checked){RYU.add_selected_addon(this);}else{RYU.cut_selected_addon(this);}" /></th><td class="plugin-title"><strong>'+addons_info[''+addons_pull[a]+'']['name']+'</strong></td>\n'+
		'<td class="column-description desc"><div class="plugin-description"><p>'+addons_info[''+addons_pull[a]+'']['about']+'</p></div><div class="second plugin-version-author-uri">Version '+addons_info[''+addons_pull[a]+'']['version']+' | <a href="'+addons_info[''+addons_pull[a]+'']['url']+'" target="_blank">'+addons_info[''+addons_pull[a]+'']['author']+'</a> | '+addons_info[''+addons_pull[a]+'']['license']+' License</div>\n'+
		'</td></tr>';
		}
	} 
	addons_html+='</tbody>\n'+
	'</table>\n'+
	'<p id="addons_load_order"><strong>Add-On Load Order:</strong> (no addons will be loaded) </p>\n';
	addons_list.innerHTML = addons_html;
}

	// Clear Splash Screen //
	splashAction();

	if (device.Platform == "IE") { 
	RYU.fixlayout(1); 
	setTimeout(function(){RYU.slideSpace(6);},3000);
	setTimeout(function(){RYU.slideSpace(0);},5000);
	}
	switchDevice(0);
	
	if (W<600 || device.OS=='iOS' || device.OS=='Android') {
		alert(_lc("Ryuzine Writer is not designed for small screen devices.  The mobile interface is experimental and incomplete.  Do not use it for production."));
	}
	
	toolCheck();

	// if custom OS was set for simulator retrieve it and write into page
	if (!Get_Cookie("rzw_customos")) {
		// none set
	} else {
		customOSadds = JSON.parse(Get_Cookie("rzw_customos"));
		for (var c=0; c < customOSadds.length; c++) {
			customOSstyles(c);
		}
	}
			

}


function iScrollApply(element,area,scroll) {
	// error catch and bail if non-existent target(s)
	if (typeof element == 'string') {
		if (!document.getElementById(''+element+'')) {
			return;
		} else {
		element = document.getElementById(''+element+'');
		}
	}
	if (area == null) { area = 'area';}
	if (typeof area == 'string') {
		if (!document.getElementById(''+area+'')) {
			if (element.getElementsByClassName(''+area+'').length > 0) {
				area = element.getElementsByClassName(''+area+'')[0];
			} else {
				return;
			}
		} else {
			area = document.getElementById(''+area+'');
		}
	}
	if (scroll==null) { scroll = area;} else { 
		if (!document.getElementById(''+scroll+'')) {
			if (element.getElementsByClassName(''+scroll+'').length > 0) {
				scroll = element.getElmentsByClassName(''+scroll+'')[0];
			} else {
				scroll = area;
			}
		} else {scroll = document.getElementById(''+scroll+''); }
	}
	scroll.scrollTop=0;
	// Now apply iScroll if we can
	if (typeof iScroll != "undefined" && config.iscroll_iscroll == 1) {
		// scroller overflow = hidden;
		scroll.style.overflow = "hidden";
		scroll.style.height = "auto";
		var s = iscrollers.length;
		var scroller_exists = 0;	// assume it does not exist
		for (var x=0; x < s; x++) {
			if (iscrollers[x][0]==element.id && iscrollers[x][1] != null) {
				scroller_exists = 1;
				onRebind(iscrollers[x][1]);	// refresh it
			}
		}
		// ok, scroller doesn't exist so we will make it
		if (scroller_exists==0) {
			iscrollers[s] = [];
			iscrollers[s][0] = element.id;
			if (nativeScroll==undefined && (device.Platform != "Firefox" && device.Platform != "IE")) {
					iscrollers[s][1] = new iScroll(area, { scrollbarClass: 'iscrollbar', scrollbars: 'custom', mouseWheel: true, interactiveScrollbars: true,
					onBeforeScrollStart: function() {return false;},
					onScrollMove: function () {touchmoveCheck=1;},
					onBeforeScrollEnd: function() {touchmoveCheck = 0;},
					tap: true	
				});
			} else {
				//onBeforeScrollStart makes list "sticky" if Pan+Zoom is turned on //
				iscrollers[s][1] = new iScroll(area, { scrollbarClass: 'iscrollbar', scrollbars: 'custom', mouseWheel: true, interactiveScrollbars: true,
					onScrollMove: function () {touchmoveCheck=1;},
					onBeforeScrollEnd: function() {touchmoveCheck = 0;},
					tap: true
				});			
			}
		}
	} else {	// iScroll is either undefined OR nativeScroll is defined
		scroll.style.height = '';
		if ( (config.nscroll==1 && device.Platform == "iOS" && nativeScroll != undefined && config.zoompan == 1 && zoomed == 0 ) || 
			 (config.nscroll==1 && device.Platform == "Android" && device.v > 2  && config.zoompan == 1 ) || 
			 device.Platform == "WP7") {
			scroll.style.overflow  = "auto";
			scroll.style.overflowX = "hidden";
			if (nativeScroll != undefined) {
				scroll.style[nativeScroll] = "touch";
			}
		} else {
			if ('ontouchstart' in document.documentElement) {
				scroll.style.overflow = "hidden";
				scroll.addEventListener('touchstart',RYU.scrollIt,false);
			} else {
				scroll.style.overflow  = "auto";
				scroll.style.overflowX = "hidden";
			};
		}
	// Nuke iScroll Objects
		for (var i=0; i < iscrollers.length; i++) {
			if (iscrollers[i][1]!=null) {
				iscrollers[i][1].destroy();
				iscrollers[i][1]=null;
			}
		}
		area.children[0].setAttribute('style','');	// iScroll doesn't clean up after itself
	}
};	// end of iScrollApply

// This looks for the Table Operations Xinha Plugin Buttons
var toolCheck = function() {
	if (config.wysiwyg==1) {
		if (toolcheck==null) {
			toolcheck = window.setInterval(function(){
				if (document.getElementById('TO-table-prop')) {
					window.clearInterval(toolcheck);toolcheck=null;
					var tableops = document.getElementById('TO-table-prop').parentNode.parentNode.parentNode.parentNode;
						tableops.id = 'table_operations';
						tableops.className = tableops.className+' hide';
				}
			},100);
		}
		// if plugin didn't load don't check forever
		toolcatch = setTimeout(function(){clearInterval(toolcheck);toolcheck=null;clearTimeout(toolcatch);toolcatch=null;},5000);
	}
}

var toggleTableOptions = function() {
	if (document.getElementById('table_operations')) {
		var tableops = document.getElementById('table_operations');
		if (hasClass(tableops,'hide')) {
			addClass(tableops,'show');
			removeClass(tableops,'hide');
		} else {
			addClass(tableops,'hide');
			removeClass(tableops,'show');
		}
		RYU.adjustBox();RYU.resize_panels();
	}
}

var toggleToolBar = function() {
		var toolbar = document.getElementById('leftbox').getElementsByTagName('table')[0].getElementsByTagName('div')[0];
		if (hasClass(toolbar,'collapsed')) {
			removeClass(toolbar,'collapsed');
		} else {
			addClass(toolbar,'collapsed');
			toolbar.parentNode.style.height = "";
		}
		RYU.adjustBox();RYU.resize_panels();
}

var splashAction = function() {
		if (config.rzw_themeset!=0) {
			var checkval = 2;	// look for tcheck width 2px
		} else { 
			var checkval = 1;	// look for tcheck width 1px
		}
		if (handle==null) {
			handle = window.setInterval(function(){
				if (document.getElementById('tcheck').clientWidth==checkval && document.getElementById('vcheck').clientWidth==1) {
					console.log('binder trigger of clearSplash('+splashad+')');
					clearSplash(splashad);
					window.clearInterval(handle);
					handle = null;
				}
			},30);
		}
		// if theme has not loaded in 2 seconds proceed anyway
		splashcatch = setTimeout(function(){clearSplash(splashad);window.clearInterval(handle);handle=null;clearTimeout(splashcatch);splashcatch=null;},2000);
		splashAction = function(){};	// we only want this to run once
}

function clearSplash(adtime) {
	if (adtime==null) { adtime = 0;} else { splashad = adtime; }
	// Clear Splash Screen //
	clearTimeout(splashoff);clearTimeout(splashout);clearTimeout(splashload);clearTimeout(adtrigger); // clear any existing timers
	splashoff = null; splashout = null; splashload = null; adtrigger = null;
	var loadicon_clear = function(){document.getElementById('loadicon').className='';};
	var splash_ani_out = function(){document.getElementById('splash').className='splash_out';};
	var splash_no_show = function(){document.getElementById('splash').style.display = 'none';};
		if (cssTransitionDelay != undefined && cssTransitionDuration != undefined) {
			var delay = getStyle('splash',cssTransitionDelay);
			var duration = getStyle('splash',cssTransitionDuration);
			if (delay==null) { delay = 0 };
			if (duration==null) {duration = 0};
			splashtime = parseInt( (parseFloat(duration)+parseFloat(delay))*1000 );
			splashload= setTimeout(loadicon_clear,splashtime); 
			document.getElementById('splash').className="splash_out";
			splashoff = setTimeout(splash_no_show,splashtime);
		} else {
			document.getElementById("loadicon").className="";
			document.getElementById('splash').style.display="none";
		}
};
function togglePanel(n) {
	onRebind(addonsscroll);onRebind(optscroll);
	clearTimeout(upboxtimer);
	clearTimeout(paneltimer);
	var panels = document.getElementsByClassName('panel');
	if (isNaN(n)) { // if ID is passed find index of ID
		for (var p=0; p < panels.length; p++) {
			console.log('TOGGLE PANEL: panels['+p+'].id='+panels[p].id);
			if (panels[p].id==n) { n = p;}
		}
	}
	if (up_box.style.display!='block') {
		up_box.style.display="block";
		up_box.style.visibility="visible";
		var paneltimer = setTimeout(function(){
			addClass(panels[n],'in');
			removeClass(panels[n],'out');
		},5);
	} else {
		console.log('TOGGLE PANEL: n = '+n);
		if (n=='all' || hasClass(panels[n],'in') ) {
			for (var p=0; p < panels.length; p++) {
				console.log('TOGGLE PANEL: panels['+p+']');
				addClass(panels[p],'out');
				removeClass(panels[p],'in');
			}
			var upboxtimer = setTimeout(function(){up_box.style.display="none";up_box.style.visibility="hidden";},1001);
		} else {
			for (var p=0; p < panels.length; p++) {
				addClass(panels[p],'out');
				removeClass(panels[p],'in');
			}
			addClass(panels[n],'in');
			removeClass(panels[n],'out');
		}
	}
};

function devSize() {
	devH = myDevice.offsetHeight;
	devW = myDevice.offsetWidth;
}

function adjustBox() {
	if (autoAdjust==1) {
		myBody = document.getElementsByTagName('body')[0].offsetHeight;
	winSize();
	var size = winSize();
	W = size.W;
	H = size.H;
		document.getElementById('outputBox').style.height = (myBody - 200)+"px";
		document.getElementById('stylesBox').style.height = (myBody - 200)+"px";
		document.getElementById('configBox').style.height = (myBody - 200)+"px";
		document.getElementById('dataBox').style.height = (myBody - 200)+"px";
		document.getElementById('leftbox').style.height = "100%";
			document.getElementById('inputBox').style.height = "100%";
		if (config.rzw_wysiwyg == 0 ) {
		} else {
			document.getElementById('inputBox').parentNode.addEventListener('DOMNodeInserted',function(){xinhaInsert();});
		}
	}
}
var xinhaInsert = function() {
	if (document.getElementById('inputBox').previousSibling.id == "XinhaIFrame_inputBox") {
		adjustEditor();
		xinhaInsert = function(){};
	}
}

function adjustEditor() {
	if (typeof xinha_editors.inputBox != "undefined") {
		if ( device.Platform=="iOS" && device.v > 4) {
			var par = document.getElementById('XinhaIFrame_inputBox').parentNode;
			par.parentNode.previousSibling.style.display="none";
			par.parentNode.nextSibling.style.display="none";
			par.className="xinha_mobile";
		} else if (device.Platform=="Android" && device.v > 2) {
			var par = document.getElementById('XinhaIFrame_inputBox').parentNode;
			par.parentNode.previousSibling.style.background="none";
			par.parentNode.nextSibling.style.background="none";
			par.style.height = "100%";
			par.style.width = "100%";			
		} else {
		xinha_editors.inputBox.sizeEditor("100%", "100%", true, true);
		}
	}
}

function devSelector() {
	var devOpts = "";
	for (var m=0; m < config.deviceList.length; m++) {
		devOpts = devOpts+'<option value="'+m+'">'+config.deviceList[m][0]+'</option>\n';
	}
	console.log(devOpts);
	devSelect.innerHTML = devOpts;
}
var aboutDialog = function() {
		var about_textbox = ''+
				'	<div style="height:72px;overflow:hidden;text-align:center;margin-bottom:5px;">'+
				'		<a href="http://www.ryumaru.com" style="border: none;text-decoration:none;color: #000;">'+
				'			<div id="aboutlogo"></div>'+
				'		</a>'+
				'	</div>'+
				'	<p style="text-align:center;"><small><strong>Ryuzine Writer</strong><br/>'+
				'	'+RYU._lc("Version")+' '+version+'<br/></p>'+
				'	<p>'+RYU._lc("Ryuzine™ is a javascript application designed for publishing content to the web and mobile devices in a familiar magazine-style format.")+' '+RYU._lc("Publishing Kit available at")+' <a href="http://www.ryumaru.com/products/ryuzine" target="_blank">www.ryumaru.com</a>.</p>'+
				'	<p>'+RYU._lc("Ryuzine was created by K.M. Hansen, original code ©2011-2015 All Rights Reserved.")+'</p>'+
				'	<p>'+RYU._lc("Read the license and a list of project contributors:")+' <a href="'+baseurl+'ryuzinewriter/LICENSE.txt" target="_blank">'+RYU._lc("LICENSE FILE")+'</a>, <a href="'+baseurl+'ryuzinewriter/AUTHORS.txt" target="_blank">'+RYU._lc("CONTRIBUTORS")+'</a></p>'+
				'	<p>'+RYU._lc("Ryuzine and the Ryuzine logos are trademarks of K.M. Hansen and Ryu Maru. All rights reserved. The names of other companies, products, services and content distributed via the Ryuzine publishing platform are the property of their respective owners.")+'</p><hr/>'+
				'	<h2>Add-ons</h2>';
				for (var key in addon) {
					if (!addon.hasOwnProperty(key)) { continue; }	// do not include keys added by prototype
					console.log('key in = '+key);
					// 'register' is a reserved object, undefined = addon that didn't load
					if (key!='register' && typeof addon[''+key+''].name!=undefined) {
					console.log('ABOUT DIALOG: '+addon[''+key+''].name);
					about_textbox+='<p>'+RYU._lc("Name")+': '+addon[''+key+''].info.name+'<br/>'+
					''+RYU._lc("Version")+' :'+addon[''+key+''].info.version+'<br/>'+
					''+RYU._lc("Author")+': '+addon[''+key+''].info.author+'<br/>'+
					''+RYU._lc("Website")+': <a href="'+addon[''+key+''].info.url+'" target="_blank">'+addon[''+key+''].info.url+'</a><br/>'+
					''+RYU._lc("License")+': '+addon[''+key+''].info.license+'<br/>'+
					''+RYU._lc("Description")+': '+addon[''+key+''].info.about+'<hr/>';
					}
				};
		addDialogBox('about',RYU._lc('About Ryuzine'),about_textbox);
		toggleDialog('about');	// now open it
		// replace this function with toggle
		aboutDialog = function() { toggleDialog('about');}
}

function bookBinder() {
	// iScroll 5 Compatibility Fix //
	if (typeof IScroll != "undefined") {
		iScroll = IScroll;
	}
	// over-ride for unsupported platforms
if ( (device.Platform == "Android" && device.v < 3) || (device.Platform == "Safari"  && device.v < 4) || (device.Platform == "WP7") ) { iScroll = undefined; }

	var panels = document.getElementsByClassName('style1');
	for (var a=0; a < panels.length; a++) {
		iScrollApply(panels[a]);
	}
}


function reWrite() {
var sourceFile = document.getElementById('sourceframe').contentWindow.document;
var iScreenSim = myWindow.contentWindow.document;
// Generally what this does is it looks for at least one generic style with the name and uses 	//
// the first one it finds.  If there is one with a unique ID it will favor that one instead 	//
// Otherwise it assumes there isn't one and uses a stand-in variable.							//
if ( sourceFile.getElementById('permalink')) {	// prefer new object
	var permaLink = sourceFile.getElementById('permalink').innerHTML;
} else if ( sourceFile.getElementsByClassName('offline').length > 0 ) { // Look for generic version first
	var permaLink = sourceFile.getElementsByClassName('offline')[0].innerHTML; // Only grab 1st one
} else if ( sourceFile.getElementById('offline') ) {	// Favor ID if available
	var permaLink = sourceFile.getElementById('offline').innerHTML;
} else { var permaLink = "no"; }	// Assume no offline is set
// Error catch empties //
if (permaLink == "" || permaLink == null || permaLink == undefined) {
	permaLink = "no";
}

if ( sourceFile.getElementById('app_logo') ) {
	if (sourceFile.getElementById('app_logo').getElementsByTagName('img').length > 0 ) {	// ok there is an image
		if (sourceFile.getElementById('app_logo').getElementsByTagName('img')[0]) { // grab the first one
			var applogo = sourceFile.getElementById('app_logo').getElementsByTagName('img')[0].src;	// grab the src param
		} else {
			var applogo = '';
		}
	} else { var applogo = ''; }
} else {
	var applogo = '';
}

if (sourceFile.getElementById('summary')) {
	// strip out non-text content
	var summaryBlock = sourceFile.getElementById('summary').textContent || sourceFile.getElementById('summary').innerText;
} else { var meta_description = ""; var summaryBlock = ""; }
if (summaryBlock == "") {
	if (doc_summary != "") { 
		summaryBlock = doc_summary; 
	} else { 
		summaryBlock = "";
	}
}

if (sourceFile.getElementsByClassName('splash_screen').length > 0 ) {
	var splashScreen = sourceFile.getElementsByClassName('splash_screen')[0].innerHTML;
} else if (sourceFile.getElementById('splash_screen')) { // Look for ID version
	var splashScreen = sourceFile.getElementById('splash_screen').innerHTML;
} else if (sourceFile.getElementsByClassName('splash-screen').length > 0 ) { // Look for ID Export version 
	var splashScreen = sourceFile.getElementsByClassName('splash-screen')[0].innerHTML;
} else {
	var splashScreen = "";
}

if (sourceFile.getElementsByClassName('splash_title').length > 0 ) { // Look for generic version
	splashTitle = sourceFile.getElementsByClassName('splash_title')[0].innerHTML; // Only grab 1st
} else if (sourceFile.getElementById('splash_title')) { // Look for ID version
	splashTitle =sourceFile.getElementById('splash_title').innerHTML;
} else if (sourceFile.getElementsByClassName('splash-title').length > 0 ) { // look for IE Export version
	splashTitle =sourceFile.getElementsByClassName('splash-title')[0].innerHTML;
} else if (sourceFile.getElementsByTagName('title').length > 0 ) { // Use whatever is in the title tag (if anything)
		splashTitle = sourceFile.getElementsByTagName('title')[0].innerHTML;
} else {
		splashTitle = "My Magazine";
}
// Make sure Title is not empty //
if (splashTitle=="" || splashTitle==null || typeof(splashTitle)==undefined) {
	splashTitle = "My Magazine";
}


if (sourceFile.getElementsByClassName('social_widget').length > 0) {
	var customWidget = 1;
	var socialWidget = sourceFile.getElementsByClassName('social_widget')[0].innerHTML;
} else if (sourceFile.getElementById('social_widget')) {
	var customWidget = 1;
	var socialWidget = sourceFile.getElementById('social_widget').innerHTML;
} else {
	var customWidget = 0;
	var socialWidget = "";
}

var docBody = sourceFile.getElementsByTagName('body')[0];
if (sourceFile.getElementsByClassName('welcome_sign').length > 0) {
	var welcomeSign = sourceFile.getElementsByClassName('welcome_sign')[0].innerHTML;
} else if (sourceFile.getElementById('welcome_sign')) {
	var welcomeSign = sourceFile.getElementById('welcome_sign').innerHTML;
} else if (sourceFile.getElementsByClassName('welcome-sign').length > 0) { // look for ID Export
	var welcomeSign = sourceFile.getElementsByClassName('welcome-sign')[0].innerHTML;
} else { var welcomeSign = ""; }

var sectionHeads = sourceFile.getElementsByClassName('section_head');
	if ( sectionHeads.length == 0) { sectionHeads = sourceFile.getElementsByClassName('section-head'); }
var sectionHead = [];
	for (var x=0; x<sectionHeads.length; x++) {
		sectionHead[x] = sectionHeads[x].innerHTML;
		if (sectionHead[x] == '' || sectionHead[x] == null) {
			if (x==0) { var secTitle = 'Front Cover';} 
			else if (x==sectionHeads.length-1) { var secTitle = 'Back Cover';}
			else {var secTitle = 'Page '+x;}
			sectionHead[x] = secTitle;
		}
	}
	
var pageBoxes = sourceFile.getElementsByClassName('page_box');
	if (pageBoxes.length == 0) { pageBoxes = sourceFile.getElementsByClassName('group');}
if (!isEven(pageBoxes.length)) {
	// Number of Pages HAS to be even //
	pagecount = pageBoxes.length+1;
	sectionHeads = sectionHeads.length+1;
	} else {
	pagecount = pageBoxes.length;
	sectionHeads = sectionHeads.length;
	}
var pageBox = [];
var pageBoxColumns = [];
	for (var x=0; x<pagecount; x++) {
		if (pageBoxes[x]==undefined) {
		// If a page needed insertion put a message that it is blank intentionally //
		sectionHead[x] = 'Page '+x;
		pageBox[x] = escape('<p>This Page Was Intentionally Left Blank</p>');
		pageBoxColumns[x] = "col1";
		} else {
			pageBox[x] = escape(pageBoxes[x].innerHTML);
			// Find the columns for this page //
			if (pageBoxes[x].className.length > 8 ) { 	// look for colsx class
				var findcount = pageBoxes[x].className.split(" ");
				pageBoxColumns[x] = findcount[1]; //set Target to number indicated
			}
			else {
				pageBoxColumns[x] = "col1";
			}
		}
	}



var lightBoxes = sourceFile.getElementsByClassName('light_boxed');
var lightBoxed = [];
var lightBoxedOrient = [];
var lightBoxedId = [];
var boxad_as_lightbox = false;
	for (var x=0; x<lightBoxes.length; x++) {
		lightBoxed[x] = lightBoxes[x].innerHTML;
		// Find orientation of this lightbox content //
		if (lightBoxes[x].className.length > 11 ) { 	// look for orientation class
			var findcount = lightBoxes[x].className.split(" ");
			lightBoxedOrient[x] = findcount[1];
		}
		else { // assume landscape orientation if not stated
			lightBoxedOrient[x] = "land";
		}
		if (lightBoxes[x].id) {
			lightBoxedId[x] = lightBoxes[x].id;
		} else {
			lightBoxedId[x] = x;
		}
		if (lightBoxedId[x] == 'boxad') {
			boxad_as_lightbox = true;
		}
	}

var lightBoxLinks = sourceFile.getElementsByClassName('lightbox_link');
var lightBoxLink = [];
var lightBoxTarget = [];
var lightBoxType = [];
	for (var x=0; x<lightBoxLinks.length; x++) {
		lightBoxLink[x] = lightBoxLinks[x].innerHTML;
		if (lightBoxLinks[x].tagName.toLowerCase() != "a") { // OLD method with DIVs
			// Find the target for this link //
			if (lightBoxLinks[x].className.match(/ t-/gi)) { // look for t-x class
				lightBoxTarget[x] = lightBoxLinks[x].className.match(/t-[^\s]+/gi)[0].replace('t-','');
				if (!isNaN(parseInt(lightBoxTarget[x]))) { // if it is a number prefix with "lightbox-"
				lightBoxTarget[x] = 'lightbox-'+lightBoxTarget[x]+'';
				}
			}
			else {
				lightBoxTarget[x] = 'lightbox-0';
			}
			// Find the type for this link //
			if (lightBoxLinks[x].className.length > 17 ) { // look for type class
				var findtype = lightBoxLinks[x].className.split(" ");
				var typecount = findtype[2].split("_");
				lightBoxType[x] = typecount[1]; // set Type to that indicated
			} else {
				lightBoxType[x] = "";
			}
		} else {	// New method with anchor links
			var	lbtarget = lightBoxLinks[x].href;
				lbtarget = lbtarget.split('#');
				if (!isNaN(parseInt(lbtarget[1]))) {	// if it just a number prefix it with "lightbox-"
				lightBoxTarget[x] = 'lightbox-'+lbtarget[1]+'';
				}else{
				lightBoxTarget[x] = ''+lbtarget[1]+'';
				}
			var lbstyles = lightBoxLinks[x].className;
				lbstyles = lbstyles.split(' ');
			for (var s=0; s < lbstyles.length; s++) {
				if (lbstyles[s].match(/lb_/gi)) {
					lightBoxType[x] = lbstyles[s];
				} else {
					lightBoxType[x] = "";
				}
			}
		}
	}
// This replaces links to lightbox content with fancy ones //
var linkReplace = sourceFile.getElementsByClassName('new_link');
var newLink = '';
	for (var x=0; x<linkReplace.length; x++) {
		if (lightBoxType[x]=="" || lightBoxType[x]==undefined) { 
			var lb_leader = "";
			lightBoxType[x] = "lightboxbutton"; } 
		else {
			if (lightBoxType[x].match(/lb_/gi)) {
				var lb_leader = "";
			} else {
				var lb_leader = "lb_";	//<-- old method
			}
		}
		if (window.devicePixelRatio >= 2) {
			var rez = "hires/";
		} else { 
			var rez = "";
		}
		newLink = '<div class="lightboxthumb center">'+lightBoxLink[x]+'<a href="javascript:RYU.lightBox(\''+lightBoxTarget[x]+'\',1);" ontouchstart="RYU.lightBox(\''+lightBoxTarget[x]+'\',1);" class="'+lb_leader+lightBoxType[x]+'"></a></div>\n';
		linkReplace[x].innerHTML = newLink;
	}

if (sourceFile.getElementsByClassName('exit_sign').length > 0) {
	var exitSign = sourceFile.getElementsByClassName('exit_sign')[0].innerHTML;
} else if (sourceFile.getElementById('exit_sign')) {
	var exitSign = sourceFile.getElementById('exit_sign').innerHTML;
} else if (sourceFile.getElementsByClassName('exit-sign').length > 0) { // look for ID Export
	var exitSign = sourceFile.getElementsByClassName('exit-sign')[0].innerHTML;
} else { var exitSign = ""; }

if (sourceFile.getElementsByClassName('copy_right').length > 0) {
	var copyRight = sourceFile.getElementsByClassName('copy_right')[0].innerHTML;
} else if (sourceFile.getElementById('copy_right')) {
	var copyRight = sourceFile.getElementById('copy_right').innerHTML;
} else if (sourceFile.getElementsByClassName('copy-right').length > 0) { // look for ID Export
	var copyRight = sourceFile.getElementsByClassName('copy-right')[0].innerHTML;
} else { copyRight = ""; }

if (sourceFile.getElementsByClassName('appbanner').length > 0) {
	var appbanner = sourceFile.getElementsByClassName('appbanner')[0].innerHTML;
} else if (sourceFile.getElementById('appbanner')) {
	var appbanner = sourceFile.getElementById('appbanner').innerHTML;
} else { var appbanner = ""; }; // Ensures if none is set you don't see "undefined" //

// look for boxad outside of lightbox gallery
if (sourceFile.getElementById('boxad')!=null && boxad_as_lightbox == false) {
	var boxad_html = sourceFile.getElementById('boxad').innerHTML;
} else {
	var boxad_html = "";
}

if (sourceFile.getElementsByClassName('ovr').length > 0) {
	var OVRsupport = 1; } else { var OVRsupport = 0; }

// Is Issue Styles radio button set to "CSS Export Box"?
if (opt_edition == "") {
	if (myCSS.value == "") {	// CSS Export Box is empty
			myCSS.value = issueStyles();	// generate default rules
	}
	alert(''+RYU._lc('Rules in the CSS Export Box are written into the HTML for testing. Before publishing export CSS to an external stylesheet.')+'');
}
inPageCSS = "";	// clear var
// Does the source doc have <style> blocks in it?
if (sourceFile.getElementsByTagName('style').length > 0) {
	// find every <style> block and add the code to inPageCSS variable
	for (var css=0; css < sourceFile.getElementsByTagName('style').length; css++) {
		inPageCSS += sourceFile.getElementsByTagName('style')[css].innerHTML;
	}
}
// if inPageCSS is not empty, should we preserve those styles?
if (inPageCSS!="") { 
	inPageCSS = '/* Preserved In-Page Styles\n    You should move these to an external stylesheet before final publication\n*/\n'+inPageCSS;
	if (opt_inpage==1) {
		if (opt_edition== "") {	// CSS Export box is already being used by Master Styles, just write into HTML
			alert(''+RYU._lc('Your In-Page Styles will be written into the page for testing. Before publishing you should copy them into an external stylesheet.')+'');
		} else {
			myCSS.value = inPageCSS;	// write into both HTML and CSS Export Box 
			alert(''+RYU._lc('Your In-Page Styles will be added to the CSS Export Box and written into the page for testing. Before you publish you should export it to an external stylesheet.')+'');
		}
	} else {
		// you HAVE in-page styles but didn't check "Preserve," make sure they know
		alert(''+RYU._lc('You appear to be using In-Page Styles. Unless you check PRESERVE IN-PAGE STYLES in the Output Options or you copy and paste the CSS code into your external stylesheet they will not be used.'))
	}
} else {
	// nothing to preserve, so set to "off" (does not uncheck box in dialog)
	opt_inpage = 0;
}

// Create Splash Screen, Welcome and Exit Signs //
var newContent = '<!--// publication content below this line //-->\n\n'+
'<div id="ryu_mask">\n'+
'	<div id="front_matter">'+
'		<h1 id="splash_title">'+splashTitle+'</h1>\n\n';
if (summaryBlock != "") {
newContent = newContent+'		<p id="summary">'+summaryBlock+'</p>\n\n';
}
if (applogo != "") {
newContent = newContent+'		<div id="app_logo"><img src="'+applogo+'" width="300"/></div>\n\n';
}
if (splashScreen != "") {
newContent = newContent+'		<div id="splash_screen">'+splashScreen+'</div>\n\n';
}
if (appbanner != "") {
newContent = newContent+'		<div id="appbanner">\n'+appbanner+'</div>\n\n';
}
if (welcomeSign !="") {
newContent = newContent+'		<div id="welcome_sign">'+welcomeSign+'</div>\n\n';
}
newContent = newContent+'	</div> <!--// end of #front_matter //-->'+
'	<div id="issue">';
// Build All the Pages //
for (var x=0; x<pagecount; x++) {
newContent=newContent+'<div class="page" id="page'+x+'">\n<h1 class="header section_head">'+sectionHead[x]+'</h1>\n'+
'<div id="page'+x+'" class="live page_box">\n'+unescape(pageBox[x])+'</div>\n</div>\n';
}
// End of Pages Area //
newContent=newContent+'</div> <!--// end of #issue //-->\n<div id="end_matter">\n';
if (exitSign != "") {
newContent=newContent+'	<div id="exit_sign">'+exitSign+'</div>\n\n';
}
newContent=newContent+'		<h1>Table of Contents</h1>\n'+
'			<ul id="nav">\n';
// Build Table of Contents //
	for (x=0; x<sectionHeads; x++) {
		if (sectionHead[x] != '' || sectionHead[x] != null) {
			newContent=newContent+'<li class="list_up"><a href="#page'+x+'">'+sectionHead[x]+'</a></li>\n';
		}
	}
newContent=newContent+'			</ul>\n<div id="issue_gallery">\n';
if (lightBoxes.length > 0) {
	newContent=newContent+'<h1 class="title">Appendix: Gallery</h1>\n';
	for (x=0; x<lightBoxes.length; x++) {
	newContent=newContent+'<h3>Lightbox Gallery Item:</h3>\n'+
	'<div id="'+lightBoxedId[x]+'" class="light_boxed '+lightBoxedOrient[x]+'">'+lightBoxed[x]+'</div>\n\n';
	}
}

newContent=newContent+'</div>\n';
if (socialWidget != "") {
newContent = newContent+'<div id="social_widget">\n'+socialWidget+'\n</div>\n';
}
if (permaLink != "no") {
newContent = newContent+'<a href="'+permaLink+'" target="_blank">'+permaLink+'</a>';
}
if (copyRight != "") {
newContent = newContent+'<p id="copy_right">'+copyRight+'</p>';
}
newContent = newContent+'	</div> <!--// end of #End Matter //-->'+
'</div> <!--// end of #ryu_mask //-->';

newContent=newContent+'<div id="splash">\n'+
	'	<div id="splashcell">\n'+
	'		<div id="splashblock">\n'+
	'			<div style="background:transparent url(\'ryuzine/images/app/icons/ryuzine-icon-02.png\') 0 0 no-repeat;height:72px;width:72px;margin:0 auto;-webkit-border-radius:8px;-moz-border-radius:8px;-o-border-radius:8px;-ms-border-radius:8px;border-radius:8px;-webkit-box-shadow:0px 0px 1000px #fff;-moz-box-shadow:0px 0px 1000px #fff;box-shadow:0px 0px 1000px #fff;">\n'+
	'				<p style="display:none;">This page was made for the <img src="ryuzine/images/app/icons/ryuzine-icon-02.png" alt="Ryuzine Icon" height="16" width="16" align="bottom" /> <a href="http://www.ryumaru.com/products/ryuzine/" target="_blank">Ryuzine&trade; webapp</a>.</p>\n'+
	'			</div>\n'+
	'			<p><noscript style="display:block;margin:0 20px;text-align:left;">App Error: Javascript is disabled! Enable both Javascript and Stylesheets to view as a webapp, or disable both to view as a plain page, then reload/refresh.</noscript></p>'+
	'\n		</div>\n'+
	'		<p id="copyright" class="splash-fineprint">Ryuzine and the Ryuzine logos are trademarks of K.M. Hansen &amp; Ryu Maru</p>\n'+
	'	</div>\n'+
	'</div>\n';

iScreenSim.getElementsByTagName('body')[0].innerHTML = newContent;

	var temp = 	'<!DOCTYPE html>\n';
	'<html lang="'+opt_lang+'">\n'
				temp = temp+'<head>\n'+
				'<meta content="text/html; charset=UTF-8" http-equiv="content-type">\n'+
				'<meta name="apple-mobile-web-app-capable" content="yes" />\n';
	if (doc_converted==5) {
		temp = temp+'<meta name="msapplication-TileColor" content="#ADDEFA" />\n'+
				'<meta name="msapplication-TileImage" content="ryuzine/images/app/icons/rack-tile.png" />\n'+
				'<link rel="shortcut icon" type="images/vnd.microsoft.icon" href="ryuzine/images/app/icons/rack-favicon.ico" sizes="16x16 32x32 48x48 64x64 128x128" />\n'+
				'<link rel="icon" type="image/png" href="ryuzine/images/app/icons/rack-favicon.png" />\n'+
				'<link rel="apple-touch-icon-precomposed" sizes="114x114" href="ryuzine/images/app/icons/rack-icon-01.png" />\n'+
				'<link rel="apple-touch-icon-precomposed" sizes="72x72" href="ryuzine/images/app/icons/rack-icon-02.png" />\n'+
				'<link rel="apple-touch-icon-precomposed" href="ryuzine/images/app/icons/rack-icon-03.png" />\n';	
	} else {
		temp = temp+'<meta name="msapplication-TileColor" content="#ADDEFA" />\n'+
				'<meta name="msapplication-TileImage" content="ryuzine/images/app/icons/ryuzine-tile.png" />\n'+
				'<link rel="shortcut icon" type="images/vnd.microsoft.icon" href="ryuzine/images/app/icons/favicon.ico" sizes="16x16 32x32 48x48 64x64 128x128" />\n'+
				'<link rel="icon" type="image/png" href="ryuzine/images/app/icons/ryuzine-favicon.png" />\n'+
				'<link rel="apple-touch-icon-precomposed" sizes="114x114" href="ryuzine/images/app/icons/ryuzine-icon-01.png" />\n'+
				'<link rel="apple-touch-icon-precomposed" sizes="72x72" href="ryuzine/images/app/icons/ryuzine-icon-02.png" />\n'+
				'<link rel="apple-touch-icon-precomposed" href="ryuzine/images/app/icons/ryuzine-icon-03.png" />\n';
	}
	// Add new file meta data //
		if (doc_author != "") {
			temp = temp + '<meta name="author" content="'+doc_author+'"/>\n';
		}
		if (doc_summary != "") {
			temp = temp + '<meta name="description" content="'+doc_summary+'"/>\n';
		}
		if (doc_keywords != "") {
			temp = temp + '<meta name="keywords" content="'+doc_keywords+'"/>\n';
		}
		if (doc_version != "") {
			temp = temp + '<meta name="generator" content="'+doc_version+'"/>\n';
		}
	// back to our regularly scheduled program...			
		if ( opt_js != "" && opt_js != null && opt_loadwhen==0) {
				temp=temp+'<script type="text/javascript" src="'+opt_js+'"><\/script>\n';
				}	
				temp = temp+'<link rel="stylesheet" type="text/css" href="ryuzine/css/ui.css" id="ui_format" />\n';
				if (document.getElementsByName('dTheme')[0].checked) {
						temp=temp+'<link rel="stylesheet" type="text/css" href="ryuzine/theme/dark/theme.css" id="ui_theme" />\n';
				} else if (document.getElementsByName('dTheme')[1].checked) {
						temp=temp+'<link rel="stylesheet" type="text/css" href="ryuzine/theme/light/theme.css" id="ui_theme" />\n';
				} else {
					if ( opt_themename != "" && opt_themename != null ) {
						temp = temp+'<link rel="stylesheet" type="text/css" href="ryuzine/theme/'+opt_themename+'/theme.css" id="ui_theme" />\n';
					} else {
						temp = temp+'<link rel="stylesheet" type="text/css" href="ryuzine/theme/dark/theme.css" id="ui_theme" />\n';
					}	
				}
			if (doc_converted==5) {
				temp = temp+'<link rel="stylesheet" type="text/css" href="ryuzine/css/rackgrid.css" id="screen_format" />\n'+
				'<link rel="stylesheet" type="text/css" href="ryuzine/css/continuous.css" />\n';
			} else {
				temp = temp+'<link rel="stylesheet" type="text/css" href="ryuzine/css/ryuzine_leftbound.css" id="screen_format" />\n';
			}
			// load Master/Issue stylesheet
			if ( opt_edition != "" && opt_edition != null) { 
				temp = temp+'<link rel="stylesheet" type="text/css" href="css/'+opt_edition+'" id="this_issue" />\n' 
			}else{
				temp = temp+'<link rel="stylesheet" type="text/css" href="css/thisissue.css" id="this_issue" />\n';
			};
			// load Edition stylesheet (or a custom external stylesheet)
			if ( opt_css != "" && opt_css != null) {
				temp = temp+'<link rel="stylesheet" type="text/css" href="'+opt_css+'" />\n'; 
			}
			if ( opt_edition == "" ) {
				temp = temp+'<style type="text/css">\n'+myCSS.value+'\n</style>\n';
			}
			if ( opt_inpage == 1) {
				temp = temp+'<style type="text/css" id="myCSS">\n'+inPageCSS+'\n</style>\n';
			}		
				temp = temp+'<link rel="stylesheet" type="text/css" href="ryuzine/css/blank.css" id="colortext" />\n';	
	
			if (!sourceFile.getElementsByTagName('title')[0]) {
				temp = temp+'<title>'+splashTitle+'</title>\n\n';} else {
				temp = temp+'<title>'+sourceFile.getElementsByTagName('title')[0].innerHTML+'</title>\n\n'; 
			}	
		if (opt_config == "test") {
			if (document.getElementById('configBox').value == "" || document.getElementById('configBox').value == "// Custom Configuration File Javascript Code: //") {
				alert(''+RYU._lc('Configuration File is set to TEST but there is no configuration to test!\n A default one will automatically be built for you.')+'');
				RYU.buildConfigFile();
			} 
				temp=temp+'<script type="text/javascript">'+document.getElementById('configBox').value+'<\/script>\n';
				alert(''+RYU._lc('Using TEST CONFIGURATION FILE\n\n Before final export you should switch the Output Options selection for the configuration file to either DEFAULT or a CUSTOM external file.\n Using an in-page configuration file is not recommended.')+'');
		} else {
			if (opt_config == "" || opt_config == null) { opt_config = "ryuzine.config.js"; alert(''+RYU._lc('Configuration File was not defined, using default!')+''); }
				temp=temp+'<script type="text/javascript" src="js/'+opt_config+'" ><\/script>\n';
		}
		if (doc_converted==5) {
			temp = temp+'<script type="text/javascript" src="ryuzine/js/ryuzine.rack.js"><\/script>\n';
		} else {
			temp=temp+'<script type="text/javascript" src="ryuzine/js/ryuzine.js" ><\/script>\n';
		}		
			if ( opt_js != "" && opt_js != null && opt_loadwhen==1) {
				temp=temp+'<script type="text/javascript" src="'+opt_js+'"><\/script>\n';
				}	
			temp=temp+'</head>\n';
			if (doc_converted==5) {
				temp=temp+'<body id="ryuzinerack">\n';
			} else {
				temp=temp+'<body id="ryuzinereader">\n';
			}
				temp=temp+'<a href="#nav" id="skip2nav">Skip to Navigation</a>\n';
				temp=temp+iScreenSim.getElementsByTagName('body')[0].innerHTML+'\n';
		if ( opt_js != "" && opt_js != null && opt_loadwhen==2) {
			temp=temp+'<script type="text/javascript" src="'+opt_js+'"><\/script>\n';
		} 
		if ( boxad_html != "") {
			temp=temp+'<div id="boxad">'+boxad_html+'</div>\n';
		}
		temp=temp+'</body>\n</html>';
	document.getElementById('outputBox').value=temp;
	updatePreview(0);
	RYU.swapAppTab('export','export_tab0','export_section0');
	RYU.swapAppTab('newstyle','newstyle_tab0','newstyle_section0');
}

function loadURL2Sim() {
	extsrc = 1;
	var url = document.getElementById('chooser3').value;
	if (!url.match(/http:\/\//)) {
		url = 'http:\/\/'+url;
	}
	document.getElementById('preview').setAttribute('scrolling','yes');
	document.getElementById('preview').src=url;
	slideSpace(3);
}

function loadTemplate(type) {
if (type==null) { type = 1;}
doc_converted = type;
var tpages = parseInt(document.getElementById('numpgs').value);
var template='<!DOCTYPE html>\n'+
	'<html>\n'+
	'<head>\n'+
	'<meta name="author" content="'+doc_author+'" />\n'+
	'<meta name="keywords" content="'+doc_keywords+'" />\n';
	if (doc_converted==5) {
	template=template+'<meta name="generator" content="Ryuzine Rack 1.0"/>\n';
	}else{
	template=template+'<meta name="generator" content="Ryuzine 1.0" />\n';
	}
	template=template+'<link rel="stylesheet" type="text/css" href="css/'+RYU.config.importStyles+'" id="this_issue" />\n';
	if (document.getElementById('wcyes').checked && document.getElementById('wcstyles').checked) {
		var wcft = document.getElementById('wctype').value;
		var wclz = document.getElementById('wczero').value;
		var scans = document.getElementById('wcfolder').value;
		template = template + '<style type="text/css">\n';
		if (document.getElementById('wccontain').checked) {
			template = template+'.header { height: 5px; visibility: hidden; }\n'+
			'.footer { height: 15px; visibility: hidden; }\n'+
			'.live img { display: none; }\n';
			for (var x=0; x<tpages; x++) {
			if (wclz=="3") {
				if (x>100 && x<1000) { var wc = "0" + x; }
				else if (x>9 && x<100) { var wc = "00" + x; }
				else if (x<10) { var wc = "000" + x;}
				else { var wc = x; }
			} else if (wclz=="2") {
				if (x>9 && x<100) { var wc = "0" + x;}
				else if (x<10) { var wc = "00" + x; }
				else { var wc = x; }
			} else if (wclz=="1" && x < 10) {
				var wc = "0" + x;
			} else {
				var wc = x;
			}
				if (document.getElementById('wccover').checked && x == 0) {
				template = template+'#page'+x+' { background: black url(\'images/'+scans+'/'+document.getElementById('wcprefix').value+wc+document.getElementById('wcsuffix').value+'.'+wcft+'\') center center no-repeat; }\n';	
				} else if (document.getElementById('wccover').checked && x == tpages-1) {
				template = template+'#page'+x+' { background: black url(\'images/'+scans+'/'+document.getElementById('wcprefix').value+wc+document.getElementById('wcsuffix').value+'.'+wcft+'\') center center no-repeat; }\n';				
				} else {
				template = template+'#live'+x+' { background: url(\'images/'+scans+'/'+document.getElementById('wcprefix').value+wc+document.getElementById('wcsuffix').value+'.'+wcft+'\') center center no-repeat; }\n';
				}
			}
			if (document.getElementById('wccover').checked) {
				var cvr0 = '#page0, #page'+(tpages-1)+', ';
				var cvr1 = '#page0, #page'+(tpages-1)+' { background-image: none;}\n';
			} else { var cvr0 = cvr1 = "";  } 
			template = template+cvr0+'.live { -webkit-background-size: contain !important;-moz-background-size: contain !important; -ms-background-size: contain !important; -o-background-size: contain !important; background-size: contain !important;}\n'+
			'@media only screen and (min-width: 480px) and (max-width: 599px) {\n'+
			cvr1+'.live { background: none !important; }\n'+
			'.live img { width: 100%; height: auto; display: block;}\n}\n';
		} else {
			template = template+'.header { height: 5px; visibility: hidden; }\n'+
			'.footer { border: none; }\n'+
			'#footer0 { visibility: hidden;}\n'+
			'.covercorners-back .footer { visibility: hidden; }\n'+
			'.live img { width: 100%; height: auto;}\n';	
			if (document.getElementById('wccover').checked) {
				x = tpages-1;
				if (wclz=="3") {
					var fc = "0000";
					if (x>100 && x<1000) { var wc = "0" + x; }
					else if (x>9 && x<100) { var wc = "00" + x; }
					else if (x<10) { var wc = "000" + x;}
					else { var wc = x; }
				} else if (wclz=="2") {
					var fc = "000";
					if (x>9 && x<100) { var wc = "0" + x;}
					else if (x<10) { var wc = "00" + x; }
					else { var wc = x; }
				} else if (wclz=="1" && x < 10) {
					var fc = "00";
					var wc = "0" + x;
				} else {
					var fc = "0";
					var wc = x;
				}
				template = template+'#page0 { background: black url(\'images/'+scans+'/'+document.getElementById('wcprefix').value+fc+document.getElementById('wcsuffix').value+'.'+wcft+'\') center 0 no-repeat; }\n'+
				'#page'+x+' { background: black url(\'images/'+scans+'/'+document.getElementById('wcprefix').value+wc+document.getElementById('wcsuffix').value+'.'+wcft+'\') center 0 no-repeat; }\n'+				
				'#page0, #page'+(tpages-1)+' { -webkit-background-size: contain;-moz-background-size: contain; -ms-background-size: contain; -o-background-size: contain; background-size: contain;}\n'+		
				'#live0 img, #live'+x+' img { display: none; }'+
				'@media only screen and (min-width: 480px) and (max-width: 599px) {\n'+
					'#page0, #page'+x+' { background-image: none;}\n'+
					'#live0 img, #live'+x+' img { display: block; }\n'+
				'}\n';
			}

		}
		template = template+'</style>';
		document.getElementById('inpage_css').checked = true;
		document.getElementById('configit1').checked  = true;
		if (document.getElementById('wcmanga').checked) { 
			var config = "manga.config.js";
		} else { var config = "comic.config.js";}
		document.getElementById('configName').value = config;
		RYU.outputOptions();
		if (document.getElementById('onerun').checked) {
			setTimeout(function(){RYU.clearSimulator();RYU.refreshSrc();RYU.slideSpace(2);RYU.reWrite();},2000);
		}
		if (xfileman=="1") {
		document.getElementsByName('packtype')[2].checked = true;
		document.getElementsByName('configfile_src')[2].checked = true;
		document.getElementById('advsettings').style.display='none';
		document.getElementById('packtext').style.display='block';
		document.getElementById('add_config_drop').style.display="table-cell";
		document.getElementById('add_css_drop').style.display="table-cell";
		}
	}
	template = template+'</head>\n'+
	'<body>\n';
	template=template+'<div id="front_matter">';

	template=template+'<h1 id="splash_title">'+document.getElementById('magtitle').value+'</h1>\n';
	template=template+'<p id="summary">Write a short summary of your publication, this is often used by search engines as the blurb in search results.</p>';
	if (document.getElementById('applogo').checked) {
	template=template+'<div id="app_logo"></div>\n';
	}
	if (document.getElementById('splashad').checked) {
	template=template+'<div id="splash_screen">\n'+
	''+
	'</div>\n';
	}
	if (document.getElementById('advert').checked) {
	template=template+'<div id="appbanner">\n'+
	'\n'+
	'</div>\n';
	}


	if (document.getElementById('hellogoodbye').checked) {
		template=template+'<div id="welcome_sign"><p>Optional Greeting Message</p></div>\n';
	}
	template=template+'</div>\n<div id="issue">';
	if (RYU.config.rzw_wysiwyg==1) {
		document.getElementById('pagemanager').getElementsByTagName('ul')[0].innerHTML = ''; // clear old thumbnails
	}
	for (var x=0; x<tpages; x++) {
		if (isEven(x)) { var impose = 'recto'; } else { var impose = 'verso';}
		if (x==0) { var headmsg = "Front Cover "; } 
		else if (x==(tpages-1)) { var headmsg = "Back Cover "; }
		else { var headmsg = 'Page '+x; }
		// See if this is a Webcomic //
		if (document.getElementById('wcyes').checked) {
			var wcft = document.getElementById('wctype').value;
			var wclz = document.getElementById('wczero').value;
			if (wclz=="3") {
				if (x>100 && x<1000) { var wc = "0" + x; }
				else if (x>9 && x<100) { var wc = "00" + x; }
				else if (x<10) { var wc = "000" + x;}
				else { var wc = x; }
			} else if (wclz=="2") {
				if (x>9 && x<100) { var wc = "0" + x;}
				else if (x<10) { var wc = "00" + x; }
				else { var wc = x; }
			} else if (wclz=="1" && x < 10) {
				var wc = "0" + x;
			} else {
				var wc = x;
			}
			var scans = document.getElementById('wcfolder').value;
			var pgmsg = '<img src="images/'+scans+'/'+document.getElementById('wcprefix').value+wc+document.getElementById('wcsuffix').value+'.'+wcft+'" />';
			// sync with Package Builder //
			if (document.getElementById('onerun').checked) {
				document.getElementById('imagefolder_name').value=scans;
			}
		} 
		else if (x==0 && type==5) {
			var pgmsg = '<div id="racktop" class="run-ads"></div>\n'+		
			'<div id="item_list"></div>\n'+
			'<div id="footer">\n';
		}
		else if (x==1 && type==5) {
			var pgmsg = '<div id="autocat0">'+buildRackTable()+'</div>\n';
		} else {
			var pgmsg = '<p>Put '+headmsg+' Content In This Box</p>';
		}
		template=template+'<div class="page '+impose+'" id="page'+x+'">';
		template=template+'<h2 class="header section_head">'+headmsg+'</h2>\n'+
		'<div class="live page_box">\n'+pgmsg+'\n'+
		'</div>\n';
		template=template+'</div>\n';
	}
	template=template+'</div>\n<div id="end_matter">\n<div id="issue_gallery">\n';
	for (var x=0; x<parseInt(document.getElementById('numlbs').value); x++) {
		template=template+'<p></p>'+
		'<div class="light_boxed land">\n'+
		'	<p>(Insert An Image Here)</p>\n'+
		'	<p class="caption">Picture Caption</p>\n'+
		'</div>\n';
	}
	template=template+'</div>\n';
	if (document.getElementById('hellogoodbye').checked) {
	template=template+'<div id="exit_sign"><p>Optional Exit Message</p></div>\n';
	}
	if (!document.getElementById('swbi').checked) {
		template=template+'<div id="social_widget"></div>';
	}
	if (document.getElementById('urlbox').value!="") {
		template=template+'<a href="'+document.getElementById('urlbox').value+'" id="permalink">'+document.getElementById('urlbox').value+'</a>\n';
	}
	template=template+'<p id="copy_right">'+document.getElementById('copynote').value+'</p>\n';
	template=template+'</div>\n'+
	'</body>\n'+
	'</html>';
	if (RYU.config.rzw_wysiwyg == 0 ) {
		document.getElementById('inputBox').value=template;
	} else {
		xinha_editors.inputBox.setEditorContent(template);
	}
	refreshSrc();
}

function selectFile(f) {
	if (f==1) { // Load Ryuzine file into Export HTML box
		extsrc = 1;
		myOutput.value="Loading....please wait";
		myWindow.src = document.getElementById('chooser2').value;
		myWindow.setAttribute('onload','RYU.pullSource(1)');
//		setTimeout('RYU.pullSource(1)',1000);
	}else{ // Load file into Editor Preview and Editor Box
		mySource.value = "Loading....please wait";
		mySourceFrame.src = document.getElementById('chooser').value;
		// pullSource only AFTER the page has fully loaded
		mySourceFrame.setAttribute('onload','RYU.pullSource()');
	}
}

function convertIDfile(idstyle,rzstyle) {
	// this is really hacky but hey it works //
	if (mySourceFrame.contentWindow.document.getElementsByClassName(''+idstyle+'').length > 0) {
		var id_style = mySourceFrame.contentWindow.document.getElementsByClassName(''+idstyle+'');
		for(var i=0; i < id_style.length; i++) {
			mySourceFrame.contentWindow.document.getElementsByClassName(''+idstyle+'')[i].className=""+idstyle+" "+rzstyle+"";
		}
		var rz_style = mySourceFrame.contentWindow.document.getElementsByClassName(''+rzstyle+'');
		for(var i=0; i < rz_style.length; i++) {
			mySourceFrame.contentWindow.document.getElementsByClassName(''+rzstyle+'')[i].className=""+rzstyle+"";
		}
	}
}
var pagecheck = [];
function convertOldFormat(srctitle) {
		var _document = mySourceFrame.contentWindow.document;
		var sect_heads = _document.getElementsByClassName('section_head');
		var page_boxes = _document.getElementsByClassName('page_box');
		var light_boxes= _document.getElementsByClassName('light_boxed');
		var currParent = null;
		for (var x=0; x < page_boxes.length; x++) {
			if (isEven(x)) {var impose = 'recto';} else {var impose = 'verso';}
			var par = page_boxes[x].parentNode;
			if (currParent==null) { currParent = par;}
			page_boxes[x].removeAttribute('id');
			var pg = document.createElement('div');
				pg.id = 'page'+x+'';
				pg.className='page '+impose+'';
			par.insertBefore(pg,page_boxes[x]);	
		}
		var new_pages = _document.getElementsByClassName('page');
			pagecheck = new_pages;
		for (var x=0; x < new_pages.length; x++) {
			new_pages[x].appendChild(sect_heads[x]);
			new_pages[x].appendChild(page_boxes[x]);
	}
	// find or create the new format elements
	var front = document.createElement('div');
		front.id="front_matter";
		if (mySourceFrame.contentWindow.document.getElementById('splash_title')) {
			front.appendChild(mySourceFrame.contentWindow.document.getElementById('splash_title'));
		} else {
			var st = document.createElement('h1');
				st.id="splash_title";
				st.innerHTML=srctitle;
			front.appendChild(st);
		}
		if (mySourceFrame.contentWindow.document.getElementById('summary')) {
			// Make sure summary is text only
			mySourceFrame.contentWindow.document.getElementById('summary').innerHTML = mySourceFrame.contentWindow.document.getElementById('summary').textContent || mySourceFrame.contentWindow.document.getElementById('summary').innerText;
			front.appendChild(mySourceFrame.contentWindow.document.getElementById('summary'));
		} else {
			var sm = document.createElement('div');
				sm.id="summary";
			front.appendChild(sm);
		}
		if (mySourceFrame.contentWindow.document.getElementById('splash_screen')) {
			front.appendChild(mySourceFrame.contentWindow.document.getElementById('splash_screen'));
		} else {
			var sc = document.createElement('div');
				sc.id="splash_screen";
			front.appendChild(sc);
		}
		if (mySourceFrame.contentWindow.document.getElementById('appbanner')) {
			front.appendChild(mySourceFrame.contentWindow.document.getElementById('appbanner'));
		} else {
			var ab = document.createElement('div');
				ab.id="appbanner";
			front.appendChild(ab);
		}
		if (mySourceFrame.contentWindow.document.getElementById('welcome_sign')) {
			front.appendChild(mySourceFrame.contentWindow.document.getElementById('welcome_sign'));
		} else {
			var ws = document.createElement('div');
				ws.id="welcome_sign";
			front.appendChild(ws);
		}
	var fishwrap = document.createElement('div');
		fishwrap.id="issue";
		for (var x=new_pages.length-1; x > -1; x--) {
			fishwrap.insertBefore(new_pages[x],fishwrap.firstChild);
		}
	var end = document.createElement('div');
		end.id="end_matter";
		var ig = document.createElement('div');
			ig.id="issue_gallery";
		for (var x=light_boxes.length-1; x > -1; x--) {
			ig.insertBefore(light_boxes[x], ig.firstChild);
		}
		end.appendChild(ig);
		if (mySourceFrame.contentWindow.document.getElementById('exit_sign')) {
			end.appendChild(mySourceFrame.contentWindow.document.getElementById('exit_sign'));
		} else {
			var es = document.createElement('div');
				es.id="exit_sign";
			end.appendChild(es);
		}
		if (mySourceFrame.contentWindow.document.getElementById('permalink')) {
			end.appendChild(mySourceFrame.contentWindow.document.getElementById('permalink'));
		} else {
			var ol = document.createElement('a');
				ol.id="permalink";
			end.appendChild(ol);
		}
		if (mySourceFrame.contentWindow.document.getElementById('copy_right')) {
			end.appendChild(mySourceFrame.contentWindow.document.getElementById('copy_right'));
		} else {
			var cr = document.createElement('div');
				cr.id="copy_right";
			end.appendChild(cr);
		}
		
		var chaff = "";	// whatever the hell else is in ryu_mask
		if (mySourceFrame.contentWindow.document.getElementById('ryu_mask')) {
			chaff = mySourceFrame.contentWindow.document.getElementById('ryu_mask').innerHTML;
		}
		
		if (chaff!="") {
			var shiftit = document.createElement('div');
				shiftit.innerHTML=chaff;
			mySourceFrame.contentWindow.document.getElementById('ryu_mask').innerHTML = '';
			end.insertBefore(shiftit,end.firstChild);
		}
		
		currParent.insertBefore(front,currParent.firstChild);
		currParent.appendChild(fishwrap);
		currParent.appendChild(end);

	if (mySourceFrame.contentWindow.document.getElementById('splash')) {
		if (currParent.id=='ryu_mask') {
		currParent.parentNode.appendChild(mySourceFrame.contentWindow.document.getElementById('splash'));
		} else if (currParent.tagName=='body') {
		currParent.appendChild(mySourceFrame.contentWindow.document.getElementById('splash'));
		} else {
			// no idea, leave it where it is
		};
	}
}

function pullSource(s) {
	clearDocProps();	// empty all Document Properties
	if (config.rzw_wysiwyg==1) {
			document.getElementById('pagemanager').getElementsByTagName('ul')[0].innerHTML = ''; // clear old thumbnails
	}
	if (mySourceFrame.contentWindow.document.getElementsByTagName('title').length > 0) {
		var srctitle = '<title>'+mySourceFrame.contentWindow.document.getElementsByTagName('title')[0].innerHTML+'</title>';
	} else {
		var srctitle = "";
	}
	if (mySourceFrame.contentWindow.document.getElementById('this_issue')) {
		var srcstyle = mySourceFrame.contentWindow.document.getElementById('this_issue').href;
		if (document.getElementById('edition1').checked) {
			srcfile = document.getElementById('editionName').value;
		} else {
			srcstyle = srcstyle.split("\/");
			var srcfile = srcstyle[(srcstyle.length-1)];
			if (srcfile != 'thisissue.css' && !document.getElementById('edition2').checked) {
				document.getElementById('edition1').checked=true;
				document.getElementById('customFile').style.display="table-cell";
				document.getElementById('editionName').value = srcfile;
			}				
		}
		srcstyle = '<link rel="stylesheet" type="text/css" href="css/'+srcfile+'" id="this_issue" />';
	} else { var srcstyle = ""; }
	var styleblock = "";
	if (mySourceFrame.contentWindow.document.getElementsByTagName('style').length > 0) {
		// find all <style> blocks, concatenate content and remove all blocks
		for (var css=mySourceFrame.contentWindow.document.getElementsByTagName('style').length-1; css >=0; css--) {
			// we don't want to pull in wip_ editor styles that got saved in the <head> tag
			if (mySourceFrame.contentWindow.document.getElementsByTagName('style')[css].parentNode.tagName.toLowerCase() != 'head') {
				styleblock += mySourceFrame.contentWindow.document.getElementsByTagName('style')[css].innerHTML;
			}
			mySourceFrame.contentWindow.document.getElementsByTagName('style')[css].parentNode.removeChild(mySourceFrame.contentWindow.document.getElementsByTagName('style')[css]);
		}
		if (styleblock != "") {
			// if styleblock is not empty create a new style block with concatenated content and 
			// add to sourceFrame doc (this will get pulled into editor with rest of <body> content)
			var style_block = mySourceFrame.contentWindow.document.createElement('style');
				style_block.type = "text/css";
				style_block.innerHTML = styleblock;
			mySourceFrame.contentWindow.document.getElementsByTagName('body')[0].appendChild(style_block);
		}
	}
	if (mySourceFrame.contentWindow.document.getElementsByTagName('img').length > 0) {
		var fixhrefs = mySourceFrame.contentWindow.document.getElementsByTagName('img');
		var href_fmt = "";
		for (var f=0; f < fixhrefs.length; f++) {
			if (fixhrefs[f].hasAttribute('href_fmt')) {
				href_fmt = fixhrefs[f].getAttribute('href_fmt');
				fixhrefs[f].setAttribute('href',href_fmt);
				fixhrefs[f].removeAttribute('href_fmt');
			}
		}
	}

	if (mySourceFrame.contentWindow.document.getElementById('racktop') != null) {
		doc_converted = 5;
		alert(''+RYU._lc('Error: This is a Ryuzine Rack Newsstand.  Editing this file is only recommended for advanced authors.')+'');
	} else if (mySourceFrame.contentWindow.document.getElementById('binder') != null) {	// yikes!  0.9.5.x or earlier
		doc_converted = 4;
		alert(''+RYU._lc('Error: File could not be converted')+'');
	} else if (mySourceFrame.contentWindow.document.getElementsByClassName('splash-screen').length > 0 || 
		mySourceFrame.contentWindow.document.getElementsByClassName('splash-title').length > 0 ||
		mySourceFrame.contentWindow.document.getElementsByClassName('welcome-sign').length > 0 || 
		mySourceFrame.contentWindow.document.getElementsByClassName('section-head').length > 0 ||
		mySourceFrame.contentWindow.document.getElementsByClassName('group').length > 0 ||
		mySourceFrame.contentWindow.document.getElementsByClassName('page-box').length > 0 ||
		mySourceFrame.contentWindow.document.getElementsByClassName('light-boxed').length > 0 || 
		mySourceFrame.contentWindow.document.getElementsByClassName('exit-sign').length > 0 ) {
			alert( 'This file appears to be an InDesign > Export for Dreamweaver file. It will be converted to Ryuzine format. You should save from the Editor immediately and in the future import the new file instead of this one.');
			convertIDfile('splash-screen','splash_screen');
			convertIDfile('splash-title','splash_title');
			convertIDfile('welcome-sign','welcome_sign');
			convertIDfile('section-head','header section_head');
			convertIDfile('group','live page_box');		// XML file method
			convertIDfile('page-box','live page_box');	// XHTML file method
			convertIDfile('light-boxed','light_boxed');
			convertIDfile('exit-sign','exit_sign');
			// ID always puts the section headers in paragraph tags, undo that //
			if (mySourceFrame.contentWindow.document.getElementsByClassName('section_head').length > 0 ) {
				var chopheads = mySourceFrame.contentWindow.document.getElementsByClassName('section_head');
				var newheads = "";
				for (var c=0; c < chopheads.length; c++) {
					if (chopheads[c].getElementsByTagName('p').length > 0) {
						newheads = chopheads[c].getElementsByTagName('p')[0].innerHTML;
						chopheads[c].innerHTML = newheads;
					}
				}
			}
			// if any slip through the reWrite function knows what to do with them anyway
			// handle ID files like they are old format Ryuzine files...	
			convertOldFormat(srctitle);
			doc_converted = 3;
	} else {
		// new editor needs things inside pages
		pagecheck = mySourceFrame.contentWindow.document.getElementsByClassName('page');
		if (pagecheck.length > 0) {	// great! it already has them, but check for header and live inside
			for (var x=0; x < pagecheck.length; x++) {
				if (isEven(x)) { var impose = 'recto';} else { var impose = 'verso';}
				if (!hasClass(pagecheck[x],impose)) { addClass(pagecheck[x],impose);}
				console.log('checking page'+x+' for header/live elements');
				if (pagecheck[x].getElementsByClassName('header').length < 1 && pagecheck[x].getElementsByClassName('section_head').length < 1) {
					pagecheck[x].innerHTML = '<h1 class="header section_head">Page '+x+'</h1>\n'+pagecheck[x].innerHTML;
				}
				if (pagecheck[x].getElementsByClassName('live').length < 1 && pagecheck[x].getElementsByClassName('page_box').length < 1) {
					pagecheck[x].innerHTML = pagecheck[x].innerHTML+'<div class="live page_box"></div>\n';
				}
			}
		if (mySourceFrame.contentWindow.document.getElementById('summary')) {
			// Make sure summary is text only
			mySourceFrame.contentWindow.document.getElementById('summary').innerHTML = mySourceFrame.contentWindow.document.getElementById('summary').textContent || mySourceFrame.contentWindow.document.getElementById('summary').innerText;
		}
		doc_converted = 1;
		} else {	
			console.log('Old format, need to convert it.');
			convertOldFormat(srctitle);
		doc_converted = 2;	
	};		
};	// end of if/else 	
	var src_body = mySourceFrame.contentWindow.document.getElementsByTagName('body')[0].innerHTML;
	var assemble = '<html><head>'+srctitle+''+srcstyle+'</head><body>'+src_body+'</body></html>';
	if (s==1) {
		myOutput.value = "<!DOCTYPE html>\n"+myWindow.contentWindow.document.getElementsByTagName('html')[0].innerHTML+'</html>'; 	// Raw textarea method
	}else{
		if (config.rzw_wysiwyg == 0 ) {
			mySource.value = "<!DOCTYPE html>\n"+assemble; 	// Raw textarea method
		} else {
			xinha_editors.inputBox.setEditorContent(assemble);
			for (var x=0; x < pagecheck.length; x++) {
				console.log('pullSource add_thumbnail('+x+')');
				add_thumbnail(x);
			}
			if (mySourceFrame.contentWindow.document.getElementById('issue')) {
				var getview = mySourceFrame.contentWindow.document.getElementById('issue').className.split(' ');
				if (getview.indexOf('spreads')!=-1) {
					document.getElementById('show_spreads').checked = true;
				} else if ( getview.indexOf('continuous')!=-1) {
					document.getElementById('show_inline').checked = true;
				} else {
					document.getElementById('show_single').checked = true;
				}
				if (getview.indexOf('bindright')!=-1) {
					document.getElementById('right_bound').checked = true;
				}
				var pview = document.getElementById('pagemanager').getElementsByTagName('ul')[0];
				pview.className = "";
				for (var g=0; g < getview.length; g++) {
					addClass(pview,getview[g]);
				}			
			}
		}
	}
};

function clearDocProps() {
	doc_title 	= "";
	doc_author	= "";
	doc_applogo	= "";
	doc_summary = "";
	doc_keywords= "";
	doc_version = "";
	doc_social_src = 0;
	doc_social 	= "";
	doc_link	= "";
	doc_welcome = "";
	doc_banner	= "";
	doc_boxad	= "";
	doc_splash	= "";
	doc_goodbye	= "";
	doc_copyright="";
	doc_converted = 0;
}
// Document Properties Dialog Functions //
function getDocProps() {
	if (config.rzw_wysiwyg==1) {
		var _document = document.getElementById('XinhaIFrame_inputBox').contentWindow.document;
		// Get Title
		if (_document.getElementById('splash_title')!=null) {
			doc_title = _document.getElementById('splash_title').innerHTML;
		} else if ( _document.getElementsByTagName('title').length > 0) {
			doc_title = _document.getElementsByTagName('title')[0].innerHTML;
		} else {
		}
		document.getElementById('my_doc_title').value = doc_title;
		// Get Author
		if (_document.getElementsByName('author').length > 0) {
			doc_author = _document.getElementsByName('author')[0].content;
		} else if (mySourceFrame.contentWindow.document.getElementsByName('author').length > 0) {
			doc_author = mySourceFrame.contentWindow.document.getElementsByName('author')[0].content;
		} else {};
		document.getElementById('my_doc_author').innerHTML = doc_author;
		// Get Copyright Data
		if (_document.getElementById('copy_right')!=null) {
			doc_copyright = _document.getElementById('copy_right').innerHTML;
		} else {
		}
		document.getElementById('my_doc_copyright').value = doc_copyright;
		// Get File Format
		if (_document.getElementsByName('generator').length > 0) {
			doc_version = _document.getElementsByName('generator')[0].content;
		} else if (mySourceFrame.contentWindow.document.getElementsByName('generator').length > 0) {
			doc_version = mySourceFrame.contentWindow.document.getElementsByName('generator')[0].content;
		} else if ( doc_converted == 5) {
			doc_version = "Ryuzine Rack Newsstand";	// do not edit this file, it is a newsstand document
		} else if ( doc_converted == 4) {
			doc_version = "Ryuzine 0.9.5.x (or earlier)"; 	// version data missing, structure is too old to convert
		} else if ( doc_converted == 3 || doc_converted == 2 ) {
			doc_version = "Ryuzine 1.0 (Converted)";	// version data missing, but structure could be converted
		} else if ( doc_converted == 1) {
			doc_version = "Ryuzine 1.0 (Inferred)";	 	// version data is missing, but structure appears current
		} else {
			doc_version = "Version data missing";			// no idea what this document is
		}
		document.getElementById('my_doc_version').innerHTML = doc_version;
		// Get Page Count
		document.getElementById('my_doc_pagecount').innerHTML = _document.getElementsByClassName('page').length;
		// Get Summary
		if (_document.getElementById('summary')!=null) {
			doc_summary = _document.getElementById('summary').textContent || _document.getElementById('summary').innerText;
		} else if (mySourceFrame.contentWindow.document.getElementById('summary')!=null) {
			doc_summary = mySourceFrame.contentWindow.document.getElementById('summary').textContent || mySourceFrame.contentWindow.document.getElementById('summary').innerText;
		} else if (_document.getElementsByName('description').length > 0) {
			doc_summary = _document.getElementsByName('description')[0].content;
		} else {
		}
		// need to truncate doc_summary to 155 characters here?
		document.getElementById('my_doc_summary').value = doc_summary;
		countChars('my_doc_summary','my_doc_charcount');
		// Get Keywords
		if (_document.getElementsByName('keywords').length > 0) {
			doc_keywords = _document.getElementsByName('keywords')[0].content;
		} else if ( mySourceFrame.contentWindow.document.getElementsByName('keywords').length > 0 ) {
			doc_keywords = mySourceFrame.contentWindow.document.getElementsByName('keywords')[0].content;
		} else {
		}
		doc_keywords = doc_keywords.split(',');
			for (var d=0; d < doc_keywords.length; d++) {
				doc_keywords[d] = doc_keywords[d].trim();
			}
		doc_keywords = doc_keywords.join();
		document.getElementById('my_doc_keywords').value = doc_keywords;
		// Get App Logo SRC
		if (_document.getElementById('app_logo')!=null) {
			if (_document.getElementById('app_logo').getElementsByTagName('img').length > 0) {
			doc_applogo = _document.getElementById('app_logo').getElementsByTagName('img')[0].src;
			}
			document.getElementById('my_app_logo').checked = true;				
		} else {
			document.getElementById('my_app_logo').checked = false;
		}
		// Get Welcome Message
		if (_document.getElementById('welcome_sign')!=null) {
			document.getElementById('my_doc_welcome').checked = true;
			doc_welcome = _document.getElementById('welcome_sign').innerHTML;
		} else {
			document.getElementById('my_doc_welcome').checked = false;
		}
		// Get Exit Message
		if (_document.getElementById('exit_sign')!=null) {
			document.getElementById('my_doc_goodbye').checked = true;
			doc_goodbye = _document.getElementById('exit_sign').innerHTML;
		} else {
			document.getElementById('my_doc_goodbye').checked = false;
		}
		// Get Banner Ad Block
		if (_document.getElementById('appbanner')!=null) {
			document.getElementById('my_doc_banner').checked = true;
			doc_banner = _document.getElementById('appbanner').innerHTML;
		} else {
			document.getElementById('my_doc_banner').checked = false;
		}
		// Get Splash Ad Block
		if (_document.getElementById('splash_screen')!=null) {
			document.getElementById('my_doc_splash').checked = true;
			doc_splash = _document.getElementById('splash_screen').innerHTML;
		} else {
			document.getElementById('my_doc_splash').checked = false;
		}
		// Get Permalink
		if (_document.getElementById('permalink')!=null) {
			document.getElementById('my_doc_link').checked = true;
			doc_link = _document.getElementById('permalink').innerHTML;			
		} else if ( _document.getElementById('offline')!=null) {
			document.getElementById('my_doc_link').checked = true;
			doc_link = _document.getElementById('permalink').innerHTML;
		} else {
			document.getElementById('my_doc_link').checked = false;
		}
		// Get Box Ad
		if (_document.getElementById('boxad')!=null) {
			doc_boxad = _document.getElementById('boxad').innerHTML;
			document.getElementById('my_doc_boxad').checked = true;
		} else {
			document.getElementById('my_doc_boxad').checked = false;
		}
		// Get Social Widget
		if (_document.getElementById('social_widget')!=null) {
			doc_social = _document.getElementById('social_widget').innerHTML;
			if (doc_social.trim()!="") {
				document.getElementById('my_doc_social').checked = true;
			} else {
				document.getElementById('my_doc_social').checked = false;
			}
		} else {
			 document.getElementById('my_doc_social').checked = false;
		}
		
	}
}
function setDocProps() {
	if (config.rzw_wysiwyg==1) {
		var _document = document.getElementById('XinhaIFrame_inputBox').contentWindow.document;
		// first see if it has a ryu_mask element
		if (_document.getElementById('ryu_mask')==null) {
			var rm = document.createElement('div');
				rm.id="ryu_mask";
			_document.getElementsByTagName('body')[0].appendChild(rm);
		}
		var _ryuzine = _document.getElementById('ryu_mask');
		// first see if the loaded doc has the three main elements
		if (_document.getElementById('front_matter')==null) {
			var fm = document.createElement('div');
				fm.id="front_matter";
			_ryuzine.appendChild(fm);
		}
		if (_document.getElementById('issue')==null) {
			var iss = document.createElement('div');
				iss.id="issue";
			_ryuzine.appendChild(iss);
		}
		if (_document.getElementById('end_matter')==null) {
			var em = document.createElement('div');
				em.id="end_matter";
			_ryuzine.appendChild(em);
		}
		var fm = _document.getElementById('front_matter');
		var em = _document.getElementById('end_matter');
		// Set Title
		if (_document.getElementById('splash_title')==null) {
			var st = document.createElement('h1');
				st.id="splash_title";
			fm.appendChild(st);
		}
			_document.getElementById('splash_title').innerHTML = document.getElementById('my_doc_title').value;
		// Set Author
		if (_document.getElementsByName('author').length == 0) {
			var ma = document.createElement('meta');
				ma.name = "author";
			_document.getElementsByTagName('head')[0].appendChild(ma);
		}
		doc_author = document.getElementById('my_doc_author').value;
		_document.getElementsByName('author')[0].content = doc_author;
		// Set Copyright Data
		if (_document.getElementById('copy_right')==null) {
			var cr = document.createElement('p');
				cr.id="copy_right";
			em.appendChild(cr);
		}
		_document.getElementById('copy_right').innerHTML = document.getElementById('my_doc_copyright').value;
		// Set File Format
		if (_document.getElementsByName('generator').length == 0) {
			var gen = document.createElement('meta');
				gen.name="generator";
			_document.getElementsByTagName('head')[0].appendChild(gen);
		}
		_document.getElementsByName('generator')[0].content = doc_version;
		// Set Summary
		if (_document.getElementById('summary')==null) {
			var sm = document.createElement('p');
				sm.id="summary";
			fm.appendChild(sm);
		}
		doc_summary = document.getElementById('my_doc_summary').value;
		_document.getElementById('summary').innerHTML = doc_summary;
		if (_document.getElementsByName('description').length == 0) {
			var md = document.createElement('meta');
				md.name="description";
			_document.getElementsByTagName('head')[0].appendChild(md);
		}
		_document.getElementsByName('description')[0].content = doc_summary.replace(/"/g, "\'");
		// Get Keywords
		if (_document.getElementsByName('keywords').length == 0) {
			var mk = document.createElement('meta');
				mk.name="keywords";
			_document.getElementsByTagName('head')[0].appendChild(mk);
		}	
			// clean up whatever was entered
			if (doc_keywords=="") { doc_keywords = document.getElementById('my_doc_keywords').value; }
			doc_keywords = doc_keywords.split(',');
				for (var d=0; d < doc_keywords.length; d++) {
					doc_keywords[d] = doc_keywords[d].trim();
				}
			doc_keywords = doc_keywords.join();		
		_document.getElementsByName('keywords')[0].content = doc_keywords;
		// Set App Logo
		if (!_document.getElementById('app_logo')) {
			var al = document.createElement('div');
				al.id = 'app_logo';
			fm.appendChild(al);
		}
		_document.getElementById('app_logo').innerHTML = '<img src="'+doc_applogo+'" width="300"/>';
		// Set Welcome Message
		if (document.getElementById('my_doc_welcome').checked) {
			if (_document.getElementById('welcome_sign')==null) {
				var ws = document.createElement('div');
					ws.id="welcome_sign";
				fm.appendChild(ws);
			}
			_document.getElementById('welcome_sign').innerHTML = doc_welcome;
		} else {
			if (_document.getElementById('welcome_sign')!=null) {
				_document.getElementById('welcome_sign').parentNode.removeChild(_document.getElementById('welcome_sign'));
			}
		}
		// Set Exit Message
		if (document.getElementById('my_doc_goodbye').checked) {
			if (_document.getElementById('exit_sign')==null) {
				var es = document.createElement('div');
					es.id="exit_sign";
				em.appendChild(es);
			}
			_document.getElementById('exit_sign').innerHTML = doc_goodbye;
		} else {
			if (_document.getElementById('exit_sign')!=null) {
				_document.getElementById('exit_sign').parentNode.removeChild(_document.getElementById('exit_sign'));
			}
		}
		// Set Banner Ad Block
		if (document.getElementById('my_doc_banner').checked) {
			if (_document.getElementById('appbanner')==null) {
				var ab = document.createElement('div');
					ab.id="appbanner";
				fm.appendChild(ab);
			}
			_document.getElementById('appbanner').innerHTML = doc_banner;
		} else {
			if (_document.getElementById('appbanner')!=null) {
				_document.getElementById('appbanner').parentNode.removeChild(_document.getElementById('appbanner'));
			}
		}
		// Set Splash Ad Block
		if (document.getElementById('my_doc_splash').checked) {
			if (_document.getElementById('splash_screen')==null) {
				var ss = document.createElement('div');
					ss.id="splash_screen";
				fm.appendChild(ss);
			}
			_document.getElementById('splash_screen').innerHTML = doc_splash;
		} else {
			if (_document.getElementById('splash_screen')!=null) {
				_document.getElementById('splash_screen').parentNode.removeChild(_document.getElementById('splash_screen'));
			}
		}
		// Set Permalink
		if (document.getElementById('my_doc_link').checked) {
			if (_document.getElementById('permalink')==null) {
				var pl = document.createElement('a');
					pl.id="permalink";
				em.appendChild(pl);
			}
			_document.getElementById('permalink').innerHTML = doc_link;
			_document.getElementById('permalink').href=doc_link;
		} else {
			if (_document.getElementById('permalink')!=null) {
				_document.getElementById('permalink').parentNode.removeChild(_document.getElementById('permalink'));
			}
		}
		// Set Box Ad
		if (document.getElementById('my_doc_boxad').checked) {
			if (_document.getElementById('boxad')==null) {
				var ba = document.createElement('div');
					ba.id="boxad";
				em.appendChild(ba);
			}
			_document.getElementById('boxad').innerHTML = doc_boxad;
		} else {
			if (_document.getElementById('boxad')!=null) {
				_document.getElementById('boxad').parentNode.removeChild(_document.getElementById('boxad'));
			}
		}
		// Set Social Widget
		if (document.getElementById('my_doc_social').checked) {
			if (_document.getElementById('social_widget')==null) {
				var sw = document.createElement('div');
					sw.id="social_widget";
				em.appendChild(sw);
			}
			_document.getElementById('social_widget').innerHTML = doc_social;
		} else {
			if (_document.getElementById('social_widget')!=null) {
				_document.getElementById('social_widget').parentNode.removeChild(_document.getElementById('social_widget'));
			}
		}
		
	}
}

function clearSimulator() {
	if (extsrc==1) {
		var sim = document.getElementById('simscreen');
		sim.removeChild(document.getElementById('preview'));
		nuscreen = document.createElement('iframe');
		nuscreen.setAttribute('id','preview');
		nuscreen.setAttribute('scrolling','no');
		sim.appendChild(nuscreen);
		myWindow = document.getElementById('preview');
		rotateDevice(); // easy way to reset screen size
		extsrc=0;
	}
}


function refreshSrc() {
	var sourceFile = document.getElementById('sourceframe').contentWindow.document;
	sourceFile.open();
	if (config.rzw_wysiwyg == 0 ) {
		sourceFile.write(document.getElementById('inputBox').value); // For raw textara
	} else {
		sourceFile.write(xinha_editors.inputBox.getEditorContent()); // Xinha method
	}
	sourceFile.close();
	document.getElementById('notice1').style.display="none";
}

function updatePreview() {
	if (device.Platform == "Android" && device.v < 3) {} else {
		if (extsrc==0) {
			var sourceFile = document.getElementById('preview').contentWindow.document;
			sourceFile.open();
			sourceFile.write(document.getElementById('outputBox').value);
			sourceFile.close();
			document.getElementById('notice').style.display="none";
		}
	}
}

function subMenu(menu) {
	if (document.getElementById(menu).style.display == "none") {
		document.getElementById(menu).style.display = "block";
	} else {
		document.getElementById(menu).style.display = "none";
	}
}
function rotateDevice(dev) {
	if (dev!=null) {d=dev;}	// if no device was specified use current device in var d
	if (dSim==0) {var sim=" noskin";} else {var sim="";}
	if (config.deviceList[d][3] != "") {
		var devspecific = config.deviceList[d][3];
	} else {
		var devspecific = "";
	}
	if (dView==1) { var mode = "browser"; } else { var mode = "appview";}
	if(r==0) {
		myDevice.className = devspecific+" portrait "+config.deviceList[d][1]+" "+config.deviceList[d][2]+" "+mode+sim;	
		r=1;
	}else{
		myDevice.className = devspecific+" landscape "+config.deviceList[d][1]+" "+config.deviceList[d][2]+" "+mode+sim;	
		r=0;
	}
	// Now do the skinning bit //
	if (!config.deviceList[d][4] || config.deviceList[d][4]=="" || !isNaN(config.deviceList[d][4]) ) {	// not in an addon
		var skinloc = "ryuzinewriter/skins/";
	} else {
		var skinloc = "ryuzinewriter/addons/"+config.deviceList[d][4]+"/";
	}
	if (!config.deviceList[d][5] || config.deviceList[d][5]=="") { // profile classname = subfolder name
		var subfold = config.deviceList[d][3];
	} else {
		if (!isNaN(config.deviceList[d][5])) {
			var subfold = "default";
			if (!document.getElementById('custom_skin_css')) {
				var custoskin = document.createElement('style');
					custoskin.id = 'custom_skin_css';
				document.getElementsByTagName('body')[0].appendChild(custoskin);
				console.log('CUSTOM_SKIN <STYLE> TAG WRITTEN');
			}
			if (config.deviceList[d][1]=='phone') {		// these values come from the padding in default/skin.css file
				var portbezel_lr = landbezel_tb = 30;
				var portbezel_tb = landbezel_lr = 200;
			} else {
				var portbezel_lr = landbezel_tb = 100;
				var portbezel_tb = landbezel_lr = 100;
			}
			document.getElementById('custom_skin_css').innerHTML = ''+
			'#device.custom.portrait, #device.custom.portrait.noskin {'+
			'	height: '+config.deviceList[d][4]+'px;'+
			'	width:  '+config.deviceList[d][5]+'px;'+
			'	margin-top: -'+parseInt((config.deviceList[d][4]+portbezel_tb)/2)+'px;'+
			'	margin-left: -'+parseInt((config.deviceList[d][5]+portbezel_lr)/2)+'px;'+
			'}'+
			'	#device.custom.portrait #screen {'+
			'		height: '+config.deviceList[d][4]+'px;'+
			'		width:  '+config.deviceList[d][5]+'px;'+
			'	}'+
			'#device.custom.landscape, #device.custom.landscape.noskin {'+
			'	height: '+config.deviceList[d][5]+'px;'+
			'	width: '+config.deviceList[d][4]+'px;'+
			'	margin-top: -'+parseInt((config.deviceList[d][5]+landbezel_tb)/2)+'px;'+
			'	margin-left: -'+parseInt((config.deviceList[d][4]+landbezel_lr)/2)+'px;'+
			'}'+
			'	#device.custom.landscape #screen {'+
			'		height: '+config.deviceList[d][5]+'px;'+
			'		width:  '+config.deviceList[d][4]+'px;'+
			'	}'+
			'#device.custom.portrait.noskin {'+
			'	height: '+config.deviceList[d][4]+'px;'+
			'	width:  '+config.deviceList[d][5]+'px;'+
			'	margin-top: -'+parseInt(config.deviceList[d][4]/2)+'px;'+
			'	margin-left: -'+parseInt(config.deviceList[d][5]/2)+'px;'+
			'}'+
			'#device.custom.landscape.noskin {'+
			'	height: '+config.deviceList[d][5]+'px;'+
			'	width: '+config.deviceList[d][4]+'px;'+
			'	margin-top: -'+parseInt(config.deviceList[d][5]/2)+'px;'+
			'	margin-left: -'+parseInt(config.deviceList[d][4]/2)+'px;'+
			'}';
			console.log('<STYLE> content written');
		} else {	// profile classname different from subfolder name
			var subfold = config.deviceList[d][5];
		}
	}
	if (subfold == "") { 
		// If Device Profile does not have a skin //
		document.getElementById('skin').href = skinloc+"default/skin.css";
	} else { 
		// Apply Skin Image //
		document.getElementById('skin').href=skinloc+subfold+"/skin.css";
	}
	devSize();
	updatePreview();
}

function switchDevice(dev) {
	d = dev;
	if (document.getElementById('custom_skin_css')) {
		document.getElementById('custom_skin_css').innerHTML = '';
	}
	if (config.deviceList[d][1]=='phone') { r = 0;} else { r = 1;}
	zoomFactor(1);
	var zf = document.getElementById('zoom_factor');
	zf.selectedIndex = 0;
	document.getElementById('zoom_opt_label').innerHTML = zf.options[zf.selectedIndex].innerHTML;
	rotateDevice(d);
}
/*	If you define a new device in the  Add Device dialog it is appended
	to the device list and stored in a cookie file.  If you want these 
	to persist, though, you need create an actual device skin file and
	put it in "/ryuzinewriter/skins" folder or load it from an addon.
*/
function customPreview() {
	var a = config.deviceList.length;
	var customName 	 = document.getElementById('custom_name').value;
	if (customName == "" || customName == null ) {
		customName = "Device "+a;
	}
	if (document.getElementById('device_profile').checked) {
		var customProfile = 'phone';
	} else {
		var customProfile = 'tablet';
	}
	var customOS = document.getElementById('os_select').value;
	if (customOS == 'other') {
		customOS = document.getElementById('custom_os').value || 'os'+a;
		if (document.getElementById('os_sizes').checked) {
		var customStatus = document.getElementById('custom_status').value;
		if (customStatus == "" || customStatus ==null || customStatus == NaN ) {
			customStatus = 20;
		}
		var customNavBar = document.getElementById('custom_navbar').value;
		if (customNavBar == "" || customNavBar ==null || customNavBar == NaN ) {
			customNavBar = 44;
		}
		var customTabBar = document.getElementById('custom_tabbar').value;
		if (customTabBar == "" || customTabBar == null || customTabBar == NaN ) {
			customTabBar = 44;
		}
		var addos = true; // assume it needs to be added
		for (var c=0; c < customOSadds.length; c++) {
			if (customOS == customOSadds[c][0] && customProfile == customOSadds[c][1]) {
				addos = false;	// css for this os and profile exists!
			}
		}
		if (addos==true) {
			var os2add = [''+customOS+'',''+customProfile+'',''+customStatus+'',''+customNavBar+'',''+customTabBar+''];
			customOSadds.push(os2add);
		}
		Set_Cookie('rzw_customos',JSON.stringify(customOSadds));
		customOSstyles(customOSadds.length-1);
	
		}
	} else {
		var customStatus = '';
		var customNavBar = '';
		var customTabBar = '';
	}
	if (document.getElementById('toskin').checked) {
		var customSkin = document.getElementById('custom_skin').value.trim().replace(/\s/g,'_') || 'default';
		var customWidth = '';
		var customHeight = '';
	} else {
		var customSkin = 'custom';
		var customWidth = document.getElementById('custom_width').value;
		if (customWidth == "" || customWidth ==null || customWidth == NaN ) {
			customWidth = 568;
		}
		var customHeight = document.getElementById('custom_height').value;
		if (customHeight == "" || customHeight ==null || customHeight == NaN ) {
			customHeight = 320;
		}
	}
	var newdevice = [
		customName,
		customProfile,
		customOS,
		customSkin,
		parseInt(customWidth),
		parseInt(customHeight),
		parseInt(customStatus),
		parseInt(customNavBar),
		parseInt(customTabBar)
	]
	customDevices.push(newdevice);
	config.deviceList.push(newdevice);	// we only want to append the new one
	devSelector();	
	// Store in Cookie File //
	Set_Cookie('deviceList',JSON.stringify(customDevices));

}
/*	If you define the size of mobile OS elements in Add Device dialog
	the following creates the CSS for your custom OS elements.  If you
	want these to persist, though, you need to either add them to the
	"os.css" file in the "/ryuzinewriter/skins" folder or load your own
	stylesheet with them via an add-on.
*/
function customOSstyles(c) {
		if (!document.getElementById('os_additions')) {
			var osadds = document.createElement('style');
				osadds.id = 'os_additions';
			document.getElementsByTagName('body')[0].appendChild(osadds);
		}
		document.getElementById('os_additions').innerHTML += ''+
		'#device.portrait.'+customOSadds[c][1]+'.'+customOSadds[c][0]+'.appview #simscreen {'+
		'	top: 0px;'+
		'	bottom: 0px;'+
		'}'+
		'#device.portrait.'+customOSadds[c][1]+'.'+customOSadds[c][0]+'.browser #simscreen {'+
		'	top: '+parseInt( (customOSadds[c][2]*1)+(customOSadds[c][3]*1) )+'px;'+
		'	bottom: '+customOSadds[c][4]+'px;'+
		'}	'+
		'#device.portrait.'+customOSadds[c][1]+'.'+customOSadds[c][0]+'.appview #statusbar {'+
		'	display: none;'+
		'}'+
		'#device.portrait.'+customOSadds[c][1]+'.'+customOSadds[c][0]+'.browser #statusbar {'+
		'	height: '+customOSadds[c][2]+'px;'+
		'	line-height: '+customOSadds[c][2]+'px;'+
		'	color: #ccc;'+
		'	background-color: #111;'+
		'	display: block;'+
		'}'+
		'#device.portrait.'+customOSadds[c][1]+'.'+customOSadds[c][0]+'.appview #navbar {'+
		'	display: none;'+
		'}'+
		'#device.portrait.'+customOSadds[c][1]+'.'+customOSadds[c][0]+'.browser #navbar {'+
		'	height: '+customOSadds[c][3]+'px;'+
		'	line-height: '+customOSadds[c][3]+'px;'+
		'	background-color: #ccc;'+
		'	display: block;'+
		'}'+
		'#device.portrait.'+customOSadds[c][1]+'.'+customOSadds[c][0]+'.appview #tabbar {'+
		'	display: none;'+
		'}'+
		'#device.portrait.'+customOSadds[c][1]+'.'+customOSadds[c][0]+'.browser #tabbar {'+
		'	height: '+customOSadds[c][4]+'px;'+
		'	line-height: '+customOSadds[c][4]+'px;'+
		'	background-color: #999;'+
		'	display: block;'+
		'}'+
		'#device.landscape.'+customOSadds[c][1]+'.'+customOSadds[c][0]+'.appview #simscreen {'+
		'	top: 0px;'+
		'	bottom: 0px;'+
		'	right: 0px;'+
		'}'+
		'#device.landscape.'+customOSadds[c][1]+'.'+customOSadds[c][0]+'.browser #simscreen {'+
		'	top: '+parseInt( (customOSadds[c][2]*1)+(customOSadds[c][3]*1) )+'px;'+
		'	bottom: '+customOSadds[c][4]+'px;'+
		'	right: 0px;'+
		'}'+
		'#device.landscape.'+customOSadds[c][1]+'.'+customOSadds[c][0]+'.appview #statusbar {'+
		'	display: none;'+
		'}'+
		'#device.landscape.'+customOSadds[c][1]+'.'+customOSadds[c][0]+'.browser #statusbar {'+
		'	height: '+customOSadds[c][2]+'px;'+
		'	line-height: '+customOSadds[c][2]+'px;'+
		'	color: #ccc;'+
		'	background-color: #111;'+
		'	display: block;'+
		'}'+
		'#device.landscape.'+customOSadds[c][1]+'.'+customOSadds[c][0]+'.appview #navbar {'+
		'	display: none;'+
		'}'+
		'#device.landscape.'+customOSadds[c][1]+'.'+customOSadds[c][0]+'.browser #navbar {'+
		'	height: '+customOSadds[c][3]+'px;'+
		'	line-height: '+customOSadds[c][3]+'px;'+
		'	background-color: #ccc;'+
		'	display: block;'+
		'}'+
		'#device.landscape.'+customOSadds[c][1]+'.'+customOSadds[c][0]+'.appview #tabbar {'+
		'	display: none;'+
		'}'+
		'#device.landscape.'+customOSadds[c][1]+'.'+customOSadds[c][0]+'.browser #tabbar {'+
		'	height: '+customOSadds[c][4]+'px;'+
		'	line-height: '+customOSadds[c][4]+'px;'+
		'	background-color: #999;'+
		'	display: block;'+
		'}';
}

function zoomFactor(z) {
	devSize();
	var simBox = document.getElementById('simbox');
	var devBox = document.getElementById('device');
	if (z=="Fit Height") {
		z = Math.round( (simBox.offsetHeight/devH)*100)/100;
	}
	if (z=="Fit Width") {
		z = Math.round( (simBox.offsetWidth/devW)*100)/100;
	}
	simBox.style.overflow="";
	devBox.style[cssTransform]="scale("+z+")";
	simBox.style.overflow="auto";
}
	
var clearStyleBox = 0;
function outputOptions() {
	if (document.getElementById('natLang').value == "") {
		opt_lang = "en"; } else { opt_lang = document.getElementById('natLang').value; }
	if (document.getElementsByName('dTheme')[2].checked) {
		opt_themename = document.getElementById('dThemeName').value; 
		} else { opt_themename = ""; }
	if (document.getElementById('configit2').checked) {
		opt_config = "test";
	} else if (document.getElementById('configit1').checked) {
		opt_config = document.getElementById('configName').value;
	} else {
		opt_config = "ryuzine.config.js";
	}
	if (document.getElementById('edition2').checked) {
		opt_edition = "";	// Clear external stylesheet filename
			if (clearStyleBox==0) {clearStyleBox = 1;myCSS.value = "";}
		} else if (document.getElementById('edition1').checked) {
		opt_edition = document.getElementById('editionName').value;
		clearStyleBox = 0;myCSS.value = "";
			if (opt_edition == "") { 
			alert(''+RYU._lc('ERROR: Custom Issue-Specific stylesheet filename missing, using default.')+'');
			opt_edition = "thisissue.css"; document.getElementById('editionName').value = opt_edition; };
		} else {
		clearStyleBox = 0;myCSS.value = "";
		opt_edition = "thisissue.css";
		}
	if (document.getElementById('inpage_css').checked) {
		opt_inpage = 1;
	} else { opt_inpage = 0; };
	if (document.getElementById('custCSS').checked) {
		opt_css = document.getElementById('custCSSName').value; 
		} else { opt_css = ""; }
	if (document.getElementById('custJS').checked) {
		opt_js = document.getElementById('custJSName').value; 
		} else { opt_js = ""; }
	if (document.getElementById('loadwhen2').checked) {
		opt_loadwhen = 2; } 
	else if (document.getElementById('loadwhen1').checked) { 
		opt_loadwhen = 1; }
	else { opt_loadwhen = 0; }
}

var workspace = [[],[],[],[],[],[]];
workspace[0] = "start";
workspace[1] = "editor";
workspace[2] = "export";
workspace[3] = "simulator";
workspace[4] = "configuration";
workspace[5] = "databuilder";

var active_workspace = 0;
var runonce = function() {
	if (RYU.config.wysiwyg==1) {
		RYU.resize_panels();
	}
	runonce = function(){};
}

function slideSpace(whichone,caller) {
	if (whichone != active_workspace) {
		if (whichone==1) { runonce();}
		// clear selected
		var selects = document.getElementsByClassName('selected_workspace');
		for (var s=selects.length-1; s >= 0; s--) {
			removeClass(selects[s],'selected_workspace');
		}
		var ws = document.getElementById(workspace[whichone]);
		var aw = document.getElementById(workspace[active_workspace]);
		var ni = document.getElementById('navset'+whichone);
		var nx = document.getElementById('navset'+active_workspace);
		removeClass(aw,'ws_in');addClass(aw,'ws_out');
		removeClass(nx,'nav_in');addClass(nx,'nav_out');
		setTimeout(function(){aw.style[cssTransitionDuration]="0s";nx.style[cssTransitionDuration]="0s";removeClass(aw,"ws_out");addClass(aw,"ws_deck");removeClass(nx,"nav_out");addClass(nx,"nav_deck");},1100);	
		ws.style[cssTransitionDuration]="1s";
		ni.style[cssTransitionDuration]="1s";
		removeClass(ws,'ws_deck');addClass(ws,'ws_in');
		removeClass(ni,'nav_deck');addClass(ni,'nav_in');
		active_workspace = whichone;
		if (whichone < 6) { 
			addClass(document.getElementById('b_'+workspace[whichone]+''),'selected_workspace');
		} else {
			addClass(document.getElementById('addonsbutton'),'selected_workspace');
		}
	}
}


function swapAppTab(workspace,tab,section) {
	var zndex = document.getElementById(tab).style.zIndex;	// Stacking order of current tab
	// find all the tabs for this workspace //
	var tabs = document.getElementById(workspace).getElementsByClassName('tab');
	for (var t=0; t < tabs.length; t++) {
		if (tabs[t].id==tab) {	// if the tab is at zero move it away
			tabs[t].style.zIndex = "10";
		} else {
			tabs[t].style.zIndex = "";
		}
	}

	// find all the sections of this workspace //
	var sectype = document.getElementById(section).className;
	var sections = document.getElementById(workspace).getElementsByClassName(sectype);
	for (var s=0; s < sections.length; s++) {
		if (sections[s].id != section) {	// hide non-target sections
			sections[s].style.display = "none";
		}
	}
	// Show target section //
	document.getElementById(section).style.display = "block";

}
	

function controlSlide(s,n,d) { // Used for Sliding/Scrolling Controls //
	if (s=="nav") { s = "navset"; c = "nav" }
	else if (s=="control") { s="controlset"; c = "control";}
	else { c = s; };
	if (d>0) {
		document.getElementById(''+s+(n+1)+'').className = s+" "+c+"_deck";
		document.getElementById(''+s+n+'').className= s+" "+c+"_in";
	} else {
		document.getElementById(''+s+n+'').className = s+" "+c+"_in";
		if (n>0) {
		document.getElementById(''+s+(n-1)+'').className = s+" "+c+"_out";
		}
	}
}

function uniqueElements() {
	if (config.rzw_wysiwyg==1) {	// only do this if rich editor is in use
		var _document = document.getElementById('XinhaIFrame_inputBox').contentWindow.document;
		if (_document.getElementById('front_matter') != null) {
			if (_document.getElementById('front_matter').style.display=='none') {
				_document.getElementById('front_matter').style.display='block';
			} else {
				_document.getElementById('front_matter').style.display='none';
			}
		}
		if (_document.getElementById('end_matter') != null) {
			if (_document.getElementById('end_matter').style.display=='none') {
				_document.getElementById('end_matter').style.display='block';
			} else {
				_document.getElementById('end_matter').style.display='none';
			}		
		}
	} else {
		// nothing to do!
	}
}
function toggleDropBar() {
	if (typeof document.getElementById('dropbar') != undefined) { // make sure it exists first!
		var b2k = document.getElementById('dropbar');
		if (b2k.className=='navbars dropbar_hide') {
			b2k.className ='navbars dropbar_show';
		} else {
			b2k.className ='navbars dropbar_hide';
		}
	}
}	

function clearEditor() {
	var warn = confirm('Warning: This will erase everything in the editor!');
	if (warn==true) {
		var empty = '<p>&nbsp;</p><p>&nbsp</p><p>&nbsp;</p>';
		if (config.rzw_wysiwyg == 0 ) {
			document.getElementById('inputBox').value = empty;
		} else {
			xinha_editors.inputBox.setEditorContent(empty);
			document.getElementById('pagemanager').getElementsByTagName('ul')[0].innerHTML='';
		}
		docPropReset();		
	} else {}
}

var split = 0;

function splitView(s) {
	winSize();
	var size = winSize();
	W = size.W;
	H = size.H;
	if (s=="1") {
		if (H>=W) { var s = "2";} else { var s = "3"; };
	}
	if (s=="2") {
			document.getElementById('ed_refresh').style.display = "block";
			document.getElementById('leftbox').style.height = "50%";
			document.getElementById('leftbox').style.width = "100%";
			if (config.rzw_wysiwyg==0) {	
			} else {
				xinha_editors.inputBox.sizeEditor("","100%",true,true);
			}
			document.getElementById('rightbox').style.display = "block";
			document.getElementById('rightbox').style.height = "50%";
			document.getElementById('rightbox').style.width = "100%";
			document.getElementById('rightbox').style.borderTop = "1px solid #333";
			document.getElementById('sourceframe').style.width = "100%";
			document.getElementById('sourceframe').style.height = "100%";
			split = 1;
			htmlMode('textmode');
	} else if (s=="3") {
			document.getElementById('ed_refresh').style.display = "block";
			document.getElementById('leftbox').style.width = "50%";
			document.getElementById('leftbox').style.height = "100%";
			document.getElementById('leftbox').style.cssFloat = "left"; 
			if (config.rzw_wysiwyg==0) {	
			} else {
				xinha_editors.inputBox.sizeEditor("100%","100%",true,true);
			}
			document.getElementById('rightbox').style.display = "block";
			document.getElementById('rightbox').style.width = "50%";
			document.getElementById('rightbox').style.height = "100%";
			document.getElementById('rightbox').style.cssFloat = "right";
			document.getElementById('sourceframe').style.height = "100%";
			document.getElementById('sourceframe').style.width = "100%";
			split = 1;
			htmlMode('textmode');
	} else {
			document.getElementById('ed_refresh').style.display = "none";
			document.getElementById('leftbox').style.height = "100%";
			document.getElementById('leftbox').style.width = "100%";
			document.getElementById('leftbox').style.cssFloat = "none";
			if (config.rzw_wysiwyg==0) {	
			} else {
				xinha_editors.inputBox.sizeEditor("100%","100%",true,true);
			}
			document.getElementById('rightbox').style.display = "none";
			document.getElementById('rightbox').style.cssFloat = "none";
			document.getElementById('rightbox').style.border = "none";
			document.getElementById('rightbox').style.height = "100%";
			document.getElementById('rightbox').style.width = "100%";
			split = 0;
			htmlMode('wysiwyg');
	}

}

var htmlMode = function(mode) {
	if (config.rzw_wysiwyg==1) { // Only do this if xinha exists!	
		Xinha.prototype.setMode(mode,1);
	}
}

// USER INPUT FUNCTIONS //

	// TOUCH SCREEN HANDLER //
	// This app uses simplified touch event detection 	//
	// to support devices that do not use multi-touch	//
	// and a pseudo-swipe method to include device that //
	// cannot use the gesture touch methods				//
	
	var touchmoveCheck = 0;
	
	var scrollIt = function(e) {
		n = event.currentTarget;
	    updown 	= event.touches[0].pageY;
	    sideside = event.touches[0].pageX;
		n.addEventListener('touchmove',RYU.touchScroll);
		touchmoveCheck = 0;
	}
	
	var touchScroll = function(e) {
		var n = event.currentTarget;
	    var touch = event.touches[0];
	    var fingerMoved = updown - touch.pageY;
	    var fingerSwipe = touch.pageX;
		touchmoveCheck=1;
		if (nativeScroll == undefined || (nativeScroll !=undefined && config.zoompan == 0) || nscroll == 0 ) {
			if (typeof iScroll == "undefined") {
				n.style.overflow="hidden";
				// If no native scrolling support use JS scrolling //
				if (device.Platform == "Android" && device.v > 2) {
					// Cannot preventDefault for And3+ //
				} else {
					event.preventDefault();
				}
				n.scrollTop = n.scrollTop + fingerMoved;
				updown = touch.pageY;
			}
	   	}
		swipeGesture(fingerSwipe,sideside);
	   	   	sideside = touch.pageX;
	   	   	touch=0;
	}

var swipeGesture = function (fingerSwipe,sideside) {
			if (fingerSwipe < sideside && (sideside-fingerSwipe) > 90 ) {

				 }
			if (fingerSwipe > sideside && (fingerSwipe-sideside) > 90 ) {

			}
}
// Prevent triggering link on scroll //	
	function tapCheck(h) {
	 	if (touchmoveCheck==1) {
	 	} else {
			setTimeout('RYU.helpOpt('+h+')',300);
		}	
	}


function deviceSizer(n) {
	var OS = document.getElementById('os_select');
	if (document.getElementById('phone_profile').checked) {
		var phone = 1; 
	} else { 
		var phone = 0; 
	};
	// Screen Width
	if (n.id=="custom_width") {
		if (phone==1) {
			n.value = "480";
		} else {
			n.value = "1024";
		}
	}
	// Screen Height
	if (n.id=="custom_height") {
		if (phone==1) {
			n.value = "320";
		} else {
			if (OS.selectedIndex==5) {
				n.value = "600";
			} else {
				n.value = "768";
			}
		}
	}
	// Status Bar Height
	if (n.id=="custom_status") {
		if (OS.selectedIndex==0 || OS.selectedIndex==1) {
			n.value = "20"
		} else if (OS.selectedIndex==2) {
			n.value = "25"
		} else if (OS.selectedIndex==3) {
			if (phone==1) {
				n.value = "25";
			} else {
				n.value = "50";
			}
		} else if (OS.selectedIndex==6 || OS.selectedIndex==7) {
			n.value = "30";
		} else if (OS.selectedIndex==5 || OS.selectedIndex==4) {
			n.value = "0";
		} else {};
	}
	// Top Toolbar
	if (n.id=="custom_navbar") {
		if (OS.selectedIndex==0) {
			n.value = "44";
			// +30 for bookmarks bar
		} else if (OS.selectedIndex==1) {
			if (phone==1) {
				n.value = "44";
			} else {
				n.value = "76";
			}
			// +28 for bookmarks bar
		} else if (OS.selectedIndex==2) {
			n.value = "40";
		} else if (OS.selectedIndex==3) {
			if (phone==1) {
				n.value = "40";
			} else {
				n.value = "50";
			}
		} else if (OS.selectedIndex==4 || OS.selectedIndex==5) {
			n.value = "0";
		} else if (OS.selectedIndex==6) {
			n.value = "58";
		} else if (OS.selectedIndex==7) {
			n.value = "54";
		} else {};
	}
	// Bottom Toolbar
	if (n.id=="custom_tabbar") {
		if (OS.selectedIndex==0 || OS.selectedIndex==1 || OS.selectedIndex==5) {
			if (phone==1) {
				n.value = "49";
			} else {
				n.value = "0";
			}
		} else if (OS.selectedIndex==4) {
			n.value = "68";
		} else {
			n.value = "0";
		}
	}
}


function popOut(d) {
	if (d==1) {
	autoAdjust = 0;
	document.getElementById('skin').href = "ryuzinewriter/skins/fillview/skin.css";
	document.getElementById('device').className = "fillview landscape desktop none appview noskin";
	zoomFactor(1);
	} else {
	autoAdjust = 1;
	adjustBox();
	switchDevice(document.getElementById('device_selector').options[document.getElementById('device_selector').selectedIndex].value);
	RYU.dSim(1);
	document.getElementById('view_style').value = dView;
	document.getElementById('view_opt_label').innerHTML = document.getElementById('view_style').options[document.getElementById('view_style').selectedIndex].innerHTML;
	}
}

function viewDrop(n) {
	if (n==0) {
		RYU.dView(0);
	} else if (n==1) {
		RYU.dView(1);
	} else if (n==2) {
		RYU.dSim(1);
	} else if (n==3) {
		RYU.dSim(0);
	} else {
		RYU.dSim(0);RYU.popOut(1);
	};
}

function add2ConfigList(list,init,pull) {
	if (list==0) {
		var config_list = bmarkData;
		var config_data = document.getElementById('config_bookmarks_list');
		var label1 = "Text";
		var label2 = "Link";
		var input1 = "bmark";
		var input2 = "bmarkurl";
	} else if (list==1) {
		var config_list = rackData;
		var config_data = document.getElementById('config_catalogs_list');
		var label1 = "Text";
		var label2 = "File";
		var input1 = "cat";
		var input2 = "caturl";
	} else if (list==2) {
		var config_list = mediaType;
		var config_data = document.getElementById('edit_mediatypes_list');
		var label1 = "Media";
		var label2 = "Label";
		var input1 = "media";
		var input2 = "button";
	} else if (list==3) {
		var config_list = rackCategory;
		var config_data = document.getElementById('edit_categories_list');
		var label1 = "Category";
		var label2 = "";
		var input1 = "rcat";
		var input2 = "rcatNO";
	} else {}
	if (init==1) {} else {
		config_list.push([[],[]]);
	}
	if (pull==1) { // Update from data entry
		var data_input = config_data.getElementsByTagName('li');
		for (var p=0; p < config_list.length; p++) {
			config_list[p][0] = data_input[p].getElementsByTagName('input')[0].value;
			if (list==3) {} else {
			config_list[p][1] = data_input[p].getElementsByTagName('input')[1].value;
			}
		}
	}
	var new_list = "";
	for (var b=0; b < config_list.length; b++) {
		new_list = new_list +'<li>'+
		'<div class="left">';
		if (list==3) {
		new_list=new_list+'<span style="width:auto;">'+label1+' '+b+':</span><input id="'+input1+b+'" type="text" value="'+config_list[b][0]+'" />';
		'	<span style="display:none;">'+label2+':</span><input id="'+input2+b+'" type="text" value="'+config_list[b][1]+'" style="display:none;"/>';
		} else 
		{
		new_list=new_list+'	<span>'+label1+':</span><input id="'+input1+b+'" type="text" value="'+config_list[b][0]+'" /><br />'+
		'	<span>'+label2+':</span><input id="'+input2+b+'" type="text" value="'+config_list[b][1]+'" />';
		}
		new_list = new_list+'</div><input type="button" value="Delete" class="left" onclick="RYU.delConfigList('+list+','+b+');" />'+
		'</li>';	
	}
	if (list==0) {
	config_data.innerHTML = new_list;
	bmarkData = config_list;
	} else if (list==1) {
	config_data.innerHTML = new_list;
	rackData = config_list;
	} else if (list==2) {
	config_data.innerHTML = new_list;
	mediaType = config_list;
		// Now write list back to Config Page //
		var new_list = "";
		for (var m=0; m < mediaType.length; m++) {
		new_list = new_list +
		'<li><strong>Media Type:</strong> '+mediaType[m][0]+'</li>'+
		'<li><strong>Button Sample:</strong><div class="button type2" style="display:table;"><p style="padding-right:10px;">'+mediaType[m][1]+'</p></div></li>';
		}
		document.getElementById('config_mediatypes_list').innerHTML=new_list;
		buildRackInput();
	} else if (list==3) {
	config_data.innerHTML = new_list;
	rackCategory = config_list;
	buildRackInput();
	} else {
		alert(''+RYU._lc('Error: Unknown list.')+'');
	}
}
function delConfigList(list,item) {
	if (confirm(''+RYU._lc('Delete Entry')+' '+item+'? '+RYU._lc('This cannot be undone!')+'')) {
		deleteConfigList(list,item);
	}
}
function deleteConfigList(list,item) {
	if (list==0) {		bmarkData.splice(item,1); 	}
	else if (list==1) { rackData.splice(item,1);	}
	else if (list==2) {	mediaType.splice(item,1);	}
	else if (list==3) { rackCategory.splice(item,1);}
	else {}
	add2ConfigList(list,1);
}

function getCheckedValue(form_name,selector_name) {
   var selector = document.forms[''+form_name+''].elements[selector_name];
   for(var i = 0; i < selector.length; i++) {
      if(selector[i].checked) {
         return selector[i].value;
      }
   }
   return '';
}

function resetConfigFile() {
	// Clear Arrays //
	bmarkData.length = 0;
	mediaType.length = 0;
	rackCategory.length = 0;
	rackData.length=0;
	// Re-Init Arrays //
	initBmarkData();
	initMediaTypes();
	initRackCategories();
	initRackData();
	// Re-Draw Lists //
	add2ConfigList(0,1);
	add2ConfigList(1,1);
	add2ConfigList(2,1);
	add2ConfigList(3,1);
	// Now everything else //
	document.getElementsByName('binding')[0].checked=true;
	document.getElementsByName('fillpad')[0].checked=true;
	document.getElementsByName('zoomable')[1].checked=true;
	document.getElementById('maxzoom').value="5";
	document.getElementsByName('pgslide')[0].checked=true;
	document.getElementsByName('viewani')[0].checked=true;
	var full_addons_list = document.getElementById('config_addons_list').getElementsByTagName('input');
	for (var a=0;a<full_addons_list.length;a++){
		cut_selected_addon(full_addons_list[a]);
	}
	document.getElementById('language').selectedIndex=3;
	document.getElementsByName('swapThemes')[0].checked=true;
	document.getElementById('deskTheme').value = "";
	document.getElementById('winTheme').value = "";
	document.getElementById('macTheme').value = "";
	document.getElementById('nixTheme').value = "";
	document.getElementById('iOSTheme').value = "";
	document.getElementById('andTheme').value = "";
	document.getElementById('bbtTheme').value = "";
	document.getElementById('wp7Theme').value = "";
	document.getElementById('w8mTheme').value = "";

	document.getElementById('rackTitle').value = "Newsstand";
	document.getElementById('autopromo').value = 5;
	document.getElementById('maxpromos').value = 5;
	document.getElementById('rackItems').value = 10;
	document.getElementById('linkOpens').value = 0;
	document.getElementById('splash_ad').value = 0;
	document.getElementById('box_ad').value = 0;
	document.getElementById('banner_ad').value = 0;
}

function buildConfigFile() {
if (document.getElementById('minify').checked) {	// minified version is 25% size of non-minified
var configfile = 'var RYU = RYU || {};RYU.config = {'+
'language:"'+document.getElementById('language').value+'",'+
'binding:"'+getCheckedValue('config_form','binding')+'",'+
'pgsize:'+getCheckedValue('config_form','fillpad')+','+
'zoomable:'+getCheckedValue('config_form','zoomable')+','+
'maxzoom:'+document.getElementById('maxzoom').value+','+
'pgslide:'+getCheckedValue('config_form','pgslide')+','+
'viewani:'+getCheckedValue('config_form','viewani')+','+
'bmarkData:[';
var new_bmarklist = document.getElementById('config_bookmarks_list').getElementsByTagName('li');
for (var b=0; b < new_bmarklist.length; b++) {
configfile+='["'+unescape(document.getElementById('bmark'+b).value)+'","'+unescape(document.getElementById('bmarkurl'+b).value)+'"]';
if (b==new_bmarklist.length-1) { configfile+='';} else { configfile+=',';}
}
configfile+='],'+
'rackTitle:"'+document.getElementById('rackTitle').value+'",'+
'rackItems:'+document.getElementById('rackItems').value+','+
'linkOpens:'+document.getElementById('linkOpens').value+','+
'rackData:[';
var new_catlist = document.getElementById('config_catalogs_list').getElementsByTagName('li');
for (var b=0; b < new_catlist.length; b++) {
	if (b==0 && unescape(document.getElementById('caturl0').value)=='autocat0') {
		configfile+='["Catalog1","autocat0","'+current_catalog+'"]';
		break;
	} else {
		configfile+='["'+unescape(document.getElementById('cat'+b).value)+'","'+unescape(document.getElementById('caturl'+b).value)+'"]';
		if (b==new_catlist.length-1) { configfile+='';} else { configfile+=',';}
	}
}
configfile+='],'+
'mediaType:[';
var new_medialist = document.getElementById('edit_mediatypes_list').getElementsByTagName('li');
for (var b=0; b < new_medialist.length; b++) {
configfile+='["'+unescape(document.getElementById('media'+b).value)+'"],["'+unescape(document.getElementById('button'+b).value)+'"]';
if (b==new_medialist.length-1) { configfile+='';} else { configfile+=',';}
}
configfile+='],'+
'swapThemes:'+getCheckedValue('config_form','swapThemes')+','+
'deskTheme:"'+document.getElementById('deskTheme').value+'",'+
'winTheme:"'+document.getElementById('winTheme').value+'",'+
'macTheme:"'+document.getElementById('macTheme').value+'",'+
'nixTheme:"'+document.getElementById('nixTheme').value+'",'+
'iOSTheme:"'+document.getElementById('iOSTheme').value+'",'+
'andTheme:"'+document.getElementById('andTheme').value+'",'+
'wp7Theme:"'+document.getElementById('wp7Theme').value+'",'+
'w8mTheme:"'+document.getElementById('w8mTheme').value+'",'+
'bbtTheme:"'+document.getElementById('bbtTheme').value+'",'+
'splashad:'+document.getElementById('splash_ad').value+','+
'boxad:'+document.getElementById('box_ad').value+','+
'appbanner:'+document.getElementById('banner_ad').value+','+
'autopromo:'+document.getElementById('autopromo').value+','+
'maxpromos:'+document.getElementById('maxpromos').value+','+
'AddOns:[';
for (var a=0; a < selected_addons.length; a++) {
	configfile+='"'+selected_addons[a]+'"';
	if (a < selected_addons.length-1) {
		configfile+=',';
	} else {
		configfile+='';
	}
}configfile+=']};'
} else {
var configfile = ''+
'/*	RYUZINE READER/RACK CONFIG FILE\n'+
'	Version 1.0\n'+
'\n'+
'	Load this file before ryuzine.js or ryuzine.rack.js\n'+
'*/\n'+
'\n'+
'var RYU = RYU || {};\n'+
'RYU.config = {\n'+
'	/* 	LOCALIZATION SETTINGS	*/\n'+
'	language	:	"'+document.getElementById('language').value+'",		// ISO 639-1 language code (ignored is "localize" add-on is not loaded)\n'+
'	/*	RYUZINE READER/RACK		*/\n'+
'	binding		:	"'+getCheckedValue('config_form','binding')+'",		// Book Binding "spine" side\n'+
'	pgsize		:	'+getCheckedValue('config_form','fillpad')+',			// 0 = square | 1 = tall | 2 = fill all\n'+
'	zoomable   	:	'+getCheckedValue('config_form','zoomable')+',			// User Scale-Able: 1 = yes | 2 = no\n'+
'	maxzoom		:	'+document.getElementById('maxzoom').value+',		// Maximum Zoom Factor (if zooming is enabled)\n'+
'	pgslide		:	'+getCheckedValue('config_form','pgslide')+',			// 0 = on | 1 = off	: Page Slider navigation on load\n'+
'	viewani		:	'+getCheckedValue('config_form','viewani')+',			// 0 = on | 1 = off : Animate Changing Views\n'+
'	bmarkData	:	[			// Default preset Reader bookmarks : ["label","URL"]\n';
var new_bmarklist = document.getElementById('config_bookmarks_list').getElementsByTagName('li');
for (var b=0; b < new_bmarklist.length; b++) {
configfile+='		["'+unescape(document.getElementById('bmark'+b).value)+'","'+unescape(document.getElementById('bmarkurl'+b).value)+'"]';
if (b==new_bmarklist.length-1) { configfile+='\n';} else { configfile+=',\n';}
}
configfile+='	],\n'+
'	/*	RYUZINE RACK SETTINGS	*/\n'+
'	rackTitle	:	"'+document.getElementById('rackTitle').value+'",			// Optional name to insert as rack.htm title\n'+
'	rackItems	:	'+document.getElementById('rackItems').value+',			// 0 = default | value = number of items per page (5, 10, 20, 50, 100)\n'+
'	linkOpens	:	'+document.getElementById('linkOpens').value+',			// 0 = default | 1 = _self | 2 = _blank | 3 = _parent | 4 = _top | 5 = inrack | "id" = window id\n'+
'	rackData	:	[			// Data Catalog in /data/cat/ folder : ["Label","filename.htm"]\n';
var new_catlist = document.getElementById('config_catalogs_list').getElementsByTagName('li');
for (var b=0; b < new_catlist.length; b++) {
	if (b==0 && unescape(document.getElementById('caturl0').value)=='autocat0') {
		configfile+='		["Catalog1","autocat0","'+current_catalog+'"]\n';
		break;
	} else {
		configfile+='		["'+unescape(document.getElementById('cat'+b).value)+'","'+unescape(document.getElementById('caturl'+b).value)+'"]';
		if (b==new_catlist.length-1) { configfile+='\n';} else { configfile+=',\n';}
	}
}
configfile+='	],\n'+
'	mediaType	:	[			// Media Types : ["type","label"]\n';
var new_medialist = document.getElementById('edit_mediatypes_list').getElementsByTagName('li');
for (var b=0; b < new_medialist.length; b++) {
configfile+='		["'+unescape(document.getElementById('media'+b).value)+'","'+unescape(document.getElementById('button'+b).value)+'"]';
if (b==new_medialist.length-1) { configfile+='\n';} else { configfile+=',\n';}
}
configfile+='	],\n'+
'	/* 	THEME SETTINGS			*/\n'+
'	swapThemes	:	'+getCheckedValue('config_form','swapThemes')+',				// 0 = no | 1 = yes : Swap themes based on device type\n'+
'	deskTheme	:	"'+document.getElementById('deskTheme').value+'",		// Fallback theme for unspecified desktop/laptop OS\n'+
'	winTheme 	:	"'+document.getElementById('winTheme').value+'",		// General Windows desktop/laptop systems\n'+
'	macTheme	:	"'+document.getElementById('macTheme').value+'",	// Macintosh Systems\n'+
'	nixTheme   	:	"'+document.getElementById('nixTheme').value+'",				// Linux Systems\n'+
'	iOSTheme   	:	"'+document.getElementById('iOSTheme').value+'",	// iOS Devices (iPad, iPhone, iPod Touch)\n'+
'	andTheme	:	"'+document.getElementById('andTheme').value+'",		// Android Phones and Tablets\n'+
'	wp7Theme	:	"'+document.getElementById('wp7Theme').value+'",		// Windows Phone 7 devices\n'+
'	w8mTheme	:	"'+document.getElementById('w8mTheme').value+'",		// Windows 8.x desktop/laptops in "Metro" mode\n'+
'	bbtTheme   	:	"'+document.getElementById('bbtTheme').value+'",				// BlackBerry Tablet (legacy device)\n'+
'	/* 	INTEGRATED ADVERTISING 	*/\n'+
'	splashad   	:	'+document.getElementById('splash_ad').value+',			// 0 = no splash ad | value = display time for ad in seconds\n'+
'	boxad		:	'+document.getElementById('box_ad').value+',			// 0 = no box ad	| value = display time in seconds | "x" = persistent (user must close)\n'+
'	appbanner	:	'+document.getElementById('banner_ad').value+',			// 0 = no banner ad	| value = display time in seconds | "x" = persistent (user must close)\n'+
'	autopromo	:	'+document.getElementById('autopromo').value+',			// 0 = off | value = animation interval in seconds (Ryuzine Rack)\n'+
'	maxpromos	:	'+document.getElementById('maxpromos').value+',			// Maximum number of promotions in carousel	(Ryuzine Rack)\n'+
'	AddOns		: [\n';
for (var a=0; a < selected_addons.length; a++) {
	configfile+='	"'+selected_addons[a]+'"';
	if (a < selected_addons.length-1) {
		configfile+=',\n';
	} else {
		configfile+='\n';
	}
}
configfile+='	]\n'+
'};'
};
document.getElementById('configBox').value = configfile;
slideSpace(2);swapAppTab('export','export_tab2','export_section2');
}

function initRack() {
	cat_masthead = "";
	// First Row is always going to be headers //
	rackBuilder = [[]];
	rackBuilder[0][0] = "ID";
	rackBuilder[0][1] = "Date";
	rackBuilder[0][2] = "Title";
	rackBuilder[0][3] = "Description";
	rackBuilder[0][4] = "Category";
	rackBuilder[0][5] = "URL";
	rackBuilder[0][6] = "Type";
	rackBuilder[0][7] = "Thumbnail";
	rackBuilder[0][8] = "Promotion";
};	

function newRackCat() {
	if(confirm('New blank table? All current data will be lost!')) {
		rackBuilder.length=0;
		initRack();
		addRackData(1); // redraw w/o getRackData
	}
	current_catalog = '';
}
function addRackRows(count) {
	if (count==null) { return;}
	for (var c=0; c < count; c++) {
		addRackData();
	}
}
function addRackData(init) {
	if (init==1) {} else {getRackData();}
	var r = rackBuilder.length;
	rackBuilder[r];
	rackBuilder[r] = [];
	rackBuilder[r][0] = r;
	rackBuilder[r][1] = "";
	rackBuilder[r][2] = "";
	rackBuilder[r][3] = "";
	rackBuilder[r][4] = "";
	rackBuilder[r][5] = "";
	rackBuilder[r][6] = "";
	rackBuilder[r][7] = "";
	rackBuilder[r][8] = "";
	buildRackInput(); // redraw table
}
function delRackData(dex) {
	if(confirm('Delete Row '+dex+'? This cannot be undone!')) {
		rackBuilder.splice(dex,1);
		for (var r=0; r < rackBuilder.length; r++) {
			if (r==0) {}else{
			rackBuilder[r][0] = r; // Fix index numbers
			}
		}
		buildRackInput(); // redraw table
	}
}

function getRackData(xport) {
	// This pulls everything from the rack builder into the array //
	var myrack = document.getElementById('rackdata').getElementsByTagName('tr');
	for (var r=0; r < rackBuilder.length; r++) {
		if (r==0) { var mycell = myrack[r].getElementsByTagName('th');
			rackBuilder[r][0] = mycell[0].getElementsByTagName('input')[0].value;
			rackBuilder[r][3] = mycell[3].getElementsByTagName('input')[0].value;
			rackBuilder[r][4] = mycell[4].getElementsByTagName('input')[0].value;
			rackBuilder[r][6] = mycell[6].getElementsByTagName('input')[0].value;
		} else {	var mycell = myrack[r].getElementsByTagName('td'); 
			rackBuilder[r][0] = mycell[0].getElementsByTagName('p')[0].innerHTML;
			rackBuilder[r][3] = mycell[3].getElementsByTagName('textarea')[0].value;
			rackBuilder[r][4] = mycell[4].getElementsByTagName('select')[0].value;
			rackBuilder[r][6] = mycell[6].getElementsByTagName('select')[0].value;
		}
			rackBuilder[r][1] = mycell[1].getElementsByTagName('input')[0].value;
			rackBuilder[r][2] = mycell[2].getElementsByTagName('input')[0].value;
			rackBuilder[r][5] = mycell[5].getElementsByTagName('input')[0].value;
			rackBuilder[r][7] = mycell[7].getElementsByTagName('input')[0].value;
			rackBuilder[r][8] = mycell[8].getElementsByTagName('input')[0].value;
	}
	if (xport==1) { buildRackData();}
}

function buildRackInput() {
	var rack_html = "";
			rack_html = rack_html+
			'<thead>\n'+
			'<tr>\n'+
			'<th class="nosort end"><input type="text" value="'+rackBuilder[0][0]+'" /></th>\n'+
			'<th><input type="text" value="'+rackBuilder[0][1]+'" /></th>\n'+
			'<th><input type="text" value="'+rackBuilder[0][2]+'" /></th>\n'+
			'<th class="nosort"><input type="text" value="'+rackBuilder[0][3]+'" /></th>\n'+
			'<th><input type="text" value="'+rackBuilder[0][4]+'"/></th>\n'+
			'<th class="nosort"><input type="text" value="'+rackBuilder[0][5]+'" /></th>\n'+
			'<th><input type="text" value="'+rackBuilder[0][6]+'" /></th>\n'+
			'<th class="nosort"><input type="text" value="'+rackBuilder[0][7]+'" /></th>\n'+
			'<th class="nosort"><input type="text" value="'+rackBuilder[0][8]+'" /></th>\n'+
			'<th class="unstyle end"></th>\n'+
			'</tr>\n'+
			'</thead>\n'+
			'<tbody>\n';
	for (var r=1; r < rackBuilder.length; r++) {
			if (r==rackBuilder.length-1) { var finito = 'id="lastcell" ';}else{var finito='';}
			rack_html = rack_html+'<tr>\n'+
			'<td class="end"><p class="noedit">'+r+'</p></td>\n'+
			'<td><input type="text" value="'+rackBuilder[r][1]+'" /></td>\n'+
			'<td><input type="text" value="'+rackBuilder[r][2]+'" /></td>\n'+
			'<td><textarea>'+rackBuilder[r][3]+'</textarea></td>\n'+
			'<td><select>';
			for (var c=0; c < rackCategory.length; c++) {
				if (rackBuilder[r][4]==rackCategory[c][0]) { var checked = "selected" } else {var checked = ""};
				rack_html=rack_html+
				'<option value="'+rackCategory[c][0]+'" '+checked+'>'+rackCategory[c][0]+'</option>\n';
			}			
			rack_html=rack_html+'</select></td>\n'+
			'<td><input type="text" value="'+rackBuilder[r][5]+'" /></td>\n'+
			'<td><select>\n';
			for (var m=0; m < mediaType.length; m++) {
				if (rackBuilder[r][6]==mediaType[m][0]) { var checked = "selected" } else {var checked = ""};
				rack_html=rack_html+
				'<option value="'+mediaType[m][0]+'" '+checked+'>'+mediaType[m][0]+'</option>\n';
			}
			rack_html = rack_html+'</select></td>\n'+
			'<td><input type="text" value="'+rackBuilder[r][7]+'" /></td>\n'+
			'<td><input type="text" value="'+rackBuilder[r][8]+'" '+finito+'/></td>\n'+
			'<td class="unstyle end"><div class="delete" onclick="RYU.delRackData('+r+');"></div></td>\n'+
			'</tr>\n';
		}
		var rack_html = rack_html+'</tbody>\n';
	document.getElementById('rackdata').innerHTML=rack_html;
}

function buildRackTable() {
	var rack_html = '<table cellpadding="5" cellspacing="0" border="1"><tr><td><strong>Masthead</strong> (optional):</td>'+
	'<td title="masthead">';
	if (!document.getElementById('masthead')) {
		rack_html += cat_masthead;
	}else{
		rack_html += document.getElementById('masthead').value;
	}
	rack_html += '</td></tr></table>'+
	'<p></p>\n'+
	'<table cellpadding="0" cellspacing="0" border="1" title="table" class="sortable">'+
			'<thead>\n'+
			'<tr>\n'+
			'<th class="nosort">'+rackBuilder[0][0]+'"</th>\n'+
			'<th>'+rackBuilder[0][1]+'</th>\n'+
			'<th>'+rackBuilder[0][2]+'</th>\n'+
			'<th class="nosort">'+rackBuilder[0][3]+'</th>\n'+
			'<th>'+rackBuilder[0][4]+'</th>\n'+
			'<th class="nosort">'+rackBuilder[0][5]+'</th>\n'+
			'<th>'+rackBuilder[0][6]+'</th>\n'+
			'<th class="nosort">'+rackBuilder[0][7]+'</th>\n'+
			'<th class="nosort">'+rackBuilder[0][8]+'</th>\n'+
			'</tr>\n'+
			'</thead>\n'+
			'<tbody>\n';
	for (var r=1; r < rackBuilder.length; r++) {
			rack_html = rack_html+'<tr>\n'+
			'<td>'+r+'</td>\n'+
			'<td>'+rackBuilder[r][1]+'</td>\n'+
			'<td>'+rackBuilder[r][2]+'</td>\n'+
			'<td>'+rackBuilder[r][3]+'</td>\n'+
			'<td>'+rackBuilder[r][4]+'</td>\n'+
			'<td>'+rackBuilder[r][5]+'</td>\n'+
			'<td>'+rackBuilder[r][6]+'</td>\n'+
			'<td>'+rackBuilder[r][7]+'</td>\n'+
			'<td>'+rackBuilder[r][8]+'</td>\n'+
			'</tr>\n';
		}
		var rack_html = rack_html+'</tbody>\n'+
  		'</table>\n';
  	return rack_html;
}

function buildRackData() {
	rack_html = '<!DOCTYPE html>\n'+
	'<html>\n'+
	'<head>\n'+
	'<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />\n'+
	'<title>Ryuzine Rack Data</title>\n'+
	'</head>\n'+
	'<body>\n'+buildRackTable()+'</body>\n'+
	'</html>\n';
	document.getElementById('dataBox').value=rack_html;
	slideSpace(2);swapAppTab('export','export_tab3','export_section3');
}

function cat2data(url) {
	if (url == null || url == "") {
		alert(''+RYU._lc('You must enter a catalog file name')+'');
	} else {
		current_catalog = url.replace('.htm','');
		if (!url.match(/http:/)) { // Not full path so assume it is local
			url = "data/"+url;
		}
		if (document.getElementById('loadbox') == undefined) {
			// Build Data Holder //
			var loadbox_dom = document.createElement('iframe');
			loadbox_dom.setAttribute('id','loadbox');
			loadbox_dom.setAttribute('style','display:none;');
			loadbox_dom.src = url;
			loadbox_dom.setAttribute('onload','RYU.loadRackData();');
			document.getElementsByTagName('body')[0].appendChild(loadbox_dom);
		} else {
			document.getElementById('loadbox').src=url;
		}
	}
}

function iframeRef( frameRef ) {
    return frameRef.contentWindow ? frameRef.contentWindow.document : frameRef.contentDocument
}

function loadRackData() {
		var datafile = iframeRef(document.getElementById('loadbox'));		
		if (!datafile.getElementsByTagName('table')[0].getElementsByTagName('td')[1].title=='masthead' || !datafile.getElementsByTagName('table')[1].title=='table') {
			alert(''+RYU._lc('This is not a valid catalog file.')+''); return;
		} else {
			if (!document.getElementById('masthead')) {
				cat_masthead = datafile.getElementsByTagName('table')[0].getElementsByTagName('td')[1].innerHTML;
			}else{
				document.getElementById('masthead').value=datafile.getElementsByTagName('table')[0].getElementsByTagName('td')[1].innerHTML;
				cat_masthead = document.getElementById('masthead').value;
			}
		// This pulls everything from the loaded table into the array //
		var myrack = datafile.getElementsByTagName('table')[1].getElementsByTagName('tr');
			rackBuilder.length = 0;
			rackBuilder = [];
		for (var r=0; r < myrack.length; r++) {
			rackBuilder[r] = [];
			if (r==0) { var mycell = myrack[r].getElementsByTagName('th');
				for (var c=0; c < mycell.length; c++) {
					rackBuilder[r][c] = mycell[c].innerHTML;
				}
			} else {	var mycell = myrack[r].getElementsByTagName('td');
				for (var c=0; c < mycell.length; c++) {
					// check if category exists, if not add it //
					if (c==4) { var val = mycell[c].innerHTML; var check = 0; // assume no match
						for (var rc=0; rc < rackCategory.length; rc++) {
							if ( val.toLowerCase()==rackCategory[rc][0].toLowerCase() ) { // text match
								if (val!=rackCategory[rc][0]) { // case is different
								mycell[c].innerHTML = rackCategory[rc][0]; // favor case of list
								}
								check=1;
							}
						}
						if (check==0) { // no match so add to list
							rackCategory.push([[],[]]);
							rackCategory[rackCategory.length-1][0] = val;
							rackCategory[rackCategory.length-1][1] = "";
							RYU.add2ConfigList(3,1,0);	
						}					
					}
					// check if media type exists, if not add it //
					if (c==6) { var val = mycell[c].innerHTML; var check = 0;
						for (var mt=0; mt < mediaType.length; mt++) {
							if ( val.toLowerCase()==mediaType[mt][0].toLowerCase() ) {
								if (val!=mediaType[mt][0]) {
								mycell[c].innerHTML = mediaType[mt][0];
								}
								check = 1;
							}
						}
						if (check==0) {
							mediaType.push([[],[]]);
							mediaType[mediaType.length-1][0] = val;
							mediaType[mediaType.length-1][1] = val;
							RYU.add2ConfigList(2,1,0);
						}
					}
					rackBuilder[r][c] = mycell[c].innerHTML;
				}
			}
			
		}
		buildRackInput(); // redraw table
		}
}

function previewRack() {
	if (current_catalog=='') {	// if current catalog has no filename
		current_catalog = prompt('Folder name where cover art is kept for this catalog:');
	}
	// add autocat to test config file
	document.getElementById('config_catalogs_list').innerHTML = '';
	deleteConfigList(1,1);
	document.getElementById('cat0').value = 'Catalog 1';
	document.getElementById('caturl0').value = 'autocat0';
	// clear configBox before regeneration
	document.getElementById('configBox').value = '';
	// Set Output Options
	document.getElementById('magtitle').value = 'RyuzineRack';
	document.getElementById('configit2').checked = true;
	RYU.outputOptions();
	doc_converted = 5;	// trick it into thinking we loaded a RyuzineRack file
	// Build and Simulate
	RYU.getRackData(1);
	RYU.loadTemplate(5);	// load an empty template
	RYU.clearSimulator();
	RYU.refreshSrc();
	RYU.reWrite();
	RYU.slideSpace(3);
}

function xpandIFRAME(n) {
	var xframe = iframeRef(n);
	var doc_height = xframe.getElementsByTagName('html')[0].offsetHeight;
	n.style.height=doc_height+'px';
}


function issueStyles(css_import) {
	// css_import was used to merge in-page styles with this, not set up to do anymore?
	if (css_import==null) { css_import = ""; };
	var iCSS = '/* Styles for THIS Issue (not used by "Plain" view) */\n'+
	'.section_head, .page_box { background: #fff;}\n'+
	'\n'+css_import+'\n'+
	'@media screen {\n'+
	'\n'+
	'}\n'+
	'/*====================*/\n'+
	'/* Widescreen Monitor */\n'+
	'@media only screen and (min-width: 1600px) {\n'+
	'\n'+
	'}\n'+
	'\n'+
	'/*==============================================================*/\n'+
	'/* Widescreen Monitor (High Density) */\n'+
	'@media only screen and (min-width: 1600px) and (-webkit-min-device-pixel-ratio: 2),\n'+
	'only screen and (min-width: 1600px) and (min--moz-device-pixel-ratio: 2),\n'+
	'only screen and (min-width:1600px) and (-o-min-device-pixel-ratio: 2/1),\n'+
	'only screen and (min-width:1600px) and (min-device-pixel-ratio: 2) {\n'+
	'\n'+
	'}\n'+
	'\n'+
	'/*===================*/\n'+
	'/* iPad in Landscape */\n'+
	'@media only screen and (min-width: 1024px) and (max-width: 1599px)  {\n'+
	'\n'+
	'}\n'+
	'\n'+
	'/*===================================================*/\n'+
	'/* iPad Retina and other hi-res tablets in Landscape */\n'+
	'@media only screen and (min-width: 1024px) and (max-width: 1599px) and (-webkit-min-device-pixel-ratio : 2.0),\n'+
	'only screen and (min-width: 1024px) and (max-width: 1599px) and (min--moz-device-pixel-ratio: 2.0),\n'+
	'only screen and (min-width: 1024px) and (max-width: 1599px) and (-o-min-device-pixel-ration: 2/1),\n'+
	'only screen and (min-width: 1024px) and (max-width: 1599px) and (min-device-pixel-ratio : 2.0) {\n'+
	'\n'+
	'}\n'+
	'\n'+
	'/*================================*/\n'+
	'/* Desktop Screen 1280 to 1600 px */\n'+
	'@media only screen and (min-width: 1280px) and (max-width: 1599px) and (min-height: 800px) {\n'+
	'\n'+
	'}\n'+
	'\n'+
	'/*==============================================================*/\n'+
	'/* Desktop Screen (High Density) */\n'+
	'@media only screen and (min-width: 1280px) and (max-width: 1599px) and (min-height: 800px) and (-webkit-min-device-pixel-ratio: 2),\n'+
	'only only screen and (min-width: 1280px) and (max-width: 1599px) and (min-height: 800px) and (min--moz-device-pixel-ratio: 2),\n'+
	'only only screen and (min-width: 1280px) and (max-width: 1599px) and (min-height: 800px) and (-o-min-device-pixel-ratio: 2/1),\n'+
	'only only screen and (min-width: 1280px) and (max-width: 1599px) and (min-height: 800px) and (min-device-pixel-ratio: 2) {\n'+
	'\n'+
	'}\n'+
	'\n'+
	'/*===================================*/\n'+
	'/* iPad + Android Tablet in Portrait */\n'+
	'@media only screen and (min-width: 768px) and (max-width: 1023px) {\n'+
	'\n'+
	'}\n'+
	'\n'+
	'/*==============================================================*/\n'+
	'/* iPad Retina + Hi-Res Other Tablet in Portrait */\n'+
	'@media only screen and (min-width: 768px) and (max-width: 1023px) and (-webkit-min-device-pixel-ratio : 2.0),\n'+
	'only screen and (min-width: 768px) and (max-width: 1023px) and (min--moz-device-pixel-ration: 2),\n'+
	'only screen and (min-width: 768px) and (max-width: 1023px) and (-o-min-device-pixel-ratio: 2/1),\n'+
	'only screen and (min-width: 768px) and (max-width: 1023px) and (min-device-pixel-ratio: 2) {\n'+
	'\n'+
	'}\n'+
	'\n'+
	'/*==============================================================*/\n'+
	'/* Android HVGA and WVGA in Landscape */\n'+
	'@media only screen and (min-width: 600px) and (max-width: 767px) {\n'+
	'\n'+
	'}\n'+
	'\n'+
	'/*==============================================================*/\n'+
	'/* Android Landscape (High Density) */\n'+
	'@media only screen and (min-width: 600px) and (max-width: 767px) and (-webkit-min-device-pixel-ratio : 2.0),\n'+
	'only screen and (min-width: 600px) and (max-width: 767px) and (min--moz-device-pixel-ration: 2),\n'+
	'only screen and (min-width: 600px) and (max-width: 767px) and (-o-min-device-pixel-ratio: 2/1),\n'+
	'only screen and (min-width: 600px) and (max-width: 767px) and (min-device-pixel-ratio: 2) {\n'+
	'\n'+
	'}\n'+
	'\n'+
	'/*==============================================================*/\n'+
	'/* iPhone + iPod Touch + Android Phone in Landscape */\n'+
	'@media only screen and (min-width: 480px) and (max-width: 599px),\n'+
	'only screen and(min-width:600px) and (max-width:767px) and (max-height:480px) {\n'+
	'\n'+
	'}\n'+
	'\n'+
	'/*==============================================================*/\n'+
	'/* iPhone + iPod Touch + Android Phone in Landscape (High Density) */\n'+
	'@media only screen and (min-width: 480px) and (max-width: 599px) and (-webkit-min-device-pixel-ratio : 2.0),\n'+
	'only screen and (min-width: 480px) and (max-width: 599px) and (min--moz-device-pixel-ration: 2),\n'+
	'only screen and (min-width: 480px) and (max-width: 599px) and (-o-min-device-pixel-ratio: 2/1),\n'+
	'only screen and (min-width: 480px) and (max-width: 599px) and (min-device-pixel-ratio: 2) {\n'+
	'\n'+
	'}\n'+
	'\n'+
	'/*==============================================================*/\n'+
	'/* iPhone + iPod Touch + Android Portrait */\n'+
	'@media only screen and (max-width: 479px) {\n'+
	'\n'+
	'\n'+
	'}\n'+
	'\n'+
	'/*==============================================================*/\n'+
	'/* iPhone Retina + Android (High Density) Portrait */\n'+
	'@media only screen and (max-width: 479px) and (-webkit-min-device-pixel-ratio : 2.0),\n'+
	'only screen and (max-width: 479px) and (min--moz-device-pixel-ration: 2),\n'+
	'only screen and (max-width: 479px) and (-o-min-device-pixel-ratio: 2/1),\n'+
	'only screen and (max-width: 479px) and (min-device-pixel-ratio: 2) {\n'+
	'\n'+
	'}\n'+
	'\n'+
	'}\n';
	return iCSS;
}

// Dynamic Themes Function //
function dynTheme() {
	if (device.Platform=="Android") {
		var theme = andTheme;
	} else if ( device.Platform == "iOS" ) {
		var theme = iOSTheme;
	} else if ( device.Platform == "WP7" ) {
		var theme = wp7Theme;
	} else if ( device.Platform == "IE" && device.metro == 1 ) {
		if (w8mTheme != "") {
			var theme = w8mTheme;
		} else {
			if (winTheme[0] != "") {
				var theme = winTheme;
			} else {
				var theme = deskTheme;
			}
		}
	} else {
		if (device.OS == "Windows" && winTheme != "") {
			var theme = winTheme;
		} else if (device.OS == "Mac" && macTheme != "") {
			var theme = macTheme;
		} else if (device.OS == "Linux" && nixTheme != "") {
			var theme = nixTheme;
		} else {
			var theme = deskTheme;
		}
	}
	return theme;
}


function themeToggle(t) {
	if (t!=null) { config.rzw_themeset = t; }
	if (config.rzw_themeset==1) {
		// If auto swapping themes need to sniff browser (ugh!) //
		if (swapThemes != 0 ) {
			var theme = dynTheme();
			if (theme=="" || theme == null) {
				// if theme is empty check to see if there is a default theme set //
				if (defaultTheme != "" && defaultTheme != null) {
					var themepath = defaultTheme;
				} else {
				var themepath = ""};
			} else {var themepath = ""+baseurl+"ryuzinewriter/theme/"+theme+"/writer.css";}
			document.getElementById('ui_theme').href=themepath;
		} else {
			// If not swapping themes and default theme is set use it //
			if (defaultTheme != "" && defaultTheme != null) {
				document.getElementById('ui_theme').href=defaultTheme;
			}
		}
		document.getElementById('opt_rzw_themeset').className="opt-switch opt-on";
	} else {
		if (document.getElementById('ui_theme') != null) {
		document.getElementById('ui_theme').href=defaultTheme;}
		document.getElementById('opt_rzw_themeset').className="opt-switch opt-off";
	}
	// make sure theme is applied/removed before checking appbanner and tocslider parentage
	if (config.rzw_themeset!=0) { var checkval = 2; } else { var checkval = 1; }
	var reflow = window.setInterval(function() {
		if (document.getElementById('tcheck').clientWidth==checkval) {
    		window.clearInterval(reflow);
    	}
    },30);
    // if theme file did not load do not spin forever
    setTimeout(function(){window.clearInterval(reflow)},2000);
}


// OPTIONS TOGGLES //
function stylesToggle() {
	if (config.rzw_styles == 1) {
		config.rzw_styles = 0;
	} else {
		config.rzw_styles = 1;
	}
	Set_Cookie('rzw_myStyles',''+config.rzw_styles+'');
	alert(''+RYU._lc('Change takes effect after reloading Ryuzine Writer')+'');
}
function scrollToggle(a) {
	if (a!=null) { config.nscroll = a; }
	if (config.rzw_nscroll==0) {
		document.getElementById('opt_rzw_nscroll').className="opt-switch opt-off";
	} else {
		document.getElementById('opt_rzw_nscroll').className="opt-switch opt-on";
	}
	setTimeout(function(){bookBinder();},1000);
}
function iScrollToggle(a) {
	var listener = eDown;
	if (a!=null) { config.iscroll_iscroll = a; }
	if (config.iscroll_iscroll==0) {
		console.log('Destroy all iScrollers!');
		// Destroy all iScroll scrollers!
			if (typeof iScroll != "undefined") {
				scrollHolder = iScroll; // store iScroll somewhere else
				iScroll = undefined; 
				if (typeof IScroll != "undefined") {
					IScroll = undefined;
					eDown = iDown;
				};
			}
	} else {
		console.log('Turn on iScrollers if you can');
		if (typeof iScroll == "undefined" && scrollHolder != undefined) {
			if ("IScroll" in window) {
				iScroll = IScroll = scrollHolder;
				eDown = "tap";
				scrollHolder = undefined;
			} else {
				iScroll = scrollHolder; // restore iScroll from backup if possible
				scrollHolder = undefined;
			}
		}
	}
	console.log('ISCROLL SWITCH: run bookBinder() in 1s');
	setTimeout(function(){bookBinder();},1000);
}

function zoomToggle(z) {
	if (z!=null) { config.zoompan = z; }
	if ('ontouchstart' in document.documentElement || device.Platform == "FFM" || device.Platform == "WP7" ) {
		// First FireFox Fennec releases and IEMobile have no support for touchstart //
		if (config.zoompan == 1) {
			if (device.Platform=="WP7") {
				var scr = "width=device-width,height=device-height,";
			} else {
				var scr = "";
				body.removeEventListener('touchstart',RYU.defaultPrevention(),false);
				body.addEventListener('touchstart',RYU.restoreDefault(),false);
			}
		document.getElementById('zoom').style.display="block";
		if (!document.getElementById('zooming')) {  // Old IE should never do this anyway so setAttribute should be ok */
			var metazoom = document.createElement('meta');
			metazoom.setAttribute('name','viewport');
			metazoom.setAttribute("content",""+scr+"initial-scale=1.0,minimum-scale=1.0,maximum-scale="+maxzoom+",user-scalable=yes");
			metazoom.setAttribute('id','zooming');
			document.getElementsByTagName('head')[0].appendChild(metazoom);
		} else {
			document.getElementsByTagName('head')[0].removeChild(document.getElementById('zooming'));
			var metazoom = document.createElement('meta');
			metazoom.setAttribute('name','viewport');
			metazoom.setAttribute("content",""+scr+"initial-scale=1.0,minimum-scale=1.0,maximum-scale="+maxzoom+",user-scalable=yes");
			metazoom.setAttribute('id','zooming');
			document.getElementsByTagName('head')[0].appendChild(metazoom);
		}			
		document.getElementById('opt_rzw_zoompan').className="opt-switch opt-on";
		document.getElementById('opt_rzw_nscroll_label').parentNode.className="";
		}else{
			if (device.Platform=="WP7") {
				var scr = "width=device-width,height=device-height,";
			} else {
				var scr = "";			
				body.addEventListener('touchstart',RYU.defaultPrevention());
			}
		document.getElementById('zoom').style.display="none";
		if (!document.getElementById('zooming')) {
			var metazoom = document.createElement('meta');
			metazoom.setAttribute('name','viewport');
			metazoom.setAttribute("content",""+scr+"initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no");
			metazoom.setAttribute('id','zooming');
			document.getElementsByTagName('head')[0].appendChild(metazoom);
		} else {
			document.getElementsByTagName('head')[0].removeChild(document.getElementById('zooming'));
			var metazoom = document.createElement('meta');
			metazoom.setAttribute('name','viewport');
			metazoom.setAttribute("content",""+scr+"initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no");
			metazoom.setAttribute('id','zooming');
			document.getElementsByTagName('head')[0].appendChild(metazoom);

		}	
		document.getElementById('opt_rzw_zoompan').className="opt-switch opt-off";
		document.getElementById('opt_rzw_nscroll_label').parentNode.className="opt-disabled";
		if (config.nscroll==1) { config.nscroll=0;scrollToggle(0);};
		}

	}			
}

// Cookie Functions //
var today = new Date();
var zero_date = new Date(0,0,0);
today.setTime(today.getTime() - zero_date.getTime());

var todays_date = new Date(today.getYear()+1,today.getMonth(),today.getDate(),0,0,0);
var expires_date = new Date(todays_date.getTime() + (8 * 7 * 86400000));

function Get_Cookie(name) {
    var start = document.cookie.indexOf(name+"=");
    var len = start+name.length+1;
    if ((!start) && (name != document.cookie.substring(0,name.length))) return null;
    if (start == -1) return null;
    var end = document.cookie.indexOf(";",len);
    if (end == -1) end = document.cookie.length;
    return unescape(document.cookie.substring(len,end));
}

function Set_Cookie(name,value,expires,path,domain,secure) {
    expires="Sun, 01-Jan-2040 00:00:01 GMT";
    document.cookie = name + "=" +escape(value) +
        ( (expires) ? ";expires=" + expires : "") +
        ( (path) ? ";path=" + path : "") + 
        ( (domain) ? ";domain=" + domain : "") +
        ( (secure) ? ";secure" : "");
}

function Delete_Cookie(name,path,domain) {
    if (Get_Cookie(name)) document.cookie = name + "=" +
       ( (path) ? ";path=" + path : "") +
       ( (domain) ? ";domain=" + domain : "") +
       ";expires=Thu, 01-Jan-70 00:00:01 GMT";
}



function storeMasterCookie() {
    if (!Get_Cookie('MasterCookie'))
        Set_Cookie('MasterCookie','MasterCookie');
}

function storeIntelligentCookie(name,value) {
    if (Get_Cookie('MasterCookie')) {
        var IntelligentCookie = Get_Cookie(name);
        if ((!IntelligentCookie) || (IntelligentCookie != value)) {
            Set_Cookie(name,value,expires_date);
            var IntelligentCookie = Get_Cookie(name);
            if ((!IntelligentCookie) || (IntelligentCookie != value))
                Delete_Cookie('MasterCookie');
        }
    }
}
	// check if browser is accepting cookies //
	storeMasterCookie();
	storeIntelligentCookie('test','cookie value');

var filetype = 0;

function fileOps(f,c,from) {
	if (f > 4 && f < 9) {
		// tell it what type of file it will be saving //
		var ifrm = document.getElementById('save_file_frame');
		var win = ifrm.contentWindow;
		var doc = ifrm.contentDocument? ifrm.contentDocument: ifrm.contentWindow.document;
		doc.getElementById('save_file_type').value = f;	
	}
	if (f==10) {
		RYU.toggleDialog('loadrack',1);
		if (xfileman==1) {
			// refresh file list
			document.getElementById('file_list').src="ryuzinewriter/php/scandir.php";
			setTimeout(function(){
				var catalogs = document.getElementById('file_list').contentWindow.rackcats;
				var catbox = '<select id="chooser4">';
				for (var c=0; c < catalogs.length; c++) {
					catbox = catbox + '<option>'+catalogs[c]+'</option>';
				}
				catbox = catbox + '</select>';
				document.getElementById('file_chooser4').innerHTML = catbox;},300);
		}
	} else if (f==11) {
		if (xfileman==1) {
			// refresh file list
			document.getElementById('file_list').src="ryuzinewriter/php/scandir.php";
			setTimeout(function(){
				var addons = document.getElementById('file_list').contentWindow.addons;
				if (typeof c == 'string') { 		install = [c];
				} else if (Array.isArray(c)) {	install = c;
				} else { return; }	// nothing to install so bail now
				for (var i=install.length-1; i > -1; i--) {
					for (var a=0; a < addons.length; a++) {
						if (install[i] == addons[a]) {
							install.splice(i,1);
						}
					}
				}
				for (var i=0; i < install.length; i++) {
					var ask = confirm('Allow "'+from+'" Writer add-on to install "'+install[i]+'" add-on for Ryuzine Reader and Rack?');
					if (ask==true) {
						// Insert Installer IFRAME //
						if (!document.getElementById('addon_installer')) {
							var installer = document.createElement('iframe');
							installer.setAttribute('id','addon_installer');
							installer.setAttribute('style','display:none;');
							installer.src="ryuzinewriter/php/install_addon.php";
							document.getElementById('lightbox').appendChild(installer);
						} else {
							document.getElementById('addon_installer').src="ryuzinewriter/php/install_addon.php";
						}
							setTimeout(function(s,p){ return function(){
								document.getElementById('addon_installer').contentWindow.document.getElementById('sender').value = s;
								document.getElementById('addon_installer').contentWindow.document.getElementById('package').value= p;
								var form = document.getElementById('addon_installer').contentWindow.document.getElementById('install_addon_form');
								form.submit();
							}}(from,install[i]),1000);								
					} else {
							// Do nothing - do not install add-on
					}
				}
			},500);
		}
	} else if (f==9) {
		RYU.toggleDialog('package-options',1);
			// refresh file list
			document.getElementById('file_list').src="ryuzinewriter/php/scandir.php";
			setTimeout(function(){
				var files = document.getElementById('file_list').contentWindow.files;
				var configs = document.getElementById('file_list').contentWindow.configs;
				var styles = document.getElementById('file_list').contentWindow.styles;
				var rackcats = document.getElementById('file_list').contentWindow.rackcats;
				var fonts = document.getElementById('file_list').contentWindow.fonts;
				var loose_fonts = document.getElementById('file_list').contentWindow.loose_fonts;
				var addons = document.getElementById('file_list').contentWindow.addons;
				var rackimages = document.getElementById('file_list').contentWindow.rackimages;
				var themes = document.getElementById('file_list').contentWindow.themes;
				// Build File Select //
				var filebox = 'Select File: <select id="packfile_drop">';
				for (var f=0; f < files.length; f++) {
					filebox = filebox + '<option>'+files[f]+'</option>';
				}
				filebox = filebox + '</select>';
				// Build Config Select //
				var configbox = 'Select File: <select id="configfile_drop">';
				for (var c=0; c < configs.length; c++) {
					configbox = configbox + '<option>'+configs[c]+'</option>';
				}
				configbox = configbox + '</select>';
				// Build Styles Select //
				var stylesbox = 'Select File: <select id="cssfile_drop">';
				for (var s=0; s < styles.length; s++) {
					stylesbox = stylesbox + '<option>'+styles[s]+'</option>';
				}
				stylesbox = stylesbox + '</select>';
				// Insert Select Drop-Downs in Options List //
				document.getElementById('add_file_drop').innerHTML = filebox;
				document.getElementById('add_config_drop').innerHTML = configbox;
				document.getElementById('add_css_drop').innerHTML = stylesbox;
				// try to select the same files as listed in Output Options //
				setSelectedIndex(document.getElementById('configfile_drop'),document.getElementById('configName').value);
				setSelectedIndex(document.getElementById('cssfile_drop'),document.getElementById('editionName').value);
				// Build Catalog List	  //
				var cats_html = "<table><tr>";
					for (var r=0; r < rackcats.length; r++) {
						cats_html += '<td><input type="checkbox" id="cat_'+rackcats[r].replace('.htm','')+'"/> '+rackcats[r]+'</td>';
						if (!isEven(r)) { cats_html += '</tr><tr>';};
					}
					cats_html += '</tr></table>';
				document.getElementById('cats_list').innerHTML = cats_html;
				// Build Font Folder List //
				var fonts_html = "<table><tr>";
					for (var f=0; f < fonts.length; f++) {
						fonts_html += '<td><input type="checkbox" id="font_'+fonts[f]+'"/> '+fonts[f]+'</td>';
						if (!isEven(f)) { fonts_html += '</tr><tr>';};
					}
					fonts_html += '</tr></table>';
				document.getElementById('fonts_list').innerHTML = fonts_html;
				var loose_fonts_html = "<table><tr>";
					for (var f=0; f < loose_fonts.length; f++) {
						loose_fonts_html += '<td><input type="checkbox" id="loose_font_'+loose_fonts[f].replace('.','_')+'"/> '+loose_fonts[f]+'</td>';
						if (!isEven(f)) { loose_fonts_html += '</tr><tr>';};
					}
					loose_fonts_html += "</tr></table>";
				document.getElementById('loose_fonts_list').innerHTML = loose_fonts_html;
				// Build Add-Ons List //
				var addons_html = "<table><tr>";
					for (var a=0; a < addons.length; a++) {
						addons_html += '<td><input type="checkbox" id="add_'+addons[a]+'"/> '+addons[a]+'</td>';
						if (!isEven(a)) { addons_html +='</tr><tr>';};
					};
					addons_html += '</tr></table>';
				document.getElementById('addon_list').innerHTML = addons_html;	
				// Build Rack Image List //
				var rackimg_folders = "<table><tr>";
					for (var r=0; r < rackimages.length; r++) {
						rackimg_folders += '<td><input type="checkbox" id="rackimg_'+rackimages[r]+'"/> '+rackimages[r]+'</td>';
						if (!isEven(r)) { rackimg_folders +='</tr><tr>';};
					};
					rackimg_folders += '</tr></table>';
				document.getElementById('rackimg_list').innerHTML = rackimg_folders;
				// Build Themes List //
				var themes_html = "<table><tr>";
					for (var a=0; a < themes.length; a++) {
						themes_html += '<td><input type="checkbox" id="theme_'+themes[a]+'"/> '+themes[a]+'</td>';
						if (!isEven(a)) { themes_html +='</tr><tr>';};
					};
					themes_html += '</tr></table>';
				document.getElementById('theme_list').innerHTML = themes_html;		
				RYU.syncPack2Opt();  // need to do this after lists are built!			
				},300);
	} else if (f==8) { 
		document.getElementById('savetype').innerHTML = 'Catalog';
		RYU.toggleDialog('save_file',1);
		filetype = f;	
	} else if (f==7) {
		document.getElementById('savetype').innerHTML = 'Config';
		RYU.toggleDialog('save_file',1);
		filetype = f;	
	} else if (f==6) {
		document.getElementById('savetype').innerHTML = 'CSS';
		RYU.toggleDialog('save_file',1);
		filetype = f;	
	} else if (f==5) {
		document.getElementById('savetype').innerHTML = 'Ryuzine';
		RYU.toggleDialog('save_file',1);
		filetype = f;
	} else if (f==4) {
		RYU.toggleDialog('save_wip',1);
	} else if (f==3) {
		RYU.toggleDialog('loadpage',1);
		if (xfileman==1) {
			// refresh file list
			document.getElementById('file_list').src="ryuzinewriter/php/scandir.php";
			setTimeout(function(){
				var files = document.getElementById('file_list').contentWindow.files;
				var filebox = '<select id="chooser">';
				for (var f=0; f < files.length; f++) {
					filebox = filebox + '<option>'+files[f]+'</option>';
				}
				filebox = filebox + '</select>';
				document.getElementById('file_chooser').innerHTML = filebox;},300);
		}
	} else if (f==2) {
		RYU.toggleDialog('add-template',1);
	} else if (f==1) {
		if (config.rzw_filenew == 1) {
			RYU.clearEditor();
		} else {
			var ask = confirm('Clear current document from editor and open blank document? (Unsaved changes will be lost)');
			if (ask==true) {
			document.getElementById('magtitle').value = "";
			document.getElementById('numpgs').value = "2";
			document.getElementById('wcyes').checked = false;
			document.getElementById('lbyes').checked = false;
			document.getElementById('swbi').checked = true;
			document.getElementById('urlbox').value = "";
			document.getElementById('applogo').checked = false;
			document.getElementById('hellogoodbye').checked = false;
			document.getElementById('advert').checked = false;
			document.getElementById('splashad').checked = false;
			document.getElementById('copynote').value = "";
			RYU.loadTemplate();
			}
		}
	} else if (f==12) {
		getDocProps();
		RYU.toggleDialog('doc-properties',1);
		var report = document.getElementById('doc_report');
		if (doc_converted == 5) {
			report.innerHTML = '&gt; This is a Ryuzine Rack Newsstand document, NOT a publication.  Unless your are an advanced author editing this file is not recommended. Edit the Catalog File(s) with the RackBuilder Utility.'; 
		} else if (doc_converted == 4) {
			report.innerHTML = '&gt; Incompatible positively ancient Ryuzine 0.9.5.x or earlier file.  Seriously, where did you get this file? Do you have a time machine!?';
		} else if (doc_converted == 3) {
			report.innerHTML = '&gt; Converted from InDesign file exported for Dreamweaver. You should save this as a "wip" file.';
		} else if (doc_converted == 2) {
			report.innerHTML = '&gt; Converted from an older Ryuzine file.  You should save this as a "wip" file or re-Build it.';
		} else if (doc_converted == 1) {
			report.innerHTML = '1.0 compatible Ryuzine file';
		} else {
			report.innerHTML = '&gt; this document was not converted';
		}
	} else {};
}
function countChars(charField, charCount) {	// just counts characters, does not limit them
	document.getElementById(''+charCount+'').innerHTML = document.getElementById(''+charField+'').value.length;
}

function submitPHPform(whichform) {
	// Pull content
	if (whichform=="save_wip") { 
			if (config.rzw_wysiwyg==0 || document.getElementById('XinhaIFrame_inputBox').style.display=="none") {
				var html_src = 'textarea';
				var html_id = 'inputBox';
				var html_prefix = '';
				var html_suffix = '';
			} else {
				var html_src = 'iframe';
				var html_id = 'XinhaIFrame_inputBox';
				var html_prefix = '<!DOCTYPE html>\n<html>\n';
				var html_suffix = '\n</html>';
			}
	} else if (whichform=="save_file") {
			var html_src = 'textarea';
			var html_prefix = '';
			var html_suffix = '';
		if (filetype==8) {
			var html_id = 'dataBox';
		} else if (filetype==7) {
			var html_id = 'configBox';
		} else if (filetype==6) {
			var html_id = 'stylesBox';
		} else if (filetype==5) {
			var html_id = 'outputBox';		
		} else { alert(''+RYU._lc('Error: Unknown file type!')+''); return;}
	}
	
	if (html_src=='iframe') {
		var get_html = document.getElementById(''+html_id+'').contentWindow.document.getElementsByTagName('html')[0].innerHTML;	
	} else {
		var get_html = document.getElementById(''+html_id+'').value;
	}
	// reference to iframe with id 'ifrm'
	var ifrm = document.getElementById(whichform+'_frame');
	// reference to window in the iframe
	var win = ifrm.contentWindow;
	// reference to document in iframe
	var doc = ifrm.contentDocument? ifrm.contentDocument: ifrm.contentWindow.document;
	// reference to a form named 'ifrmTest' in iframe
	var form = doc.getElementById(whichform+'_form');
	// Port content into form field //
	doc.getElementById(''+whichform+'content').value = html_prefix+get_html+html_suffix;
	if (whichform=="save_file" && filetype==8) {
		current_catalog = doc.getElementsByName('save_file_name')[0].value;
	}	
	// Submit the form //
	form.submit();
}

function setSelectedIndex(s, v) {
    for ( var i = 0; i < document.getElementById('configfile_drop').options.length; i++ ) {
        if ( s.options[i].value == v ) {
            s.options[i].selected = true;
            return;
        }
    }
}	

function buildPackage() {
	var zine_include = 1;
	var ryuzine_src = 0; // Export Box
	var ryuzine_html = "";
	var ryuzine_name = 'index.htm';
	
	var images_src = 1; 	// sub-folder
	var images_sub = ""; 	// populated by imagefolder_name value
	var keep_thumbs = 0;	// keep editor thumbnail images
	
	var config_src = 0; // Existing File
	var config_code = "";
	var config_name = 'ryuzine.config.js';
	
	var styles_src = 0; // Existing File
	var styles_code = "";
	var styles_name = 'thisissue.css';
	
	var rack_include = 0; // Do not include
	var rack_name = "rack.htm"; // not index file
	var rackcat_src = 0; // Existing File
	var rackcat_code = "";
	var rackcat_name = "catalog1.htm";
	
	var myJSfile = 0; // no custom file
	var myJSname = "";
	var myCSSfile = 0; // no custom file
	var myCSSname = "";	
	var source_include = 0;
	
	var fonts_all  = 1;
	var addons_all = 0;
	var themes_all = 0;
	var rackimgs_all= 1;
	document.getElementById('file_list').src="ryuzinewriter/php/scandir.php";
	var fonts_pack = [];
	var loose_fonts_pack = [];
	var addons_pack = [];
	var addons = [];
	var themes_pack = [];
	var themes = [];
	var rackcats_pack = [];
	var rackcats = [];
	var rackimgs_pack = [];
	var rackimgs = [];
	setTimeout(function(){
		fonts  = document.getElementById('file_list').contentWindow.fonts;
		loose_fonts = document.getElementById('file_list').contentWindow.loose_fonts;
		addons = document.getElementById('file_list').contentWindow.addons;
		themes = document.getElementById('file_list').contentWindow.themes;
		rackimgs = document.getElementById('file_list').contentWindow.rackimages;
		rackcats = document.getElementById('file_list').contentWindow.rackcats;
		// Build Font Folders List //
			for (var f=0; f < fonts.length; f++) {
				if (document.getElementById('font_'+fonts[f]+'').checked) {
					fonts_pack[f] = 1;
				} else {
					fonts_pack[f] = 0;
				}
			}
		// Build Loose Fonts List //
			for (var f=0; f < loose_fonts.length; f++) {
				if (document.getElementById('loose_font_'+loose_fonts[f].replace('.','_')+'').checked) {
					loose_fonts_pack[f] = 1;
				} else {
					loose_fonts_pack[f] = 0;
				}
			}
		// Build Add-Ons List //
			for (var a=0; a < addons.length; a++) {
				if (document.getElementById('add_'+addons[a]+'').checked) {
					addons_pack[a] = 1;
				} else {
					addons_pack[a] = 0;
				}
			};
		// Build Themes List //
			for (var a=0; a < themes.length; a++) {
				if (document.getElementById('theme_'+themes[a]+'').checked) {
					themes_pack[a] = 1;
				} else {
					themes_pack[a] = 0;
				}
			};
		// Build Rack Image Folder List
			for (var r=0; r < rackimgs.length; r++) {
				if (document.getElementById('rackimg_'+rackimgs[r]+'').checked) {
					rackimgs_pack[r] = 1;
				} else {
					rackimgs_pack[r] = 0;
				}
			}
		// Build Rack Catalog List
			for (var r=0; r < rackcats.length; r++) {
				if (document.getElementById('cat_'+rackcats[r].replace('.htm','')+'').checked) {
					rackcats_pack[r] = 1;
				} else {
					rackcats_pack[r] = 0;
				}
			}
		packit();
	},300);
		

	function packit() {	
		// Include Ryuzine
		if (document.getElementById('zineadd').checked) {
			zine_include = 1;
			if (document.getElementsByName('packfile_src')[1].checked) {
				ryuzine_src = document.getElementById('packfile_drop').value;
				ryuzine_html = "";
				ryuzine_name = document.getElementById('packfile_name').value;
			} else {
				if (document.getElementById('outputBox').value =="" || document.getElementById('outputBox').value == "Ryuzine File HTML code will be in this box.") {
					alert(''+RYU._lc('HTML Export Box is empty!  Go to Editor, Build file, and then Package.')+'');
					return;
				}
				ryuzine_src = 0;
				ryuzine_html = document.getElementById('outputBox').value;
				ryuzine_name = document.getElementById('packfile_name').value;
			};
			// Get zine's stylesheet
			if (document.getElementsByName('cssfile_src')[1].checked) {
				if (document.getElementById('stylesBox') == "" || document.getElementById('stylesBox') =="Custom Styles: Copy & Paste contents into your file thisissue.css") {
					alert(''+RYU._lc('CSS Export Box is empty!  Using default thisissue.css file.')+'');
					styles_src = 0;
					styles_code = '';
					styles_name = document.getElementById('cssfile_name').value;
				} else {
					styles_src = 1;
					styles_code = document.getElementById('stylesBox').value;
					styles_name = document.getElementById('cssfile_name').value;
				}		
			} else if (document.getElementsByName('cssfile_src')[2].checked) {
				styles_src = document.getElementById('cssfile_drop').value;
				styles_code = "";
				styles_name = document.getElementById('cssfile_name').value;
			} else {
				styles_src = 0;
				styles_code = "";
				styles_name = document.getElementById('cssfile_name').value;
			}
			images_sub = document.getElementById('imagefolder_name').value;
		} else {
			zine_include = 0;
		}
		// Include Ryuzine Rack
		if (document.getElementById('rackadd').checked) {
			rack_include = 1;
			rackcat_code = "";
			if (document.getElementById('rackfile').checked) {
				rack_name = "index.htm";
				ryuzine_name = "issue.htm";
			}
			if (document.getElementsByName('catfile_src')[0].checked) {
					rackcat_src = 0;
			} else if (document.getElementsByName('catfile_src')[1].checked) {
				if (document.getElementById('dataBox')=="" || document.getElementById('dataBox')=="RyuzineRack Data Catalog Code will be in this box.") {
					alert(''+RYU._lc('Data Export Box is empty!  Build a Catalog file or change the Package option.')+'');
					return;
				} else {	
					rackcat_src = 1;
					rackcat_code = document.getElementById('dataBox').value;	
					rackcat_name = document.getElementById('catfile_name').value;
				}
			} else {
				rackcat_src = 2;
				rackcat_code = "";
				rackcat_name = "";
			}
			if (document.getElementById('allrackimages').checked) {
				rackimgs_all = 1;	
			} else {
				rackimgs_all = 0;
			}
		} else {
			rack_include = 0; // Do not include
			rack_name = "rack.htm"; // not index file
			rackcat_src = 0; // Existing File
			rackcat_code = "";
			rackcat_name = "catalog1.htm";
			rackimgs_all = 0;
		}
		// Both Zines and Rack need Config File
			if (document.getElementsByName('configfile_src')[1].checked) {
				if (document.getElementById('configBox')=="" || document.getElementById('configBox')=="// Custom Configuration File Javascript Code: //") {
					alert(''+RYU._lc('Configuration Export Box is empty!  Using Default file.')+'');
					config_src = 0;
					config_code = "";
					config_name = document.getElementById('configfile_name').value;
				} else {
					config_src = 1;
					config_code = document.getElementById('configBox').value;
					config_name = document.getElementById('configfile_name').value;
				}		
			} else if (document.getElementsByName('configfile_src')[2].checked) {
				config_src = document.getElementById('configfile_drop').value;
				config_code = "";
				config_name = document.getElementById('configfile_name').value;
			} else {
				config_src = 0;
				config_code = '';
				config_name = document.getElementById('configfile_name').value;
			};
	
		// modify based on package type selected...

		if (document.getElementsByName('packtype')[0].checked) { 
			//********* SMALLEST PACKAGE ************//
				// Double-Check that Output Settings are compatible //
				if (opt_css != '' || opt_js != '' || opt_config == 'test') {
					alert(''+RYU._lc('Some document Output Options are not compatible with this setting. The Output Options will now be adjusted and the Ryuzine File regenerated so it will work')+'');
					document.getElementById('custCSS').checked = false;
					document.getElementById('custJS').checked = false;
					if (document.getElementsByName('dTheme')[2].checked) { document.getElementsByName('dTheme')[0].checked = true; };
					document.getElementsByName('configit')[0].checked = true;
					document.getElementsByName('edition')[0].checked = true;
					outputOptions();
					RYU.clearSimulator();RYU.refreshSrc();RYU.reWrite();
					keep_thumbs = 0;
					fonts_all = 0;
				};
		} else if (document.getElementsByName('packtype')[2].checked) {
			//************ CUSTOM PACKAGE ***************//
			if (document.getElementById('allfonts').checked) {
				fonts_all = 1;
			} else {
				fonts_all = 0;
				for (var f=0; f < fonts.length; f++) {
					if (document.getElementById('font_'+fonts[f]+'').checked) { fonts_pack[f] = 1; } else { fonts_pack[f] = 0; }
				};
				for (var f=0; f < loose_fonts.length; f++) {
					if (document.getElementById('loose_font_'+loose_fonts[f].replace('.','_')+'').checked) { loose_fonts_pack[f] = 1;} else { loose_fonts_pack[f] = 0; }
				}
			}
			if (document.getElementById('alladdons').checked) {
				addons_all = 1;	
			} else {
				addons_all = 0;
				// Get checked add-ons //
				for (var a=0; a < addons.length; a++) {
					if(document.getElementById('add_'+addons[a]+'').checked) { addons_pack[a] = 1; } else { addons_pack[a] = 0; }
				};
			}
			if (document.getElementById('allthemes').checked) {
				themes_all = 1;
			} else {
				themes_all = 0;
				// Get checked themes //
				for (var a=0; a < themes.length; a++) {
					if(document.getElementById('theme_'+themes[a]+'').checked) { themes_pack[a] = 1; } else { themes_pack[a] = 0; }
				};
			}
			if (document.getElementById('customJSadd').checked) {
				myJSfile = 1;
				myJSname = document.getElementById('customJSfile_name').value;
			} else {
				myJSfile = 0;
				myJSname = "";
			}
			if (document.getElementById('customCSSadd').checked) {
				myCSSfile = 1; 
				myCSSname = document.getElementById('customCSSfile_name').value;
			} else {
				myCSSfile = 0;
				myCSSname = "";
			}
			if (document.getElementById('sourceadd').checked) {
				source_include = 1;
			} else {
				source_include = 0;
			}
			if (document.getElementById('keepthumbs').checked) {
				keep_thumbs = 1;
			} else {
				keep_thumbs = 0;
			}
		} else if (document.getElementsByName('packtype')[1].checked) { 
			//********** STANDARD PACKAGE **********//
				// Double-Check that Output Settings are compatible //
				if (opt_config == 'test') {
					alert(''+RYU._lc('Some document Output Options are not compatible with this setting. The Output Options will now be adjusted and the Ryuzine File regenerated so it will work')+'');
					document.getElementsByName('configit')[0].checked = true;
					outputOptions();
					RYU.clearSimulator();RYU.refreshSrc();RYU.reWrite();
				}
			fonts_all = 1;
			addons_all = 1;	
			themes_all = 1;
			keep_thumbs = 0;
		} else {
		alert(''+RYU._lc('Package type unknown!')+'');
		}
		// reference to iframe with id 'ifrm'
		var ifrm = document.getElementById('build_package_frame');
		// reference to window in the iframe
		var win = ifrm.contentWindow;
		// reference to document in iframe
		var doc = ifrm.contentDocument? ifrm.contentDocument: ifrm.contentWindow.document;
		// reference to a form named 'ifrmTest' in iframe
		var form = doc.getElementById('build_package_form');
		// Port content into form field //
		doc.getElementById('mytitle').value = document.getElementById('pack_title').value;
		if (document.getElementsByName('packtype')[0].checked) {
			doc.getElementById('packtype').value = 0;
		} else if (document.getElementsByName('packtype')[1].checked) {
			doc.getElementById('packtype').value = 1;
		} else {
			doc.getElementById('packtype').value = 2;
		}
		var loadmess = doc.createElement('p');
			loadmess.innerHTML = 'Building, Please wait....';
		doc.getElementsByTagName('body')[0].appendChild(loadmess);
		doc.getElementById('zineadd').value = zine_include;
		doc.getElementById('packfile_src').value = ryuzine_src;
		doc.getElementById('packfile_content').value = ryuzine_html;
		doc.getElementById('packfile_name').value = ryuzine_name;
		
		doc.getElementById('imagefile_src').value = images_src;
		doc.getElementById('imagefolder_name').value = images_sub;
		doc.getElementById('keep_thumbs').value = keep_thumbs;
		
		doc.getElementById('configfile_src').value = config_src; 
		doc.getElementById('configfile_content').value = config_code;
		doc.getElementById('configfile_name').value = config_name;
		
		doc.getElementById('cssfile_src').value = styles_src;
		doc.getElementById('cssfile_content').value = styles_code;
		doc.getElementById('cssfile_name').value = styles_name;
		
		doc.getElementById('rackadd').value = rack_include;
		if (document.getElementById('rackfile').checked) {
			doc.getElementById('rackfile').value = 1;
		}
		doc.getElementById('rackfile_name').value = rack_name;
		doc.getElementById('catfile_src').value = rackcat_src;
		doc.getElementById('catfile_content').value = rackcat_code;
		doc.getElementById('catfile_name').value = rackcat_name;
	
		doc.getElementById('allfonts').value = fonts_all;
		doc.getElementById('alladdons').value = addons_all;
		doc.getElementById('allthemes').value = themes_all;
		doc.getElementById('allrackimages').value = rackimgs_all;

			// Build Font Folder List //
				for (var f=0; f < fonts.length; f++) {
					doc.getElementById('font_'+fonts[f]+'').value = fonts_pack[f];
				}
			// Build Loose Fonts List //
				for (var f=0; f < loose_fonts.length; f++) {
					doc.getElementById('loose_font_'+loose_fonts[f].replace('.','_')+'').value = loose_fonts_pack[f];
				}
			// Build Add-Ons List //
				for (var a=0; a < addons.length; a++) {
					doc.getElementById('add_'+addons[a]+'').value = addons_pack[a];
				};
			// Build Themes List //
				for (var a=0; a < themes.length; a++) {
					doc.getElementById('theme_'+themes[a]+'').value = themes_pack[a];
				};
			// Build Rack Image Folder List
				for (var r=0; r < rackimgs.length; r++) {
					doc.getElementById('rackimg_'+rackimgs[r]+'').value = rackimgs_pack[r];
				}
			// Build Rack Catalog List
				for (var r=0; r < rackcats.length; r++) {
					doc.getElementById('cat_'+rackcats[r].replace('.htm','')+'').value = rackcats_pack[r];
				}		
		doc.getElementById('customJSadd').value = myJSfile;
		doc.getElementById('customJSfile_name').value = myJSname;
		doc.getElementById('customCSSadd').value = myCSSfile;
		doc.getElementById('customCSSfile_name').value = myCSSname;
		doc.getElementById('sourceadd').value = source_include;
		if (document.getElementById('skip_zip').checked) {
		doc.getElementById('skip_zip').value = 1;
		} else {
		doc.getElementById('skip_zip').value = 0;
		}
		if (document.getElementById('time_stamp').checked) {
		doc.getElementById('time_stamp').value = 1;
		} else {
		doc.getElementById('time_stamp').value = 0;
		}
	
		// Submit the form //
		form.submit();			
	}

}

function syncPack2Opt() {
	// This function will attempt to synchronize the Custom Package settings with the Output Settings //
	if (!splashTitle) {
		document.getElementById('pack_title').value = 'Untitled';
	} else {
		document.getElementById('pack_title').value = splashTitle;
	}
	if (!document.getElementsByName('configit')[0].checked) {
		if (document.getElementById('configName').value != '') {
			document.getElementById('configfile_name').value = document.getElementById('configName').value;
		}
	}
	if (!document.getElementsByName('edition')[0].checked) {
		if (document.getElementById('editionName').value != '') {
			document.getElementById('cssfile_name').value = document.getElementById('editionName').value;
		}
		if (document.getElementsByName('edition')[1].checked) {
			var sheets = document.getElementById('cssfile_drop').getElementsByTagName('option');
			var found = 0; // assume no
			for (var s=0; s < sheets.length; s++) {
				if (document.getElementById('editionName').value == sheets[s].value) {
					found = 1;
					document.getElementById('cssfile_drop').value = document.getElementById('editionName').value;
					document.getElementsByName('cssfile_src')[2].checked = true;	// sync Package with Format
					document.getElementById('add_css_drop').style.display = 'table-cell';	// show the drop-down
				}
			}
			if (found==0) {	// if was never found
				alert(RYU._lc('The Custom Stylesheet file name given in the Output Format dialog does not appear to match any CSS files on the server. Resetting to Default.'));
				document.getElementsByName('edition')[0].checked = true;		// switch Output Format to default stylesheet
				document.getElementById('customFile').style.display = "none";	// hide file name box again
				document.getElementsByName('cssfile_src')[0].checked = true; 	// switch Package to default stylesheet
				document.getElementByid('add_css_drop').style.display = "none";	// hide drop-list
				document.getElementById('cssfile_name').value = 'thisissue.css';// change saved name to default
			}
		}
	}
	
	document.getElementById('file_list').src="ryuzinewriter/php/scandir.php";
	/*	If "alladdons" is not checked, look at ConfigBuilder > Addons
		and see which ones are selected there, then also check the box
		in Build Package > Custom > Add-Ons list.
		
		Smallest Package only includes the required add-ons
		Standard Package includes all add-ons (whether used or not)
	
	*/
	if (!document.getElementById('alladdons').checked) {
	setTimeout(function(){
		var addons_server = document.getElementById('file_list').contentWindow.addons;
		var config_addons = document.getElementById('config_addons_list').getElementsByTagName('input');
		// Build Add-Ons List : but ONLY if a custom config is being used!
		if (document.getElementsByName('configit')[2].checked) {
			// set the same in Package options and hide file drop list
			document.getElementsByName('configfile_src')[1].checked = true;
			document.getElementById('add_config_drop').style.display='none';
			for (var a=0; a < addons_server.length; a++) {	// get list of addons in folder
				document.getElementById('add_'+addons_server[a]+'').checked = false;
				for (var c=0; c < config_addons.length; c++) {
					if (config_addons[c].value == addons_server[a] && config_addons[c].checked) {
						// turn on corresponding checkbox in Package Builder
						document.getElementById('add_'+addons_server[a]+'').checked = true;
					}
				}
			}
		};
	},300);	
	}
	/*	If "allthemes" is not checked, look at Output Options > Custom Theme
		and then see if that named theme actually exists, if it DOES then check
		the box in Build Package > Custom > Themes.
		
		Smallest Package only includes default UI themes (dark and light)
		Standard Package always includes all themes.
	*/
	if (!document.getElementById('allthemes').checked) {
		if (document.getElementsByName('dTheme')[2].checked) {
			var t = document.getElementById('dThemeName').value;
		setTimeout(function(){
			var themes_server = document.getElementById('file_list').contentWindow.themes;
			// Build Theme List : but ONLY if export box config is being used!
			if (document.getElementsByName('configit')[2].checked) {
				if (document.getElementsByName('swapThemes')[1].checked){
					theme_drops = ['deskTheme','winTheme','macTheme','nixTheme','iOSTheme','andTheme','wp7Theme','w8mTheme','bbtTheme'];
				} else { var theme_drops = null;}
			}
			// sync theme lists //
			for (var a=0; a < themes_server.length; a++) {
				// make sure we get custom theme if set
				if (t==themes_server[a]) {document.getElementById('theme_'+themes_server[a]+'').checked = true;};
				// make sure all theme checkboxes in Package Builder are clear
				document.getElementById('theme_'+themes_server[a]+'').checked = false;
				// if export box config is in use...
				if (theme_drops!=null) {
					var config_themes = [];
					// check each drop-down value
					for (var x=0; x < theme_drops.length; x++) {
						if (document.getElementById(''+theme_drops[x]+'').value != '') { // something is selected
							if (config_themes.indexOf(''+theme_drops+'')===-1) {			 // not already in array so add it
								config_themes.push(document.getElementById(''+theme_drops[x]+'').value);
							}
						}
					}
					// go through our array of config_themes and check the corresponding boxes in Package Builder.
					for (var y=0; y < config_themes.length; y++) {
						if (config_themes[y] == themes_server[a]) {
							document.getElementById('theme_'+themes_server[a]+'').checked = true;
						}
					}
				}
			};
		},300);			
		
		}
	}
	if (document.getElementById('custCSS').checked) {
		document.getElementById('customCSSfile_name').value = document.getElementById('custCSSName').value;
	}
	if (document.getElementById('custJS').checked) {
		document.getElementById('customJSfile_name').value = document.getElementById('cutJSName').value;
	}

}

// New Guided Help Stuff //

function writeHelp() {
	if ('ontouchstart' in document.documentElement && device.Platform != "webOS" ) {
	var action = 'ontouchstart';
	} else {
	var action = 'onmousedown';
	}
	var myCard = document.getElementById('help_box');
	var cardEl = "";
	if (window.innerWidth < 600) {
		card[6][2] = "RYU.guidedHelp(8);RYU.splitView(1);";
		card[8][1] = "RYU.guidedHelp(6);";
	}
	if ( xfileman == 0 ) {
		card[13][2] = "RYU.guidedHelp(16);RYU.slideSpace(3);";
		card[14][2] = "";
		card[15][2] = "";
		card[16][1] = "RYU.guidedHelp(13);RYU.slideSpace(2);";
	}
	for (var q=0; q<card.length; q++) {
		cardEl = cardEl + '<div id="card'+q+'" class="help_card">\n'+
			'<p class="l10n">'+card[q][0]+'</p>\n'+
			'<div class="help_buttons">\n';
			if (q==0) {
			cardEl = cardEl+'<div class="left" '+action+'="'+card[q][1]+'">X</div>\n'+
			'<div class="right l10n" '+action+'="'+card[q][2]+'">Next</div>\n'+
			'<div class="playall l10n"'+action+'="RYU.playHelp(0);">Play All</div>\n';
			} else if (q==(card.length-1)) {
			cardEl = cardEl+'<div class="left" '+action+'="'+card[q][1]+'">&lt;</div>\n'+
			'<div class="right" '+action+'="'+card[q][2]+'">X</div>\n';
			} else {
			cardEl = cardEl+'<div class="left" '+action+'="'+card[q][1]+'">&lt;</div>\n'+
			'<div class="right" '+action+'="'+card[q][2]+'">&gt;</div>\n';
			}
		cardEl = cardEl+'</div>\n</div>';
	}
 	myCard.innerHTML = cardEl;
}

	function helpPlay(a) {
		if (a==1) {
			if (document.getElementById('controlbox0').className=='navbars_hide') {RYU.controlsToggle(1);};
			document.getElementById('helper_glass').style.display="block";
			document.getElementById('helper').style.display="block";
			setTimeout(function(){document.getElementById('helper').className="helper_on card0";},100);
		} else {
			if (document.getElementById('controlbox0').className=='navbars_hide') {RYU.controlsToggle(1);};
			if (document.getElementById('controlset0').className!='controlset control_in') {
				document.getElementById('controlset0').className ='controlset control_in';
			}
			document.getElementById('helper').className="helper_off";
			setTimeout(function(){document.getElementById('helper_glass').style.display="none";document.getElementById('helper').style.display="none"},1200);
		}
	}
	function guidedHelp(s,rw) {
		if (rw==1) {
			writeHelp();
		} else {
			document.getElementById('helper').className="helper_on card"+s+"";
		}
	}
	// Automatic Play All Method //
	function playHelp(c) {
		if (c==0) { var delay = 0;} else { var delay = 5000;};
		var adj_delay = delay;
		if (c < card.length) {
			if(card[c][2] != "") {
				guidedHelp(c);
				setTimeout(""+card[c][2]+"",delay);
				adj_delay = delay;
			} else {
				adj_delay = 0;
			}
			c = c + 1;
			setTimeout(function(){playHelp(c);},adj_delay);
		} else { c = null; }
	}
// End New Guided Help Stuff //

	// Adjust Xinha Panel Size on Browser Resize
 	var firstedit = false;
 	function resize_panels() {
 		if (config.rzw_wysiwyg==1) {	// only do this if editor is loaded
			var left_box = document.getElementById('leftbox');
			var ed_height = left_box.offsetHeight;
			var tool_bar = left_box.getElementsByClassName('toolbar')[0].offsetHeight;
			var stat_bar = left_box.getElementsByClassName('statusBar')[0].offsetHeight;
			var box_hi = (ed_height-(tool_bar+stat_bar));
			var hi = (box_hi/2)-52;
			var panels = leftbox.getElementsByClassName('panel');
			for (var p=1; p < panels.length; p++) {			
				panels[p].getElementsByClassName('adjustable')[0].style.height = hi+"px";
			};
			document.getElementById('XinhaIFrame_inputBox').style.height = box_hi+"px";
			winSize();
			var size = winSize();
			var file_dialog = document.getElementById('file_manager');
			if (size.H < 654) {	// prevents file manager dialog becoming unclosable
				file_dialog.style.height = ''+parseInt(size.H*.9)+'px';
				file_dialog.style.marginTop = '-'+parseInt((size.H*.9)/2)+'px';
			}
		};
		firstedit = true;
 	}

//==== PAGEMANAGER FUNCTIONS ======/
function thumbnail_size(size) {
	if (size==null || size=='') { size = 'small';}
	document.getElementById('pagemanager').className="adjustable "+size+"";
}

var show_thumbnails = true;

function refresh_thumbnails(show) {
	if (show!=null) { show_thumbnails = show; }
	if (show_thumbnails==false) {
		console.log('thumbnails disabled');
		var thumbs=document.querySelectorAll('#pagemanager li.page_thumb');
		for (var i=0; i<thumbs.length; i++) {
			  thumbs[i].innerHTML='<div class="thumb"></div><div class="mylar"></div><div class="index"><p>'+i+'</p></div>';
		}		
	} else {
		console.log('refreshing thumbnails');
		var thumbs=document.querySelectorAll('#pagemanager li.page_thumb');
		var pages =document.getElementById('XinhaIFrame_inputBox').contentWindow.document.getElementsByClassName('page');
		console.log('pages.length = '+pages.length);
		for (var i=0; i<pages.length; i++) {
			for (var t=0; t < thumbs.length; t++) {
				if (t==i) {
			  		thumbs[i].innerHTML='<div class="thumb">'+pages[i].innerHTML+'</div><div class="mylar"></div><div class="index"><p>'+i+'</p></div>';
				}
			}
		}
	}
		document.getElementById('pgcount').innerHTML=''+pages.length+'';
}

var selected_item;
var selected_items = [];	// array of selected pages
function select_page(e) {
	if (e.shiftKey) {	// multiple select
		var thumbs = document.querySelectorAll('#pagemanager li.selected'); //<--what was this for?
		if (hasClass(e.currentTarget,'selected')) {
			console.log('deselecting item '+e.currentTarget.id);
			removeClass(e.currentTarget,'selected');
			for (var i=0; i < selected_items.length; i++) {
				if (e.currentTarget.id == selected_items[i].id) {
					console.log('current target matches item in array, attempt to remove');
					selected_items.splice(i,1);	// remove from selected items array
				}
			}
			console.log(selected_items);
		} else {
			console.log('selecting item '+e.currentTarget.id);
			addClass(e.currentTarget,'selected');
			console.log('pushing currentTarget onto array');
			selected_items.push(e.currentTarget);
			console.log(selected_items);
		}
	} else {
		selected_items.length=0;	// clear selected_items array
		console.log('clearing selected_items array');
		var pages = document.querySelectorAll('#pagemanager li.page_thumb');
		for (var i=0; i < pages.length; i++) {
			if (e.currentTarget.id != pages[i].id) {
				removeClass(pages[i],'selected');
			}
		}
		if (hasClass(e.currentTarget,'selected')){
			console.log('deselecting item'+e.currentTarget.id);
			removeClass(e.currentTarget,'selected');
		} else {
			selected_items.push(e.currentTarget);
			console.log(selected_items);
			addClass(e.currentTarget,'selected');
			var dex = e.currentTarget.id; dex = dex.split('pt'); dex = dex[1];
			document.getElementById('XinhaIFrame_inputBox').contentWindow.document.getElementsByClassName('page')[dex].scrollIntoView(true);
			document.getElementById('insert_at_index').value = dex;	// sync insert pages dialog to selected page
		}
	}
}

function selectionOf(group) {
	// this currently just selects All or None //
	console.log('selectionOf('+group+')');
	var thumbs = document.querySelectorAll('#pagemanager li.page_thumb');
	console.log('emptying selected_items array');
	selected_items.length = 0;
	if (group=='all') {
		console.log('selecting all');
		for (var i=0; i < thumbs.length; i++) {
			addClass(thumbs[i],'selected');
			selected_items.push(thumbs[i]);
		}
		console.log(selected_items);
	} else if (group=='none') {
		console.log('deselecting all');
		for (var i=0; i < thumbs.length; i++) {
			removeClass(thumbs[i],'selected');
		}
		console.log(selected_items);
	} else {
	// TODO: expand this for odd/even/range?
	}
}

function delete_page() {
	if (selected_items.length < 1) {
		alert(''+RYU._lc('No pages are selected!')+'');
		return;
	}
	// ugh this msg part is fugly!
	if (selected_items.length > 1) {
		var msg = RYU._lc('pages '); 
	} else { var msg = RYU._lc('page ');}
	for (var d=0; d < selected_items.length; d++) {
		var dex = selected_items[d].id; dex = dex.split('pt'); dex = dex[1];
		if (d==selected_items.length-1) { var x='';}else{ var x=', ';}
		msg = msg+dex+x;
	}
	if (window.confirm(""+RYU._lc("Are you sure you want to delete ")+msg+"?\n("+RYU._lc("This cannot be undone!")+")")) {
		for (var d=0; d < selected_items.length; d++) {
			var dex = selected_items[d].id; dex = dex.split('pt'); dex = dex[1];
			selected_items[d].parentNode.removeChild(selected_items[d]);
			var my_editor = document.getElementById('XinhaIFrame_inputBox').contentWindow.document;
			my_editor.getElementById('page'+dex+'').parentNode.removeChild(my_editor.getElementById('page'+dex+''));
		}
	}
	reindex_pages();

}


function reindex_pages() {
	// adjust page and thumbnail ids to match index number
	var pages  = document.getElementById('XinhaIFrame_inputBox').contentWindow.document.getElementsByClassName('page');
	var thumbs = document.querySelectorAll('#pagemanager li.page_thumb');
	
	if (pages.length != thumbs.length) {	// oops, count is not sync'd!
		if (thumbs.length > pages.length) { // pages were deleted in editor
			var xtras = thumbs.length-pages.length; 	// number of extra thumbnails
			for (var x=0; x < xtras; x++) {
				thumbs[thumbs.length-1].parentNode.removeChild(thumbs[thumbs.length-1]);	// snip off end of UL
				thumbs = document.querySelectorAll('#pagemanager li.page_thumb');
			}
		} else {	// must have added pages manually in editor
			var xtras = pages.length-thumbs.length;	// number of thumbnails short
			for (var x=0; x < xtras; x++) {
				add_thumbnail(thumbs.length);	// we have a function for just adding thumbs
				thumbs = document.querySelectorAll('#pagemanager li.page_thumb');
			}
		}
	}
	
	for (var i=0; i < pages.length; i++) {
		pages[i].id='page'+i+'';
		thumbs[i].id='pt'+i+'';
		if (isEven(i)) {
			pages[i].className = 'page recto';
			thumbs[i].className = 'page_thumb recto';
		} else {
			pages[i].className = 'page verso';
			thumbs[i].className = 'page_thumb verso';
		}
	}
	refresh_thumbnails();
}

function setMax(el) {
	el.setAttribute('max', ''+(document.getElementById('pagemanager').getElementsByClassName('page_thumb').length-1)+'');
}

function add_thumbnail(index) {
	var new_thumb = document.createElement('li');
		new_thumb.id = 'pt'+index;
		if (isEven(index)) {
		new_thumb.className='page_thumb recto';
		}else{
		new_thumb.className='page_thumb verso';
		}
		new_thumb.innerHTML = ''+index+'';
		new_thumb.draggable = 'true';
  	new_thumb.addEventListener('dragstart',dragstart_reorder, false);          
  	new_thumb.addEventListener('dragleave',dragleave_reorder, false);
  	new_thumb.addEventListener('dragenter',function(e){e.preventDefault()}, false);
  	new_thumb.addEventListener('dragover',dragover_reorder, false);
  	new_thumb.addEventListener('drop',dropped_reorder, false);
  	new_thumb.addEventListener('click',select_page,false);
	document.getElementById('pagemanager').getElementsByTagName('ul')[0].appendChild(new_thumb);
	refresh_thumbnails();
}

function add_page(where,index) {
	if (!document.getElementById('XinhaIFrame_inputBox').contentWindow.document.getElementById('issue')) {
		var makeit = document.createElement('div');
			makeit.id="issue";
		document.getElementById('XinhaIFrame_inputBox').contentWindow.document.getElementsByTagName('body')[0].appendChild(makeit);
	}
	var my_editor = document.getElementById('XinhaIFrame_inputBox').contentWindow.document.getElementById('issue');
	var all_pages=my_editor.getElementsByClassName('page');
	console.log('all_page = '+all_pages.length);
	var new_page = document.createElement('div');
		new_page.id = 'page'+all_pages.length;
		if (isEven(all_pages.length)){
		new_page.className='page recto';
		}else{
		new_page.className='page verso';
		}
		// section_head and page_box are for backwards compatibility with older Ryuzine and Ryuzine Writer - consider them deprecated //
		new_page.innerHTML = '<h1 class="header section_head">'+RYU._lc("Heading")+'</h1>\n<div class="live page_box">'+RYU._lc("Put your page content here")+'.</div>';
	var new_thumb = document.createElement('li');
		new_thumb.id = 'pt'+all_pages.length;
		if (isEven(all_pages.length)){
		new_thumb.className='page_thumb recto';
		}else{
		new_thumb.className='page_thumb verso';
		}
		new_thumb.innerHTML = ''+all_pages.length+'';
		new_thumb.draggable = 'true';
  		new_thumb.addEventListener('dragstart',dragstart_reorder, false);          
  		new_thumb.addEventListener('dragleave',dragleave_reorder, false);
  		new_thumb.addEventListener('dragenter',function(e){e.preventDefault()}, false);
  		new_thumb.addEventListener('dragover',dragover_reorder, false);
  		new_thumb.addEventListener('drop',dropped_reorder, false);
  		new_thumb.addEventListener('click',select_page,false);
	var page_manager = document.getElementById('pagemanager').getElementsByTagName('ul')[0];
	if (where=='3') {			// before selected_item
		my_editor.insertBefore( new_page, my_editor.getElementsByClassName('page')[index]);
		page_manager.insertBefore( new_thumb, document.getElementById('pt'+index+'') );
	} else if (where=='2') {	// after selected_item
		if ( (index+1) > all_pages.length) { index = all_pages.length; } else { index = index+1;}
		my_editor.insertBefore( new_page, my_editor.getElementsByClassName('page')[index] );
		page_manager.insertBefore( new_thumb, document.getElementById('pt'+index+'') );
	} else if (where=='1') {	// at start of document
		my_editor.insertBefore(new_page, my_editor.firstChild);
		page_manager.insertBefore(new_thumb, page_manager.firstChild);
	} else {					// append to end of document
		my_editor.appendChild(new_page);
		page_manager.appendChild(new_thumb);
	}
   	reindex_pages();
}


function insert_page() {
	if (selected_items.length==1) {	// only one page is selected, assume insert before
		dex = selected_items[0].id; dex = dex.split('pt'); dex = dex[1];
		add_page(3,dex);
	} else { // either nothing is selected or more than one is selected
		add_page();	// add page to the end
	}
}

function insert_pages() {
	var insert_count = document.getElementById('insert_pages_count').value*1;
	var insert_where = document.getElementById('insert_pages_where').value*1;
	var insert_index = document.getElementById('insert_at_index').value*1;
	
	if (insert_count==0) { 
		alert(''+RYU._lc('insert count set at zero, no action taken.')+''); return;
	};
	
	if (insert_where==3) { // before selected index
		for (var i=0; i < insert_count; i++) {
			add_page(3,insert_index);
		}
	} else if (insert_where==2) { // after selected index
		for (var i=0; i < insert_count; i++) {
			add_page(2,insert_index);
		}
	} else if (insert_where==1) { // at start of document
		for (var i=0; i < insert_count; i++) {
			add_page(1);
		}
	} else {	// at end of document
		for (var i=0; i < insert_count; i++) {
			add_page(0);
		}
	}
}
function editor_layout(style) {
	if (!document.getElementById('XinhaIFrame_inputBox').contentWindow.document.getElementById('issue')) { return; } else {
	var editor = document.getElementById('XinhaIFrame_inputBox').contentWindow.document.getElementById('issue');
	var thumbs = document.getElementById('pagemanager').getElementsByTagName('ul')[0];
	}
	if (style == 2) {
		removeClass(editor,'continuous');
		removeClass(thumbs,'continuous');
		addClass(editor,'spreads');
		addClass(thumbs,'spreads');
	} else if (style == 1) {
		removeClass(editor,'spreads');
		removeClass(thumbs,'spreads');
		addClass(editor,'continuous');
		addClass(thumbs,'continuous');
	} else {
		removeClass(editor,'spreads');
		removeClass(thumbs,'spreads');
		removeClass(editor,'continuous');
		removeClass(thumbs,'continuous');
	} 
}

function right_bound(bind) {
	var editor = document.getElementById('XinhaIFrame_inputBox').contentWindow.document.getElementById('issue');
	var thumbs = document.getElementById('pagemanager').getElementsByTagName('ul')[0];
	if (bind==true) {
		addClass(editor,'bindright');
		addClass(thumbs,'bindright');
	} else {
		removeClass(editor,'bindright');
		removeClass(thumbs,'bindright');
	}
}

function show_outline(show) {
	var editor = document.getElementById('XinhaIFrame_inputBox').contentWindow.document.getElementById('issue');
	if (show==true) {
		addClass(editor,'outline');
	} else {
		removeClass(editor,'outline');
	}
}

var dragged_item;
function dragstart_reorder(e){
     var value=e.currentTarget.innerHTML;
     dragged_item=e.currentTarget;
     e.dataTransfer.setData('text',value);	// FF?
}

function dragleave_reorder(e){
     e.preventDefault();
	 removeClass(e.currentTarget,'dragover');
}
function dragover_reorder(e){
     e.preventDefault();
	 addClass(e.currentTarget,'dragover');
}
function dropped_reorder(e){     
     e.preventDefault();
 	 removeClass(e.currentTarget,'dragover');
     e.currentTarget.innerHTML = e.dataTransfer.getData('text');	// FF?
     editor_reorder(dragged_item,e.currentTarget);
}

function editor_reorder(drop,target) {
	pg = drop.id; pg = pg.split('pt'); pg = pg[1];
	var pgdex = drop.parentNode.getElementsByClassName('page_thumb');
	var t = 0;	// target node
	var d = 0;
	for (var i=0; i<pgdex.length; i++) {
		if (pgdex[i].id == target.id) {
			t = i;
		}
	}
	for (var i=0; i<pgdex.length; i++) {
		if (pgdex[i].id == drop.id) {
			console.log('current index = '+i);
			d = i;
			console.log('target index = '+t);
		}
	}
	if (d<t) { t=t+1;}	// of insert might be where it already is
	pgdex[d].parentNode.insertBefore(pgdex[d],pgdex[t]);
	
	// now sync corresponding pagebox in editor
	var pbdex = document.getElementById('XinhaIFrame_inputBox').contentWindow.document.getElementsByClassName('page');
	pbdex[d].parentNode.insertBefore(pbdex[d],pbdex[t]);
	
	reindex_pages();
		
};

/*	ADD NEW STYLE DIALOG FUNCTIONS */
function cssLinkCheck(calledby) {
	var section = calledby.id.split('_');
	console.log('section = '+section);
	if (document.getElementById('css_object_'+section[2]+'_linked').checked) {
	console.log('linked is checked!');
		var inputs = ['top','left','right','bottom'];
		if (calledby.tagName.toLowerCase() == 'input') {	// text box
			if (section[3]=='linked') { var baseval = 'css_object_'+section[2]+'_top';
			} else {	var baseval = calledby.id; }
			for (var i=0; i < inputs.length; i++) {
				console.log('caller id = '+calledby.id+' vs css_object_'+section[2]+'_'+inputs[i]);
				if (calledby.id != 'css_object_'+section[2]+'_'+inputs[i]) {
					console.log('setting value for '+inputs[i]);
					document.getElementById('css_object_'+section[2]+'_'+inputs[i]).value = document.getElementById(''+baseval+'').value;
					document.getElementById('css_object_'+section[2]+'_'+inputs[i]+'_units').value = document.getElementById(baseval+'_units').value;
				}
			}
		} else { // select box for units
			for (var i=0; i < inputs.length; i++) {
				if (calledby.id != 'css_object_'+section[2]+'_'+inputs[i]+'_units') {
					console.log('setting select options for '+inputs[i]);
					document.getElementById('css_object_'+section[2]+'_'+inputs[i]+'_units').value = calledby.value;
				}
			}
		}
	}
}
var standin = [];	// used for standin className if user forgets to enter one
function buildCustomCSS() {
	var output = '';
	// General Section
	var classname = document.getElementById('css_classname').value;
	if (classname == '') {
		standin.push('.mystyle'+standin.length);
		classname = standin[standin.length-1];
		document.getElementById('css_classname').value = classname;
	}
	var basedon = document.getElementById('css_basedon').value;
	if (basedon != '') {classname = basedon+classname;}
	output += classname+' {\n';
	// Basic Section
	var family = document.getElementById('css_family').value;
	if (family != '') {
		output += 'font-family: '+family+';\n';
	}	
	var weight = document.getElementById('css_weight').value;
	if (weight != '') { 
		output += 'font-weight: '+weight+';\n';
	}
	var style = document.getElementById('css_style').value;
	if (style != '') {
		output += 'font-style: '+style+';\n';
	}
	var fontsize  = document.getElementById('css_fontsize').value;
	var fontsize_units = document.getElementById('css_fontsize_units').value;
	if (fontsize != '') {
		output += 'font-size: '+fontsize+fontsize_units+';\n';
	}
	var lineheight = document.getElementById('css_lineheight').value;
	var lineheight_units = document.getElementById('css_lineheight_units').value;
	if (lineheight != '') {
		output += 'line-height: '+lineheight+lineheight_units+';\n';
	}
	var decoration = document.getElementById('css_decoration').value;
	if (decoration != '') {
		output += 'text-decoration: '+decoration+';\n';
	}
	var textwrap = document.getElementById('css_textwrap').value;
	if (textwrap.selectedIndex > 0 && textwrap.selectedIndex < 8) {
		output += 'white-space: '+textwrap+';\n';
	} else if (textwrap.selectedIndex > 7 && textwrap.selectedIndex < 12) {
		output += 'word-wrap: '+textwrap+';\n';
	} else if (textwrap.selectedIndex > 11) {
		output += 'word-break: '+textwrap+';\n';
	} else {
		// nothing
	}
	var fontcolor   = document.getElementById('css_fontcolor').value;
	if (fontcolor != '') {
		output += 'color: '+fontcolor+';\n';
	}
	var fontbackcolor = document.getElementById('css_fontbackcolor').value;
	if (fontbackcolor != '') {
		output += 'background-color: '+fontbackcolor+';\n';
	}
	// Advanced Font Section
	var texttransform = document.getElementById('css_texttransform').value;
	if (texttransform != '') {
		output += 'text-transform: '+texttransform+';\n';
	}
	var textalign = document.getElementById('css_textalign').value;
	if (textalign != '') {
		output += 'text-align: '+textalign+';\n';
	}
	var letterspace = document.getElementById('css_letterspace').value;
		var letterspace_length = document.getElementById('css_letterspace_length').value;
		var letterspace_units  = document.getElementById('css_letterspace_units').value;
	if (letterspace == 'length') {
		output += 'letter-spacing: '+letterspace_length+letterspace_units+';\n';
	} else if (letterspace != 'length' && letterspace != '') {
		output += 'letter-spacing: '+letterspace+';\n';
	} else {};
	var wordspace = document.getElementById('css_wordspace').value;
		var wordspace_length   = document.getElementById('css_wordspace_length').value;
		var wordspace_units    = document.getElementById('css_wordspace_units').value;
	if (wordspace == 'length') {
		output += 'word-spacing: '+wordspace_length+wordspace_units+';\n';
	} else if (wordspace != 'length' && letterspace != '') {
		output += 'word-spacing: '+wordspace+';\n';
	} else {};
	// Object Styles Section
	var object_height = document.getElementById('css_object_height').value;
	var object_height_units = document.getElementById('css_object_height_units').value;
	if (object_height != '') {
		if (object_height_units == 'auto') {
			output += 'height: auto;\n';
		} else {
			output += 'height: '+object_height+object_height_units+';\n';
		}
	}
	var object_width  = document.getElementById('css_object_width').value;
	var object_width_units  = document.getElementById('css_object_width_units').value;
	if (object_width != '') {
		if (object_height_units == 'auto') {
			output += 'width: auto;\n';
		} else {
			output += 'width: '+object_width+object_width_units+';\n';
		}
	}
	var object_bgcolor = document.getElementById('css_object_bgcolor').value;
	if (object_bgcolor != '') { output += 'background-color: '+object_bgcolor+';\n';}
	var object_bgimage = document.getElementById('css_object_bgimage').value;
	if (object_bgimage != '') { output += "background-image: url('"+object_bgimage+"');\n";}

	var object_bgpos   = document.getElementById('css_object_bgpos').value;
	var object_bgpos_x = document.getElementById('css_object_bgpos_x').value;
	var object_bgpos_x_units = document.getElementById('css_object_bgpos_x_units').value;
	var object_bgpos_y = document.getElementById('css_object_bgpos_y').value;
	var object_bgpos_y_units = document.getElementById('css_object_bgpos_y_units').value;
	
	var object_bgsize  = document.getElementById('css_object_bgsize').value;
	var object_bgsize_x= document.getElementById('css_object_bgsize_x').value;
	var object_bgsize_x_units = document.getElementById('css_object_bgsize_x_units').value;
	var object_bgsize_y= document.getElementById('css_object_bgsize_y').value;
	var object_bgsize_y_units = document.getElementById('css_object_bgsize_y_units').value;
	if (document.getElementById('css_object_bg').checked) {
		if (object_bgpos != 'custom') {
			output += 'background-position: '+object_bgpos+';\n';
		} else {
			if (object_bgpos_x_units == 'auto') { object_bgpos_x = ''; }
			if (object_bgpos_x == '' && object_bgpos_x_units != 'auto') {
				object_bgpos_units = '';
			}
			if (object_bgpos_y_units == 'auto') { object_bgpos_y = ''; }
		
			if (object_bgpos_x == '' && object_bgpos_x_units != 'auto') {
				object_bgpos_units = '';
			}
			output += 'background-position: '+object_bgpos_x+object_bgpos_x_units+' '+object_bgpos_y+object_bgpos_y_units+';\n';

		}
		if (object_bgsize != '') {
			if (object_bgsize != 'custom') {
				output += 	'-webkit-background-size: '+object_bgsize+';\n'+
							'-moz-background-size: '+object_bgsize+';\n'+
							'-ms-background-size: '+object_bgsize+';\n'+
							'background-size: '+object_bgsize+';\n';
			} else {
				if (object_bgsize_x_units == 'auto') { object_bgpos_x = ''; }
				if (object_bgsize_x == '' && object_bgsize_x_units != 'auto') {
					object_bgsize_units = '';
				}
				if (object_bgsize_y_units == 'auto') { object_bgsize_y = ''; }
		
				if (object_bgsize_x == '' && object_bgsize_x_units != 'auto') {
					object_bgsize_units = '';
				}
				output +=	'-webkit-background-size: '+object_bgsize_x+object_bgsize_x_units+' '+object_bgsize_y+object_bgsize_y_units+';\n'+
							'-moz-background-size: '+object_bgsize_x+object_bgsize_x_units+' '+object_bgsize_y+object_bgsize_y_units+';\n'+
							'-ms-background-size: '+object_bgsize_x+object_bgsize_x_units+' '+object_bgsize_y+object_bgsize_y_units+';\n'+
							'background-size: '+object_bgsize_x+object_bgsize_x_units+' '+object_bgsize_y+object_bgsize_y_units+';\n';
			}
		}
	}
	var object_pos = document.getElementById('css_object_pos').value;
	if (object_pos != '') { output += 'position: '+object_pos+';\n';}
	var object_display = document.getElementById('css_object_display').value;
	if (object_display != '') { output += 'display: '+object_display+';\n';}
	
	var object_pos_top = document.getElementById('css_object_pos_top').value;
	var object_pos_top_units = document.getElementById('css_object_pos_top_units').value;
	var object_pos_left = document.getElementById('css_object_pos_left').value;
	var object_pos_left_units = document.getElementById('css_object_pos_left_units').value;
	var object_pos_bottom = document.getElementById('css_object_pos_bottom').value;
	var object_pos_bottom_units = document.getElementById('css_object_pos_top_units').value;
	var object_pos_right = document.getElementById('css_object_pos_left').value;
	var object_pos_right_units = document.getElementById('css_object_pos_left_units').value;
	var object_pos_linked = document.getElementById('css_object_pos_linked');
	if (object_pos != '') {
		if (object_pos_top == '' && object_pos_top_units != 'auto') { object_pos_top_units = ''; 
		} else if (object_pos_top_units == 'auto') { object_pos_top = ''; }
		if (object_pos_left == '' && object_pos_left_units != 'auto') { object_pos_left_units = '';
		} else if (object_pos_left_units == 'auto') { object_pos_left = ''; }
		if (object_pos_bottom == '' && object_pos_bottom_units != 'auto') { object_pos_bottom_units = ''; 
		} else if (object_pos_bottom_units == 'auto') { object_pos_bottom = ''; }
		if (object_pos_right == '' && object_pos_right_units != 'auto') { object_pos_right_units = ''; 
		} else if (object_pos_right_units == 'auto') { object_pos_right = ''; }
		output += 	'top: '+object_pos_top+object_pos_top_units+';\n'+
					'left: '+object_pos_left+object_pos_left_units+';\n'+
					'right: '+object_pos_right+object_pos_right_units+';\n'+
					'bottom:'+object_pos_bottom+object_pos_bottom_units+';\n';
	}
	
	var object_pad_top = document.getElementById('css_object_pad_top').value;
	var object_pad_top_units = document.getElementById('css_object_pad_top_units').value;
	var object_pad_left = document.getElementById('css_object_pad_left').value;
	var object_pad_left_units = document.getElementById('css_object_pad_left_units').value;
	var object_pad_bottom = document.getElementById('css_object_pad_bottom').value;
	var object_pad_bottom_units = document.getElementById('css_object_pad_top_units').value;
	var object_pad_right = document.getElementById('css_object_pad_left').value;
	var object_pad_right_units = document.getElementById('css_object_pad_left_units').value;
	var object_pad_linked = document.getElementById('css_object_pad_linked');
	if (document.getElementById('css_object_pad').checked) {
		if (object_pad_top == '' && object_pad_top_units != 'auto') { object_pad_top_units = ''; 
		} else if (object_pad_top_units == 'auto') { object_pad_top = ''; }
		if (object_pad_left == '' && object_pad_left_units != 'auto') { object_pad_left_units = '';
		} else if (object_pad_left_units == 'auto') { object_pad_left = ''; }
		if (object_pad_bottom == '' && object_pad_bottom_units != 'auto') { object_pad_bottom_units = ''; 
		} else if (object_pad_bottom_units == 'auto') { object_pad_bottom = ''; }
		if (object_pad_right == '' && object_pad_right_units != 'auto') { object_pad_right_units = ''; 
		} else if (object_pad_right_units == 'auto') { object_pad_right = ''; }
		output += 	'padding: '+object_pad_top+object_pad_top_units+' '+object_pad_right+object_pad_right_units+' '+object_pad_bottom+object_pad_bottom_units+' '+object_pad_left+object_pad_left_units+';\n';
	}
	var object_margin_top = document.getElementById('css_object_margin_top').value;
	var object_margin_top_units = document.getElementById('css_object_margin_top_units').value;
	var object_margin_left = document.getElementById('css_object_margin_left').value;
	var object_margin_left_units = document.getElementById('css_object_margin_left_units').value;
	var object_margin_bottom = document.getElementById('css_object_margin_bottom').value;
	var object_margin_bottom_units = document.getElementById('css_object_margin_top_units').value;
	var object_margin_right = document.getElementById('css_object_margin_left').value;
	var object_margin_right_units = document.getElementById('css_object_margin_left_units').value;
	var object_margin_linked = document.getElementById('css_object_margin_linked');	
	if (document.getElementById('css_object_margin').checked) {
		if (object_margin_top == '' && object_margin_top_units != 'auto') { object_margin_top_units = ''; 
		} else if (object_margin_top_units == 'auto') { object_margin_top = ''; }
		if (object_margin_left == '' && object_margin_left_units != 'auto') { object_margin_left_units = '';
		} else if (object_margin_left_units == 'auto') { object_margin_left = ''; }
		if (object_margin_bottom == '' && object_margin_bottom_units != 'auto') { object_margin_bottom_units = ''; 
		} else if (object_margin_bottom_units == 'auto') { object_margin_bottom = ''; }
		if (object_margin_right == '' && object_margin_right_units != 'auto') { object_margin_right_units = ''; 
		} else if (object_margin_right_units == 'auto') { object_margin_right = ''; }
		output += 	'margin: '+object_margin_top+object_margin_top_units+' '+object_margin_right+object_margin_right_units+' '+object_margin_bottom+object_margin_bottom_units+' '+object_margin_left+object_margin_left_units+';\n';
	}
	
	var object_borderstyle = document.getElementById('css_object_borderstyle').value;
	var object_bordercolor = document.getElementById('css_object_bordercolor').value;
	var object_bordersize_top = document.getElementById('css_object_bordersize_top').value || '0';
	var object_bordersize_top_units = document.getElementById('css_object_bordersize_top_units').value;
	var object_bordersize_left = document.getElementById('css_object_bordersize_left').value || '0';
	var object_bordersize_left_units = document.getElementById('css_object_bordersize_left_units').value;
	var object_bordersize_bottom = document.getElementById('css_object_bordersize_bottom').value || '0';
	var object_bordersize_bottom_units = document.getElementById('css_object_bordersize_top_units').value;
	var object_bordersize_right = document.getElementById('css_object_bordersize_left').value || '0';
	var object_bordersize_right_units = document.getElementById('css_object_bordersize_left_units').value;
	var object_bordersize_linked = document.getElementById('css_object_bordersize_linked');
	if (object_borderstyle != 'none') {
		output += 	'border-top: '+object_bordersize_top+object_bordersize_top_units+' '+object_borderstyle+' '+object_bordercolor+';\n'+
					'border-left:'+object_bordersize_left+object_bordersize_left_units+' '+object_borderstyle+' '+object_bordercolor+';\n'+
					'border-right: '+object_bordersize_right+object_bordersize_right_units+' '+object_borderstyle+' '+object_bordercolor+';\n'+
					'border-bottom: '+object_bordersize_bottom+object_bordersize_bottom_units+' '+object_borderstyle+' '+object_bordercolor+';\n';
	}

	var column_count = document.getElementById('css_column_count').value;
	var column_gutter= document.getElementById('css_column_gutter').value;
	var column_gutter_units = document.getElementById('css_column_gutter_units').value;
	var column_width = document.getElementById('css_column_width').value;
	var column_width_units  = document.getElementById('css_column_width_units').value;	
	if (column_count != '0') {
		output += '-webkit-column-count: '+column_count+';\n'+
		'-moz-column-count: '+column_count+';\n'+
		'-ms-column-count: '+column_count+';\n'+
		'column-count: '+column_count+';\n';
		if (column_gutter_units == 'auto') { colunn_gutter = ''; }
		output += '-webkit-column-gap: '+column_gutter+column_gutter_units+';\n'+
		'-moz-column-gap: '+column_gutter+column_gutter_units+';\n'+
		'-ms-column-gap: '+column_gutter+column_gutter_units+';\n'+
		'column-gap: '+column_gutter+column_gutter_units+';\n';
		if (column_width_units == 'auto') { column_width = ''; }
		output += '-webkit-column-width: '+column_width+column_width_units+';\n'+
		'-moz-column-width: '+column_width+column_width_units+';\n'+
		'-ms-column-width: '+column_width+column_width_units+';\n'+
		'column-width: '+column_width+column_width_units+';\n';
	}
	var showhide_example_css = '';
	var object_visibility = document.getElementById('css_object_visibility').value;
	var object_opacity   = document.getElementById('css_object_opacity').value;
	if (object_visibility != '') {
		showhide_example_css += 'visibility: '+object_visibility+';\n';
	}
	showhide_example_css += 'opacity: '+object_opacity+';\n';
	document.getElementById('css_showhide_example').setAttribute('style',showhide_example_css);
	if (document.getElementById('css_showhide').checked) {
		output += showhide_example_css;
	}
	
	var textshadow_example_css = '';
	var textshadow_x = document.getElementById('css_textshadow_x');
	var textshadow_x_units = document.getElementById('css_textshadow_x_units').value;
	var textshadow_y = document.getElementById('css_textshadow_y');
	var textshadow_y_units = document.getElementById('css_textshadow_y_units').value;
	var textshadow_blur = document.getElementById('css_textshadow_blur').value;
	var textshadow_blur_units = document.getElementById('css_textshadow_blur_units').value;
	var textshadow_color = document.getElementById('css_textshadow_color');
	var textshadow_effect = document.getElementById('css_textshadow_effect').value;
	if (textshadow_effect == 'outerglow') {
		textshadow_x.value = textshadow_y.value = '0';
	};
	textshadow_example_css += '-webkit-text-shadow: '+textshadow_x.value+textshadow_x_units+' '+textshadow_y.value+textshadow_y_units+' '+textshadow_blur+textshadow_blur_units+' '+textshadow_color.value+';\n'+
	'-moz-text-shadow: '+textshadow_x.value+textshadow_x_units+' '+textshadow_y.value+textshadow_y_units+' '+textshadow_blur+textshadow_blur_units+' '+textshadow_color.value+';\n'+
	'-ms-text-shadow: '+textshadow_x.value+textshadow_x_units+' '+textshadow_y.value+textshadow_y_units+' '+textshadow_blur+textshadow_blur_units+' '+textshadow_color.value+';\n'+
	'text-shadow: '+textshadow_x.value+textshadow_x_units+' '+textshadow_y.value+textshadow_y_units+' '+textshadow_blur+textshadow_blur_units+' '+textshadow_color.value+';\n';		
	document.getElementById('css_textshadow_example').setAttribute('style',textshadow_example_css);
	if (document.getElementById('css_textshadow').checked) {
		output += textshadow_example_css;
	}
	
	var boxshadow_example_css = '';
	var boxshadow_x = document.getElementById('css_boxshadow_x');
	var boxshadow_x_units = document.getElementById('css_boxshadow_x_units').value;
	var boxshadow_y = document.getElementById('css_boxshadow_y');
	var boxshadow_y_units = document.getElementById('css_boxshadow_y_units').value;
	var boxshadow_blur = document.getElementById('css_boxshadow_blur').value;
	var boxshadow_blur_units = document.getElementById('css_boxshadow_blur_units').value;
	var boxshadow_color = document.getElementById('css_boxshadow_color').value;
	var boxshadow_spread = document.getElementById('css_boxshadow_spread').value;
	var boxshadow_spread_units = document.getElementById('css_boxshadow_spread_units').value;
	var boxshadow_effect = document.getElementById('css_boxshadow_effect').value;
	if (boxshadow_effect == 'innerglow') {
		boxshadow_x.value = boxshadow_y.value = '0';
		var inset = ' inset';
	} else if (boxshadow_effect == 'outerglow') {
		boxshadow_x.value = boxshadow_y.value = '0';
		var inset = '';
	} else if (boxshadow_effect == 'inset') {
		var inset = ' inset';
	} else { var inset = ''; } // blur | spread | color
	boxshadow_example_css += '-webkit-box-shadow: '+boxshadow_x.value+boxshadow_x_units+' '+boxshadow_y.value+boxshadow_y_units+' '+boxshadow_blur+boxshadow_blur_units+' '+boxshadow_spread+boxshadow_spread_units+' '+boxshadow_color+inset+';\n'+
	'-moz-box-shadow: '+boxshadow_x.value+boxshadow_x_units+' '+boxshadow_y.value+boxshadow_y_units+' '+boxshadow_blur+boxshadow_blur_units+' '+boxshadow_spread+boxshadow_spread_units+' '+boxshadow_color+inset+';\n'+
	'-ms-box-shadow: '+boxshadow_x.value+boxshadow_x_units+' '+boxshadow_y.value+boxshadow_y_units+' '+boxshadow_blur+boxshadow_blur_units+' '+boxshadow_spread+boxshadow_spread_units+' '+boxshadow_color+inset+';\n'+
	'box-shadow: '+boxshadow_x.value+boxshadow_x_units+' '+boxshadow_y.value+boxshadow_y_units+' '+boxshadow_blur+boxshadow_blur_units+' '+boxshadow_spread+boxshadow_spread_units+' '+boxshadow_color+inset+';\n';	
	document.getElementById('css_boxshadow_example').setAttribute('style','border: 1px solid black;padding:5px;margin:5px auto;'+boxshadow_example_css);
	if (document.getElementById('css_boxshadow').checked) {
		output += boxshadow_example_css;
	}
	
	if (document.getElementById('css_transition').checked) {
		var property = document.getElementById('css_transition_property').value;
		var duration = document.getElementById('css_transition_duration').value;
		var duration_units = document.getElementById('css_transition_duration_units').value;
		var timing   = document.getElementById('css_transition_timing').value;
		var delay    = document.getElementById('css_transition_delay').value;
		var delay_units = document.getElementById('css_transition_delay_units').value;
		output += '-webkit-transition: '+property+' '+duration+duration_units+' '+timing+' '+delay+delay_units+';\n'+
		'-moz-transition: '+property+' '+duration+duration_units+' '+timing+' '+delay+delay_units+';\n'+
		'-ms-transition: '+property+' '+duration+duration_units+' '+timing+' '+delay+delay_units+';\n'+
		'transition: '+property+' '+duration+duration_units+' '+timing+' '+delay+delay_units+';\n';
	}
	if (document.getElementById('css_transform').checked) {
		var property = document.getElementById('css_transform_property').value;
		var x_value  = document.getElementById('css_transform_x').value;
		var x_value_units = document.getElementById('css_transform_x_units');
		var y_value  = document.getElementById('css_transform_y').value;
		var y_value_units = document.getElementById('css_transform_y_units');
		var z_value  = document.getElementById('css_transform_z').value;
		var z_value_units = document.getElementById('css_transform_z_units');
		if (property == 'none' || property == 'initial' || property == 'inherit') {
			output += '-webkit-transform: '+property+';\n'+
			'-moz-transform: '+property+';\n'+
			'-ms-transform: '+property+';\n'+
			'transform: '+property+';\n';
		} else if (property.match(/scale/gi)) {
			x_value_units.value = '%';
			y_value_units.value = '%';
			z_value_units.value = '%';
			var x = parseFloat(x_value*.1);
			var y = parseFloat(y_value*.1);
			var z = parseFloat(z_value*.1);
			if (property == 'scale3d') {
			output += '-webkit-transform: scale3d('+x+','+y+','+z+');\n'+
			'-moz-transform: scale3d('+x+','+y+','+z+');\n'+
			'-ms-transform: scale3d('+x+','+y+','+z+');\n'+
			'transform: scale3d('+x+','+y+','+z+');\n';
			} else if (property == 'scale') {
			output += '-webkit-transform: scale('+x+','+y+');\n'+
			'-moz-transform: scale('+x+','+y+');\n'+
			'-ms-transform: scale('+x+','+y+');\n'+
			'transform: scale('+x+','+y+');\n';			
			} else if (property == 'scaleX') {
			output += '-webkit-transform: scaleX('+x+');\n'+
			'-moz-transform: scaleX('+x+');\n'+
			'-ms-transform: scaleX('+x+');\n'+
			'transform: scaleX('+x+');\n';			
			} else if (property == 'scaleY') {
			output += '-webkit-transform: scaleY('+y+');\n'+
			'-moz-transform: scaleY('+y+');\n'+
			'-ms-transform: scaleY('+y+');\n'+
			'transform: scaleY('+y+');\n';			
			} else {
			output += '-webkit-transform: scaleZ('+z+');\n'+
			'-moz-transform: scaleZ('+z+');\n'+
			'-ms-transform: scaleZ('+z+');\n'+
			'transform: scaleZ('+z+');\n';			
			}
		} else if (property.match(/rotate/gi)) {
			x_value_units.value = 'deg';
			y_value_units.value = 'deg';
			z_value_units.value = 'deg';
			if (property == 'rotate') {
			output += '-webkit-transform: rotate('+x_value+'deg);\n'+
			'-moz-transform: rotate('+x_value+'deg);\n'+
			'-ms-transform: rotate('+x_value+'deg);\n'+
			'transform: rotate('+x_value+'deg);\n';			
			} else if (property == 'rotateX') {
			output += '-webkit-transform: rotateX('+x_value+'deg);\n'+
			'-moz-transform: rotateX('+x_value+'deg);\n'+
			'-ms-transform: rotateX('+x_value+'deg);\n'+
			'transform: rotateX('+x_value+'deg);\n';			
			} else if (property == 'rotateY') {
			output += '-webkit-transform: rotateY('+y_value+'deg);\n'+
			'-moz-transform: rotateY('+y_value+'deg);\n'+
			'-ms-transform: rotateY('+y_value+'deg);\n'+
			'transform: rotateY('+y_value+'deg);\n';			
			} else {
			output += '-webkit-transform: rotateZ('+z_value+'deg);\n'+
			'-moz-transform: rotateZ('+z_value+'deg);\n'+
			'-ms-transform: rotateZ('+z_value+'deg);\n'+
			'transform: rotateZ('+z_value+'deg);\n';			
			}
		} else if (property.match(/skew/gi)) {
			x_value_units.value = 'deg';
			y_value_units.value = 'deg';
			z_value_units.value = 'deg';
			if (property == 'skew3d') {
			output += '-webkit-transform: skew3d('+x_value+'deg,'+y_value+'deg,'+z_value+'deg);\n'+
			'-moz-transform: skew3d('+x_value+'deg,'+y_value+'deg,'+z_value+'deg);\n'+
			'-ms-transform: skew3d('+x_value+'deg,'+y_value+'deg,'+z_value+'deg);\n'+
			'transform: skew3d('+x_value+'deg,'+y_value+'deg,'+z_value+'deg);\n';
			} else if (property == 'skew') {
			output += '-webkit-transform: skew('+x_value+'deg,'+y_value+'deg);\n'+
			'-moz-transform: skew('+x_value+'deg,'+y_value+'deg);\n'+
			'-ms-transform: skew('+x_value+'deg,'+y_value+'deg);\n'+
			'transform: skew('+x_value+'deg,'+y_value+'deg);\n';			
			} else if (property == 'skewX') {
			output += '-webkit-transform: skewX('+x_value+'deg);\n'+
			'-moz-transform: skewX('+x_value+'deg);\n'+
			'-ms-transform: skewX('+x_value+'deg);\n'+
			'transform: skewX('+x_value+'deg);\n';			
			} else if (property == 'skewY') {
			output += '-webkit-transform: skewY('+y_value+'deg);\n'+
			'-moz-transform: skewY('+y_value+'deg);\n'+
			'-ms-transform: skewY('+y_value+'deg);\n'+
			'transform: skewY('+y_value+'deg);\n';			
			} else {
			output += '-webkit-transform: skewZ('+z_value+'deg);\n'+
			'-moz-transform: skewZ('+z_value+'deg);\n'+
			'-ms-transform: skewZ('+z_value+'deg);\n'+
			'transform: skewZ('+z_value+'deg);\n';			
			}
		}
	}
	var filter_example_css = '';
	var filter = document.getElementById('css_filter_property').value;
	var filter_value = document.getElementById('css_filter_value').value;
	var filter_value_units = document.getElementById('css_filter_value_units').value;
	filter_example_css += '-webkit-filter: '+filter+'('+filter_value+filter_value_units+');\n'+
	'-moz-filter: '+filter+'('+filter_value+filter_value_units+');\n'+
	'-ms-filter: '+filter+'('+filter_value+filter_value_units+');\n'+
	'filter: '+filter+'('+filter_value+filter_value_units+');\n';
	document.getElementById('css_filter_example').setAttribute('style',filter_example_css);
	if (document.getElementById('css_filter').checked) {
		output += filter_example_css;
	}
	
	
	// Output
	output += '}\n\n';
	document.getElementById('newcss_style').value = output;
}

function addCustomCSS() {
	// get the className
	var code = document.getElementById('newcss_style').value;
		name = code.split('{')[0].trim();
		code = code.split('{')[1].split('}')[0].trim();
		RYU.RYUStylist.addCustomCSS(name,code);
		// Now fill Based On drop-down in Dialog
}

function all_addons_selected(state) {
	var checkboxes = document.getElementById('available_addons').getElementsByTagName('input');
	selected_addons = [];	// clear array
	if (state==true) {
		for (var c=1; c < checkboxes.length; c++) {
			add_selected_addon(checkboxes[c]);
		}
	} else {
		for (var c=1; c < checkboxes.length; c++) {
			cut_selected_addon(checkboxes[c]);
		}
	}
	
}
function add_selected_addon(box) {
	if (selected_addons.indexOf(''+box.value+'')==-1) {
		selected_addons.push(''+box.value+'');
	}
	box.checked = true;
	box.parentNode.parentNode.className="active";
	document.getElementById('addons_load_order').innerHTML = '<strong>Add-On Load Order:</strong> '+selected_addons.toString().replace(/,/gi,', ');
}
function cut_selected_addon(box) {
	if (selected_addons.indexOf(''+box.value+'')!=-1) {
		selected_addons.splice(selected_addons.indexOf(''+box.value+''),1);
	}
	box.checked = false;
	box.parentNode.parentNode.className="inactive";
	document.getElementById('addons_load_order').innerHTML = '<strong>Add-On Load Order:</strong> '+selected_addons.toString().replace(/,/gi,', ');
}


	return { // Publicly Expose Variables and Functions
			init : init,
			_lc : _lc,
			baseurl : baseurl,
			php : php,
			bookBinder : bookBinder,
			resize_panels : resize_panels,
			loadAddOns : loadAddOns,
			addon : addon,
			all_addons_selected : all_addons_selected,
			add_selected_addon  : add_selected_addon,
			cut_selected_addon  : cut_selected_addon,
			toggleOptSwitch : toggleOptSwitch,
			setOptGhostList : setOptGhostList,
			togglePanel : togglePanel,
			toggleDialog : toggleDialog,
			toggleTableOptions : toggleTableOptions,
			toggleToolBar : toggleToolBar,
			toggleDropBar : toggleDropBar,
			hideDialog : hideDialog,
			scrollIt : scrollIt,
			touchScroll : touchScroll,
			clearEditor : clearEditor,
			adjustBox : adjustBox,
			loadTemplate : loadTemplate,
			loadURL2Sim : loadURL2Sim,
			uniqueElements : uniqueElements,
			swapAppTab : swapAppTab,
			selectFile : selectFile,
			pullSource : pullSource,
			refreshSrc : refreshSrc,
			slideSpace : slideSpace,
			controlSlide : controlSlide,
			getDocProps : getDocProps,
			setDocProps : setDocProps,
			countChars	: countChars,
			reWrite : reWrite,
			updatePreview : updatePreview,
			clearSimulator : clearSimulator,
			customPreview : customPreview,
			customProfile : function(x) { customProfile = x; },
			customOS : function(x) { customOS = x; },
			outputOptions : outputOptions,
			switchDevice : switchDevice,
			rotateDevice : rotateDevice,
			dView : function(x){dView=x;if(r==0){r=1;}else{r=0;};rotateDevice();},
			dSim : function(x){dSim=x;if(r==0){r=1;}else{r=0;};rotateDevice();},
			viewDrop : viewDrop,
			splitView : splitView,
			popOut : popOut,
			clearSplash : function(){clearTimeout(splashwait);},
			subMenu : subMenu,
			zoomFactor : zoomFactor,
			deviceSizer : deviceSizer,
			add2ConfigList : add2ConfigList,
			delConfigList : delConfigList,
			buildConfigFile : buildConfigFile,
			resetConfigFile : resetConfigFile,
			addRackData : addRackData,
			addRackRows : addRackRows,
			delRackData : delRackData,
			getRackData : getRackData,
			newRackCat : newRackCat,
			cat2data : cat2data,
			loadRackData : loadRackData,
			fixlayout : fixlayout,
			stylesToggle : stylesToggle,
			zoomSet : zoomSet,
			themeToggle : themeToggle,
			zoomToggle : zoomToggle,
			scrollToggle : scrollToggle,
			iScrollToggle : iScrollToggle,
			iScrollApply : iScrollApply,
			defaultPrevention : defaultPrevention,
			preventDefault : preventDefault,
			restoreDefault : restoreDefault,
			tapCheck : tapCheck,
			hasClass : hasClass,
			addClass : addClass,
			removeClass : removeClass,
			helpPlay : helpPlay,
			playHelp : playHelp,
			guidedHelp : guidedHelp,
			xpandIFRAME : xpandIFRAME,
			fileOps : fileOps,
			buildPackage : buildPackage,
			submitPHPform : submitPHPform,
			syncPack2Opt : syncPack2Opt,
			device : device,
			r : r,
			config : config,
			previewRack : previewRack,
			
			thumbnail_size		: 	thumbnail_size,
			refresh_thumbnails	:	refresh_thumbnails,
			selectionOf			:	selectionOf,
			delete_page			:	delete_page,
			setMax				:	setMax,
			insert_page			:	insert_page,
			insert_pages		:	insert_pages,
			reindex_pages		:	reindex_pages,
			dragstart_reorder	:	dragstart_reorder,
			dragleave_reorder	:	dragleave_reorder,
			dragover_reorder	:	dragover_reorder,
			editor_reorder		:	editor_reorder,
			editor_layout		:	editor_layout,
			right_bound			:	right_bound,
			show_outline		:	show_outline,
			addCustomCSS		:	addCustomCSS,
			cssLinkCheck		:	cssLinkCheck,
			buildCustomCSS		:	buildCustomCSS
	}

}();
var RZW = function(){};	// prevent old add-ons from doing anything
window.onload = function(){RYU.init();};