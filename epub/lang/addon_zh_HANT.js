/* Add-On Localization File for language code "zh_HANT"
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
"Title" : "稱號",
"Auto Fill" : "自動填充",
"Author" : "筆者",
"Publisher" : "出版者",
"Copyright" : "版權",
"Either copyright notice or copyleft license info" : "無論是版權聲明或copyleft的許可信息",
"Publication Date" : "出版日期",
"Image Folder" : "圖像文件夾",
"Cover Image" : "封面圖片",
"(optional)" : "（可選）",
"Unique ID" : "獨特的ID",
"or URL of either Ryuzine version, download link, or information page about publication" : "或任Ryuzine版本，下載鏈接或信息頁有關的出版物URL",
"Language Code" : "語言代碼",
"Issue Stylesheet" : "問題樣式表",
"Insert Table of Contents Page into publication" : "插入目錄頁到出版",
"Include Fonts folder (may cause validation to fail)" : "包括字體文件夾（可能會導致驗證失敗）",
"Keywords" : "關鍵詞",
"(optional comma-separated list)" : "（可選逗號分隔的列表）",
"Description" : "描述",
"DELETE all old .epub files from server" : "刪除服務器上的所有舊.epub文件",
"Output Console" : "輸出控制台",
"experimental" : "試驗",
"No images sub-folder is set!  No images will be included in ePub." : "沒有圖像子文件夾設置！沒有圖像將被納入ePub格式。",
"Cover image filename extension indicates it is NOT an image file!" : "封面圖片文件擴展名表明它不是一個圖像文件！"
});RYU.addon.localize.translate();};