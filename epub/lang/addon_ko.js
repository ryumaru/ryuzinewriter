/* Add-On Localization File for language code "ko.txt"
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
"Title" : "이름",
"Auto Fill" : "자동 채우기",
"Author" : "저자",
"Publisher" : "발행자",
"Copyright" : "저작권",
"Either copyright notice or copyleft license info" : "저작권 표시 또는 카피 레프트 라이센스 정보 중 하나",
"Publication Date" : "출판 일",
"Image Folder" : "이미지 폴더",
"Cover Image" : "표지 이미지",
"(optional)" : "(선택 사항)",
"Unique ID" : "고유 ID",
"or URL of either Ryuzine version, download link, or information page about publication" : "또는 간행물에 대한 하나 Ryuzine 버전, 다운로드 링크, 또는 정보 페이지의 URL",
"Language Code" : "언어 코드",
"Issue Stylesheet" : "문제 스타일 시트",
"Insert Table of Contents Page into publication" : "출판물에 목차 페이지의 표를 삽입",
"Include Fonts folder (may cause validation to fail)" : "글꼴 폴더 포함 (유효성 검사가 실패 할 수 있습니다)",
"Keywords" : "키워드",
"(optional comma-separated list)" : "(선택 쉼표로 구분 된 목록)",
"Description" : "기술",
"DELETE all old .epub files from server" : "서버에서 모든 이전에 .epub 파일을 삭제",
"Output Console" : "출력 콘솔",
"experimental" : "실험",
"No images sub-folder is set!  No images will be included in ePub." : "어떤 이미지 폴더는 하위 설정되지 않습니다! 어떤 이미지가 ePub에 포함되지 않습니다.",
"Cover image filename extension indicates it is NOT an image file!" : "커버 이미지 파일 확장자는 이미지 파일되지 않음을 나타냅니다!"
});RYU.addon.localize.translate();};