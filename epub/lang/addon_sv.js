/* Add-On Localization File for language code "sv"
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
"Title" : "Titel",
"Auto Fill" : "Auto Fill",
"Author" : "Författare",
"Publisher" : "Utgivare",
"Copyright" : "Copyright",
"Either copyright notice or copyleft license info" : "Antingen copyright eller copyleft info licens",
"Publication Date" : "Utgivningsdatum",
"Image Folder" : "Bildmapp",
"Cover Image" : "Cover Image",
"(optional)" : "(tillval)",
"Unique ID" : "Unikt ID",
"or URL of either Ryuzine version, download link, or information page about publication" : "eller webbadressen för antingen Ryuzine versionen, nedladdningslänk eller informationssidan om publicering",
"Language Code" : "Språkkoder",
"Issue Stylesheet" : "Issue format",
"Insert Table of Contents Page into publication" : "Infoga Innehållsförteckning Sidan i publikationen",
"Include Fonts folder (may cause validation to fail)" : "Inkludera Fonts-mappen (kan orsaka validering misslyckas)",
"Keywords" : "nyckelord",
"(optional comma-separated list)" : "(tillval kommaseparerad lista)",
"Description" : "Beskrivning",
"DELETE all old .epub files from server" : "BORT alla gamla .epub filer från servern",
"Output Console" : "Utgång Console",
"experimental" : "experimentell",
"No images sub-folder is set!  No images will be included in ePub." : "Inga bilder undermappen är inställd! Inga bilder kommer att ingå i ePub.",
"Cover image filename extension indicates it is NOT an image file!" : "Omslagsbild filändelse indikerar att den är INTE en bildfil!"
});RYU.addon.localize.translate();};