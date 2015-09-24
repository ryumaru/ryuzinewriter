<!DOCTYPE html>
<html>
<head>
<title>Save Files</title>
<?php require 'functions.php'; ?>
<?php
if($_SERVER['REQUEST_METHOD'] == "POST")  {
	saveRyuzine($_POST['save_file_type'],$_POST['save_file_name'],$_POST['save_file_content'],0);
}
?>
</head>
<body>
<form name="save_file_form" id="save_file_form" method="post" action="" >
<input type="hidden" name="save_file_content" id="save_filecontent" />
<input type="text" name="save_file_name" value="untitled"  style="width:95%;" onchange="if(this.value=='index'||this.value=='rack'){alert('INVALID FILENAME: Pick something else or it will be saved as \'untitled\'');this.value='untitled';};" />
<input type="hidden" name="save_file_type" id="save_file_type" />
</form>
</body>
</html>