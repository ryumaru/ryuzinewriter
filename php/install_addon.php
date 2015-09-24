<!DOCTYPE html>
<html>
<head>
<title>Install Addon</title>
<?php require 'functions.php'; ?>
<?php
if($_SERVER['REQUEST_METHOD'] == "POST")  {
	$MY_PATH = $_SERVER['DOCUMENT_ROOT'].$_SERVER['PHP_SELF'];
	$MY_PATH = explode('ryuzinewriter/',$MY_PATH);
	if (is_writable($MY_PATH[0].'ryuzine/addons/')) {
		$mySRC = $MY_PATH[0].'ryuzinewriter/addons/'.$_POST['sender_addon_name'].'/'.$_POST['install_addon_name'];
		$myDST = $MY_PATH[0].'ryuzine/addons/'.$_POST['install_addon_name'];
		echo 'SRC='.$mySRC;
		echo 'DST='.$myDST;
		recurse_copy($mySRC,$myDST);
	} else {
		echo '<script type="text/javascript">alert(\'ERROR: /addons folder is not writable!\nADD-ON COULD NOT BE INSTALLED\nCheck folder permissions and try again.\');</script>';
	}
}
?>
</head>
<body>
<form name="install_addon_form" id="install_addon_form" method="post" action="" >
<input type="hidden" id="sender"  name="sender_addon_name" value="" />
<input type="hidden" id="package" name="install_addon_name" value="" />
</form>
</body>
</html>