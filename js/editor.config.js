xinha_editors = null;
xinha_init    = null;
xinha_config  = null;
xinha_plugins = null;

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
} else {
	device.Platform = "Desktop";
}
	if (navigator.userAgent.match(/Windows/i)) { device.OS = "Windows";}
	else if (navigator.userAgent.match(/Macintosh/i)) { device.OS = "Mac";}
	else if (navigator.userAgent.match(/Linux/i)) { device.OS = "Linux";}
	else {};

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

	// Import config variables if they exist or use default value
	wysiwyg = RYU.config.wysiwyg || 1;
	xinha_importStyles = RYU.config.importStyles || 0;
	xinha_mystyles = RYU.config.myStyles || 0;
	xfileman = RYU.config.xfileman || 0;

	winSize();
	var size = winSize();
	W = size.W;
	if (W<600) {var mobile = true;
	} else { var mobile = false; }

	// Error Catching
	if ( ( device.Platform=="iOS" && device.v < 5 ) || device.Platform=="webOS") {
		wysiwyg = 0;
	}
	if (device.Platform=="Android" && device.v < 3 ) {
		alert('Ryuzine Writer is not compatible with this version of Android.  WYSIWYG Editor and Simulator are disabled.');
		wysiwyg = 0;
	}
	
	// Get Preferences if they exist and override //
	if (!Get_Cookie("rzw_myStyles")) {
		xinha_mystyles = RYU.config.myStyles;
	} else {
		xinha_mystyles=Get_Cookie("rzw_myStyles")*1;
	}
	if (!Get_Cookie("rzw_wysiwyg")) {} else {
		wysiwyg=Get_Cookie("rzw_wysiwyg")*1;
	}

// Reset WYSIWYG in Config //	
RYU.config.wysiwyg = wysiwyg;

