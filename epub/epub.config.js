/*
name	: "ePub Builder",
version	: "0.3",
author	: "K.M. Hansen",
url		: "http://www.kmhcreative.com/labs",
license	: "MIT",
about	: "Converts Ryuzine publications to ePub Format"
	
	*INSTALLATION:
	please read the README.TXT file in the package folder.
	
	* NOTES:
	This is an add-on for Ryuzine Writer which adds the option of
	exporting your publication in "epub" format.
*/

RYU.addon.register(function(){
	RYU.config.epub2 = 1;	
		var epub_builder_contents = 	''+
		'<form id="epub_form" class="input_screens" style="top:0;">'+
		'<div class="config_page">\n'+
		'<table class="table" style="width:100%;">\n'+
		'	<tr>\n'+
		'	<td><span class="l10n">Title</span>:</td><td><input type="text" id="epub_title"/></td>'+
		'	<td rowspan="15" id="epub_auto"><button type="button" onclick="RYU.addon.epub.resetForm();RYU.addon.epub.setFormData();" class="l10n">Auto Fill</button></td>\n'+
		'	</tr><tr>\n'+
		'	<td><span class="l10n">Author</span>:</td><td><input type="text" id="epub_creator"/></td>'+
		'	</tr><tr>\n'+
		'	<td><span class="l10n">Publisher</span>:</td><td><input type="text" id="epub_publisher"/></td>'+
		'	</tr><tr>\n'+
		'	<td><span class="l10n">Copyright</span>:</td><td><input type="text" id="epub_rights"/><br/>'+
		'	<small><em class="l10n">Either copyright notice or copyleft license info</em></small>'+
		'	</td></tr><tr>\n'+
		'	<td><span class="l10n">Publication Date</span>:</td><td><input type="text" id="epub_pubdate"/> <small>YYYY-MM-DD</small></td>'+
		'	</tr><tr>\n'+
		'	<td><span class="l10n">Image Folder</span>:</td><td><em>/images/</em>\n'+
		'	<select id="epub_images">\n'+
		'	</select><input id="epub_image_refresh" type="button" value="Refresh List" onclick="document.getElementById(\'build_epub_frame\').src=\'<html></html>\';document.getElementById(\'build_epub_frame\').src=\'ryuzinewriter/addons/epub/build_epub.php\';RYU.addon.epub.imageList();"/>\n'+
		'</td>\n'+
		'	</tr><tr>\n'+
		'	<td><span class="l10n">Cover Image</span> <em class="l10n">(optional)</em></td><td><input type="text" id="epub_cover" onchange="if(document.getElementById(\'epub_images\').value==\'\'){alert(\'You must choose an images folder to set a cover image!\');};"/></td>'+
		'	</tr><tr>\n'+
		'	<td><span class="l10n">Unique ID</span>:</td><td><input type="text" id="epub_id"/><br/>'+
		'	<small><em class="l10n">or URL of either Ryuzine version, download link, or information page about publication</em></small>'+
		'	</td></tr><tr>\n'+
		'	<td><span class="l10n">Language Code</span>:</td><td>'+
		'		<select id="epub_lang">'+
		''+document.getElementById('natLang').innerHTML+''+
		'		</select>'+
		'	</td></tr><tr>\n'+
		'	<td><span class="l10n">Issue Stylesheet</span>:</td><td><input type="text" id="epub_css" /></td>'+
		'	</tr><tr>\n'+
		'	<td colspan="2"><input type="checkbox" checked id="epub_toc"> <span class="l10n">Insert Table of Contents Page into publication</span></td>'+
		'	</tr><tr>\n'+
		'	<td colspan="2"><input type="checkbox" id="epub_fonts"> <span class="l10n">Include Fonts folder (may cause validation to fail)</span></td>'+
		'	</tr><tr>\n'+
		'	<td><span class="l10n">Keywords</span>:<br/><small><em class="l10n">(optional comma-separated list)</em></small></td>'+
		'	<td><textarea id="epub_subject"></textarea></td>'+
		'	</tr><tr>\n'+
		'	<td><span class="l10n">Description</span> <em class="l10n">(optional)</em>:</td>'+
		'	<td><textarea id="epub_description"></textarea></td>'+
		'	</tr><tr><td colspan="2"><input type="checkbox" id="epub_flush"> <span class="l10n">DELETE all old .epub files from server</span></td>'+
		'	</tr><tr><td colspan="3">'+	
		'	<p><strong class="l10n">Output Console</strong></p>'+
		'	<iframe id="build_epub_frame" scrolling="yes"  src="ryuzinewriter/addons/epub/build_epub.php" style="width:100%;"></iframe>'+
		'</td></tr><tr>\n'+
		'<td ';
		if (RYU.config.epub2==0) {
		epub_builder_contents=epub_builder_contents+'style="display:none;"';
		} else {}
		epub_builder_contents=epub_builder_contents+'><input type="checkbox" id="epub_version" /> ePub 2.0 (<em class="l10n">experimental</em>)</td></tr>\n'+
		'</table>\n'+
		'</div>\n</form>';

				
		var epub_buttons = [
			['button1','clearform','Reset',function(){RYU.addon.epub.resetForm();},'left reset'],
			['button2','submitform','Build',function(){RYU.addon.epub.setEpubData();},'right build']
		];
		
		var modal1 = RYU._lc("No images sub-folder is set!  No images will be included in ePub.","epub");
		var modal2 = RYU._lc("Cover image filename extension indicates it is NOT an image file!","epub");
		
		if (RYU.addon.localize) {
			var lang = ['lang/addon_'+RYU.config.language+'.js'];
		} else {
			var lang = '';
		}
				
	return {
		name : 'epub',
		requires : ['ryuzinewriter'],
		info : {
			name	: "ePub Builder",
			version	: "0.3",
			author	: "K.M. Hansen",
			url		: "http://www.kmhcreative.com/labs",
			license	: "MIT",
			about	: "Converts Ryuzine publications to ePub Format"
		},

		inject : {
			js :[
				lang
			],
			css:[
				['css/epub.css',0,'epub_builder_css']
			]
		},

		ui : {
			workspaces : [
				['epub','ePub Export',epub_builder_contents,epub_buttons]
			]
		},
	// Reset ePub Builder Form
		resetForm : function(){
			document.getElementById('epub_images').value = '';
			document.getElementById('epub_cover').value = '';	
			document.getElementById('epub_css').value = '';
			document.getElementById('epub_creator').value = '';
			document.getElementById('epub_lang').value = 'en';
			document.getElementById('epub_title').value = '';
			document.getElementById('epub_rights').value = '';
			document.getElementById('epub_publisher').value = '';
			document.getElementById('epub_id').value = '';
			document.getElementById('epub_pubdate').value = '';		
			document.getElementById('epub_subject').value = '';
			document.getElementById('epub_description').value = '';
			document.getElementById('epub_toc').checked = true;
			document.getElementById('epub_fonts').checked = false;
			document.getElementById('epub_flush').checked = false;
			document.getElementById('epub_version').checked = false;
		},
		
	// Populate Image Folder List //
		imageList : function() {
		document.getElementById('epub_image_refresh').value = 	'Updating....';
		setTimeout(function(){
			var files = document.getElementById('build_epub_frame').contentWindow.images;
			var filebox = '<option value="" selected>No Images</option>\n';
			if (files.length > 0) {
				for (var f=0; f < files.length; f++) {
					filebox = filebox + '<option>'+files[f]+'</option>\n';
				}
			}
			document.getElementById('epub_images').innerHTML = filebox;
			document.getElementById('epub_image_refresh').value = 'Refresh List';
			},1000);
		},
		/*	Shared Pull Data - this may look a little overbuilt but it should be
			backwards-compatible to the oldest Ryuzine files Writer can still open.
			A future version will be able to look for "unique" elements by ID alone.
			User-entered data in ePub form is preferred over data pulled from document.
		*/
		
		pullData : function(section) {
			var sourceFile = document.getElementById('sourceframe').contentWindow.document;
			var pull = '';
			switch(section) {
				case "splashTitle" :
				if (document.getElementById('epub_title').value != '') {	// prefer user value
					pull = document.getElementById('epub_title').value;
				} else if (document.getElementById('my_doc_title').value != '') {	// from DocProps
					pull = document.getElementById('my_doc_title').value;
				} else if (sourceFile.getElementsByClassName('splash_title').length > 0 ) { // Look for generic version
					pull = sourceFile.getElementsByClassName('splash_title')[0].innerHTML.replace(/(<img("[^"]*"|[^\/">])*)>/g, "$1/>"); // Only grab 1st
				} else if (sourceFile.getElementById('splash_title')) { // Look for ID version
					pull =sourceFile.getElementById('splash_title').innerHTML.replace(/(<img("[^"]*"|[^\/">])*)>/g, "$1/>");
				} else if (sourceFile.getElementsByClassName('splash-title').length > 0 ) { // look for IE Export version
					pull =sourceFile.getElementsByClassName('splash-title')[0].innerHTML.replace(/(<img("[^"]*"|[^\/">])*)>/g, "$1/>");
				} else if (sourceFile.getElementsByTagName('title').length > 0) {	// use the actual title tag content
					pull = sourceFile.getElementsByTagName('title')[0].innerHTML.replace(/(<img("[^"]*"|[^\/">])*)>/g, "$1/>");
				} else {
					pull = "My Magazine";
				};
				// Make sure Title is not empty //
				if (pull=="") {
					pull = "My Magazine";
				};
				break;
				case "splashScreen" :
				// for some reason image is not getting closed for XML so deconstruct and rebuild it properly
				if (sourceFile.getElementsByClassName('splash_screen').length > 0 ) {
					pull = sourceFile.getElementsByClassName('splash_screen')[0].innerHTML.replace(/(<img("[^"]*"|[^\/">])*)>/g, "$1/>");
				} else if (sourceFile.getElementById('splash_screen')) { // Look for ID version					
					pull = sourceFile.getElementById('splash_screen').innerHTML.replace(/(<img("[^"]*"|[^\/">])*)>/g, "$1/>");
				} else if (sourceFile.getElementsByClassName('splash-screen').length > 0 ) { // Look for ID Export version 
					pull = sourceFile.getElementsByClassName('splash_screen')[0].innerHTML.replace(/(<img("[^"]*"|[^\/">])*)>/g, "$1/>");
				} else {
					pull = "";
				};				
				break;
				case "offLine" :
				if (document.getElementById('epub_id').value != '') {
					pull = document.getElementById('epub_id').value;
					if (pull.length == 36) { RYU.addon.epub.id_scheme = 'UUID';
					} else { RYU.addon.epub.id_scheme = 'URI';}
				} else if ( sourceFile.getElementsByClassName('offline').length > 0 ) { // Look for generic version first
					pull = sourceFile.getElementsByClassName('offline')[0].innerHTML; // Only grab 1st one
					RYU.addon.epub.id_scheme = 'URI';
				} else if ( sourceFile.getElementById('offline') ) {	// Favor ID if available
					pull = sourceFile.getElementById('offline').innerHTML;
					RYU.addon.epub.id_scheme = 'URI';
				} else { 
					pull = ""; 
				}	// Assume no offline is set
				// Error catch empties //
				if (pull == "") {
					pull = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
						var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
						return v.toString(16);
					});
					RYU.addon.epub.id_scheme = 'UUID';
				};
				break;
				case "issueCSS" :
				if (document.getElementById('epub_css').value != '') {
					pull = document.getElementById('epub_css').value;
				} else if (document.getElementById('edition1').checked) {
					pull = document.getElementById('editionName').value;
				} else {
					pull = "thisissue.css";
				};
				break;				
				case "creator" :
				if (document.getElementById('epub_creator').value != '') {
					pull = document.getElementById('epub_creator').value;
				} else if (document.getElementById('my_doc_author').value != '') {
					pull = document.getElementById('my_doc_author').value;
				} else if (sourceFile.getElementsByName('author').length > 0) {
					pull = sourceFile.getElementsByName('author')[0].content;
				} else {
					pull = '';
				};
				break;
				case "copyRight" :
				if (document.getElementById('epub_rights').value != '') {
					pull = document.getElementById('epub_rights').value.replace(/&(?=\s)/g, "&amp;");
				} else if (document.getElementById('my_doc_copyright').value != '') {
					pull = document.getElementById('my_doc_copyright').value.replace(/&(?=\s)/g, "&amp;");
				} else if (sourceFile.getElementsByClassName('copy_right').length > 0) {
					pull = sourceFile.getElementsByClassName('copy_right')[0].innerHTML.replace(/&(?=\s)/g, "&amp;");
				} else if (sourceFile.getElementById('copy_right')) {
					pull = sourceFile.getElementById('copy_right').innerHTML.replace(/&(?=\s)/g, "&amp;");
				} else if (sourceFile.getElementsByClassName('copy-right').length > 0) { // look for ID Export
					pull = sourceFile.getElementsByClassName('copy-right')[0].innerHTML.replace(/&(?=\s)/g, "&amp;");
				} else { pull = ""; };
				break;
				case "date" :
				if (document.getElementById('epub_pubdate').value != '') {
					pull = document.getElementById('epub_pubdate').value;
				} else {
					// assume publication date is today
					var today = new Date();
					var DD = today.getDate();
					var MM = today.getMonth()+1; //January is 0!
					var YYYY = today.getFullYear();
					if(DD<10){DD='0'+DD} if(MM<10){MM='0'+MM} var today = YYYY+'-'+MM+'-'+DD;
					pull = today;
				}
				break;
				case "subject" :
				if (document.getElementById('epub_subject').value != '') {
					pull = document.getElementById('epub_subject').value;
				} else if (document.getElementById('my_doc_keywords').value != '') {
					pull = document.getElementById('my_doc_keywords').value;
				} else if (sourceFile.getElementsByName('keywords').length > 0) {
					pull = sourceFile.getElementsByName('keywords')[0].content;
				} else {
					pull = '';
				}
				break;
				case "summary" :
				if (document.getElementById('epub_description').value != '') {
					pull = document.getElementById('epub_description').value;
				} else if (document.getElementById('my_doc_summary').value != '') {
					pull = document.getElementById('my_doc_summary').value;
				} else if (sourceFile.getElementById('summary')!=null) {
					pull = sourceFile.getElementById('summary').textContent || sourceFile.getElementById('summary').innerText;
				} else if (sourceFile.getElementsByName('description').length > 0) {
					pull = sourceFile.getElementsByName('description')[0].content;
				} else {
					pull = '';
				}
				break;
				
				case "imageFolder" :
				if (document.getElementById('epub_images').value != '') {
					pull = document.getElementById('epub_images').value;
				} else if (sourceFile.getElementsByClassName('page_box').length > 0) { 
					if (sourceFile.getElementsByClassName('page_box')[0].getElementsByTagName('img').length > 0) {
						var pull_img = sourceFile.getElementsByClassName('page_box')[0].getElementsByTagName('img')[0].getAttribute('src');
							pull_img = pull_img.split('images/');
							pull_img = pull_img[1];
							pull_img = pull_img.split('/');
						pull = pull_img[0];
					} else {
						pull = "";
					}
				} else { pull = ""; }
				break;
				case "cover_image" :
				if (document.getElementById('epub_cover').value != '') {
					pull = document.getElementById('epub_cover').value;
				} else {
					// look through all images, find the first one with "cover" in the file name
					var all_pics = sourceFile.getElementsByTagName('img');
					var src = [];
					for (var i=0; i < all_pics.length; i++) {
						 var src = all_pics[i].src.split('images/')[1].split('/');
						 if (src[src.length-1].match(/cover/gi)) {
						 	pull = src[src.length-1];
						 	break;
						 } 
					}
					if (pull=='' && sourceFile.getElementsByClassName('page_box').length > 0) {	// yes there are pages
						if (sourceFile.getElementsByClassName('page_box')[0].getElementsByTagName('img').length > 0) {	// yes there are images on page0
							src = sourceFile.getElementsByClassName('page_box')[0].getElementsByTagName('img')[0].src.split('images/')[1].split('/');
							pull = src[src.length-1];
						} else {
							pull = "";
						}
					}
				};
				// get the file type via the extension to make sure it is an image
				var ext = pull.split('.');
					ext = ext[(ext.length-1)];
				if (ext=="jpg") { RYU.addon.epub.ext = "jpeg";}
				else if (ext=="svg") { RYU.addon.epub.ext = "svg+xml"; }
				else if (ext!="gif" && ext!="png") {
					alert(modal1);
					pull = ""; // error handling
				}	
				break;
				default :
				pull = '';
			}
			return pull;			
		},		
	/* Populates ePub Builder Form with Data */	
		setFormData : function() {
			var sourceFile = document.getElementById('sourceframe').contentWindow.document;
			RYU.addon.epub.offLine = RYU.addon.epub.pullData('offLine');
			// splash_title --> Title //
			RYU.addon.epub.splashTitle = RYU.addon.epub.pullData('splashTitle');
			// Creator/Author		 //
			RYU.addon.epub.creator = RYU.addon.epub.pullData('creator');	
			// copy_right --> rights //
			RYU.addon.epub.copyRight = RYU.addon.epub.pullData('copyRight');
			// Issue Stylesheet
			RYU.addon.epub.issueCSS = RYU.addon.epub.pullData('issueCSS');
			// Publication Date
			RYU.addon.epub.date = RYU.addon.epub.pullData('date');
			// Keywords List
			RYU.addon.epub.subject = RYU.addon.epub.pullData('subject');
			// Summary
			RYU.addon.epub.description = RYU.addon.epub.pullData('description');
			// Custom Stylesheet			
			if (document.getElementById('customCSSadd').checked) {
				RYU.addon.epub.customCSSname = document.getElementById('customCSSfile_name').value;
			} else {
				RYU.addon.epub.customCSSname = '';
			}
			// Image Folder Name
			RYU.addon.epub.imageFolder = RYU.addon.epub.pullData('imageFolder');
			document.getElementById('epub_images').value = RYU.addon.epub.imageFolder;
			// Cover Image
			RYU.addon.epub.cover_image = RYU.addon.epub.pullData('cover_image');
			document.getElementById('epub_cover').value = RYU.addon.epub.cover_image;	
			if (document.getElementById('epub_images').value == "") { 
				alert(modal2);
			}
			// Populate Form
			document.getElementById('epub_css').value = RYU.addon.epub.issueCSS;
			document.getElementById('epub_creator').value = RYU.addon.epub.creator;
			document.getElementById('epub_lang').value = document.getElementById('natLang').value;
			document.getElementById('epub_title').value = RYU.addon.epub.splashTitle;
			document.getElementById('epub_rights').value = RYU.addon.epub.copyRight;
			document.getElementById('epub_publisher').value = 'Created with Ryuzine Writer';
			document.getElementById('epub_id').value = RYU.addon.epub.offLine;
			document.getElementById('epub_pubdate').value = RYU.addon.epub.date;		
			document.getElementById('epub_subject').value = RYU.addon.epub.subject;
			document.getElementById('epub_description').value = RYU.addon.epub.description;
		},
		
		/* Sets the ePub Data to be written */
		
		setEpubData : function() {
		function isEven(value) {
			return (value%2 == 0);
		}
		var sourceFile = document.getElementById('sourceframe').contentWindow.document;
		// Offline URL --> Unique ID //
		RYU.addon.epub.offLine = RYU.addon.epub.pullData('offLine');
		// splash_screen --> Inside Title Page //
		RYU.addon.epub.splashScreen = RYU.addon.epub.pullData('splashScreen');
		// splash_title --> Title //
		RYU.addon.epub.splashTitle = RYU.addon.epub.pullData('splashTitle');
		// section_head --> Page Titles
		RYU.addon.epub.sectionHeads = sourceFile.getElementsByClassName('section_head');
			if ( RYU.addon.epub.sectionHeads.length == 0) { RYU.addon.epub.sectionHeads = sourceFile.getElementsByClassName('section-head'); }
		RYU.addon.epub.sectionHead = [];
			for (var x=0; x<RYU.addon.epub.sectionHeads.length; x++) {
				RYU.addon.epub.sectionHead[x] = RYU.addon.epub.sectionHeads[x].innerHTML;
				if (RYU.addon.epub.sectionHead[x] == '' || RYU.addon.epub.sectionHead[x] == null) {
					if (x==0) { var secTitle = 'Front Cover';} 
					else if (x==RYU.addon.epub.sectionHeads.length-1) { var secTitle = 'Back Cover';}
					else {var secTitle = 'Page '+x;}
					RYU.addon.epub.sectionHead[x] = secTitle;
				}
			}
		// pageBoxes --> Individual Page Contents //
		RYU.addon.epub.pageBoxes = sourceFile.getElementsByClassName('page_box');
			if (RYU.addon.epub.pageBoxes.length == 0) { RYU.addon.epub.pageBoxes = sourceFile.getElementsByClassName('group');}
		if (!isEven(RYU.addon.epub.pageBoxes.length)) {
			// Number of Pages HAS to be even //
			RYU.addon.epub.pagecount = RYU.addon.epub.pageBoxes.length+1;
			RYU.addon.epub.sectionHeads = RYU.addon.epub.sectionHeads.length+1;
			} else {
			RYU.addon.epub.pagecount = RYU.addon.epub.pageBoxes.length;
			RYU.addon.epub.sectionHeads = RYU.addon.epub.sectionHeads.length;
			}
		RYU.addon.epub.pageBox = [];
		RYU.addon.epub.pageBoxColumns = [];
			for (var x=0; x<RYU.addon.epub.pagecount; x++) {
				if (RYU.addon.epub.pageBoxes[x]==undefined) {
				// If a page needed insertion put a message that it is blank intentionally //
				RYU.addon.epub.sectionHead[x] = 'Page '+x;
				RYU.addon.epub.pageBox[x] = '<p>This Page Was Intentionally Left Blank</p>';
				RYU.addon.epub.pageBoxColumns[x] = "col1";
				} else {
					RYU.addon.epub.pageBox[x] = RYU.addon.epub.pageBoxes[x].innerHTML;
					// Find the columns for this page //
					if (RYU.addon.epub.pageBoxes[x].className.length > 8 ) { 	// look for colsx class
						var findcount = RYU.addon.epub.pageBoxes[x].className.split(" ");
						RYU.addon.epub.pageBoxColumns[x] = findcount[1]; //set Target to number indicated
					}
					else {
						RYU.addon.epub.pageBoxColumns[x] = "col1";
					}
				}
			}
		// copy_right --> rights //
		RYU.addon.epub.creator = RYU.addon.epub.pullData('creator');
		RYU.addon.epub.publisher = document.getElementById('epub_publisher').value;
		RYU.addon.epub.copyRight = RYU.addon.epub.pullData('copyRight');
		RYU.addon.epub.lang = document.getElementById('epub_lang').value;
		RYU.addon.epub.subject = RYU.addon.epub.pullData('subject');
		RYU.addon.epub.description = RYU.addon.epub.pullData('description');
		RYU.addon.epub.date = RYU.addon.epub.pullData('date');
		RYU.addon.epub.issueCSS = RYU.addon.epub.pullData('issueCSS');
		// inPageCSS --> XHTML style //
		RYU.addon.epub.inPageCSS = "";
		if (sourceFile.getElementsByTagName('style').length > 0) {
			RYU.addon.epub.inPageCSS = sourceFile.getElementsByTagName('style')[0].innerHTML;
		} else { 
			RYU.addon.epub.inPageCSS = "";
		}
		RYU.addon.epub.imageFolder = RYU.addon.epub.pullData('imageFolder');
		RYU.addon.epub.cover_image = RYU.addon.epub.pullData('cover_image');
		if (document.getElementById('epub_flush').checked) {
			if(confirm('Are you sure you want to permenantly DELETE all the old .epub files on the server?\nTHIS CANNOT BE UNDONE!')) {
				RYU.addon.epub.flush = 1;
			} else {
			document.getElementById('epub_flush').checked = false;
			RYU.addon.epub.flush = 0;
			}
		}
		// if no imageFolder cannot include cover image either //
		if (document.getElementById('epub_fonts').checked) {
			RYU.addon.epub.fonts = 1;
		} else { RYU.addon.epub.fonts = 0; }
		if (document.getElementById('epub_version').checked) {
		RYU.addon.epub.epub2_content_opf_Build();
		} else {
		RYU.addon.epub.epub3_nav_end_Build();
		}
		
	},
			
	

	/*	===================
		EPUB 2 OUTPUT
		===================
	*/

		// content.opf is a required epub file //
		epub2_content_opf_Build : function(){
			RYU.addon.epub.content_opf_a='<?xml version="1.0"?>\n'+
			'\n'+
			'<package xmlns="http://www.idpf.org/2007/opf" unique-identifier="dcidid" version="2.0">\n'+
			'\n'+
			'   <metadata xmlns:dc="http://purl.org/dc/elements/1.1/"\n'+
			'      xmlns:dcterms="http://purl.org/dc/terms/"\n'+
			'      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n'+
			'      xmlns:opf="http://www.idpf.org/2007/opf">\n'+
			'      <dc:title>'+RYU.addon.epub.splashTitle+'</dc:title>\n'+
			'      <dc:language xsi:type="dcterms:RFC3066">'+RYU.addon.epub.lang+'</dc:language>\n'+
			'      <dc:identifier id="dcidid" opf:scheme="'+RYU.addon.epub.id_scheme+'">'+RYU.addon.epub.offLine+'</dc:identifier>\n'+
			'      <dc:subject>'+RYU.addon.epub.subject+'</dc:subject>\n'+
			'      <dc:description>'+RYU.addon.epub.description+'</dc:description>\n'+
			'      <dc:relation>'+RYU.addon.epub.offLine+'</dc:relation>\n'+
			'      <dc:creator>'+RYU.addon.epub.creator+'</dc:creator>\n'+
			'      <dc:publisher>'+RYU.addon.epub.publisher+'</dc:publisher>\n'+
			'      <dc:rights>'+RYU.addon.epub.copyRight+'</dc:rights>\n'+
			'	   <dc:date opf:event="epub-publication">'+RYU.addon.epub.date+'</dc:date>\n'+
			'   </metadata>\n'+
			'\n'+
			'   <manifest>\n';
			if (RYU.addon.epub.cover_image!="" && RYU.addon.epub.imageFolder != "") {
			RYU.addon.epub.content_opf_a += ''+
			'		<item id="cover"       href="cover.xhtml"    media-type="application/xhtml+xml"/>\n'+
			'		<item id="cover-image" href="images/'+RYU.addon.epub.imageFolder+'/'+RYU.addon.epub.cover_image+'" media-type="image/'+RYU.addon.epub.ext+'"/>\n';
			}
			RYU.addon.epub.content_opf_a += ''+
			'      	<item id="ncx"      href="toc.ncx"   media-type="application/x-dtbncx+xml" />\n'+
			'      	<item id="css"      href="css/'+RYU.addon.epub.issueCSS+'"    media-type="text/css" />\n';
			if (RYU.addon.epub.splashScreen != "") {
			RYU.addon.epub.content_opf_a += '      	<item id="title" href="title.xhtml" media-type="application/xhtml+xml" />\n';
			}
			if (document.getElementById('epub_toc').checked) {
			RYU.addon.epub.content_opf_a += '      	<item id="contents" href="contents.xhtml" media-type="application/xhtml+xml" />\n';
			}
			if (RYU.addon.epub.customCSSname != '') {
			RYU.addon.epub.content_opf_a += '		<item id="extra_css" href="css/'+RYU.addon.epub.customCSSname+'" media-type="text/css" />\n';
			}
			for (var x=0; x<RYU.addon.epub.pagecount; x++) {
			RYU.addon.epub.ontent_opf_a += ''+
			'      <item id="part'+x+'"    href="page'+x+'.xhtml"  media-type="application/xhtml+xml" />\n';
			}
			// PHP will build the rest of the manifest section //
			RYU.addon.epub.content_opf_b = '</manifest>\n'+
			'\n'+
			'   <spine toc="ncx">\n';
			if (RYU.addon.epub.cover_image!="" && RYU.addon.epub.imageFolder != "") {
			RYU.addon.epub.content_opf_b += '		<itemref idref="cover" linear="no"/>';
			}
			for (var x=0; x<RYU.addon.epub.pagecount; x++) {
				if (x==1) {
					if (RYU.addon.epub.splashScreen !="") {
					RYU.addon.epub.content_opf_b += '      	<itemref idref="title" />\n';
					}
					if (document.getElementById('epub_toc').checked) {
					RYU.addon.epub.content_opf_b += '      	<itemref idref="contents" />\n';
					}			
				}
			RYU.addon.epub.content_opf_b += '      <itemref idref="part'+x+'" />\n';
			}
			RYU.addon.epub.content_opf_b += '   </spine>\n'+
			'\n'+
			'   <guide>\n';
			if (RYU.addon.epub.cover_image!="" && RYU.addon.epub.imageFolder != "") {
			RYU.addon.epub.content_opf_b += '<reference href="cover.xhtml" type="cover" title="Cover Art"/>';
			}
			RYU.addon.epub.content_opf_b += '      <reference type="text" title="Text" href="page0.xhtml" />\n';
			if (RYU.addon.epub.splashScreen != "") {
			RYU.addon.epub.content_opf_b += '      <reference type="title-page" title="Title Page" href="title.xhtml" />\n';
			}
			if (document.getElementById('epub_toc').checked) {
			RYU.addon.epub.content_opf_b += '      <reference type="toc" title="Table of Contents" href="contents.xhtml" />\n';
			}
			RYU.addon.epub.content_opf_b += '   </guide>\n'+
			'\n'+
			'</package>';	
			RYU.addon.epub.epub2_titlePage_Build();
		},
		// Turn Splash Page Into Title Page //
		epub2_titlePage_Build : function() {
			if (RYU.addon.epub.splashScreen != "") {
				titlePage = '<?xml version="1.0" encoding="UTF-8"?>\n'+
				'<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">\n'+
				'<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">\n<head>\n'+
				'   <title>'+RYU.addon.epub.splashTitle+'</title>\n'+
				'   <link rel="stylesheet" type="text/css" href="css/'+RYU.addon.epub.issueCSS+'" />\n';
				if (RYU.addon.epub.customCSSname != '') {
				RYU.addon.epub.titlePage += '<link rel="stylesheet" type="text/css" href="css/'+RYU.addon.epub.customCSSname+'" />\n';
				}
				if (RYU.addon.epub.inPageCSS != "") {
					RYU.addon.epub.titlePage += '<style type="text/css">'+RYU.addon.epub.inPageCSS+'</style>';
				}		
				RYU.addon.epub.titlePage += '</head>\n'+
				'<body>\n'+
				''+RYU.addon.epub.splashScreen+'\n'+
				'</body>\n'+
				'</html>';
			};
			if (document.getElementById('epub_toc').checked) {
				RYU.addon.epub.epub2_tocPage_Build();
			} else {
				RYU.addon.epub.epub2_xml_page_Build();
			}
		},	
		// Turn Section Heads into Table of Contents Page //
		epub2_tocPage_Build : function() {
				RYU.addon.epub.tocPage = '<?xml version="1.0" encoding="UTF-8"?>\n'+
				'<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">\n'+
				'<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">\n<head>\n'+
				'   <title>'+RYU.addon.epub.splashTitle+'</title>\n'+
				'   <link rel="stylesheet" type="text/css" href="css/'+RYU.addon.epub.issueCSS+'" />\n';
				if (RYU.addon.epub.customCSSname != '') {
				RYU.addon.epub.tocPage += '<link rel="stylesheet" type="text/css" href="css/'+RYU.addon.epub.customCSSname+'" />\n';
				}
				if (RYU.addon.epub.inPageCSS != "") {
				RYU.addon.epub.tocPage += '<style type="text/css">'+RYU.addon.epub.inPageCSS+'</style>';
				}
				RYU.addon.epub.tocPage += '</head>\n'+
				'<body>\n'+
				'<h1>Table of Contents</h1>'+
				'<ul>';
				for (var x=0; x<RYU.addon.epub.sectionHeads; x++) {
					RYU.addon.epub.tocPage += '<li><a href="page'+x+'.xhtml">'+RYU.addon.epub.sectionHead[x]+'</a></li>';
				}
				RYU.addon.epub.tocPage += '</ul>'+
				'</body>\n'+
				'</html>';
				RYU.addon.epub.epub2_xml_page_Build();
		},
		// Turn Page Box Content into XHTML Pages //
		epub2_xml_page_Build : function() {
			for (var x=0; x<RYU.addon.epub.pagecount; x++) {
				RYU.addon.epub.xmlPage[x] = '<?xml version="1.0" encoding="UTF-8"?>\n'+
				'<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">\n'+
				'<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">\n';
				RYU.addon.epub.xmlPage[x] += '<head>\n'+
				'   <title>'+RYU.addon.epub.sectionHead[x]+'</title>\n'+
				'   <link rel="stylesheet" type="text/css" href="css/'+RYU.addon.epub.issueCSS+'" />\n';
				if (RYU.addon.epub.customCSSname != '') {
				RYU.addon.epub.xmlPage[x] += '<link rel="stylesheet" type="text/css" href="css/'+RYU.addon.epub.customCSSname+'" />\n';
				}
				if (RYU.addon.epub.inPageCSS != "") {
				RYU.addon.epub.xmlPage[x] += '<style type="text/css">'+RYU.addon.epub.inPageCSS+'</style>';
				}
				RYU.addon.epub.xmlPage[x] += '</head>\n'+
				'<body>\n'+
				''+RYU.addon.epub.pageBox[x]+'\n'+
				'</body>\n'+
				'</html>';
			}
			if (RYU.addon.epub.cover_image!="") {
			RYU.addon.epub.epub2_cover_page_Build();
			} else {
			RYU.addon.epub.epub2_toc_ncx_Build();
			}
		},

		// Create Cover Document //
		epub2_cover_page_Build : function() {
			RYU.addon.epub.over_page='<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">\n'+
			'<html xmlns="http://www.w3.org/1999/xhtml">\n'+
			'<head>\n'+
			'<title>Cover Art</title>\n'+
			'<style type="text/css"> img { max-width: 100%; } </style>\n'+
			'</head>\n'+
			'<body>\n'+
			'<div id="cover-image">\n'+
			'<img src="images/'+RYU.addon.epub.imageFolder+'/'+RYU.addon.epub.cover_image+'" alt="'+RYU.addon.epub.splashTitle+'"/>\n'+
			'</div>\n'+
			'</body>\n'+
			'</html>';
			RYU.addon.epub.epub2_toc_ncx_Build();
		},	
		epub2_toc_ncx_Build : function() {
			RYU.addon.epub.toc_ncx = ''+
			'<?xml version="1.0"?>\n'+
			'<!DOCTYPE ncx PUBLIC "-//NISO//DTD ncx 2005-1//EN" "http://www.daisy.org/z3986/2005/ncx-2005-1.dtd">\n'+
			'\n'+
			'<ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1">\n'+
			'\n'+
			'   <head>\n'+
			'      <meta name="dtb:uid" content="'+RYU.addon.epub.offLine+'"/>\n'+
			'      <meta name="dtb:depth" content="2"/>\n'+
			'      <meta name="dtb:totalPageCount" content="0"/>\n'+
			'      <meta name="dtb:maxPageNumber" content="0"/>\n'+
			'   </head>\n'+
			'\n'+
			'   <docTitle>\n'+
			'      <text>'+RYU.addon.epub.splashTitle+'</text>\n'+
			'   </docTitle>\n'+
			'\n'+
			'   <navMap>\n';
			var np = 1;
			for (var x=0; x<RYU.addon.epub.sectionHeads; x++) {
				if (x==1) { // See if you need to insert stuff after cover
					if (RYU.addon.epub.splashScreen != "") {
					RYU.addon.epub.toc_ncx += '		<navPoint id="navPoint-1" playOrder="'+np+'">\n'+
					'			<navLabel>\n'+
					'   			<text>Title Page</text>\n'+
					'			</navLabel>\n'+
					'			<content src="title.xhtml"/>\n'+
					'		</navPoint>';
					np = 3; // next navpoint
					}
					if (document.getElementById('epub_toc').checked) {
					RYU.addon.epub.toc_ncx += '		<navPoint id="navPoint-2" playOrder="'+np+'">\n'+
					'			<navLabel>\n'+
					'   			<text>Table of Contents</text>\n'+
					'			</navLabel>\n'+
					'			<content src="contents.xhtml"/>\n'+
					'		</navPoint>';
					if (np==3) {np = 4;} else { np == 3;};
					}			
			
				}
			RYU.addon.epub.toc_ncx += '      <navPoint id="navPoint-'+np+'" playOrder="'+np+'">\n'+
			'         <navLabel>\n'+
			'            <text>'+RYU.addon.epub.sectionHead[x]+'</text>\n'+
			'         </navLabel>\n'+
			'         <content src="page'+x+'.xhtml"/>\n'+
			'      </navPoint>\n';
			np++;
			}
			RYU.addon.epub.toc_ncx += '   </navMap>\n'+
			'</ncx>';
			RYU.addon.epub.epubSubmitform();
		},	
	/* ------------------------
		EPUB 3 OUTPUT
		-----------------------
	*/
		// EPUB 3: Build END (ePub Navigation Document) file  - replaces toc.ncx //
		epub3_nav_end_Build : function() {
			RYU.addon.epub.nav_end='<html 	xmlns="http://www.w3.org/1999/xhtml"\n'+
							'		xmlns:epub="http://www.idpf.org/2007/ops">\n'+
			'<head>\n'+
			'	<title>'+RYU.addon.epub.splashTitle+'</title>\n'+
			'</head>\n'+
			'<body>\n'+
			'	<section epub:type="frontmatter toc">\n'+
			'		<header>\n'+
			'			<h1>Contents</h1>\n'+
			'		</header>\n'+
			'		<nav epub:type="toc" id="toc">\n'+
			'			<ol>\n';
			for (var x=0; x<RYU.addon.epub.sectionHeads; x++) {
				if (x==1) { // See if you need to insert Title and/or TOC after cover
					if (RYU.addon.epub.splashScreen != "") {
						RYU.addon.epub.nav_end += '	<li id="title"><a href="title.xhtml">Title Page</a></li>\n';
					}
					if (document.getElementById('epub_toc').checked) {
						RYU.addon.epub.nav_end += '<li id="toc"><a href="contents.xhtml">Table of Contents</a></li>\n';
					}			
				}
				RYU.addon.epub.nav_end += '<li id="page'+x+'"><a href="page'+x+'.xhtml">'+RYU.addon.epub.sectionHead[x]+'</a></li>\n';
			}
			RYU.addon.epub.nav_end += '			</ol>\n'+
			'		</nav>\n'+
			'	</section>\n'+
			'</body>\n'+
			'</html>';
			RYU.addon.epub.epub3_content_opf_Build();
		},

		epub3_content_opf_Build : function() {
		RYU.addon.epub.content_opf_a='<?xml version="1.0" encoding="utf-8"?>\n'+
		'<package xmlns="http://www.idpf.org/2007/opf" version="3.0" xml:lang="'+RYU.addon.epub.lang+'" unique-identifier="uid">\n'+
		'   <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">\n'+
		'      <dc:title>'+RYU.addon.epub.splashTitle+'</dc:title>\n'+
		'      <dc:language>'+RYU.addon.epub.lang+'</dc:language>\n'+
		'      <dc:identifier id="uid">'+RYU.addon.epub.offLine+'</dc:identifier>\n'+
		'      <dc:subject>'+RYU.addon.epub.subject+'</dc:subject>\n'+
		'      <dc:description>'+RYU.addon.epub.description+'</dc:description>\n'+
		'      <dc:relation>'+RYU.addon.epub.offLine+'</dc:relation>\n'+
		'      <dc:creator>'+RYU.addon.epub.creator+'</dc:creator>\n'+
		'      <dc:publisher>'+RYU.addon.epub.publisher+'</dc:publisher>\n'+
		'      <dc:rights>'+RYU.addon.epub.copyRight+'</dc:rights>\n'+
		'	   <dc:date>'+RYU.addon.epub.date+'</dc:date>\n'+
		'   </metadata>\n'+
		'   <manifest>\n';
		if (RYU.addon.epub.cover_image!="") {
		RYU.addon.epub.content_opf_a += '	  <item id="cover-image" properties="cover-image" href="images/'+RYU.addon.epub.imageFolder+'/'+RYU.addon.epub.cover_image+'" media-type="image/'+RYU.addon.epub.ext+'"/>\n';
		}
		RYU.addon.epub.content_opf_a += ''+
		'     <item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml" />\n'+
		'	  <item href="nav.xhtml" id="nav" media-type="application/xhtml+xml" properties="nav"/>\n'+
		'     <item id="css" 	href="css/'+RYU.addon.epub.issueCSS+'"	media-type="text/css" />\n';
		if (RYU.addon.epub.splashScreen != "") {
			RYU.addon.epub.content_opf_a += '     	<item id="title" href="title.xhtml" media-type="application/xhtml+xml" />\n';
		}
			if (document.getElementById('epub_toc').checked) {
			RYU.addon.epub.content_opf_a += '      	<item id="contents" href="contents.xhtml" media-type="application/xhtml+xml" />\n';
			}
			if (RYU.addon.epub.customCSSname != '') {
			RYU.addon.epub.content_opf_a += '		<item id="extra_css" href="css/'+RYU.addon.epub.customCSSname+'" media-type="text/css" />\n';
			}
			for (var x=0; x<RYU.addon.epub.pagecount; x++) {
			RYU.addon.epub.content_opf_a += '      <item id="part'+x+'"    href="page'+x+'.xhtml"  media-type="application/xhtml+xml" />\n';
			}
		RYU.addon.epub.content_opf_b = '   </manifest>\n'+
		'   <spine>\n';
		if (RYU.addon.epub.cover_image!="") {
		RYU.addon.epub.content_opf_b += '		<itemref idref="cover-image" linear="no"/>';
		}
		RYU.addon.epub.content_opf_b += '	  	<itemref idref="nav" linear="no"/>\n';
		for (var x=0; x<RYU.addon.epub.pagecount; x++) {
			if (x==1) { // see if frontmatter needs insertion 
				if (RYU.addon.epub.splashScreen != "") {
				RYU.addon.epub.content_opf_b += '     <itemref idref="title" />\n';
				}
				if (document.getElementById('epub_toc').checked) {
				RYU.addon.epub.content_opf_b += '      	<itemref idref="contents" />\n';
				}
			}
		RYU.addon.epub.content_opf_b += ''+
		'      <itemref idref="part'+x+'" />\n';
		}
		RYU.addon.epub.content_opf_b += '   </spine>\n'+
		'\n'+
		'   <guide>\n'+
		'      	<reference type="text" title="Text" href="page0.xhtml" />\n';
		if (RYU.addon.epub.splashScreen != "") {
		RYU.addon.epub.content_opf_b += '      <reference type="title-page" title="Title Page" href="title.xhtml" />\n';
		}
		if (document.getElementById('epub_toc').checked) {
		RYU.addon.epub.content_opf_b += '      <reference type="toc" title="Table of Contents" href="contents.xhtml" />\n';
		}
		RYU.addon.epub.content_opf_b  += '   </guide>\n'+
		'\n'+
		'</package>';	
			RYU.addon.epub.epub3_titlePage_Build();
		},
		// Turn Splash Page Into Title Page //
		epub3_titlePage_Build : function() {
			if (RYU.addon.epub.splashScreen != "") {
				RYU.addon.epub.titlePage = '<?xml version="1.0"?>\n'+
				'<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops">\n'+
				'<head>\n'+
				'   <title>'+RYU.addon.epub.splashTitle+'</title>\n'+
				'   <link rel="stylesheet" type="text/css" href="css/'+RYU.addon.epub.issueCSS+'" />\n';
				if (RYU.addon.epub.customCSSname != '') {
				RYU.addon.epub.titlePage += '<link rel="stylesheet" type="text/css" href="css/'+RYU.addon.epub.customCSSname+'" />\n';
				}	
				if (RYU.addon.epub.inPageCSS != "") {
					RYU.addon.epub.titlePage += '<style type="text/css">'+RYU.addon.epub.inPageCSS+'</style>';
				}		
				RYU.addon.epub.titlePage += '</head>\n'+
				'<body>\n'+
				'<div id="splash">'+RYU.addon.epub.splashScreen+'</div>\n'+
				'</body>\n'+
				'</html>';
			};
			if (document.getElementById('epub_toc').checked) {
				RYU.addon.epub.epub3_tocPage_Build();
			} else {
				RYU.addon.epub.epub3_xml_page_Build();
			}
		},	
		// Turn Section Heads into Table of Contents Page //
		epub3_tocPage_Build : function() {
				RYU.addon.epub.tocPage = '<?xml version="1.0"?>\n'+
				'<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops">\n'+
				'<head>\n'+
				'   <title>'+RYU.addon.epub.splashTitle+'</title>\n'+
				'   <link rel="stylesheet" type="text/css" href="css/'+RYU.addon.epub.issueCSS+'" />\n';
				if (RYU.addon.epub.customCSSname != '') {
				RYU.addon.epub.tocPage += '<link rel="stylesheet" type="text/css" href="css/'+RYU.addon.epub.customCSSname+'" />\n';
				}
				if (RYU.addon.epub.inPageCSS != "") {
				RYU.addon.epub.tocPage += '<style type="text/css">'+RYU.addon.epub.inPageCSS+'</style>';
				}
				RYU.addon.epub.tocPage += '</head>\n'+
				'<body>\n'+
				'<div class="page_box">\n'+
				'<h1>Table of Contents</h1>'+
				'<ul>';
				for (var x=0; x<RYU.addon.epub.sectionHeads; x++) {
					RYU.addon.epub.tocPage += '<li><a href="page'+x+'.xhtml">'+RYU.addon.epub.sectionHead[x]+'</a></li>';
				}
				RYU.addon.epub.tocPage += '</ul>\n</div>\n'+
				'</body>\n'+
				'</html>';
				RYU.addon.epub.epub3_xml_page_Build();
		},
		// Turn Page Box Content into XHTML Pages //
		epub3_xml_page_Build : function() {
			for (var x=0; x<RYU.addon.epub.pagecount; x++) {
				RYU.addon.epub.xmlPage[x] = '<?xml version="1.0"?>\n'+
				'<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops">\n'+
				'<head>\n'+
				'   <title>'+RYU.addon.epub.sectionHead[x]+'</title>\n'+
				'   <link rel="stylesheet" type="text/css" href="css/'+RYU.addon.epub.issueCSS+'" />\n';
				if (RYU.addon.epub.customCSSname != '') {
				RYU.addon.epub.xmlPage[x] += '<link rel="stylesheet" type="text/css" href="css/'+RYU.addon.epub.customCSSname+'" />\n';
				}
				if (RYU.addon.epub.inPageCSS != "") {
				RYU.addon.epub.xmlPage[x] += '<style type="text/css">'+RYU.addon.epub.inPageCSS+'</style>';
				}
				RYU.addon.epub.xmlPage[x] += '</head>\n'+
				'<body>\n'+
				'<div id="page'+x+'" class="page_box">\n'+
				''+RYU.addon.epub.pageBox[x]+'\n'+
				'</div>\n'+
				'</body>\n'+
				'</html>';
			}
			RYU.addon.epub.epub2_toc_ncx_Build();  // included for TOC compatibility with some e-readers
		}	,

	// EXPORTICUS! //
		epubSubmitform : function() {	
			// reference to iframe with id 'ifrm'
			var ifrm = document.getElementById('build_epub_frame');
			// reference to window in the iframe
			var win = ifrm.contentWindow;
			// reference to document in iframe
			var doc = ifrm.contentDocument? ifrm.contentDocument: ifrm.contentWindow.document;
			// reference to a form named 'ifrmTest' in iframe
			var form = doc.getElementById('build_epub_form');
			// Port content into form field //
			doc.getElementById('mytitle').value = RYU.addon.epub.splashTitle;
			doc.getElementById('toc_ncx').value = RYU.addon.epub.toc_ncx;
			doc.getElementById('nav_end').value = RYU.addon.epub.nav_end;
			doc.getElementById('cover_page').value = RYU.addon.epub.cover_page;
			doc.getElementById('content_opf_a').value = RYU.addon.epub.content_opf_a;
			doc.getElementById('content_opf_b').value = RYU.addon.epub.content_opf_b;
			doc.getElementById('title_page').value = RYU.addon.epub.titlePage;
			doc.getElementById('toc_page').value = RYU.addon.epub.tocPage;
			doc.getElementById('epub_pages').value = JSON.stringify(RYU.addon.epub.xmlPage);
		
			doc.getElementById('imagefolder_name').value = RYU.addon.epub.imageFolder;
		
			doc.getElementById('cssfile_name').value = RYU.addon.epub.issueCSS;
		
			doc.getElementById('add_customCSS').value = RYU.addon.epub.customCSSname;
			doc.getElementById('epub_flush').value = RYU.addon.epub.flush;
			doc.getElementById('epub_fonts').value = RYU.addon.epub.fonts;
	
			// Submit the form //
			form.submit();			
		},
		// populate imageList drop-down
		actions : function(){
			RYU.addon.epub.imageList();
		},

	/* ePub Variables */
		offLine 		: '',
		splashScreen 	: '',
		splashTitle		: '',
		sectionHeads	: '',
		sectionHead		: '',
		pagecount		: '',
		pageBox			: '',
		pageBoxes		: '',
		pageBoxColumns	: '',
		copyRight		: '',
		inPageCSS		: '',
		issueCSS		: '',
		imageFolder		: '',
		lang			: '',
		subject			: '',
		description		: '',
		creator			: '',
		publisher		: '',
		date			: '',
		cover_image		: '',
		ext				: '',
		id_scheme		: 'UUID',
		customCSSname	: '',
		flush			: 0,
		fonts			: 0,
		toc_ncx			: '',
		content_opf_a	: '',
		content_opf_b	: '',
		titlePage		: '',
		tocPage			: '',
		xmlPage			: [],
		coverImg		: '',
		nav_end			: '',
		cover_page		: ''
		
	}
}()
);
