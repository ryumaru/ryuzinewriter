/* Add-On Localization File for language code "hi"
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
"Title" : "शीर्षक",
"Auto Fill" : "ऑटो भरें",
"Author" : "लेखक",
"Publisher" : "प्रकाशक",
"Copyright" : "कॉपीराइट",
"Either copyright notice or copyleft license info" : "कॉपीराइट नोटिस या copyleft लाइसेंस जानकारी या तो",
"Publication Date" : "प्रकाशन की तिथि",
"Image Folder" : "छवि फ़ोल्डर",
"Cover Image" : "कवर छवि",
"(optional)" : "(वैकल्पिक)",
"Unique ID" : "अनोखा ID",
"or URL of either Ryuzine version, download link, or information page about publication" : "या प्रकाशन के बारे में या तो Ryuzine संस्करण, डाउनलोड लिंक, या जानकारी पृष्ठ का URL",
"Language Code" : "भाषा कोड",
"Issue Stylesheet" : "मुद्दा स्टाइलशीट",
"Insert Table of Contents Page into publication" : "प्रकाशन में सामग्री पृष्ठ की तालिका डालें",
"Include Fonts folder (may cause validation to fail)" : "फ़ॉन्ट्स फ़ोल्डर शामिल (सत्यापन विफल होने का कारण हो सकते हैं)",
"Keywords" : "कीवर्ड",
"(optional comma-separated list)" : "(वैकल्पिक अल्पविराम से अलग सूची)",
"Description" : "विवरण",
"DELETE all old .epub files from server" : "सर्वर से सभी पुराने .epub फाइलों को नष्ट",
"Output Console" : "आउटपुट कंसोल",
"experimental" : "प्रयोगात्मक",
"No images sub-folder is set!  No images will be included in ePub." : "कोई चित्र-फ़ोल्डर उप सेट किया जाता है! कोई चित्र नहीं ePub में शामिल किया जाएगा।",
"Cover image filename extension indicates it is NOT an image file!" : "कवर छवि फ़ाइल नाम एक्सटेंशन यह एक छवि फ़ाइल नहीं है इंगित करता है!"
});RYU.addon.localize.translate();};