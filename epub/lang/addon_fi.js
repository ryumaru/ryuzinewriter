/* Add-On Localization File for language code "fi"
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
"Title" : "otsikko",
"Auto Fill" : "Auto Fill",
"Author" : "kirjailija",
"Publisher" : "kustantaja",
"Copyright" : "tekijänoikeus",
"Either copyright notice or copyleft license info" : "Joko tekijänoikeus tai copyleft lisenssin info",
"Publication Date" : "Julkaisupäivämäärä",
"Image Folder" : "kuvakansio",
"Cover Image" : "Cover Image",
"(optional)" : "(valinnainen)",
"Unique ID" : "Unique ID",
"or URL of either Ryuzine version, download link, or information page about publication" : "tai URL joko Ryuzine versio, latauslinkki, tai tietoja sivun noin julkaisu",
"Language Code" : "Kieli koodi",
"Issue Stylesheet" : "Issue Stylesheet",
"Insert Table of Contents Page into publication" : "Lisää sisällysluettelo sivun julkaisu",
"Include Fonts folder (may cause validation to fail)" : "Sisällytä Fonts (voi aiheuttaa validointi epäonnistuu)",
"Keywords" : "Avainsanat",
"(optional comma-separated list)" : "(valinnainen pilkuilla eroteltu luettelo)",
"Description" : "kuvaus",
"DELETE all old .epub files from server" : "Poista kaikki vanhat .epub tiedostoja palvelimelta",
"Output Console" : "lähtö Console",
"experimental" : "kokeellinen",
"No images sub-folder is set!  No images will be included in ePub." : "Ei kuvia alikansio on asetettu! Ei kuvia sisällytetään ePub.",
"Cover image filename extension indicates it is NOT an image file!" : "Kansikuva tiedostopääte osoittaa se ei ole kuvatiedosto!"
});RYU.addon.localize.translate();};