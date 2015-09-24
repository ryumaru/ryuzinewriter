<!DOCTYPE html>
<html>
<head>
<title>Scan Main Directory</title>
<?php
// FILES and FOLDERS TO EXCLUDE //
$xfiles = array(
"index.htm",
"rack.htm",
"ryuzine.js",
"ryuzine.rack.js",
"blank.css",
"colortext0.css",
"colortext1.css",
"colortext2.css",
"colortext3.css",
"colortext4.css",
"continuous.css",
"grid_tall.css",
"grid.css",
"lightbox.css",
"plain.css",
"rackdetail.css",
"rackgrid.css",
"racklist.css",
"ryuzine_leftbound_2D.css",
"ryuzine_leftbound_fill_2D.css",
"ryuzine_leftbound_fill.css",
"ryuzine_leftbound_tall_2D.css",
"ryuzine_leftbound_tall.css",
"ryuzine_leftbound.css",
"ryuzine_rightbound_2D.css",
"ryuzine_rightbound_fill_2D.css",
"ryuzine_rightbound_fill.css",
"ryuzine_rightbound_tall_2D.css",
"ryuzine_rightbound_tall.css",
"ryuzine_rightbound.css",
"simplestyles.css",
"ui_light.css",
"ui_dark.css",
"ui.css",
"app",
"rack"
);
// GET LIST OF RYUZINE FILES //
$allfiles = glob('../../{*.htm,*.html}', GLOB_BRACE);
// strip out relative path
for ($f=0;$f<count($allfiles);$f++) {
	$allfiles[$f] = preg_replace("~../../~", "", $allfiles[$f] );
}
$files = array();
// strip out Ryuzine Stylesheets //
for ($f=0;$f<count($allfiles);$f++) {
	if (!in_array($allfiles[$f], $xfiles) ) {
		//populate new array with anything not in xfiles //
		array_push($files,$allfiles[$f]);
	}
}
// GET LIST OF CONFIGURATION FILES //
$allconfigs = glob('../../js/{*.config.js}', GLOB_BRACE);
// strip out relative path
for ($c=0;$c<count($allconfigs);$c++) {
	$allconfigs[$c] = preg_replace("~../../js/~", "", $allconfigs[$c] );
}
$configs = array();
// strip out Ryuzine function files
for ($c=0;$c<count($allconfigs);$c++) {
	if (!in_array($allconfigs[$c], $xfiles)) {
		array_push($configs,$allconfigs[$c]);
	}
}
// GET LIST OF ISSUE-SPECIFIC STYLESHEETS //
$allstyles = glob('../../css/{*.css}', GLOB_BRACE);
// strip out relative path
for ($a=0;$a<count($allstyles);$a++) {
	$allstyles[$a] = preg_replace("~../../css/~", "", $allstyles[$a] );
}
$styles = array();
// strip out Ryuzine Stylesheets //
for ($a=0;$a<count($allstyles);$a++) {
	if (!in_array($allstyles[$a], $xfiles) ) {
		//populate new array with anything not in xfiles //
		array_push($styles,$allstyles[$a]);
	}
}

// GET LIST OF DATA CATALOGS
$rackcats = glob('../../data/{*.htm,*.html}', GLOB_BRACE);
// strip out relative path
for ($r=0;$r<count($rackcats);$r++) {
	$rackcats[$r] = preg_replace("~../../data/~", "", $rackcats[$r]);
}
// No need to strip out other files - should all be catalogs!

// GET LIST OF FONT FOLDERS
$fonts = glob('../../fonts/*', GLOB_ONLYDIR);
// strip out relative path
for ($f=0;$f<count($fonts);$f++) {
	$fonts[$f] = preg_replace("~../../fonts/~", "", $fonts[$f]);
}
// GET LIST OF LOOSE FONTS
$loose_fonts = glob('../../fonts/{*.eot,*.svg,*.ttf,*.woff,*.otf}', GLOB_BRACE);
// strip out relative path
for ($f=0;$f<count($loose_fonts);$f++) {
	$loose_fonts[$f] = preg_replace("~../../fonts/~", "", $loose_fonts[$f]);
}

// GET LIST OF INSTALLED ADD-ONS
$addons = glob('../../ryuzine/addons/*' , GLOB_ONLYDIR);
// strip out relative path
for ($a=0;$a<count($addons);$a++) {
	$addons[$a] = preg_replace("~../../ryuzine/addons/~", "", $addons[$a] );
}

// GET LIST OF INSTALLED THEMES
$themes = glob('../../ryuzine/theme/*' , GLOB_ONLYDIR);
// strip out relative path
for ($t=0;$t<count($themes);$t++) {
	$themes[$t] = preg_replace("~../../ryuzine/theme/~", "", $themes[$t] );
}
// GET LIST OF IMAGE FOLDERS //
$allimages = glob('../../images/*' , GLOB_ONLYDIR);
// strip out relative path
for ($i=0;$i<count($allimages);$i++) {
	$allimages[$i] = preg_replace("~../../images/~", "", $allimages[$i] );
}
$images = array();
// strip out Ryuzine Stylesheets //
for ($i=0;$i<count($allimages);$i++) {
	if (!in_array($allimages[$i], $xfiles) ) {
		//populate new array with anything not in xfiles //
		array_push($images,$allimages[$i]);
	}
}
// GET LIST OF RACK IMAGE FOLDERS //
$allrackimages = glob('../../images/rack/*' , GLOB_ONLYDIR);
// strip out relative path
for ($i=0;$i<count($allrackimages);$i++) {
	$allrackimages[$i] = preg_replace("~../../images/rack/~", "", $allrackimages[$i] );
}
$rackimages = array();
// strip out Ryuzine Stylesheets //
for ($i=0;$i<count($allrackimages);$i++) {
	if (!in_array($allrackimages[$i], $xfiles) ) {
		//populate new array with anything not in xfiles //
		array_push($rackimages,$allrackimages[$i]);
	}
}

