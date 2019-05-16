ePub Builder Add-On

Version: 0.3
Author: K.M. Hansen
URL: http://www.ryumaru.com/epub/
===============================

Dependencies:
Ryuzine Writer 1.0
PHP File Operations enabled

------------------------------------------------------
This add-on will *attempt* to convert your Ryuzine publication, loaded into or created with Ryuzine Writer, into an "ePub" format publication.

INSTALLATION:

1. After you have downloaded and unzipped the Add-On Package, upload the "epub" folder to your Ryuzine Development Environment with the other Writer add-ons at:

	~/ryuzinewriter/addons/

2. Edit the /ryuzinewriter/writer.config.js file and scroll down to the addons section:

var AddOns = [
	'iscroll', <-- add a comma if there are already other Add-Ons
	'epub' <-- add folder name in single quotes
]

3. Make sure "xfileman" is set to "1" and you are running Ryuzine Writer through a web server with PHP.

HOW TO USE:

1.  Create/Edit/Load your publication in the rich-text editor as you normally would do.

2.  Click on the puzzle-piece button in the navigation toolbar, it will slide in the “Add-Ons” panel, look for the “ePub Builder” button and click on it.

3. A single workspace for "ePub Builder" will slide into view.  There are a small number of text entry fields.

4. Press the "Auto Fill" button in the upper right side of the workspace.  It will automatically pull the information from the document loaded in the rich-text editor and the Output Options panel and populate some of the entry fields with the information.  You can over-ride any of the imported data on this workspace.  These are the fields and what they are for:

Title: This is the name of your publication, it will be incorporated into the resulting filename as well.

Creator: This is most likely going to be you.  Creator = Author.

Publisher: This is also likely going to be you, or you can enter your main website domain, or any other information that will indicate the source of the publication.

Publication Date: If you use the Auto Fill button it will put the current date in the box.  If today is not the publication date you want to show change it before you build the file.

Images Folder: if your document uses images indicate the name of the sub-folder.  If you've added a folder since you ran Ryuzine Writer hit the "Refresh List" button, which should add the new folder to the drop-down list.

Cover Image: The Auto Fill will look at the first page of your Ryuzine publication and, if it finds an image, it will use the first image it finds.  The image *must* be in the Images Folder you selected.

Rights: Typically this will just be your copyright notice, unless you want to enter "copyleft" information, such as a link to a specific Creative Commons license.

Unique ID: All ePub documents have to have a "unique" identifier. If you entered an "offline" URL in your document that will be used.  If the script doesn't find an offline URL it will automatically generate a RFC-4122 compliant UUID number.

Language Code: When you press the Auto Fill button this is automatically synchronized with the Natural Language drop-down list on the Output Options panel.

Stylesheet:  the default is the "thisissue.css" stylesheet, otherwise it will use whatever "custom" stylesheet is set in the Output Options panel.  Your publication may look better if you create a simpler stylesheet just for the e-pub version, and be aware e-reader programs often ignore or over-ride some or all of the rules.  Test view your publication in as many e-pub reader programs as you can!  If it looks bad, tweak your e-pub stylesheet and re-build the publication until it is acceptable.

Insert Table of Contents Page - your publication may or may not need one, check or uncheck to include/exclude.  This is inserted immediately AFTER the front page (cover) of your publication.

Include Fonts folder - any web fonts you have in your development environment will be copied to the epub, keep in mind embedded fonts are poorly supported on e-readers, especially anything other that .otf (open type) or .ttf (truetype) fonts.  iPad technically supports embedding SVG fonts, but they are tricky to employ and impose a huge performance penalty.  If this option is not checked a "/fonts" folder won't even be included in the epub.  If the /fonts folder contains .zip or .js files the build will be stopped and you’ll be prompted to remove the file(s) before building again.  In testing this add-on custom fonts were the single most likely thing to cause an e-pub to fail validation, and no e-readers tested would actually use the fonts.  Consider simply not including them for better compatibility and validation.

Subject: an optional meta data set of comma-separated keywords.

Description: an optional (usually short) description of the publication.

