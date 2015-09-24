<!DOCTYPE html>
<html>
<head>
<title>Save Work File</title>
<?php require 'functions.php'; ?>
<?php
if($_SERVER['REQUEST_METHOD'] == "POST")  {
	saveRyuzine(4,$_POST['wip_name'],$_POST['save_wip_content'],0);
}
?>
</head>
<body>
<form name="save_wip_form" id="save_wip_form" method="post" action="" onsubmit="window.parent.RZM.hideToggle('loadpage',0);">
<input type="hidden" name="save_wip_content" id="save_wipcontent" />
<input type="text" name="wip_name" value="untitled"  style="width:95%;" />
</form>
</body>
</html>