/* Add-On Localization File for language code "it"
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
"Title" : "titolo",
"Auto Fill" : "Fill Auto",
"Author" : "autore",
"Publisher" : "editore",
"Copyright" : "diritto d'autore",
"Either copyright notice or copyleft license info" : "Sia avviso di copyright o copyleft informazioni licenza",
"Publication Date" : "Data Di Pubblicazione",
"Image Folder" : "Folder Immagine",
"Cover Image" : "Immagine Di Copertina",
"(optional)" : "(optional)",
"Unique ID" : "ID univoco",
"or URL of either Ryuzine version, download link, or information page about publication" : "o l'URL di una versione Ryuzine, link per il download, o pagina le informazioni relative alla pubblicazione",
"Language Code" : "Codice lingua",
"Issue Stylesheet" : "Stylesheet Issue",
"Insert Table of Contents Page into publication" : "Inserire Sommario Pagina in pubblicazione",
"Include Fonts folder (may cause validation to fail)" : "Includi cartella Fonts (può causare la convalida per fallire)",
"Keywords" : "Parole Chiave",
"(optional comma-separated list)" : "(elenco separato da virgole opzionale)",
"Description" : "descrizione",
"DELETE all old .epub files from server" : "Eliminare tutti i vecchi file .epub da server",
"Output Console" : "Console uscita",
"experimental" : "sperimentale",
"No images sub-folder is set!  No images will be included in ePub." : "Nessuna immagine sotto-cartella è impostato! Nessuna immagine saranno inclusi in ePub.",
"Cover image filename extension indicates it is NOT an image file!" : "Copertina estensione file immagine indica che non è un file di immagine!"
});RYU.addon.localize.translate();};