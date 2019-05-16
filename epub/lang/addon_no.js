/* Add-On Localization File for language code "no.txt"
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
"Title" : "Tittel",
"Auto Fill" : "Auto Fill",
"Author" : "Forfatter",
"Publisher" : "Utgiver",
"Copyright" : "Copyright",
"Either copyright notice or copyleft license info" : "Enten opphavsrett eller copyleft-lisens info",
"Publication Date" : "Publiseringsdato",
"Image Folder" : "Bilde mappe",
"Cover Image" : "Forsidebilde",
"(optional)" : "(valgfritt)",
"Unique ID" : "unik ID",
"or URL of either Ryuzine version, download link, or information page about publication" : "eller URL enten Ryuzine versjon, download link, eller informasjonsside om offentliggjøring",
"Language Code" : "Språkkode",
"Issue Stylesheet" : "problemet stilark",
"Insert Table of Contents Page into publication" : "Sett Innholdsfortegnelsen til publikasjon",
"Include Fonts folder (may cause validation to fail)" : "Inkluder Fonts-mappen (kan føre til validering til å mislykkes)",
"Keywords" : "nøkkelord",
"(optional comma-separated list)" : "(valgfritt kommaseparert liste)",
"Description" : "Beskrivelse",
"DELETE all old .epub files from server" : "SLETT alle gamle EPUB filer fra serveren",
"Output Console" : "utgang Console",
"experimental" : "eksperimentell",
"No images sub-folder is set!  No images will be included in ePub." : "Ingen bilder sub-mappen er satt! Ingen bilder vil bli inkludert i ePub.",
"Cover image filename extension indicates it is NOT an image file!" : "Omslagsbilde filtypen indikerer det er IKKE en bildefil!"
});RYU.addon.localize.translate();};