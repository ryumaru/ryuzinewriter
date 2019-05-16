/* Add-On Localization File for language code "es"
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
"Title" : "título",
"Auto Fill" : "Auto Fill",
"Author" : "autor",
"Publisher" : "editor",
"Copyright" : "derechos de autor",
"Either copyright notice or copyleft license info" : "De cualquier aviso de copyright o información de licencia copyleft",
"Publication Date" : "Fecha De Publicación",
"Image Folder" : "carpeta de imagen",
"Cover Image" : "imagen de la cubierta",
"(optional)" : "(opcional)",
"Unique ID" : "Steam ID",
"or URL of either Ryuzine version, download link, or information page about publication" : "o URL de cualquiera de las versiones Ryuzine, enlace de descarga, o página de información sobre la publicación",
"Language Code" : "Código de Idioma",
"Issue Stylesheet" : "Emisión de estilos",
"Insert Table of Contents Page into publication" : "Insertar Tabla de Contenidos Página en publicación",
"Include Fonts folder (may cause validation to fail)" : "Incluir carpeta Fonts (puede causar la validación falle)",
"Keywords" : "Palabras clave",
"(optional comma-separated list)" : "(lista separada por comas opcional)",
"Description" : "descripción",
"DELETE all old .epub files from server" : "Borrar todos los archivos antiguos .epub desde un servidor",
"Output Console" : "salida de consola",
"experimental" : "experimental",
"No images sub-folder is set!  No images will be included in ePub." : "No hay imágenes subcarpeta se encuentra! No hay imágenes serán incluidas en ePub.",
"Cover image filename extension indicates it is NOT an image file!" : "Cubierta de extensión de nombre de archivo de imagen indica que no es un archivo de imagen!"
});RYU.addon.localize.translate();};