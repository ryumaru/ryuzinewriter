/* Add-On Localization File for language code "zh_HANS"
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
"Title" : "称号",
"Auto Fill" : "自动填充",
"Author" : "笔者",
"Publisher" : "出版者",
"Copyright" : "版权",
"Either copyright notice or copyleft license info" : "无论是版权声明或copyleft的许可信息",
"Publication Date" : "出版日期",
"Image Folder" : "图像文件夹",
"Cover Image" : "封面图片",
"(optional)" : "（可选）",
"Unique ID" : "独特的ID",
"or URL of either Ryuzine version, download link, or information page about publication" : "或任Ryuzine版本，下载链接或信息页有关的出版物URL",
"Language Code" : "语言代码",
"Issue Stylesheet" : "问题样式表",
"Insert Table of Contents Page into publication" : "插入目录页到出版",
"Include Fonts folder (may cause validation to fail)" : "包括字体文件夹（可能会导致验证失败）",
"Keywords" : "关键词",
"(optional comma-separated list)" : "（可选逗号分隔的列表）",
"Description" : "描述",
"DELETE all old .epub files from server" : "删除服务器上的所有旧.epub文件",
"Output Console" : "输出控制台",
"experimental" : "试验",
"No images sub-folder is set!  No images will be included in ePub." : "没有图像子文件夹设置！没有图像将被纳入ePub格式。",
"Cover image filename extension indicates it is NOT an image file!" : "封面图片文件扩展名表明它不是一个图像文件！"
});RYU.addon.localize.translate();};