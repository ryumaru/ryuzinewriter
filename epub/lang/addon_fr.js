/* Add-On Localization File for language code "fr"
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
"Title" : "titre",
"Auto Fill" : "Remplissage automatique",
"Author" : "auteur",
"Publisher" : "éditeur",
"Copyright" : "droit d'auteur",
"Either copyright notice or copyleft license info" : "Soit notice de copyright ou les informations de licence copyleft",
"Publication Date" : "Date de publication",
"Image Folder" : "Dossier d'image",
"Cover Image" : "image de couverture",
"(optional)" : "(facultatif)",
"Unique ID" : "unique ID",
"or URL of either Ryuzine version, download link, or information page about publication" : "ou URL soit la version Ryuzine, lien de téléchargement, ou une page d'informations sur la publication",
"Language Code" : "code de langue",
"Issue Stylesheet" : "Feuille de style d'émission",
"Insert Table of Contents Page into publication" : "Insérez Table des matières Page dans la publication",
"Include Fonts folder (may cause validation to fail)" : "Inclure le dossier Fonts (peut causer l'échec de la validation)",
"Keywords" : "Mots-clés",
"(optional comma-separated list)" : "(liste séparée par des virgules optionnel)",
"Description" : "description",
"DELETE all old .epub files from server" : "Effacer tous les anciens fichiers epub depuis un serveur",
"Output Console" : "Console de contrôle",
"experimental" : "expérimental",
"No images sub-folder is set!  No images will be included in ePub." : "Aucune image sous-dossier est réglé! Aucune image ne seront inclus dans ePub.",
"Cover image filename extension indicates it is NOT an image file!" : "Couverture prolongation image de nom de fichier indique qu'il ne est pas un fichier d'image!"
});RYU.addon.localize.translate();};