if ( wysiwyg===0) {
} else {

// This contains the names of textareas we will make into Xinha editors
xinha_init = xinha_init ? xinha_init : function()
{
   /** STEP 1 ***************************************************************
   * First, specify the textareas that shall be turned into Xinhas. 
   * For each one add the respective id to the xinha_editors array.
   * I you want add more than on textarea, keep in mind that these 
   * values are comma seperated BUT there is no comma after the last value.
   * If you are going to use this configuration on several pages with different
   * textarea ids, you can add them all. The ones that are not found on the
   * current page will just be skipped.
   ************************************************************************/

  xinha_editors = xinha_editors ? xinha_editors :
  [
    'inputBox'
  ];

  
  /** STEP 2 ***************************************************************
   * Now, what are the plugins you will be using in the editors on this
   * page.  List all the plugins you will need, even if not all the editors
   * will use all the plugins.
   *
   * The list of plugins below is a good starting point, but if you prefer
   * a simpler editor to start with then you can use the following 
   * 
   * xinha_plugins = xinha_plugins ? xinha_plugins : [ ];
   *
   * which will load no extra plugins at all.
   ************************************************************************/
	if (mobile==true) {
		if (xfileman==1) { // you can't actually USE these in mobile interface
		  xinha_plugins = xinha_plugins ? xinha_plugins :
		  [
		  	   'SuperClean',
			   'RYUPageManager',
			   'RYUPicker',
			   'RYUMasterStyles',
		   	   'RYUStylist',
			   'RyuXFileManager',
			   'RYUButtons'
		  ];
		
		} else {
		  xinha_plugins = xinha_plugins ? xinha_plugins :
		  [
			   'RYUPageManager',
			   'RYUPicker',
			   'RYUMasterStyles',
		   	   'RYUStylist',
			   'RyuXFileManager',
			   'RYUButtons'
		  ];
	  	}
	} else {
		if (xfileman==1) {
			  xinha_plugins = xinha_plugins ? xinha_plugins :
			  [
			   'CharacterMap',
			   'ContextMenu',
			   'SmartReplace',
			   'RYUPageManager',
			   'RYUPicker',
			   'RYUMasterStyles',
		   	   'RYUStylist',
			   'RyuXFileManager',
			   'InsertAnchor',
			   'SuperClean',
			   'TableOperations',
			   'RYUButtons'
			  ];
	  	} else {
			  xinha_plugins = xinha_plugins ? xinha_plugins :
			  [
			   'CharacterMap',
			   'ContextMenu',
			   'SmartReplace',
			   'RYUPageManager',
			   'RYUPicker',
			   'RYUMasterStyles',
		   	   'RYUStylist',
			   'InsertAnchor',
			   'SuperClean',
			   'TableOperations',
			   'RYUButtons'
			  ];
	  
	  	}
	}

         // THIS BIT OF JAVASCRIPT LOADS THE PLUGINS, NO TOUCHING  :)
         if(!Xinha.loadPlugins(xinha_plugins, xinha_init)) return;


  /** STEP 3 ***************************************************************
   * We create a default configuration to be used by all the editors.
   * If you wish to configure some of the editors differently this will be
   * done in step 5.
   *
   * If you want to modify the default config you might do something like this.
   *
   *   xinha_config = new Xinha.Config();
   *   xinha_config.width  = '640px';
   *   xinha_config.height = '420px';
   *
   *
   * For a list of the available configuration options, see:
   * http://trac.xinha.org/wiki/Documentation/ConfigVariablesList
   *
   *************************************************************************/


   xinha_config = xinha_config ? xinha_config() : new Xinha.Config();
    xinha_config.formatblock = {
    "Format": "",
    "Heading 1": "h1",
    "Heading 2": "h2",
    "Heading 3": "h3",
    "Heading 4": "h4",
    "Heading 5": "h5",
    "Heading 6": "h6",
    "Normal"   : "p",
    "Address"  : "address",
    "Formatted": "pre"
  };   
   xinha_config.fontname = {
	"Font" : '',
    "Arial"		: 'arial,helvetica,sans-serif',
    "Courier"   : 'courier new,courier,monospace',
    "Georgia"   : 'georgia,times new roman,times,serif',
    "Tahoma"    : 'tahoma,arial,helvetica,sans-serif',
    "Times"  	: 'times new roman,times,serif',
    "Verdana"  	: 'verdana,arial,helvetica,sans-serif',
    "Impact"   	: 'impact',
    "WingDings" : 'wingdings'
   };
   // Most Word Processing programs do not show the font size units, just a number
   // these are approximate point sizes because Xinha still uses deprecated <font size="3">
   // instead of <span style="font-size: 12pt;"> like it should.  Fix is on the To-Do list. 
   xinha_config.fontsize = {
     "+/-": "",		// "+/-" avoids issue with foreign translations of "size" not fitting in the box
     " 8 " : "1",
     "10 ": "2",
     "12 ": "3",
     "14 ": "4",
     "18 ": "5",
     "24 ": "6",
     "36 ": "7"
   };

  xinha_config.toolbar =
	  [	
		["htmlmode"],["undo","redo"],
		["formatblock","fontname","fontsize","bold","italic","underline","strikethrough","forecolor","hilitecolor",
		"insertunorderedlist","insertorderedlist","outdent","indent","createlink","insertimage",
		"justifyleft","justifycenter","justifyright","justifyfull","inserthorizontalrule","subscript","superscript",
		"killword","clearfonts","removeformat","splitblock","lefttoright","righttoleft"
		]
	  ];
	  if (mobile==true) {	// remove some buttons from phone interface
			xinha_config.removeToolbarElement(' splitblock lefttoright righttoleft ');
	  }
   // To adjust the styling inside the editor, we can load an external stylesheet like this
   // NOTE : YOU MUST GIVE AN ABSOLUTE URL
   xinha_config.pageStyleSheets = [ _editor_url + "examples/files/full_example.css" ];
   xinha_config.ryu_stylistLoadStylesheet(_editor_url + "../../css/blank.css");	// it *must* load a stylesheet, even if it is blank!
   if (xinha_mystyles == 1) {
		xinha_config.ryu_master_stylesLoadStylesheet(_editor_url + "../../css/thisissue.css");
   } else {
   		xinha_config.ryu_master_stylesLoadStylesheet("");
   }
   if (typeof document.getElementById('splashcell') != undefined) {
   		document.getElementById('splashcell').style.display="table-cell";
   };  
   // RYUPicker Options   
	RYUPicker.cssList = {
		'lightbox_link'		: { 'wrapper':'a',   'name': Xinha._lc('Lightbox Link','RYUPicker') },
		'light_boxed'	: { 'wrapper':'figure',	'name': Xinha._lc('Lightbox Item','RYUPicker') },
		'caption' : {'wrapper':'figcaption', 'name': Xinha._lc('Lightbox Caption','RYUPicker') },
		'dyn_thumb' : {'wrapper':'div', 'name': Xinha._lc('Dynamic Thumbnail','RYUPicker')},
		'dyn_img' : {'wrapper':'div', 'name': Xinha._lc('Dynamic Image','RYUPicker')},
		'ovr'	: {'wrapper':'div', 'name': Xinha._lc('OVR Image','RYUPicker') }

	}
 
	// RYUPicker Stylesheet
	xinha_config.pageStyleSheets = ["ryuzinewriter/css/writer.parts.css"];
//}
  /** STEP 4 ***************************************************************
   * We first create editors for the textareas.
   *
   * You can do this in two ways, either
   *
   *   xinha_editors   = Xinha.makeEditors(xinha_editors, xinha_config, xinha_plugins);
   *
   * if you want all the editor objects to use the same set of plugins, OR;
   *
   *   xinha_editors = Xinha.makeEditors(xinha_editors, xinha_config);
   *   xinha_editors.myTextArea.registerPlugins(['Stylist']);
   *   xinha_editors.anotherOne.registerPlugins(['CSS','SuperClean']);
   *
   * if you want to use a different set of plugins for one or more of the
   * editors.
   ************************************************************************/

  xinha_editors   = Xinha.makeEditors(xinha_editors, xinha_config, xinha_plugins);

  /** STEP 5 ***************************************************************
   * If you want to change the configuration variables of any of the
   * editors,  this is the place to do that, for example you might want to
   * change the width and height of one of the editors, like this...
   *
   *   xinha_editors.myTextArea.config.width  = '640px';
   *   xinha_editors.myTextArea.config.height = '480px';
   *
   ************************************************************************/

if (device.Platform!="Firefox") { // Firefox Hates this onload
	xinha_editors.inputBox.config.width = '100%';
}

  /** STEP 6 ***************************************************************
   * Finally we "start" the editors, this turns the textareas into
   * Xinha editors.
   ************************************************************************/

  Xinha.startEditors(xinha_editors);
}

Xinha.addOnloadHandler(xinha_init); // this executes the xinha_init function on page load
                                     // and does not interfere with window.onload properties set by other scripts
}