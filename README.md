# RYUZINE WRITER

### INTRODUCTION

Ryuzine Writer is an authoring webapp for creating, editing, and previewing Ryuzine format publications and Ryuzine Rack newsstands.  

If you’re not interested in contributing code to the Ryuzine project you should download the stable Ryuzine [Publishers Distribution Kit](http://www.ryumaru.com/ryuzine/downloads/) (PDK) instead of the GitHub source code.

Ryuzine Writer must be installed *inside* a development folder with Ryuzine Reader/Rack and run from a development web server. *Do not install it on a public web server* with PHP file operations enabled as it has only minimal security.  Ryuzine Writer is only intended for use over a local area network or on the same system running the development server.

### SYSTEM REQUIREMENTS

+ Web Server
+ PHP 5.4+ (if using file operations)
+ Ryuzine base installation
+ Web Browser (latest Chrome, Safari, Firefox, Opera or Internet Explorer, Chrome or Safari work best)

### Some Assembly Required

If you downloaded source code from GitHub all the component parts of the Ryuzine webapps are separated into different repositories and you’ll need to assemble the webapp like furniture from IKEA before you can use it (note that this is manually building what is inside the already-assembled PDK mentioned above):

* you need a folder on your development server where you will work on Ryuzine publications (it doesn’t matter what you name the folder).
* inside that development folder you need sub-folders to store the support files for your individual publications named as follows:
	* css
	* data
	* fonts
	* images
	* js
* unzip the “master-ryuzine” file you downloaded from GitHub and rename it just “ryuzine”
* unzip the “master-ryuzinewriter” file you downloaded from GitHub and rename it just “ryuzinewriter”
* put the Writer add-ons in the “ryuzinewriter/addons” folder
	* iscroll add-on needs to have [iScroll](https://github.com/cubiq/iscroll/archive/master.zip) unzipped into it.
* put the Writer themes in the “ryuzinewriter/theme” folder
* Download and unzip [Font Awesome](https://github.com/FortAwesome/Font-Awesome/archive/4.1.0.zip) to the “/ryuzinewriter/fonts” folder, change the name to just lowercase “font-awesome”

### INSTALLATION WITH BUILT-IN SERVER (Mac or Linux)

1. Download Ryuzine base and unzip it to where-ever you like.

2. Place the “ryuzinewriter” folder inside the “ryuzine_pdk” folder.

3. Move/Copy the “_index.htm_” file from “_ryuzinewriter/res/_“ up to the “ryuzine_pdk” folder.

4. Inside the “ryuzinewriter” folder there is a script named “_start” - run this script and it should start the built-in PHP web development server and automatically launch your default web browser open to Ryuzine Writer.

5. To stop the built-in PHP web server run the “_stop” script within the “ryuzinewriter” folder.

The built-in server is configured to open as “localhost” on port 8088.  This address is only accessible ON the same system running the server!  If you need to access the server over your network you will need to configure it to run on the IP address instead.  To do this:

1. Open the “_start” file in a plain text or code editor

2. Change: HOST=“localhost” to something like HOST=“192.168.1.100” (or whatever the IP is)

3. Save the file.  Run the “_stop” if you need to, then re-run “_start” and it should open using the IP address instead of “localhost.”

4. Use that IP address to access the serve from other devices on your local network. 

### INSTALLATION ON DEV SERVER (All Platforms)

1. Download Ryuzine base and unzip it to your Development Server (XAMPP, MAMP, or built-in Apache server on *nix systems) into the “htdocs” folder.  You can rename it however you prefer, but it will be hereafter referred to as the “ryuzine_pdk” folder.

2. You should now have a “ryuzine_pdk” folder on your server.  Place the “ryuzinewriter” folder inside it.

3. There are two options for installation:
  * Run the “_install” script (Mac or Linux) or
  * Manually move/copy the “_index.htm_” file from “_ryuzinewriter/res_” up to the “ryuzine_pdk” folder.

4. Access the “ryuzine_pdk” folder via your development server’s URL (either localhost or IP on your LAN).  Example: http://localhost/ryuzine_pdk/

5. You should see Ryuzine Writer load in your web browser.  It ships with PHP file operations enabled by default.  All your work files should be inside the “ryuzine_pdk” folder (or requisite sub-folders for stylesheets, configuration javascripts, images, fonts, etc).

### WHITE LISTING ADDRESSES (All Platforms)

If you are not running your server on “localhost” you’ll need to “White List” the server’s IP address, as well as the IP addresses of any devices you also want to grant access to Ryuzine Writer’s PHP File Operations.

1. Open the “functions.php” file in “ryuzinewriter/php” folder in a plain text or code editor

2. Add the IP address to the $WHITE_LIST array, along with the IP addresses of all devices on your network you want to grant access to the PHP functions.

3. Save the “functions.php” file and reload Ryuzine Writer in your web browser for the changes to take effect.

If you don’t do this, devices on your network will still be able to open Ryuzine Writer but none of the PHP File Operations will work until you white list the device(s).

### CONFIGURING PACKAGING DISTRIBUTIONS

If you have enabled PHP File Operations in Ryuzine Writer (they are enabled by default) you should have the ability to “Package” Ryuzine publications you build.  On the “Export” tab select “Build Package” from the drop-down menu and a dialog will open.

Select the options you want in your package, and whether you want it to generate a folder or a ZIP archive.

By default, upon completion, Ryuzine Writer will attempt to automatically download ZIP packages to your browser’s Downloads folder.  If you would prefer it leave the generated files on the web server and offer you a link to optionally download the file from your development server edit the “_ryuzinewriter/php/function.php_” file on line 20 and change the one to a zero:

``php
$AUTO_DOWNLOAD = 0;
``

ZIP archived packages can be offered on your website as file downloads for offline reading.  Publications packaged into folders are ready to be uploaded to a web server for online reading.

### Code Contributions

**THIS REPOSITORY USES SUBTREES!**  The "addons," "themes," and "xinha4ryuzine" folders are imported as subtrees from the "ryuzine-addons," "ryuzine-themes," and "xinha4ryuzine" repositories, respectively.  The first two, however, are entirely made up of subtrees imported from the individual add-on and theme repositories.  You should make changes to the repository for the specific add-on or theme instead of editing files in this repository. Then pull the commits from that repository into either the "ryuzine-addons" or "ryuzine-themes" repository, and finally pull those repositories into this one.

See also *Open Source Porject Contributions* at http://www.ryumaru.com/contributing-code/ and *Open Source Code of Conduct* at http://www.ryumaru.com/open-source-code-conduct/ for more details.

### License

“Ryuzine” and “Ryuzine Writer” are released under the Mozilla Public License (MPL) 2.0, the full text of which is bundled with the webapps. “Ryuzine Press” is released under the GNU General Public License version 3 (GPLv3).  Add-ons, Themes, Skins or other components may be under other licenses.

Distribution of publications in Ryuzine format does not require you to also provide source code if the webapp or plugin code has not been modified.

“Ryuzine” and the Ryuzine logos are trademarks of K.M. Hansen & Ryu Maru.  If you are distributing unaltered software, downloaded directly from Ryu Maru, to anyone in any way or for any purpose, no further permission is required.  Any other use of our trademarks requires prior authorization.
