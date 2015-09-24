<?php
/* Ryuzine Writer File Operations Function File */
/* version compatibility: 1.0				*/
/*===============================================*/

/* 	Both the address of your Development Server AND any devices on your network
	to which you want to grant access (if you're not using localhost address).

	You should NOT install Ryuzine Writer on a public web server.  This script
	only provides minimal security against both running on the wrong server or
	form submissions from unauthorized devices, but REMOTE_ADDR can be spoofed!
*/

$WHITE_LIST = array(
	'127.0.0.1',
	'::1',
	'localhost'
);

$AUTO_DOWNLOAD = 1; // Turn on/off auto-downloading of Package Zip files

if (in_array($_SERVER['SERVER_NAME'], $WHITE_LIST) && in_array($_SERVER['REMOTE_ADDR'], $WHITE_LIST)) {
	// Yay! We are running on a white-listed server address and accessing from a white-listed address
} else {
	echo 'ACCESS TO '.$_SERVER['SERVER_NAME'].' DENIED FROM: '.$_SERVER['REMOTE_ADDR'];
	die;
}
// SAVE FILE FUNCTIONS //
function saveRyuzine($type,$filename,$filecontents,$dir) {
	if ( $type == 8 ) {
		$pfx = '';
		$ext = '.htm';
		$sub = 'data/';
	} else if ( $type == 7) {
		$pfx = '';
		$ext = '.config.js';
		$sub = 'js/';
	} else if ( $type == 6) {
		$pfx = '';
		$ext = '.css';
		$sub = 'css/';
	} else if ( $type == 5) {
		$pfx = '';
		$ext = '.htm';
		$sub = '';
	} else if ( $type == 4) {
		$pfx = 'wip_';
		$ext = '.htm';
		$sub = '';
	} else {
		echo 'ERROR: Unknown file type!';
	}
	if ($dir == 1) { 
		$dir = 'tmp/';
		$ext = '';
	} else { $dir = ""; }
	if ($filename == "") { $filename = 'untitled';
	} else {};
	$MY_PATH = $_SERVER['DOCUMENT_ROOT'].$_SERVER['PHP_SELF'];
	$MY_PATH = explode('ryuzinewriter/php/',$MY_PATH);
	$myFile = $MY_PATH[0].$dir.$sub.$pfx.$filename.$ext;
	$fh = fopen($myFile,'w') or die("can't open file");
	$stringData = $filecontents;
	fwrite($fh,$stringData);
	fclose($fh);
}

// RECURSIVE COPY WHOLE DIRECTORY //
function recurse_copy($src,$dst) { 
    $dir = opendir($src); 
    @mkdir($dst); 
    while(false !== ( $file = readdir($dir)) ) { 
        if (( $file != '.' ) && ( $file != '..' )) { 
            if ( is_dir($src . '/' . $file) ) { 
                recurse_copy($src . '/' . $file,$dst . '/' . $file); 
            } 
            else { 
                copy($src . '/' . $file,$dst . '/' . $file); 
            } 
        } 
    } 
    closedir($dir); 
} 
// RECURSIVE EMPTY OR DELETE ENTIRE FOLDER //
// empty = true will empty contents but not delete folder //
// empty = false (or omit) and it will delete folder too  //
function deleteAll($directory, $empty = false) { 
    if(substr($directory,-1) == "/") { 
        $directory = substr($directory,0,-1); 
    } 

    if(!file_exists($directory) || !is_dir($directory)) { 
        return false; 
    } elseif(!is_readable($directory)) { 
        return false; 
    } else { 
        $directoryHandle = opendir($directory); 
        
        while ($contents = readdir($directoryHandle)) { 
            if($contents != '.' && $contents != '..') { 
                $path = $directory . "/" . $contents; 
                
                if(is_dir($path)) { 
                    deleteAll($path); 
                } else { 
                    unlink($path); 
                } 
            } 
        } 
        
        closedir($directoryHandle); 

        if($empty == false) { 
            if(!rmdir($directory)) { 
                return false; 
            } 
        } 
        
        return true; 
    } 
} 

// BUILD PACKAGE FUNCTIONS //

