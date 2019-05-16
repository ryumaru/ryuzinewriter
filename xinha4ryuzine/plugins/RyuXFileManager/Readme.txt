Package : Ryu X File Manager v 1.2

Customized version of Extended File Manager EFM 1.1.1

Version 1.2 created from 1.0 beta by Krzysztof Kotowicz <koto@webworkers.pl>

Overview :
----------

This is a customized version of the Extended File Manager plugin
modified exclusively for use with the Ryuzine Writer webapp and
will not work with other Xinha installations.  It can not be en-
abled at the same time as the original Extended File Manager and
was broken out under a different name to prevent users from 
accidentally overwriting the modified version with an update of
Extended File Manager.

A functions.php file is now required, which performs cursory security preventing this plugin from working on a live server (restricts to localhost dev server) and the upload path is specific to the images subfolder of your Ryuzine installation.

Version 1.2 is no longer contained in a Pop-up window.  Pop-up blockers and security restrictions in some browsers which prevent separate windows from interacting with each other (particularly on some mobile devices) required moving the plug-in interface to a Ryuzine Writer Dialog (this is a separate system from the Xinha dialogs!).  Additional alterations have been done to make the user interface work better on touch-enabled devices like the iPad.

This File Manager is an advanced plugin for Xinha 

It works in two different modes.
1). Insert Image Mode and 
2). Insert File Link Mode.

In Insert Image Mode, it replaces the basic insert image functionality of Xinha with its advanced image manager.

If Insert File Link Mode is enabled, a new icon will be added to the toolbar with advanced file linking capability.



Complete Features :
-------------------
* Easy config.inc file that enables individual options for both modes.
* Thumnail View 
* List View 
* Nice icons for both views 
* Create Folders 
* Vertical Scrolling 
* Allowed extensions to view or upload.
* File Uploads 
* Max File upload limit 
* Max Upload Folder size (Including all subfolders and files. A must see option.)
* Dynamic display of available free space in the Upload Folder 
* Dynamic Thumbnails using Image libraries or browser resize 
* Image Editor (Actually done by Wei...a great addon) 
* Can be used to insert images along with properties. 
* Can be used to insert link to non-image files like pdf or zip.
* You can specify image margin / padding / background and border colors
* You may edit Alt/title tags for inserted images

(Most of the features can be enabled/disabled as needed)

Installation :
--------------

As this plugin is only for Ryuzine Machine it comes pre-installed and only the IMAGE insertion function is enabled.

//If you want to add a button for linking files as well 

xinha_config.RyuXFileManager.use_linker = true;
// pass the configuration to plugin
if (xinha_config.RyuXFileManager) {
   	    with (xinha_config.RyuXFileManager)
        {
            <?php

            // define backend configuration for the plugin
            $IMConfig = array();
            $IMConfig['images_dir'] = '<images dir>';
            $IMConfig['images_url'] = '<images url>';
            $IMConfig['files_dir'] = '<files dir>';
            $IMConfig['files_url'] = '<files url>';
            $IMConfig['thumbnail_prefix'] = 't_';
            $IMConfig['thumbnail_dir'] = 't';
            $IMConfig['resized_prefix'] = 'resized_';
            $IMConfig['resized_dir'] = '';
            $IMConfig['tmp_prefix'] = '_tmp';
            $IMConfig['max_filesize_kb_image'] = 2000;
            // maximum size for uploading files in 'insert image' mode (2000 kB here)

            $IMConfig['max_filesize_kb_link'] = 5000;
            // maximum size for uploading files in 'insert link' mode (5000 kB here)

            // Maximum upload folder size in Megabytes.
            // Use 0 to disable limit
            $IMConfig['max_foldersize_mb'] = 0;
            
            $IMConfig['allowed_image_extensions'] = array("jpg","gif","png");
            $IMConfig['allowed_link_extensions'] = array("jpg","gif","pdf","ip","txt",
                                                         "psd","png","html","swf",
                                                         "xml","xls");

            require_once '/path/to/xinha/contrib/php-xinha.php';
            xinha_pass_to_php_backend($IMConfig);
            
            ?>
        }
}

=====
afrusoft@gmail.com - author of EFM 1.0 beta
koto@webworkers.pl - EFM 1.1 (most of the code taken from Xinha codebase)
software@kmhcreative.com - RFM 1.2