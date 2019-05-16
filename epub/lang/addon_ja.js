/* Add-On Localization File for language code "ja"
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
"ePub Export" : "ePubをエクスポート",
"Auto Fill" : "自動塗りつぶし",
"Title" : "タイトル",
"Author" : "著者",
"Publisher" : "出版社",
"Copyright" : "著作権",
"Either copyright notice or copyleft license info" : "著作権情報やコピーレフトライセンス情報のどちらか",
"Publication Date" : "刊行日",
"Image Folder" : "画像フォルダー",
"Cover Image" : "表紙画像",
"(optional)" : "（オプション）",
"Unique ID" : "一意のID",
"or URL of either Ryuzine version, download link, or information page about publication" : "または出版物約どちらRyuzineバージョン、ダウンロードリンク、または情報ページのURL",
"Language Code" : "言語コード",
"Issue Stylesheet" : "発行スタイルシート",
"Insert Table of Contents Page into publication" : "文書に目次ページのテーブルを挿入",
"Include Fonts folder (may cause validation to fail)" : "フォントフォルダを含める（検証が失敗する可能性があります）",
"Keywords" : "キーワード",
"(optional comma-separated list)" : "（オプションのカンマ区切りのリスト）",
"Description" : "説明",
"DELETE all old .epub files from server" : "サーバーからすべての古いの.epubファイルを削除します",
"Output Console" : "出力コンソール",
"experimental" : "実験的",
"No images sub-folder is set!  No images will be included in ePub." : "いいえ画像は、フォルダをサブ設定されていません！いいえ画像はePubをには含まれません。",
"Cover image filename extension indicates it is NOT an image file!" : "表紙画像ファイル名の拡張子は、画像ファイルではありませんことを示し！"
});RYU.addon.localize.translate();};