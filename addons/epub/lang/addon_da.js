/* Add-On Localization File for language code "da"
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
"Author" : "Forfatter",
"Publisher" : "Udgiver",
"Copyright" : "Copyright",
"Either copyright notice or copyleft license info" : "Enten ophavsret varsel eller copyleft licens info",
"Publication Date" : "Udgivelsesdato",
"Image Folder" : "billedmappe",
"Cover Image" : "Cover billede",
"(optional)" : "(valgfrit)",
"Unique ID" : "Unikt ID",
"or URL of either Ryuzine version, download link, or information page about publication" : "eller URL enten Ryuzine udgave, download-link, eller information side om offentliggørelse",
"Language Code" : "sprogkode",
"Issue Stylesheet" : "Udstedelse Stylesheet",
"Insert Table of Contents Page into publication" : "Indsæt Indholdsfortegnelse Side i publikationen",
"Include Fonts folder (may cause validation to fail)" : "Medtag Fonts mappe (kan forårsage validering til at mislykkes)",
"Keywords" : "søgeord",
"(optional comma-separated list)" : "(valgfrit kommasepareret liste)",
"Description" : "Beskrivelse",
"DELETE all old .epub files from server" : "SLET alle gamle .epub filer fra server",
"Output Console" : "Output Console",
"experimental" : "eksperimentel",
"No images sub-folder is set!  No images will be included in ePub." : "Ingen billeder undermappe er indstillet! Ingen billeder vil indgå i ePub.",
"Cover image filename extension indicates it is NOT an image file!" : "Cover billede filendelse indikerer Det er ikke en billedfil!"
});RYU.addon.localize.translate();};