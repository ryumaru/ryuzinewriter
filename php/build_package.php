<!DOCTYPE html>
<html>
<head>
<title>Build Package</title>
<?php require 'functions.php'; ?>
<?php

if($_SERVER['REQUEST_METHOD'] == "POST")  {
	buildPackage();		
}
?>
<style type="text/css">
body {
	background: black;
	color: white;
	font-size: .5em;
	font-family: Consolas,Monaco,'Lucida Console','Liberation Mono','DejaVu Sans Mono','Bitstream Vera Sans Mono','Courier New', monospace;
}
a {
	color: yellow;
}
a:hover {
	color: orange;
}
a:visited {
	color: #ccc;
}
</style>
</head>
<body>
<form name="build_package_form" id="build_package_form" method="post" action="">
	<input type="hidden" id="mytitle" name="mytitle" />
	<input type="hidden" id="packtype" name="packtype" />
	<input type="hidden" id="zineadd" name="zineadd"/>
	<input type="hidden" id="packfile_src" name="packfile_src" />
	<input type="hidden" id="packfile_content" name="packfile_content" />
	<input type="hidden" id="packfile_name" name="packfile_name" />
			
	<input type="hidden" id="configfile_src" name="configfile_src" />
	<input type="hidden" id="configfile_content" name="configfile_content" />
	<input type="hidden" id="configfile_name" name="configfile_name" />
	<input type="hidden" id="cssfile_src" name="cssfile_src" />
	<input type="hidden" id="cssfile_content" name="cssfile_content" />
	<input type="hidden" id="cssfile_name" name="cssfile_name" /> 
	<input type="hidden" id="imagefile_src" name="imagefile_src" />
	<input type="hidden" id="imagefolder_name" name="imagefolder_name" />
	<input type="hidden" id="keep_thumbs" name="keep_thumbs" />

			<input type="hidden" id="allfonts" name="allfonts" />
			<input type="hidden" id="alladdons" name="alladdons" />
			<input type="hidden" id="allthemes" name="allthemes" />

	<?php 
				// GET LIST OF FONT FOLDERS
				$fonts = glob('../../fonts/*', GLOB_ONLYDIR);
				// strip out relative path
				for ($f=0;$f<count($fonts);$f++) {
					$fonts[$f] = preg_replace("~../../fonts/~", "", $fonts[$f]);
					echo '<input type="hidden" id="font_'.$fonts[$f].'" name="font_'.$fonts[$f].'" />';
				}
				// GET LIST OF LOOSE FONTS
				$loose_fonts = glob('../../fonts/{*.eot,*.svg,*.ttf,*.woff,*.otf}', GLOB_BRACE);
				// strip out relative path
				for ($f=0;$f<count($loose_fonts);$f++) {
					$loose_fonts[$f] = preg_replace("~../../fonts/~", "", $loose_fonts[$f]);
					$loose_fonts[$f] = str_replace('.', '_', $loose_fonts[$f]);
					echo '<input type="hidden" id="loose_font_'.$loose_fonts[$f].'" name="loose_font_'.$loose_fonts[$f].'" />';
				}
				// GET LIST OF INSTALLED ADD-ONS
				$addons = glob('../../ryuzine/addons/*' , GLOB_ONLYDIR);
				// strip out relative path
				for ($a=0;$a<count($addons);$a++) {
					$addons[$a] = preg_replace("~../../ryuzine/addons/~", "", $addons[$a] );
					echo '<input type="hidden" id="add_'.$addons[$a].'" name="add_'.$addons[$a].'" />';
				}
				
				$themes = glob('../../ryuzine/theme/*' , GLOB_ONLYDIR);
				// strip out relative path
				for ($t=0;$t<count($themes);$t++) {
					$themes[$t] = preg_replace("~../../ryuzine/theme/~", "", $themes[$t] );
					echo '<input type="hidden" id="theme_'.$themes[$t].'" name="theme_'.$themes[$t].'" />';
				}
	
	?>

			<input type="hidden" id="customJSadd" name="customJSadd" />
			<input type="hidden" id="customJSfile_name" name="customJSfile_name" />

			<input type="hidden" id="customCSSadd" name="customCSSadd" />
			<input type="hidden" id="customCSSfile_name" name="customCSSfile_name"/>
			
			<input type="hidden" id="sourceadd" name="sourceadd"/>

			<input type="hidden" id="rackadd" name="rackadd"/>
			<input type="hidden" id="rackfile" name="rackfile"/>
			<input type="hidden" id="rackfile_name" name="rackfile_name"/>
			<input type="hidden" id="allrackimages" name="allrackimages"/>
				
				<input type="hidden" id="catfile_src" name="catfile_src" />
				<input type="hidden" id="catfile_content" name="catfile_content" />
				<input type="hidden" id="catfile_name" name="catfile_name"/> 
	<?php
				// GET LIST OF DATA CATALOGS
				$rackcats = glob('../../data/{*.htm,*.html}', GLOB_BRACE);
				// strip out relative path
				for ($r=0;$r<count($rackcats);$r++) {
					$rackcats[$r] = preg_replace("~../../data/~", "", $rackcats[$r]);
					echo '<input type="hidden" id="cat_'.preg_replace("~.htm~","",$rackcats[$r]).'" name="cat_'.preg_replace("~.htm~","",$rackcats[$r]).'" />';
				}
				// GET LIST OF RACK IMAGE FOLDERS //
				$rackimages = glob('../../images/rack/*' , GLOB_ONLYDIR);
				// strip out relative path
				for ($r=0;$r<count($rackimages);$r++) {
					$rackimages[$r] = preg_replace("~../../images/rack/~", "", $rackimages[$r] );
					echo '<input type="hidden" id="rackimg_'.$rackimages[$r].'" name="rackimg_'.$rackimages[$r].'" />';
				}	
	?>			
			<input type="hidden" id="skip_zip" name="skip_zip"/>
			<input type="hidden" id="time_stamp" name="time_stamp"/>	
</form>
<?php
	$WORK_PATH = $_SERVER['DOCUMENT_ROOT'].$_SERVER['PHP_SELF'];
	$WORK_PATH = explode('ryuzinewriter/',$WORK_PATH);
	if (!is_writable($WORK_PATH[0])) { $msg = 'ERROR: Work directory is not writable!  Packages cannot be built.';}
	else { $msg = 'READY!'; }
	echo '<p>build_package@'.$WORK_PATH[0].'$ &gt; '.$msg.'</p>';
?>
</body>
</html>