function buildPackage() {
// Default Var Values //
	$zine_include = 1;
	$ryuzine_src = 0; // Export Box
	$ryuzine_html = "";
	$ryuzine_name = 'index.htm';
	
	$images_src = 0;  // full folder (any value other than zero deprecated!)
	$images_sub = ""; // no sub-folder
	$keep_thumbs = 0; // keep editor thumbnail images
	
	$config_src = 0; // Existing File
	$config_code = "";
	$config_name = 'ryuzine.config.js';
	
	$styles_src = 0; // Existing File
	$styles_code = "";
	$styles_name = 'thisissue.css';
	
	$rack_include = 0; // Do not include
	$rack_name = "rack.htm"; // not index file
	$rackcat_src = 0; // Existing File
	$rackcat_code = "";
	$rackcat_name = "catalog1.htm";
	
	$fonts_all  = 1;
	$addons_all = 0;
	$themes_all = 0;
	$rackimgs_all = 1;

	$fonts_add = array(); // holds actual check value
	$fonts = glob('../../fonts/*', GLOB_ONLYDIR);
	// strip out relative path
	for ($f=0;$f<count($fonts);$f++) {
		$fonts[$f] = preg_replace("~../../fonts/~", "", $fonts[$f]);
		$fonts_add[] = $_POST['font_'.$fonts[$f].''];
	}
	$loose_fonts_add = array(); // holds actual check value
	$loose_fonts_input = array();
	$loose_fonts = glob('../../fonts/{*.eot,*.svg,*.ttf,*.woff,*.otf}', GLOB_BRACE);
	// strip out relative path
	for ($f=0;$f<count($loose_fonts);$f++) {
		$loose_fonts[$f] = preg_replace("~../../fonts/~", "", $loose_fonts[$f]);
		$loose_fonts_input[] = str_replace('.', '_', $loose_fonts[$f]);
		$loose_fonts_add[] = $_POST['loose_font_'.$loose_fonts_input[$f].''];
	}
	$addon_add = array(); // holds the actual check value
	$addons = glob('../../ryuzine/addons/*' , GLOB_ONLYDIR);
	// strip out relative path
	for ($a=0;$a<count($addons);$a++) {
		$addons[$a] = preg_replace("~../../ryuzine/addons/~", "", $addons[$a] );
		$addon_add[] = $_POST['add_'.$addons[$a].''];
	}
	$theme_add = array(); // holds the actual check value
	$themes = glob('../../ryuzine/theme/*' , GLOB_ONLYDIR);
	// strip out relative path
	for ($t=0;$t<count($themes);$t++) {
		$themes[$t] = preg_replace("~../../ryuzine/theme/~", "", $themes[$t] );
		$theme_add[] = $_POST['theme_'.$themes[$t].''];
	}
	$rackcats_add = array(); // holds actual checked value
	$rackcats = glob('../../data/*' , GLOB_BRACE);
	// strip out relative path
	for ($r=0;$r<count($rackcats);$r++) {
		$rackcats[$r] = preg_replace("~../../data/~", "", $rackcats[$r] );
		$rackcats_add[] = $_POST['cat_'.preg_replace("~.htm~","",$rackcats[$r]).''];
	}
	$rackimgs_add = array(); // hold actual checked value
	$rackimgs = glob('../../images/rack/*' , GLOB_ONLYDIR);
	// strip out relative path
	for ($r=0;$r<count($rackimgs);$r++) {
		$rackimgs[$r] = preg_replace("~../../images/rack/~", "", $rackimgs[$r] );
		$rackimgs_add[] = $_POST['rackimg_'.$rackimgs[$r].''];
	}
	
	$myJSfile = 0; // no custom file
	$myJSname = "";
	$myCSSfile = 0; // no custom file
	$myCSSname = "";
	
	$source_include = 0; // Do not include source code
	
	if ($_POST['zineadd'] == '1' ) { // Package should include a publication
		$zine_include = 1;
		if ($_POST['packfile_src']== '0' ) {
			if ($_POST['packfile_content']=="" || $_POST['packfile_content'] == "Ryuzine File HTML code will be in this box.") {
				echo '<span style="color:red;">ERROR: HTML Export Box is empty!  Go to Editor, Build file, and then Package.</span><br/>';
				return;
			}
			$ryuzine_src = 0;
			$ryuzine_html = $_POST['packfile_content'];
			$ryuzine_name = $_POST['packfile_name'];
		} else {
			$ryuzine_src = $_POST['packfile_src'];
			$ryuzine_html = "";
			$ryuzine_name = $_POST['packfile_name'];
		}
		// Get or set stylesheet
		if ($_POST['cssfile_src'] == '0' ) {
			$styles_src = 0;
			$styles_code = "";
			$style_name = $_POST['cssfile_name'];
		} else if ($_POST['cssfile_src'] == '1' ) {
			if ($_POST['cssfile_content'] =="" || $_POST['cssfile_content'] =="Custom Styles: Copy & Paste contents into your file thisissue.css") {
				echo '<span style="color:red;">ERROR: No CSS code to write into file!</span><br/>';
			} else {
				$styles_src = 1;
				$styles_code = $_POST['cssfile_content'];
				$styles_name = $_POST['cssfile_name'];
			}
		} else {
			$styles_src = $_POST['cssfile_src'];
			$styles_code = "";
			$styles_name = $_POST['cssfile_name'];	
		}
		if ($_POST['imagefile_src'] == '1' ) {
			$images_src = 1;
			$images_sub = $_POST['imagefolder_name'];
		}
		if ($_POST['allrackimages'] == '1' ) {
			$rackimgs_all = 1;
		} else {
			$rackimgs_all = 0;
		}	
	} else { $zine_include = 0; }
	if ($_POST['rackadd'] == '1' ) { // Package should include Ryuzine Rack
		$rack_include = 1;
		if ($_POST['rackfile'] == '1' ) {
			$rack_name = "index.htm";
			if ($ryuzine_name == 'index.htm') {
				$ryuzine_name = "issue.htm";
			}
		}
		if ($_POST['catfile_src'] == '0' ) {
				$rackcat_src = 0;
		} else if ($_POST['catfile_src'] == '1') {
			if ($_POST['catfile_content'] =="" || $_POST['catafile_content'] =="RyuzineRack Data Catalog Code will be in this box.") {
				echo '<span style="color:red;">ERROR: Rack Data Export box is empty!  No data to write to file. Will copy all files in <i>data/cat/</i></span><br/>';
			} else {
				$rackcat_src = 1;
				$rackcat_code = $_POST['catfile_content'];
				$rackcat_name = $_POST['catfile_name'];	
			}
		} else {
			$rackcat_src = 2;
			$rackcat_code = "";
			$rackcat_name = "";			
		}
	} else { $rack_include = 0; }
	// No matter what package is selected it needs a config file
	if ($_POST['configfile_src'] == '0' ) {
			$config_src = 0;
			$config_code = "";
			$config_name = $_POST['configfile_name'];
	} else if ($_POST['configfile_src'] == '1' ) {
		if ($_POST['configfile_content'] == "" || $_POST['configfile_content'] == "// Custom Configuration File Javascript Code: //") {
			echo '<span style="color:red;">ERROR: No code in Config Export Box.  Using default file.</span><br/>';
			$config_src = 0;
			$config_code = "";
			$config_name = $_POST['configfile_name'];				
		} else {
			$config_src = 1;
			$config_code = $_POST['configfile_content'];
			$config_name = $_POST['configfile_name'];
		}
	} else {
		$config_src = $_POST['configfile_src'];
		$config_code = "";
		$config_name = $_POST['configfile_name'];
	}
	
	if ($_POST['packtype'] == '0') { // smallest package
		$fonts_all  = 0;
		$addons_all = 0;
		$themes_all = 0;
		$myJSfile 	= 0;
		$myCSSfile	= 0;
		$source_include = 0;
	} else if ($_POST['packtype'] == '2' ) { // custom package
		if ($_POST['allfonts'] == '1') {
			$fonts_all = 1;
		} else {
			$fonts_all = 0;
		}
		if ($_POST['alladdons'] == '1') {
			$addons_all = 1;		
		} else {
			$addons_all = 0;
		}
		if ($_POST['allthemes'] == '1') {
			$themes_all = 1;
		} else {
			$themes_all = 0;
		}
		if ($_POST['customJSadd'] == '1') {
			$myJSfile = 1;
			$myJSname = $_POST['customJSfile_name'];
		} else {
			$myJSfile = 0;
			$myJSname = "";
		}
		if ($_POST['customCSSadd'] == '1') {
			$myCSSfile = 1; 
			$myCSSname = $_POST['customCSSfile_name'];
		} else {
			$myCSSfile = 0;
			$myCSSname = "";
		}
		$keep_thumbs = $_POST['keep_thumbs'];
		$source_include = $_POST['sourceadd'];
	} else if ($_POST['packtype'] == '1' ) { // standard package
		$addons_all = 1;	
		$themes_all = 1;
	} else {
		echo '<span style="color:red;font-weight:bold;">ERROR: PACKAGE TYPE UNKNOWN!</span><br/>';
		return;
	}
	
/*******************
	 Now that variables are set let's build some stuff!
********************/
	
	// check if temp directory exists or not, if not create it //
	$MY_PATH = $_SERVER['DOCUMENT_ROOT'].$_SERVER['PHP_SELF'];
	$MY_PATH = explode('ryuzinewriter/php/',$MY_PATH);
	if (is_writable($MY_PATH[0])) {
		$tmp = $MY_PATH[0].'tmp';
		if (!file_exists($tmp)) { mkdir($tmp, 0777); } else { deleteAll($tmp,true); };
	} else {
		echo '<script type="text/javascript">alert(\'ERROR: Dev Folder is not writable!\nPACKAGE COULD NOT BE BUILT\nCheck folder permissions and try again.\');</script>';
		return;
	}
	// Now populate tmp folder with Ryuzine Webapp //
//	$_ryuzine= $MY_PATH[0].'tmp/ryuzine';
	// Copy Core Files to Package //
		echo 'Copying Ryuzine webapps to Package. . .';
		recurse_copy($MY_PATH[0].'ryuzine',$MY_PATH[0].'tmp/ryuzine');
		echo 'Core files DONE!<br/>';
	if ($_POST['packtype'] != '1' ) {
		// empty addon and theme folders
		deleteAll($MY_PATH[0].'tmp/ryuzine/addons',true);
		deleteAll($MY_PATH[0].'tmp/ryuzine/theme' ,true);
		// add back required files
		recurse_copy($MY_PATH[0].'ryuzine/addons/socialwidget',$MY_PATH[0].'tmp/ryuzine/addons/socialwidget');
		recurse_copy($MY_PATH[0].'ryuzine/theme/light',$MY_PATH[0].'tmp/ryuzine/theme/light');
		recurse_copy($MY_PATH[0].'ryuzine/theme/dark' ,$MY_PATH[0].'tmp/ryuzine/theme/dark');
	}
	if ($_POST['packtype'] == '2' ) {
		// copy All or Selected Add-Ons
		if ($addons_all == '1') {
			echo 'Copying entire ADDONS directory into Package. . .';
			recurse_copy($MY_PATH[0].'ryuzine/addons',$MY_PATH[0].'tmp/ryuzine/addons');
			echo 'DONE<br/>';
		} else {
			for ($a=0;$a<count($addons);$a++) {
				if ($addon_add[$a] == '1') {
					echo 'Copying '.$addons[$a].' directory to package. . .';
					recurse_copy($MY_PATH[0].'ryuzine/addons/'.$addons[$a].'',$MY_PATH[0].'tmp/ryuzine/addons/'.$addons[$a].'');
					echo 'DONE<br/>';
				}
			}
		}
		// copy All or selected Themes
		if ($themes_all == '1') {
			echo 'Copy ALL THEMES to Package. . .';
			recurse_copy($MY_PATH[0].'ryuzine/theme',$MY_PATH[0].'tmp/ryuzine/theme');
			echo 'DONE<br/>';
		} else {
			for ($t=0;$t<count($themes);$t++) {
				if ($theme_add[$t] == '1') {
					echo 'Copying '.$themes[$t].' theme to package. . .';
					recurse_copy($MY_PATH[0].'ryuzine/theme/'.$themes[$t].'',$MY_PATH[0].'tmp/ryuzine/theme/'.$themes[$t].'');
					echo 'DONE<br/>';
				}
			}
		}
	}

	// And now the Issue-Specific Folders
	$_css = 	$MY_PATH[0].'tmp/css';
	$_data = 	$MY_PATH[0].'tmp/data';
	$_fonts = 	$MY_PATH[0].'tmp/fonts';
	$_images = 	$MY_PATH[0].'tmp/images';
	$_js = 		$MY_PATH[0].'tmp/js';
	echo 'Building Issue folders. . .';
	if (!file_exists($_css)) { mkdir($_css, 0777); };
	if (!file_exists($_data)) { mkdir($_data, 0777); };	
	if (!file_exists($_images)) { mkdir($_images, 0777); };
	if (!file_exists($_js)) { mkdir($_js, 0777); };
	echo 'DONE<br/>';
	echo '<span style="font-weight:bold;color:limegreen;">**** BUILDING PACKAGE ****</span><br/>';
	copy($MY_PATH[0].'css/blank.css',$MY_PATH[0].'tmp/css/blank.css');
	copy($MY_PATH[0].'css/simplestyles.css',$MY_PATH[0].'tmp/css/simplestyles.css');
	if ($fonts_all == '1') {
		echo 'Copy ALL FONTS to Package. . .';
		recurse_copy($MY_PATH[0].'fonts',$MY_PATH[0].'tmp/fonts');
		echo 'DONE<br/>';
	} else if ($fonts_all == '0' && $_POST['packtype'] == '2'){
		if (!file_exists($_fonts)) { mkdir($_fonts, 0777); };
		for ($f=0;$f<count($fonts);$f++) {
			if ($fonts_add[$f] == '1') {
				echo 'Copying '.$fonts[$f].' font folder to package. . .';
				recurse_copy($MY_PATH[0].'fonts/'.$fonts[$f].'',$MY_PATH[0].'tmp/fonts/'.$fonts[$f].'');
				echo 'DONE<br/>';
			}
		}
		for ($f=0;$f<count($loose_fonts);$f++) {
			if ($loose_fonts_add[$f] == '1') {
				echo 'Copying '.$loose_fonts[$f].' font to package. . .';
				copy($MY_PATH[0].'fonts/'.$loose_fonts[$f],$MY_PATH[0].'tmp/fonts/'.$loose_fonts[$f]);
				echo 'DONE<br/>';
			}
		}
	} else {
		echo 'Custom Fonts will not be included in this package.<br/>';
	}

	if ($zine_include == '1') {
		// Save Publication File HTML
		if ($ryuzine_src == '0') { // Export Box
			echo 'Ryuzine file does not exist.<br/>';
			echo 'Writing HTML Export code into a file named '.$ryuzine_name.'. . .';
			saveRyuzine(5,$ryuzine_name,$ryuzine_html,1);
			echo 'DONE<br/>';
		} else {
			echo 'Ryuzine file already exists!<br/>';
			echo 'copying '.$ryuzine_src.' to Package as '.$ryuzine_name.'<br/>';
			copy($MY_PATH[0].$ryuzine_src,$MY_PATH[0].'tmp/'.$ryuzine_name);
		}	
		// Copy Publication Stylesheet
		if ($styles_src == '0') { // Existing File
			echo 'Copying default thississue.css file to package<br/>';
			copy($MY_PATH[0].'ryuzine/css/thisissue.css',$MY_PATH[0].'tmp/css/'.$styles_name);
		} else if ($styles_src == '1') {
			echo 'Issue-Specific Styles do not exist.<br/>';
			echo 'Writing CSS Export Box code into file named '.$styles_name.'. . .';
			saveRyuzine(6,$styles_name,$styles_code,1);
			echo 'DONE<br/>';
		} else {
			echo 'Copying '.$styles_src.' to Package as '.$styles_name.'<br/>';
			copy($MY_PATH[0].'css/'.$styles_src,$MY_PATH[0].'tmp/css/'.$styles_name);
		}
		// Copy Publication Image Folder
			echo 'DONE<br/>Coping issue-specific images subdirectory '.$images_sub.'. . .';
			recurse_copy($MY_PATH[0].'images/'.$images_sub,$MY_PATH[0].'tmp/images/'.$images_sub);
			echo 'DONE<br/>';
			// clear out editor thumbnails
			if ($keep_thumbs == 0) {
				deleteAll($MY_PATH[0].'tmp/images/'.$images_sub.'/thumbs',false);
			}	
	}
	//  If Include Rack is checked make sure catalog and images are included in package
	if ($rack_include == '1') {
		echo 'Ryuzine Rack will be included in package as '.$rack_name.'.<br/>';
		// prefer possible edited version, but if not found use default rack HTML file
		if (!file_exists($MY_PATH[0].'rack.htm')) {
			copy($MY_PATH[0].'ryuzine/res/rack.htm',$MY_PATH[0].'tmp/'.$rack_name);
		} else {
			copy($MY_PATH[0].'rack.htm',$MY_PATH[0].'tmp/'.$rack_name);
		}
		echo 'DONE<br/>Copying Ryuzine Rack images to package. . .';
		if ($rackimgs_all == '1') {
			recurse_copy($MY_PATH[0].'images/rack',$MY_PATH[0].'tmp/images/rack');
			echo 'DONE<br/>';
		} else {
			for ($i=0;$i<count($rackimgs);$i++) {
				if ($rackimgs_add[$i] == '1') {
					echo 'Copying '.$rackimgs[$i].' directory to package. . .';
					recurse_copy($MY_PATH[0].'images/rack/'.$rackimgs[$i].'',$MY_PATH[0].'tmp/images/rack/'.$rackimgs[$i].'');
					echo 'DONE<br/>';
				}
			}			
		}
		if ($rackcat_src == '0') {
			echo 'Copying all catalogs in data/ folder to Package. . .';
			recurse_copy($MY_PATH[0].'data',$MY_PATH[0].'tmp/data');
			echo 'DONE<br/>';
		} else if ($rackcat_src == '1') {
			echo 'Catalog file does not exist.<br/>';
			echo 'Writing Data Export code into file named '.$rackcat_name.'. . .';
			saveRyuzine(8,$rackcat_name,$rackcat_code,1);
			echo 'DONE<br/>';
		} else {
			for ($r=0;$r<count($rackcats);$r++) {
				if ($rackcats_add[$r] == '1') {
					echo 'Copying '.$rackcats[$r].' catalog to package. . .';
					copy($MY_PATH[0].'data/'.$rackcats[$r].'',$MY_PATH[0].'tmp/data/'.$rackcats[$r].'');
					echo 'DONE<br/>';
				}
			}
		}
	} else {
		echo 'Ryuzine Rack will NOT be included in this package<br/>';
		echo 'DELETING files and folder related to Ryuzine Rack from webapp...';
		deleteAll($MY_PATH[0].'tmp/data',false);
		unlink($MY_PATH[0].'tmp/ryuzine/css/rackdetail.css');
		unlink($MY_PATH[0].'tmp/ryuzine/css/rackgrid.css');
		unlink($MY_PATH[0].'tmp/ryuzine/css/racklist.css');
		unlink($MY_PATH[0].'tmp/ryuzine/js/ryuzine.rack.js');
		echo 'DONE<br/>';
	}
	
	//  Copy or Create Issue-specific Configuration File
	if ($config_src == '0') {
		echo 'Copying default ryuzine.config.js to package. . .';
		copy($MY_PATH[0].'js/ryuzine.config.js',$MY_PATH[0].'tmp/js/'.$config_name);
		echo 'DONE<br/>';
	} else if ($config_src == '1') {
		echo 'Config file does not exist.<br/>';
		echo 'Writing Config Export code into a file named '.$config_name.'...';
		saveRyuzine(7,$config_name,$config_code,1);
		echo 'DONE<br/>';
	} else {
		echo 'Copy config file '.$config_src.' to Package as '.$config_name.' <br/>';
		copy($MY_PATH[0].'js/'.$config_src,$MY_PATH[0].'tmp/js/'.$config_name);
	}


	if ($myJSfile == '1') {
		echo 'Copying '.$myJSname.' file into package /js<br/>';
		if(!copy($MY_PATH[0].'js/'.$myJSname,$MY_PATH[0].'tmp/js/'.$myJSname)) {
			echo 'File could not be copied (either missing, wrong name, or destination is not writable)';
		}
	}
	if ($myCSSfile == '1') {
		echo 'Copying '.$myCSSname.' file into package /css</br/>';
		if(!copy($MY_PATH[0].'js/'.$myCSSname,$MY_PATH[0].'tmp/css/'.$myCSSname)) {
			echo 'File could not be copied (either missing, wrong name, or destination is not writable)';
		}
	}
	// Unless it is a Custom Package explicitly including source code, remove those files
	if ($source_include == '0') {
		echo 'Cleaning up...';
		deleteAll($MY_PATH[0].'tmp/ryuzine/css/src',false);
		deleteAll($MY_PATH[0].'tmp/ryuzine/js/src',false);
		deleteAll($MY_PATH[0].'tmp/ryuzine/res',false);
		echo 'DONE<br/>';
	}
	
	
	if ($_POST['time_stamp'] == '1') {
		$timestamp = '_'.date_timestamp_get(date_create());
	} else {
		$timestamp = '';
	}
	if ($_POST['skip_zip'] == '1') {
		echo '<b>Package contents set. <span style="color:red">ZIP Archiving is disabled...</span></b><br/>';
		$dirname = $_POST['mytitle'];
		$dirname = preg_replace("/[^\w\.-]/", "-", strtolower($dirname));
		$dirpath = $MY_PATH[0].$dirname.'_Ryuzine'.$timestamp;
		if (!file_exists($dirpath)) { mkdir($dirpath, 0777); } else { deleteAll($dirpath,true); };
		echo 'Attempting to copy contents to '.$dirpath.'<br/>';
		recurse_copy($MY_PATH[0].'tmp',$dirpath);
		echo '<p>DONE.  The package folder should be available in your Ryuzine Development directory on the server.<br/>';
	} else {
		echo '<b>Package contents set.  Now will attempt to ZIP. . .</b><br/>';
		$zipname = $_POST['mytitle'];
		$zipname = preg_replace("/[^\w\.-]/", "-", strtolower($zipname));
		$zippath = $zipname.'_Ryuzine'.$timestamp.'.zip';
		Zip($MY_PATH[0].'tmp/',$MY_PATH[0].$zippath);
		global $AUTO_DOWNLOAD;
		if ( $AUTO_DOWNLOAD == 1 ) {
		echo 'Attempting to automatically download file to your computer<br/>';
		echo '<iframe height="1" width="1" src="../../'.$zippath.'" style="display:none;"></iframe>';
		echo 'Ok, if the file is not in your downloads folder something went wrong :(<br/>';
		} else {
		// Download link in Output Console //
		echo '<p><strong><a href="../../'.$zippath.'">Click to download ZIP file '.$zippath.'</a><strong></p>';
		}
	}
}

