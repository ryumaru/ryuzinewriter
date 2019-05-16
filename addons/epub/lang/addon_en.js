/* Add-On Localization File for language code "en"
	Place this script inside a "language" folder
	inside your Add-On and then call it on register:
		inject : {
			js : [
				["/language/addon_"+RYU.config.language+".js"]
			]
		}
	This appends the  RYU.config.localize object
	then it runs the translate function
*/

if (RYU.addon.localize){RYU.addon.localize.append({
"Title" : "Title",
"Auto Fill" : "Auto Fill",
"Author" : "Author",
"Publisher" : "Publisher",
"Copyright" : "Copyright",
"Either copyright notice or copyleft license info" : "Either copyright notice or copyleft license info",
"Publication Date" : "Publication Date",
"Image Folder" : "Image Folder",
"Cover Image" : "Cover Image",
"(optional)" : "(optional)",
"Unique ID" : "Unique ID",
"or URL of either Ryuzine version, download link, or information page about publication" : "or URL of either Ryuzine version, download link, or information page about publication",
"Language Code" : "Language Code",
"Issue Stylesheet" : "Issue Stylesheet",
"Insert Table of Contents Page into publication" : "Insert Table of Contents Page into publication",
"Include Fonts folder (may cause validation to fail)" : "Include Fonts folder (may cause validation to fail)",
"Keywords" : "Keywords",
"(optional comma-separated list)" : "(optional comma-separated list)",
"Description" : "Description",
"DELETE all old .epub files from server" : "DELETE all old .epub files from server",
"Output Console" : "Output Console",
"experimental" : "experimental",
"No images sub-folder is set!  No images will be included in ePub." : "No images sub-folder is set!  No images will be included in ePub.",
"Cover image filename extension indicates it is NOT an image file!" : "Cover image filename extension indicates it is NOT an image file!"
});RYU.addon.localize.translate();};