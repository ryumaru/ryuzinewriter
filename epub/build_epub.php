<!DOCTYPE html>
<html>
<head>
<title>Build ePub</title>
<?php require 'epub_functions.php'; ?>
<?php
// GET LIST OF IMAGE FOLDERS //
$allimages = glob('../../../images/*' , GLOB_ONLYDIR);
// strip out relative path
for ($i=0;$i<count($allimages);$i++) {
	$allimages[$i] = preg_replace("~../../../images/~", "", $allimages[$i] );
}
$ximages = array(
"app",
"rack"
);
$images = array();
// strip out Ryuzine Stylesheets //
for ($i=0;$i<count($allimages);$i++) {
	if (!in_array($allimages[$i], $ximages) ) {
		//populate new array with anything not in xfiles //
		array_push($images,$allimages[$i]);
	}
}


if($_SERVER['REQUEST_METHOD'] == "POST")  {
	buildEpub();		
}
?>
<script type="text/javascript">
var images = [];
for (var i=0; i < <?php echo count($images); ?>;i++) {
<?php for ($i=0;$i<count($images);$i++) {
	echo 'images['.$i.'] = "'.$images[$i].'";';
} ?>
}
</script>
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
<p>	ePub Export Add-On<br/>
	Ryuzine Writer 1.0<br/>
	Version: 0.3 Alpha<br/>
</p>

<form name="build_epub_form" id="build_epub_form" method="post" action="" onSubmit="alert('form remote submit');" >
			<input type="hidden" id="mytitle" name="mytitle" />
			<input type="hidden" id="toc_ncx" name="toc_ncx" />
			<input type="hidden" id="nav_end" name="nav_end" />
			<input type="hidden" id="cover_page" name="cover_page" />
			<input type="hidden" id="content_opf_a" name="content_opf_a" />
			<input type="hidden" id="content_opf_b" name="content_opf_b" />
			<input type="hidden" id="title_page" name="title_page"/>
			<input type="hidden" id="toc_page" name="toc_page"/>
			<!--/ Pass JSON array with all page content /-->
			<input type="hidden" id="epub_pages" name="epub_pages" />

			<input type="hidden" id="cssfile_name" name="cssfile_name" /> 
			<input type="hidden" id="imagefolder_name" name="imagefolder_name" />
			<input type="hidden" id="add_customCSS" name="add_customCSS"/>
			<input type="hidden" id="add_simpleCSS" name="add_simpleCSS"/>
			<input type="hidden" id="epub_flush" name="epub_flush"/>
			<input type="hidden" id="epub_fonts" name="epub_fonts"/>

				
</form>
<?php
	$WORK_PATH = $_SERVER['DOCUMENT_ROOT'].$_SERVER['PHP_SELF'];
	$WORK_PATH = explode('ryuzinewriter/',$WORK_PATH);
	if (!is_writable($WORK_PATH[0])) { $msg = 'ERROR: Work directory is not writable!  epubs cannot be built.';}
	else { $msg = 'READY!'; }
	echo '<p>build_epub@'.$WORK_PATH[0].'$ &gt; '.$msg.'</p>';
?>
</body>
</html>