DELETE all old epub files from server - check this box to clear out any prior publications you exported.

If you set any "splash screen" content (for example a splash advertisement) it is turned into a "Title Page" which appears immediately after the front cover and before the Table of Contents (if one is inserted).

5. When you're happy with the settings tap the "Build" button and watch the "Output Console" for error or success messages.  If all goes well you'll have a happy little ePub file at the end of the process.  Note that if there are a lot of images in the file it may take some time to see the file produced.

The "ePub" format is much more limited than that of "Ryuzine" publications.  In fact none of the Ryuzine webapp files will be included.  So what is included in your ePub export?

* Issue-specific stylesheet
* In-Page Styles (if any)
* Custom Additional Stylesheet (if any)
* Simple Styles (if used)
* Your Ryuzine publication will be split into as many individual XHTML files as there are pages.
* The Table of Contents panel will be exported as a separate XHTML document
* The Splash Screen will be turned into a separate XHTML Title Page document
* ONLY the sub-folder of images for this specific publication will be included
* optionally include embedded fonts
* Required additional ePub files (which are auto-generated).

You will need to have "xfileman = 1" in your writer.config.js file to enable PHP File Operations and the directory into which Ryuzine Writer is installed needs to be writable (if you can use the Package Builder you're already good to go).

KNOWN ISSUES:

1. Validation Errors - particularly if exporting as EPUB 2.0 because Ryuzine uses the more relaxed version of HTML5 while EPUB 2.0 uses XHTML 1.0 and EPUB 3.0 uses XHTML5.  The XHTML code is much more strict than what Ryuzine or web browsers require, and it is not the code Ryuzine Writer produces.  The add-on attempts to remedy some of these issues to make more compliant XHTML from the HTML code, but it does not perform a full "tidy" operation.

2. EPUB 2.0 export font reference can invalidate file.  If you include custom fonts and your publication stylesheet(s) reference a @font-face font but it is not in the package it triggers a minor validation error.

3. Even if the add-on successfully produces an EPUB file it may not open in every e-reader app, some may even crash the e-reader without warning (in particular EPUB files we built using the Webcomic Template Builder would crash the Adobe Digital Editions program - both 1.7.2 and 2.0 versions - without warning, but worked fine in two other e-reader apps).

4. It is unlikely your EPUB export will look like your Ryuzine version.  This is due to differences in rendering and support for CSS either under the EPUB specification and/or the particular e-reader app in which you are viewing the file.

5. If you use any special characters in your publication you should use the Unicode versions, not the HTML versions, or it may break the EPUB file.  The only HTML entities also defined in XML are &amp; &lt, &gt, &quot, and &apos.  The add-on attempts to rectify some of the more common HTML entities to compliant Unicode including:
	&nbsp;  =>	&#160;
	&ndash;	=>	&#8211;
	&mdash;	=>	&#8212;
	&copy;	=>	&#169;
	&trade;	=>	&#8482;
	&eacute;=>	&#233;

6. If you include a Cover Image and the front page of your publication has the page title "Cover" (which is likely as that is the automatically inserted page title if you don't provide one) the navigation panel in e-readers supporting cover images will show:
	COVER
	Cover
	Title Page
	Table of Contents
	Page 1. . .

The first "COVER" is the cover art image itself, the second one is the actual first page (#page0) of your publication.  There does not appear to be any way to change the name of the cover image entry item, so if you don't like it you'll have to change the "section_head" of the front cover to something other than "Cover."

EPUB 2.0 Experimental Support

If you set “RYU.config.epub2 = 1” on line 18 of the "epub.config.js" file you will also see a checkbox appear below the Output Console.  Ticking the “ePub 2.0” checkbox will force the add-on to *attempt* building an EPUB 2.0 format file instead of one in 3.0 format.  You should know this is currently, badly broken and it is unlikely you will get a usable file out of it.  You should only try building 2.0 format files if you feel you need to support e-readers that are not compatible with the 3.0 format.

LICENSE

Released under an MIT license.  Copyright 2015 K.M. Hansen.  ePubs AWAAAAAAY!
