<?php require '../../php/functions.php'; ?>
<?php

// SAVE FILE FUNCTIONS //
function ePubFiles($sub,$filename,$filecontents) {
	if ($filename == "") { 
		echo '<span style="color:red;">ERROR: Filename missing!</span>';
		return;
	} else {};
	$MY_PATH = $_SERVER['DOCUMENT_ROOT'].$_SERVER['PHP_SELF'];
	$MY_PATH = explode('ryuzinewriter/addons/epub/',$MY_PATH);
	$myFile = $MY_PATH[0].'tmp/'.$sub.$filename;
	$fh = fopen($myFile,'w') or die("can't open file");
	$stringData = $filecontents;
	fwrite($fh,$stringData);
	fclose($fh);
}

function ListFiles($dir) {
    if($dh = opendir($dir)) {
        $files = Array();
        $inner_files = Array();
        while($file = readdir($dh)) {
            if($file != "." && $file != ".." && $file[0] != '.') {
                if(is_dir($dir . "/" . $file)) {
                    $inner_files = ListFiles($dir . "/" . $file);
                    if(is_array($inner_files)) $files = array_merge($files, $inner_files); 
                } else {
                    array_push($files, $dir . "/" . $file);
                }
            }
        }
        closedir($dh);
        return $files;
    }
}
/**
* Find and close unclosed xml tags
**/
function closeTags($text) {
/*	This section sucks at the moment!  It is a clumsy but functional
	means of tweaking the HTML code pulled from the Ryuzine Editor
	and *attempting* to make it well-formed XHTML because EPUB will
	ONLY use the stricter XHTML version of HTML5.  Without writing
	a full-on HTML parser/tidy function this hopes to catch most of
	the common XHTML validation error gremlins, but is not written
	to catch them all, just enough to get the EPUB to validate.
*/
// Self-closing HTML entities that need closing slash //
$ctag = array(
	'/(<img[^>]+>)/i',
	'/(<br>)/i',
	'/(<hr>)/i',	
	'/(<meta[^>]+>)/i',	
	'/(<input[^>]+>)/i',
	'/(<area[^>]+>)/i',
	'/(<frame[^>]+>)/i',
	'/(<base[^>]+>)/i',
	'/(<basefont[^>]+>)/i',
	'/(<param[^>]+>)/i',
	'/(<col[^>]+>)/i'
);

for ($t=0; $t < count($text); $t++) {
	// xml defines &amp; &lt; &gt; &quot; &apos - but no others! //
	$text[$t] = preg_replace('~&nbsp;~','&#160;',$text[$t]);
	$text[$t] = preg_replace('~&trade;~','&#8482;',$text[$t]);
	$text[$t] = preg_replace('~&copy;~','&#169;',$text[$t]);
	$text[$t] = preg_replace('~&ndash;~','&#8211;',$text[$t]);
	$text[$t] = preg_replace('~&mdash;~','&#8212;',$text[$t]);
	$text[$t] = preg_replace('~&eacute;~','&#233;',$text[$t]);
	// Need others?  Either add more replaces or get used to using Unicode versions!
	foreach ($ctag as $tag) {
	preg_match_all($tag, $text[$t], $matches);
		if ($matches[0] != '') {
			$replacement = preg_replace('~>~','/>',$matches[0]);
			$text[$t] = preg_replace($matches[0],$replacement,$text[$t]);
			// if screws up and doubles the tag brackets, so need to fix that. . .
			$text[$t] = preg_replace('~<<~','<',$text[$t]);
			$text[$t] = preg_replace('~/>>~','/>',$text[$t]);
			// the <hr> check matches and messes up "href" so fix that too. . .
			$text[$t] = preg_replace('~<hr/>ef="~','href="',$text[$t]);
		}
	}
};
return $text;
}


