/* Add-On Localization File for language code "de"
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
"Author" : "Autor",
"Publisher" : "Herausgeber",
"Copyright" : "Copyright",
"Either copyright notice or copyleft license info" : "Entweder Urheberrecht oder Copyleft-Lizenz info",
"Publication Date" : "Erscheinungsdatum",
"Image Folder" : "Imagebroschüre",
"Cover Image" : "Bild verfügbar",
"(optional)" : "(optional)",
"Unique ID" : "Eindeutige ID",
"or URL of either Ryuzine version, download link, or information page about publication" : "oder die URL entweder Ryuzine Version Download-Link oder Informationsseite über die Veröffentlichung",
"Language Code" : "Sprachcode",
"Issue Stylesheet" : "Ausgabe Sheet",
"Insert Table of Contents Page into publication" : "Legen Inhaltsverzeichnis Seite in Veröffentlichung",
"Include Fonts folder (may cause validation to fail)" : "Fügen Schriftenordner (kann zu Überprüfung auftritt)",
"Keywords" : "Schlüsselwörter",
"(optional comma-separated list)" : "(optional durch Kommata getrennte Liste)",
"Description" : "Beschreibung",
"DELETE all old .epub files from server" : "Löschen Sie alle alten Epub-Dateien vom Server",
"Output Console" : "Ausgabekonsole",
"experimental" : "Experimental-",
"No images sub-folder is set!  No images will be included in ePub." : "Keine Bilder Unterordner gesetzt! Keine Bilder werden in ePub einbezogen werden.",
"Cover image filename extension indicates it is NOT an image file!" : "Titelbild Dateierweiterung gibt es nicht eine Bilddatei!"
});RYU.addon.localize.translate();};