function Zip($source, $destination) {
	ini_set('max_execution_time', 600);
    if (!extension_loaded('zip') || !file_exists($source)) {
    	echo '<span style="color:red;font-weight:bold;">ERROR! PHP ZIP Extension is not loaded.</span><br/>';
        return false;
    }
    $filelimit = 245;	// open file limit before forcing zip close and reopen
    					// it's so low because Mac OS X file limit is just 255
    $zip = new ZipArchive();
    if (!$zip->open($destination, ZipArchive::CREATE)) {
    	echo '<span style="color:red;font-weight:bold;">ERROR! ZIP Archive could not be created (check directory permissions)</span><br/>';
        return false;
    }

	$source = str_replace('\\', '/', realpath($source));
    echo '<span style="color:limegreen;font-weight:bold;">Compressing files and folders into ZIP archive. . .</span>';
    if (is_dir($source) === true)
    {
       $files = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($source), RecursiveIteratorIterator::SELF_FIRST);

        foreach ($files as $file)
        {
        		/* 	TO-DO: Fix this!
        			This next "if" is supposed to force the zip closed and reopen it
        			if the count is equal to the open file limit, but doesn't work right
        			because of addFromString() and file_get_contents() being used instead
        			of addFile(), but addFile() copied the wrong directories and skipped
        			numerous files.
        		*/
        			
				if ($zip->numFiles == $filelimit) {
					$zip->close(); 
					$zip->open($destination) or die ("Error: Could not reopen Zip");
				}
            $file = str_replace('\\', '/', $file);

            // Ignore "." and ".." folders
            if( in_array(substr($file, strrpos($file, '/')+1), array('.', '..')) )
                continue;
				// error catch missing or unreadable files
				if (!file_exists($file)) {
					echo '<span style="color:red;font-weight:bold;">ERROR! '.$file.' does not exist!</span><br/>';
					return false;
				}
		  		if (!is_readable($file))  { 
		  			echo '<span style="color:red;font-weight:bold;">ERROR! '.$file.' not readable!</span><br/>';
		  			return false;
		  		}   
            if (is_dir($file) === true)
            {
                $zip->addEmptyDir(str_replace($source . '/', '', $file . '/'));
            }
            else if (is_file($file) === true)
            {
                $zip->addFromString(str_replace($source . '/', '', $file), file_get_contents($file));
            }
        }
    }
    else if (is_file($source) === true)
    {
        $zip->addFromString(basename($source), file_get_contents($source));
    }
	echo 'DONE!<br/>';
    return $zip->close();
}

?>