?>
<script type="text/javascript">
// now port values into javascript //
var files = [];
for (var f=0; f < <?php echo count($files); ?>;f++) {
<?php for ($f=0;$f<count($files);$f++) {
	echo 'files['.$f.'] = "'.$files[$f].'";';
} ?>
}
var configs = [];
for (var c=0; c < <?php echo count($configs); ?>;c++) {
<?php for ($c=0;$c<count($configs);$c++) {
	echo 'configs['.$c.'] = "'.$configs[$c].'";';
} ?>
}
var styles = [];
for (var s=0; s < <?php echo count($styles); ?>;s++) {
<?php for ($s=0;$s<count($styles);$s++) {
	echo 'styles['.$s.'] = "'.$styles[$s].'";';
} ?>
}
var rackcats = [];
for (var r=0; r < <?php echo count($rackcats); ?>;r++) {
<?php for ($r=0;$r<count($rackcats);$r++) {
	echo 'rackcats['.$r.'] = "'.$rackcats[$r].'";';
} ?>
}
var fonts = [];
for (var f=0; f < <?php echo count($fonts); ?>;f++) {
<?php for ($f=0;$f<count($fonts);$f++) {
	echo 'fonts['.$f.'] = "'.$fonts[$f].'";';
} ?>
}
var loose_fonts = [];
for (var f=0; f < <?php echo count($loose_fonts); ?>;f++) {
<?php for ($f=0;$f<count($loose_fonts);$f++) {
	echo 'loose_fonts['.$f.'] = "'.$loose_fonts[$f].'";';
} ?>
}
var addons = [];
for (var a=0; a < <?php echo count($addons); ?>;a++) {
<?php for ($a=0;$a<count($addons);$a++) {
	echo 'addons['.$a.'] = "'.$addons[$a].'";';
} ?>
}
var themes = [];
for (var t=0; t < <?php echo count($themes); ?>;t++) {
<?php for ($t=0;$t<count($themes);$t++) {
	echo 'themes['.$t.'] = "'.$themes[$t].'";';
} ?>
}
var images = [];
for (var i=0; i < <?php echo count($images); ?>;i++) {
<?php for ($i=0;$i<count($images);$i++) {
	echo 'images['.$i.'] = "'.$images[$i].'";';
} ?>
}
var rackimages = [];
for (var i=0; i < <?php echo count($rackimages); ?>;i++) {
<?php for ($i=0;$i<count($rackimages);$i++) {
	echo 'rackimages['.$i.'] = "'.$rackimages[$i].'";';
} ?>
}
</script>
</head>
<body>
<table border="1"><tr>
<td>Ryuzine Files</td><td>Config Files</td><td>Stylesheets</td><td>Catalogs</td><td>Addons</td><td>Themes</td><td>Image Folders</td><td>Rack Image Folders</td><td>Font Folders</td><td>Loose Fonts</td>
</tr><tr>
<td valign="top">
<script type="text/javascript">
for (var w=0; w < files.length; w++) {
document.write(files[w]+'<br/>');
}
</script>
</td>
<td valign="top">
<script type="text/javascript">
for (var w=0; w < configs.length; w++) {
document.write(configs[w]+'<br/>');
}
</script>
</td>
<td valign="top">
<script type="text/javascript">
for (var w=0; w < styles.length; w++) {
document.write(styles[w]+'<br/>');
}
</script>
</td>
<td valign="top">
<script type="text/javascript">
for (var r=0; r < rackcats.length; r++) {
document.write(rackcats[r]+'<br/>');
}
</script>
</td>
<td valign="top">
<script type="text/javascript">
for (var a=0; a < addons.length; a++) {
document.write(addons[a]+'<br/>');
}
</script>
</td>
<td valign="top">
<script type="text/javascript">
for (var t=0; t < themes.length; t++) {
document.write(themes[t]+'<br/>');
}
</script>
</td>
<td valign="top">
<script type="text/javascript">
for (var i=0; i < images.length; i++) {
document.write(images[i]+'<br/>');
}
</script>
</td>
<td valign="top">
<script type="text/javascript">
for (var i=0; i < rackimages.length; i++) {
document.write(rackimages[i]+'<br/>');
}
</script>
</td>
<td valign="top">
<script type="text/javascript">
for(var f=0; f < fonts.length; f++) {
document.write(fonts[f]+'<br/>');
}
</script>
</td>
<td valign="top">
<script type="text/javascript">
for(var f=0; f < loose_fonts.length; f++) {
document.write(loose_fonts[f]+'<br/>');
}
</script>
</td>
</tr>
</table>
</body>
</html>