function createArchive($MY_PATH, $workDir, $epubFile) {
		$excludes = array('.DS_Store', 'mimetype');

		$mimeZip = $MY_PATH.'ryuzinewriter/addons/epub/assets/mimetype.zip';
		$zipFile = $MY_PATH.'book.zip';

		$workDir = $MY_PATH.$workDir;


		if (!copy($mimeZip, $zipFile)) {
			throw new \Exception("Unable to copy temporary archive file");
		}

		$zip = new \ZipArchive();
		if ($zip->open($zipFile, \ZipArchive::CREATE) != true) {
			throw new \Exception("Unable open archive '$zipFile'");
		}

//		$files = new \RecursiveIteratorIterator(new \RecursiveDirectoryIterator($workDir), \RecursiveIteratorIterator::SELF_FIRST);
		$files = ListFiles($workDir);
		foreach ($files as $file) {
			if (in_array(basename($file), $excludes)) {
				continue;
			}
			if (is_dir($file)) {
				$zip->addEmptyDir(str_replace("$workDir/", '', "$file/"));
			} elseif (is_file($file)) {
				$zip->addFromString(
					str_replace("$workDir/", '', $file),
					file_get_contents($file)
				);
			}
		}
		$zip->close();

		rename($zipFile, $MY_PATH.$epubFile);
		global $AUTO_DOWNLOAD;
		if ( $AUTO_DOWNLOAD == 1 ) {
		echo 'Attempting to automatically download file to your computer<br/>';
		echo '<iframe height="1" width="1" src="../../../'.$epubFile.'" style="display:none;"></iframe>';
		echo 'Ok, if the file is not in your downloads folder something went wrong :(<br/>';
		} else {
		// Download link in Output Console //
		echo '<p><strong><a href="../'.$epubFile.'">Click to download ePub file '.$epubFile.'</a><strong></p>';
		// Download link in webapp Alert //
		echo "<script>parent.RYU.popAlert('A',3,0,0,'Download File','<p><strong>Download link to your ePub file:<a href=\"".$epubFile."\">".$epubFile."</a><strong></p>','Close');</script>";
		}
	}
