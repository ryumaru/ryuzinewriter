/* Add-On Localization File for language code "ru"
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
"Title" : "название",
"Auto Fill" : "Auto Fill",
"Author" : "автор",
"Publisher" : "издатель",
"Copyright" : "авторское право",
"Either copyright notice or copyleft license info" : "Либо уведомление об авторских правах или авторское лево информация о лицензии,",
"Publication Date" : "Дата Публикации",
"Image Folder" : "Папка изображение",
"Cover Image" : "изображение на обложке",
"(optional)" : "(по желанию)",
"Unique ID" : "Уникальный ID",
"or URL of either Ryuzine version, download link, or information page about publication" : "или URL либо Ryuzine версии, ссылки на скачивание, или информационной страницы о публикации",
"Language Code" : "Код языка",
"Issue Stylesheet" : "стилей Выпуск",
"Insert Table of Contents Page into publication" : "Вставить таблицу содержимого страниц в публикации",
"Include Fonts folder (may cause validation to fail)" : "Включить папку Fonts (может привести к валидации на провал)",
"Keywords" : "Ключевые слова",
"(optional comma-separated list)" : "(по желанию разделенный запятыми список)",
"Description" : "описание",
"DELETE all old .epub files from server" : "Удалить все старые EPUB с файлов с сервера",
"Output Console" : "Выход консоли",
"experimental" : "экспериментальный",
"No images sub-folder is set!  No images will be included in ePub." : "Нет фотографий вложенных папок установлен! Нет фотографий будут включены в EPUB.",
"Cover image filename extension indicates it is NOT an image file!" : "Обложка расширение имя файла образа указывает, что это НЕ файл изображения!"
});RYU.addon.localize.translate();};