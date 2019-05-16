/* Add-On Localization File for language code "el"
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
"Title" : "τίτλος",
"Auto Fill" : "Αυτόματη Συμπληρώστε",
"Author" : "συγγραφέας",
"Publisher" : "εκδότης",
"Copyright" : "πνευματική ιδιοκτησία",
"Either copyright notice or copyleft license info" : "Είτε σημείωση πνευματικών δικαιωμάτων ή copyleft Πληροφορίες άδεια",
"Publication Date" : "Ημερομηνία Έκδοσης",
"Image Folder" : "φάκελο εικόνων",
"Cover Image" : "Εξώφυλλο",
"(optional)" : "(προαιρετικό)",
"Unique ID" : "Μοναδικό αναγνωριστικό",
"or URL of either Ryuzine version, download link, or information page about publication" : "ή το URL είτε Ryuzine έκδοση, download link, ή σελίδα πληροφοριών σχετικά με τη δημοσίευση",
"Language Code" : "Γλώσσα Κωδικός",
"Issue Stylesheet" : "στυλ Έκδοση",
"Insert Table of Contents Page into publication" : "Εισαγωγή Περιεχόμενα Σελίδα σε δημοσίευση",
"Include Fonts folder (may cause validation to fail)" : "Συμπεριλάβετε φάκελο Fonts (μπορεί να προκαλέσει την αποτυχία επικύρωσης)",
"Keywords" : "Λέξεις-κλειδιά",
"(optional comma-separated list)" : "(προαιρετικό λίστα διαχωρισμένη με κόμμα)",
"Description" : "περιγραφή",
"DELETE all old .epub files from server" : "DELETE όλα τα παλιά .epub αρχεία από τον server",
"Output Console" : "έξοδο της κονσόλας",
"experimental" : "πειραματικός",
"No images sub-folder is set!  No images will be included in ePub." : "Δεν υπάρχουν φωτογραφίες υποφάκελο βρίσκεται! Δεν υπάρχουν φωτογραφίες θα συμπεριληφθούν σε ePub.",
"Cover image filename extension indicates it is NOT an image file!" : "Καλύψτε την επέκταση αρχείου εικόνας δηλώνει ότι δεν είναι ένα αρχείο εικόνας!"
});RYU.addon.localize.translate();};