// BUILD ePub FUNCTIONS //
function buildEpub() {
// Do stuff //
	$toc_ncx_content = "".$_POST['toc_ncx']."";			// toc_ncx	(epub 2.0)
	$nav_end_content = "".$_POST['nav_end']."";			// nav_end	(epub 3.0)
	$cover_page_content = "".$_POST['cover_page']."";	// XML Cover(epub 2.0)
	$content_opf_a = "".$_POST['content_opf_a']."";		// content_opf_a
	$content_opf_b = "".$_POST['content_opf_b']."";
	$title_page = "".$_POST['title_page']."";
	$toc_page = "".$_POST['toc_page']."";
	
	$epub_html = "";				// epub_pages
	
	$images_folder = "";			// imagefolder_name
	
	$styles_name = "";
	
	$myCSSfile = 0; // no custom file
	$myCSSname = "";
	
	$manifest = "";
	$m = 0;

	function manifest_Build($type,$file,$media_type,$m) {
		return "	<item id=\"".$type.$m."\"	href=\"".$file."\"	media-type=\"".$media_type."\"/>\r\n";
	}

		if ($_POST['epub_pages'] == "" || $_POST['epub_pages'] == "undefined") {
			echo '<span style="color:red;">ERROR: File Content Missing!</span><br/>';
			return;
		} else {
			$epub_html = json_decode($_POST['epub_pages']);
		}
		if ($_POST['cssfile_name'] =="") {
			$styles_name = 'thisissue.css';
		} else {
			$styles_name = "".$_POST['cssfile_name']."";
		}
		// Allows no image folder to be included with empty set.
		$images_folder = $_POST['imagefolder_name'];
		if ($_POST['add_customCSS'] != "") {
			$myCSSfile = 1;
			$myCSSname = "".$_POST['add_customCSS']."";
		}

	
	// Now that variables are set let's build some stuff! //
	
	// check if temp directory exists or not, if not create it //
	$MY_PATH = $_SERVER['DOCUMENT_ROOT'].$_SERVER['PHP_SELF'];
	$MY_PATH = explode('ryuzinewriter/',$MY_PATH);
	if (is_writable($MY_PATH[0])) {
	$tmp = $MY_PATH[0].'tmp';
	if (!file_exists($tmp)) { mkdir($tmp, 0777); } else { deleteAll($tmp,true); };
	// If Flush was checked, get rid of all old epub files //
		if ($_POST['epub_flush'] == '1') {
			foreach(glob($MY_PATH[0]."*.epub*") as $file) {
				unlink($file); // Delete only .epub files through the loop
			}
			echo '<span style="color:yellow;">WARNING: All older .epub files were permanently deleted!  To prevent this in the future uncheck the "Delete Old ePub Files" option.</span><br/>';
		}
	} else {
		echo '<script type="text/javascript">alert(\'ERROR: Dev Folder is not writable!\nePub COULD NOT BE BUILT\nCheck folder permissions and try again.\');</script>';
		return;
	}
	// Now populate tmp folder with standard Ryuzine Folders //
	$_css = $MY_PATH[0].'tmp/css';
	$_images = $MY_PATH[0].'tmp/images';
	echo 'Building Package file structure. . .';
	if (!file_exists($_css)) { mkdir($_css, 0777); };
	if (!file_exists($_images)) { mkdir($_images, 0777); };
	echo 'DONE<br/>';
	// Copy Core Files to Package //
	echo 'Copying Core Files to Package. . .';
//	copy($MY_PATH[0].'ryuzinewriter/addons/epub/assets/mimetype',$MY_PATH[0].'tmp/mimetype'); // use template instead!
	recurse_copy($MY_PATH[0].'ryuzinewriter/addons/epub/assets/META-INF',$MY_PATH[0].'tmp/META-INF');
	if ($_POST['epub_fonts'] == '1') {
		recurse_copy($MY_PATH[0].'fonts',$MY_PATH[0].'tmp/fonts');
		echo 'DONE<br/>';
		// Now get the list of fonts and types for manifest //
		foreach (ListFiles('../../../fonts') as $key=>$file){
			$file = preg_replace("~../../../~", "", $file );
			if (preg_match("~\.otf~i",$file)) {
				$media_type = 'application/x-font-otf';
				// possible 1: application/opentype
				// possible 2: application/vnd.ms-opentype
			} else if (preg_match("~\.ttf~i",$file)) {
				$media_type =  'application/x-font-ttf';
				// possibly:	application/truetype
			} else if (preg_match("~\.eot~i",$file)) {
				$media_type = 'application/x-font-eot';
				// possibly: application/embedded-opentype
			} else if (preg_match("~\.svg~i",$file)) {
				$media_type = 'image/svg+xml';
				// possibly:   application/x-font-svg
			} else if (preg_match("~\.woff~i",$file)) {
				$media_type = 'application/x-font-woff';
				// possibly:   application/font-woff'
			// Now check for other kinds of files in case they are there
			} else if (preg_match("~\.htm~i",$file) || preg_match("~\.html~i",$file)) {
				$media_type = 'application/xhtml+xml';
			} else if (preg_match("~\.css~i",$file)) {
				$media_type = 'text/css';
			} else if (preg_match("~\.txt~i",$file)) {
				$media_type = 'text/plain';
			} else if (preg_match("~\.rtf~i",$file)) {
				$media_type = 'text/richtext';
			} else if (preg_match("~\.xml~i",$file)) {
				$media_type = 'text/xml';
			} else if (preg_match("~\.zip~i",$file)) {
				echo '<span style="color:yellow;">WARNING: There is a ZIP archive ('.$file.') in your /fonts folder.  Consider removing it and run build again.</span><br/>';
				$media_type = 'application/zip';
			} else {
				$media_type = 'unknown';
				echo '<span style="color:red;">ERROR: '.$file.' in the fonts folder unknown media-type.  This invalidates the ePub.  Please fix it and try again!</span><br/>';
				return;
			}
			$manifest=$manifest."".manifest_Build('font',$file,$media_type,$m)."";
			$m++;
		}  
	} else {
		if (file_exists($tmp.'fonts')) { deleteAll($tmp.'fonts',true); };
	}
	echo '<span style="font-weight:bold;color:limegreen;">**** BUILDING ePUB ****</span><br/>';
		ePubFiles('','nav.xhtml',$nav_end_content);
		ePubFiles('','toc.ncx',$toc_ncx_content);
			if ($cover_page_content != "") {
			ePubFiles('','cover.xhtml',$cover_page_content);
			};
		if ($title_page != "") {
		ePubFiles('','title.xhtml',$title_page);
		}
		if ($toc_page != "") {
		ePubFiles('','contents.xhtml',$toc_page);
		}
		$epub_html = closeTags($epub_html);
		for ($e=0;$e<count($epub_html);$e++) {
			ePubFiles('','page'.$e.'.xhtml',$epub_html[$e]);
		}		
		if ($images_folder != "") {
			if (!file_exists($MY_PATH[0].'images/'.$images_folder)) {
			echo '<span style="color:red;">ERROR: Images sub-folder does not exist!  No images are included in this ePub.</span><br/>';
			} else { // File exists, yay!
			echo 'DONE<br/>Copying issue-specific images subdirectory '.$images_folder.'. . .';
			recurse_copy($MY_PATH[0].'images/'.$images_folder,$MY_PATH[0].'tmp/images/'.$images_folder);
			echo 'DONE<br/>';
				$m = 0;
				foreach (ListFiles('../../../images/'.$images_folder.'') as $key=>$file){
					$file = preg_replace("~../../../~", "", $file );
					if (preg_match("~\.jpg~i",$file) || preg_match("~\.jpeg~i",$file)) {
						$media_type = 'image/jpeg';
					} else if (preg_match("~\.png~i",$file)) {
						$media_type = 'image/png';
					} else if (preg_match("~\.gif~i",$file)) {
						$media_type = 'image/gif';
					} else if (preg_match("~\.svg~i",$file)) {
						$media_type = 'image/svg+xml';
					} else if (preg_match("~\.htm~i",$file) || preg_match("~\.html~i",$file)) {
						$media_type = 'application/xhtml+xml';
					} else if (preg_match("~\.css~i",$file)) {
						$media_type = 'text/css';
					} else if (preg_match("~\.txt~i",$file)) {
						$media_type = 'text/plain';
					} else if (preg_match("~\.rtf~i",$file)) {
						$media_type = 'text/richtext';
					} else if (preg_match("~\.xml~i",$file)) {
						$media_type = 'text/xml';
					} else {
						$media_type = 'unknown';
						echo '<span style="color:red;">ERROR: '.$file.' in the images folder unknown media-type.  This invalidates the ePub.  Please fix it and try again!</span><br/>';
						return;
					}
					$manifest=$manifest.manifest_Build('image',$file,$media_type,$m);
					$m++;
				}  
			}
		} else {
			if (file_exists($tmp.'images')) { deleteAll($tmp.'images',true); };
			echo '<span style="color:yellow;">WARNING: No images sub-folder set!  No images are included in this ePub.</span><br/>';
		}			
	if ($styles_name != "") {
		echo 'Copying '.$styles_name.' to ePub Package<br/>';
		copy($MY_PATH[0].'css/'.$styles_name,$MY_PATH[0].'tmp/css/'.$styles_name);
	}
	if ($myCSSfile == '1') {
		echo 'Copying '.$myCSSname.' file into package /css</br/>';
		if(!copy($MY_PATH[0].'js/'.$myCSSname,$MY_PATH[0].'tmp/css/'.$myCSSname)) {
			echo 'File could not be copied (either missing, wrong name, or destination is not writable)';
		}
	}

	ePubFiles('','content.opf',$content_opf_a.$manifest.$content_opf_b);

	$epubname = $_POST['mytitle'];
	$epubname = preg_replace("/[^\w\.-]/", "-", strtolower($epubname));
	$epubname = $epubname.'_ops_'.date_timestamp_get(date_create()).'.epub';
	createArchive($MY_PATH[0],'tmp/',$epubname);

}


?>