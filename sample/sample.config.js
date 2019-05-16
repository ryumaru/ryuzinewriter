/*
name	: "Sample Add-On",
version	: "1.0",
author	: "K.M. Hansen",
url		: "www.kmhcreative.com/labs",
license	: "MIT",
about	: "Creates sample panels, controls, etc., add-ons can include."
				
	This simply adds a bunch of useless panels and controls to show you how
	the new Add-On system works.  You can use this as a starting point for
	creating your own custom Add-Ons for Ryuzine Reader, Rack, and/or Writer.
	
	The first thing you have to do is "register" your add-on with Ryuzine:

*/
RYU.addon.register(function(){
/*	LOCALIZATION STRINGS (optional)
	If you want your Add-On to automatically localize to other languages
	you can define the labels and text with variables.  If the Localize Add-On
	is being used this will automatically swap out your text with the translated
	version.
*/
	if (RYU.config.localize==1) {
		switch(RYU.config.language) {
		case 'en':
		var label = 'Sample Add-On';
		break;
		case 'de':
		var label = 'Beispiel-Add-On';
		break;
		case 'es':
		var label = 'Muestra Add-On';
		break;
		case 'fr':
		var label = 'Exemple Add-On';
		break;
		case 'ja':
		var label = 'サンプルはアドオン';
		break;
		case 'zh_HANS':
		var label = '样品加载项';
		break;
		case 'zh_HANT':
		var label = '樣品加載項';
		break;
		case 'da':
		var label = 'Prøve Add-On';
		break;
		case 'fi':
		var label = 'Näyte Add-On';
		break;
		case 'el':
		var label = 'Δείγμα Add-On';
		break;
		case 'hi':
		var label = 'नमूना पर जोड़ें';
		break;
		case 'it':
		var label = 'Sample Add-On';
		break;
		case 'ko':
		var label = '샘플 추가 기능';
		break;
		case 'no':
		var label = 'Prøven Add-On';
		break;
		case 'pt':
		var label = 'Amostra Add-On';
		break;
		case 'ru':
		var label = 'Пример Add-On';
		break;
		case 'sv':
		var label = 'Prov Add-On';
		break;
		default:
		var label = 'Sample Add-On';
		};
	} else {
		var label = 'Sample Add-On';
	}
/*	WORKSPACE CONTENT
	You could do these within the ui:workspaces return statement, but it is easier
	and your code is less cluttered if you just set them as variables and then pass 
	the contents into the ui:workspaces call.
	
	Workspace 1 simply passes the contents as a string in the same way you'd use
	document.write();
*/
	
	var ws1_content = '<form style="padding: 20px;">'+
	'<p>The simplest method is to just write all your add-on code as a string '+
	'assigned to a variable and pass the variable, particularly if your add-on '+
	'does not use any of the Ryuzine Writer built-in functions such as storing '+
	'preferences in a cookie.</p>'+
	'<input type="button" value="Open Custom Dialog" onclick="RYU.toggleDialog(\'sample_dialog1\');"/>'+
	'<p>The button above opens a custom dialog with the option for a user to hide the dialog from '+
	'being displayed in the future.  To over-ride hidden dialogs go to Options &gt; Show All Dialogs '+
	'and turn it "ON."</p>'+
	'<p>Item 1: <input type="text" /></p>'+
	'<p>Item 2: <input type="text" /></p>'+
	'<p><input type="radio" name="test" checked/> Yes<br/>'+
	'<input type="radio" name="text" /> No</p>'+
	'<p><textarea>Enter text here</textarea>'+
	'<p><input type="button" value="submit" onclick="alert(\'Form Submit\');"/></p></form>';	

/*	Workspace 2 sends an array of controls created with the built-in ui:controls in
	pretty much the same way you create them for an options panel.
*/

	var ws2_content = [
		['list','lstx','List',function(){},[ ['0','Cat',1],['1','Dog'],['2','Bird'] ],0],
		['multi','multix','Multilist',function(){},[ ['0','Lions',1],['1','Tigers',1],['2','Bears'],['3','Oh My'] ],0],
		['toggle','xtog','MyToggle',function(){},0,0,'sample_sample_ws']
	]

/*	Workspace 3 is "Tabbed" with multiple sub-sections.  To create these you send an array
	of "tab"+"content" pairs.  The "tab" parameter is always a string defining the label on
	the tab (you can also localize this by passing a variable as shown above for "label").
	The "content" parameter may be passed as a string (like Workspace 1) or as ui:controls 
	(like Workspace 2).
*/
	
	var ws3_content = [
		['tab1','content1'],
		['tab2','content2'],
		['tab3','content3'],
		['tab4',
			[
				['radio','r1','Off',function(){},1,0,,'sampleradio'],
				['radio','r2','On',function(){},0,0,,'sampleradio'],
				['checkbox','cbox1','Item 1',function(){},0,0,'','samplechklist'],
				['checkbox','cbox2','Item 2',function(){},['dog',1],0,'','samplechklist'],				
			]
		]
	];
	
/*	WORKSPACE TOOLBAR
	The toolbar at the top of Ryuzine Writer is where the built-in workspaces have their 
	controls for things like "Build," "Reset," etc.  Any custom workspace can also have 
	controls in the toolbar.  You use the same calls as ui:controls, however you are 
	limited to controls of type "button1" and "button2" and after defining the button
	action there is only one more parameter for the button's style and/or position.  The
	default appearance is a generic "dot" icon and float left alignment.  However you can 
	also float a button right and/or use the following predefined classes which will style 
	your custom buttons with icons that are consistent with the rest of the UI:
	
	file, refresh, checklist, export, save, device, add,
	rotate, zoom, globe, reset, edit, preview
	
	Or you can load your own custom stylesheet and classes to style the buttons however 
	you please.
*/
	
	var ws3_toolbar = [
		['button1','b1','But1',function(){alert('Do File Stuff');},'file'],
		['button1','b2','But2',function(){alert('Save Document');},'left save'],
		['button2','b3','But3',function(){alert('Edit Stuff');},'right edit']
	]

/*	DIALOG CONTENTS
	Custom dialogs are a lot like custom workspaces, except they are available
	in all the webapps, not just Ryuzine Writer.  The method of setting a dialog's
	contents are essentially the same as that of a workspace.  You can use either
	a string to write HTML directly into the dialog, or you can define controls to
	be built via an array, but Dialogs do NOT support Tabs and Sections. Dialogs also
	have one other parameter which allows you to add up to SIX "action" buttons to the end 
	of the dialog for user interaction.  This would normally be used to confirm something,
	but could also be used in Ryuzine Writer to "build" or "submit" with a custom function
	since Dialogs do not have a toolbar.  In the example below, simple dialog content is
	being sent as a string:
*/
	var dialog1_content = '<p>This is dialog content</p>'+
	'<p>Custom Dialogs can optionally also include an "action bar" at the bottom that '+
	'uses the same button creation functions as the Workspace Toolbar, however there is'+
	'a limit of SIX buttons on the bar, though two is usually sufficient.</p>'+
	'<p>If you prefer not to use the Action Bar then code your buttons into the dialog '+
	'content itself</p>';

	var dialog1_actions = [
		['button1','a0','Reset',function(){alert('Resets Something');},'reset left'],
		['button1','a1','Submit',function(){alert('Submit Something');},'save right']
	]

/*	RETURN STATEMENTS
	This is where everything you defined above comes together.  Start with the
	name param and info block, and if your add-on requires another add-on or only 
	works in certain Ryuzine webapps and not others you can limit it with the "requires"
	parameter.  The "requires" parameter is an array of all the requirements for your 
	add-on to function.  It can optionally include "?" followed by a version number like
	this:
	
		requires : ['ryuzinereader?1.0'],
		
	That would restrict the add-on to ONLY function if it was being loaded by
	Ryuzine Reader version 1.0 or greater.  You can also make exclusions like this:
	
		requires : ['!ryuzinerack'],
		
	That would allow your add-on to run in Reader, Press, and Writer but NOT in Rack and
	would have exactly the same effect as defining it this way:
	
		requires : ['ryuzinereader','ryuzinewriter','ryuzinepress'],
*/

	return {
		name : 'sample',
		requires : ['ryuzinewriter'],
		info : {
			name	: "Sample Add-On",
			version	: "1.0",
			author	: "K.M. Hansen",
			url		: "www.kmhcreative.com/labs",
			license	: "MIT",
			about	: "Creates sample panels, controls, etc., add-ons can include."
		},
		
		install : ['sample_install'],

/*	FILE INJECTION
	The "inject" object can contain a "js:[]" and/or "css:[]" array of javascript and/or
	stylesheets to inject.  The format is:
	
		['filepath', position, 'ID', 'requires'],
		
		filepath - 	relative to the file within your add-on folder as a string
		position - 	integer for where the code should be injected (mostly important for
					stylesheets)
					0 : (or omit) appends to the end of the <head> tag
					1 : inject in front of all other files of this type in <head> tag
					2 : inject at end of all other files of this type in <head> tag
					3 : inject in front of a named dependency of this file (defined by 'requires' param)
					4 : inject after named dependency of this file (defined by 'requires' param)
					5 : inject at the end of <body> tag instead of in <head> tag
					
		ID		 -	optional string with a unique identifier for the tag created by the injection.
					
		requires -	filename of a dependency, optionally with version number.
	
		If the dependency is missing your file will still be injected, but at the default location
		at the end of the <head> tag, but your add-on may not function correctly and generate errors
		(but it is still injected to help you debug your add-on, if it is truly dependent on the other
		file consider bundling it WITH your add-on and injecting it yourself).
		
		Below you can see this add-on injects a single stylesheet, and declares to other add-ons
		that this is version "1.0" (in case other add-ons were dependent on it).  The position of
		the injection is at the end of the <head> tag (after all other stylesheets) and the <link>
		tag will have an id="sample" so it can be easily referenced by javascript.
*/	
	
		inject : {
			css:[
				['css/sample.css?1.0',0,'sample']
			]
		},

/*	UI BUILDER
	This is the workhorse of the new Add-On system, allowing you to easily add all sorts of
	custom elements to the user interface.  Inside a "ui:{}" object you define arrays of
	elements.  Each of them is explained after the code block:
*/

		ui : {
			workspaces : [
				['sample1',label+'1',ws1_content],
				['sample2',label+'2',ws2_content],
				['sample3',label+'3 Tabbed',ws3_content,ws3_toolbar]
			],
			panels : [
				['style1','zoop','Sample Panel1','right'],
				['style1','harp','Sample Panel2','left']
			],
			dialogs : [
				['dialog1','Dialog One',dialog1_content,dialog1_actions,1,1]
			],
			controls : [
				['toggle','tog1',label,function(){RYU.addon.sample.sampleFunction();},1,1,'sample_zoop_panel'],
				['button1','but1','Button1',function(){RYU.togglePanel('sample_zoop_panel');},0,0],
				['button2','but2','Button2',function(){RYU.togglePanel('sample_harp_panel');},0,0],
				['button3','but3','Button3',function(){},0,0],
				['button4','but4','Button4',function(){},0,0],
				['drop','sel1','Select One',function(){},[ ['0','Zero'],['1','One',1],['2','Two'] ],0],
				['radio','radio1','Off',function(){},1,0,,'myradio'],
				['radio','radio2','On',function(){},0,0,,'myradio'],
				['checkbox','box1','Item 1',function(){},0,0,'','chklist'],
				['checkbox','box2','Item 2',function(){},['dog',1],0,'','chklist'],
				['list','lst1','List',function(){},[ ['0','Cat',1],['1','Dog'],['2','Bird'] ],0],
				['multi','multi1','Multilist',function(){},[ ['0','Lions',1],['1','Tigers',1],['2','Bears'],['3','Oh My'] ],0]
			]
		},
		
/*	ui:workspaces
	This only works in Ryuzine Writer, since it is the only webapp with workspaces.  A single
	add-on can create as many workspaces as it needs.  The format for declaring them is pretty
	simple:
	
		['ID', 'Label', 'content', 'toolbar']
		
		ID		-	a unique identifier for this workspace
		
		Label	-	a string defining the name of the workspace as it appears in the bar
					at the top of Ryuzine Writer.
		
		content	-	a string or array defining the content of the custom workspace
		
		toolbar	-	an array defining the buttons associated with this workspace that will
					appear in the toolbar at the top of Ryuzine Writer.
					
	ui:panels
	Panels work in all the webapps, but keep in mind you'll need some way for users to open 
	and close your custom panels, so you'll need to either add a button for that purpose to
	your custom workspace or custom dialog or add it to the main Options Panel.  The format
	for panels is:
	
		['style', 'ID', 'Title', 'position']
		
		style	 - 	one of three possible styles for the panel:
					'style1' - like the Reader Table of Contents panel
					'style2' - like the Options Panel
					'style4' - like the Reader Share Panel
					
		ID		 -	a unique identifier for this custom panel
		
		Title	 -	string setting the Title at the top of the panel
		
		position -	string setting the position of the custom panel as "top," "left,"
					"right," or "bottom."  The default positions of each style are:
					style1 = left
					style2 = right
					style3 = bottom

	ui:dialogs
	Dialogs allow you to present information to the user and/or get their input.  They 
	serve essentially the same function as the browser's built-in "alert" and "input" and 
	"confirm" dialogs, but with full HTML and CSS so they look better and more consistent 
	with the rest of the webapp.
	
		['ID', 'Title', contents, action, persists, hide]
		
		ID		 -	A unique identifier for this custom dialog
		
		Title	 -	string setting the Title at the top of the dialog
		
		contents -	string that writes the contents of the dialog
		
		action	 -	(optional) An array of Action Buttons and the functions they perform,
					given in the same format as the Workspace Toolbar and limited to only
					button1 and button2 control types.  You are also limited to a maximum 
					of SIX Action Buttons, any extras will be discarded.
		
		persist	 -	(optional) custom dialogs are normally called into being on demand and 
					removed from the DOM when closed.  Set the persist parameter to "1" and 
					your dialog will not be removed from the DOM once it is created.  If 
					some other part of your add-on needs to get values from your dialog even 
					when the dialog is not open you would need to make sure it persists.
					
		hide	 - (optional) This param only works in Writer, but it adds an "action" at the 
					bottom of the dialog saying "Do not show this again" which, if checked,
					prevents the dialog being shown again.  Which dialogs are hidden are stored 
					in a Cookie file.  This setting can be over-ridden in Writer by going to
					the "Options" panel and turning on "Show All Dialogs."  Note that, because 
					of the space this takes up, you are limited to only TWO additional Action
					Buttons at the bottom of the dialog instead of six.

	ui:controls
	Once you've created a custom Panel or Dialog or Workspace you'll probably want to add
	custom controls to it.  The UI Builder has a system for constructing custom controls
	in the same fashion as the built-in Options.  The format is as follows:		
			
		[‘type’,’id’,’label’,action,value,cookie,location,name]

	Controls are created in the order your define them.  The allowable parameters are as follows:
	
		type : any of these types can be created this way:
			Buttons come in 4 types:
				button1 - standard button of Type 1
				button2 - a Type 2 button (like Type 1 but some other color scheme)
				button3 - wide button (like on the “Views” panel)
				button4 - wide button (like Type 3 but some other color scheme)
			toggle - standard toggle switch
			radio - standard radio button
			checkbox - standard check box
			text - if you need some informational text, or if you include an “action” it will be a link with that action.
			select - creates a standard select box
			drop - creates a fancy droplist select box
			list - creates a list from which one item can be selected.
			multi - creates a list from which multiple items may be selected.
		id - the unique identifier for this option
		label - the text on or next to the option
		action - the function triggered by the option (if any)
		value - the initial value(s) of the option as an integer, string, or array (in the case of select, list, multi).
		cookie - whether or not to store the user preference for this in a cookie or not
		location - where to insert this option (Options Panel is the default location)
		name - use to “gang” radio buttons or checkboxes together as part of a group from which only 1 can be selected.
	
	Note that you can define controls for a Workspace within the "ui:workspace" content itself, or you can write
	the controls into the workspace after you've defined it.

	CUSTOM FUNCTIONS
	Defining your custom functions is easy, just set your function as the return value of an object.
	You would call the function below with: RYU.addon.sample.sampleFunction();
	
	Note that it also makes use of a configuration value that was created by the ui:controls first item,
	which creates a toggle switch with the ID "tog1" - in order to prevent variable collisions between 
	add-ons these ID values are always prepended with the add-on's name, and it is an "option" so it also
	gets a "opt" suffix, so the actual ID on the toggle switch is "opt_sample_tog1" and it sets a config
	variable "RYU.config.sample_tog1" the value of which is being retrieved and displayed in an alert box.
	The actual value is either a "0" or a "1" and is set by the RYU.toggleOptSwitch() function and stored
	in a cookie.

*/	
		
		sampleFunction : function() {
			alert('Switch tog1 setting RYU.config.sample.tog1 = '+RYU.config.sample_tog1);
		},
		actions : function() {
			/* 	this can be any number of functions you want to run automatically
				AFTER the rest of the Add-On object has been initialized.  Regardless
				of where you put the "actions" object, it will always be the LAST
				item of an Add-On to run (though be aware if you are addressing any
				DOM elements added by the add-on itself you may need to use a timeout
				in order to make sure the element exists before you attempt to manipulate
				the element.  The "action" object should ALWAYS be a function.
			*/
			alert('running post add-on init actions...');
		}
	}
}()
);