/* Add-On Localization File for language code "pt"
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
"Auto Fill" : "preenchimento automático",
"Author" : "autor",
"Publisher" : "editor",
"Copyright" : "direitos autorais",
"Either copyright notice or copyleft license info" : "De qualquer aviso de copyright ou informações de licença copyleft",
"Publication Date" : "Data De Publicação",
"Image Folder" : "pasta Imagem",
"Cover Image" : "Cover Image",
"(optional)" : "(opcional)",
"Unique ID" : "Unique ID",
"or URL of either Ryuzine version, download link, or information page about publication" : "ou URL de qualquer versão Ryuzine, link para download, ou página de informações sobre a publicação",
"Language Code" : "Código idioma",
"Issue Stylesheet" : "questão de estilo",
"Insert Table of Contents Page into publication" : "Insira Índice Page em publicação",
"Include Fonts folder (may cause validation to fail)" : "Incluir pasta Fontes (pode causar a falha de validação)",
"Keywords" : "Palavras-chave",
"(optional comma-separated list)" : "(lista separada por vírgula opcional)",
"Description" : "descrição",
"DELETE all old .epub files from server" : "Exclua todos os arquivos .epub antigos do servidor",
"Output Console" : "Output Console",
"experimental" : "experimental",
"No images sub-folder is set!  No images will be included in ePub." : "Não há imagens sub-pasta está definida! Não há imagens serão incluídas em ePub.",
"Cover image filename extension indicates it is NOT an image file!" : "Capa extensão de arquivo de imagem indica que ele não é um arquivo de imagem!"
});RYU.addon.localize.translate();};