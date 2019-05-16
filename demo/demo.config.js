/*	
name	: Writer Demo
version	: 1.0
author	: K.M. Hansen
url		: http://www.kmhcreative.com/labs
license	: MIT
	
	* NOTES:
	This is for the online demo on the www.ryumaru.com website

 */
RYU.addon.register(function(){
	if (RYU.addon.localize) {
		switch(RYU.config.language) {
		case 'en':
		var title = 'Welcome to the Demo!'; 
		var text = 'This is the online demo of our Ryuzine Writer authoring webapp so some features have been disabled. If you like it hit the "Download" link on the Start Screen. Press the button below to begin your Guided Tour! (Tour duration 3 minutes 22 seconds)';
		var label = 'Start';
		var dload = 'Download Ryuzine';
		break;
		case 'de':
		var title = 'Willkommen auf der Demo!'
		var text = 'Dies ist der Online-Demo von unserem Ryuzine Writer Authoring Webapp so einige Funktionen wurden deaktiviert. Wenn Sie traf es den Link "Download" auf dem Startbildschirm. Drücken Sie auf die Schaltfläche unten, um Ihre Führung beginnen! (Tour Zeit: 3 Minuten 22 Sekunden)';
		var label = 'Start';
		var dload = 'Herunterladen Ryuzine';		
		break;
		case 'es':
		var title = 'Bienvenido a la demo!';
		var text = 'Esta es la demostración en línea de nuestra Ryuzine Escritor autoría webapp por lo que algunas características se han deshabilitado. Si te gusta lo golpeó en el vínculo "Descargar" en la pantalla de Inicio. Pulse el botón de abajo para empezar su visita guiada! (Duración del Tour 3 minutos 22 segundos)';
		var label = 'Comienzo';
		var dload = 'Descarga Ryuzine';
		break;
		case 'fr':
		var title = 'Bienvenue à la démo!';
		var text = 'Ce est la démonstration en ligne de notre Ryuzine Writer création webapp sorte que certaines fonctions ont été désactivées. Si vous aimez il a frappé le lien "Télécharger" sur l\'écran de démarrage. Appuyez sur le bouton ci-dessous pour commencer votre visite guidée!';
		var label = 'Début';
		var dload = 'Télécharger Ryuzine';
		break;
		case 'ja':
		var title = 'デモへようこそ！';
		var text = 'これは、一部の機能が無効になっている私たちのRyuzineライターオーサリングWebアプリケーションのオンラインデモです。あなたが好きなら、それはスタート画面上の「ダウンロード」のリンクをヒット。あなたのガイドツアーを開始するには、以下のボタンを押してください！ （ツアー所要時間3分22秒）';
		var label = 'スタート'
		var dload = 'Ryuzineをダウンロード';
		break;
		case 'zh_HANS':
		var title = '欢迎来到演示！';
		var text = '这是我们Ryuzine作家创作的web应用，使某些功能已被禁用的在线演示。如果你喜欢它打在开始屏幕中的“下载”链接。按下面的按钮，开始您的指导教程！ （游览时间为3分22秒）';
		var label = '开始';
		var dload = '下载Ryuzine';
		break;
		case 'zh_HANT':
		var title = '歡迎來到演示！';
		var text = '這是我們Ryuzine作家創作的web應用，使某些功能已被禁用的在線演示。如果你喜歡它打在開始屏幕中的“下載”鏈接。按下面的按鈕，開始您的指導教程！ （遊覽時間為3分22秒）';
		var label = '開始';
		var dload = '下載Ryuzine';
		break;
		case 'da':
		var title = 'Velkommen til Demo!';
		var text = 'Dette er den online demo af vores Ryuzine Writer authoring webapp så nogle funktioner er blevet deaktiveret. Hvis du kan lide det ramte linket "Download" på startskærmen. Tryk på knappen nedenfor for at begynde din Guided Tour! (Tour varighed 3 minutter 22 sekunder)';
		var label = 'Start';
		var dload = 'Hent Ryuzine';
		break;
		case 'fi':
		var title = 'Tervetuloa Demo!';
		var text = 'Tämä on online-demo meidän Ryuzine Writer kirjoittamisen webapp joten joitakin ominaisuuksia on poistettu käytöstä. Jos pidät sitä osuma "Lataa" -linkkiä Start Screen. Paina nappia aloittaaksesi Opastettu kierros! (Tour kesto 3 minuuttia 22 sekuntia)';
		var label = 'Alku';
		var dload = 'Lataa Ryuzine';
		break;
		case 'el':
		var title = 'Καλώς ήλθατε στο Demo!';
		var text = 'Αυτό είναι το online demo του Ryuzine συγγραφέας μας συγγραφής webapp έτσι έχουν κάποια χαρακτηριστικά έχουν απενεργοποιηθεί. Αν σας αρέσει να χτυπήσει το σύνδεσμο "Λήψη" στην αρχική οθόνη. Πατήστε το κουμπί παρακάτω για να ξεκινήσετε Ξενάγηση σας! (Διάρκεια Tour 3 λεπτά 22 δευτερόλεπτα)';
		var label = 'αρχή';
		var dload = 'Κατεβάστε Ryuzine';
		break;
		case 'hi':
		var title = 'डेमो के लिए आपका स्वागत है!';
		var text = 'यह तो कुछ सुविधाओं को अक्षम कर दिया गया है हमारे Ryuzine लेखक संलेखन webapp के ऑनलाइन डेमो है। आप चाहें, तो इसे शुरू स्क्रीन पर "डाउनलोड" लिंक मारा। अपने गाइडेड टूर शुरू करने के लिए नीचे दिए गए बटन दबाएँ! (यात्रा की अवधि 3 मिनट 22 सेकंड)';
		var label = 'शुरु';
		var dload = 'Ryuzine डाउनलोड';
		break;
		case 'it':
		var title = 'Benvenuti al Demo!';
		var text = 'Questa è la demo online del nostro Ryuzine Writer authoring webapp così alcune funzioni sono state disattivate. Se ti piace colpire il link "Download" nella schermata di avvio. Premere il pulsante qui sotto per iniziare la tua visita guidata! (Durata Tour 3 minuti 22 secondi)';
		var label = 'Inizio';
		var dload = 'Scarica Ryuzine';
		break;
		case 'ko':
		var title = '데모에 오신 것을 환영합니다!';
		var text = '이 때문에 일부 기능이 중지되었습니다 우리의 Ryuzine 작가 제작 웹 애플리케이션의 온라인 데모입니다. 당신이 좋아하는 경우는 시작 화면에서 \'다운로드\'링크를 누르십시오. 당신의 가이드 투어를 시작하려면 아래의 버튼을 눌러! (투어 기간 삼분 22초)';
		var label = '스타트';
		var dload = 'Ryuzine 다운로드';
		break;
		case 'no':
		var title = 'Velkommen til Demo!';
		var text = 'Dette er den elektroniske demo av vår Ryuzine Writer authoring webapp så noen funksjoner har blitt deaktivert. Hvis du liker det trykke "Last ned" linken på Start-skjermen. Trykk på knappen nedenfor for å starte Guided Tour! (Tour varighet 3 minutter 22 sekunder)';
		var label = 'Start';
		var dload = 'Last ned Ryuzine';
		break;
		case 'pt':
		var title = 'Bem-vindo à demonstração!';
		var text = 'Esta é a demonstração on-line do nosso Ryuzine Escritor autoria webapp assim algumas características foram desativadas. Se você gosta de bater no link "Download" na tela Iniciar. Pressione o botão abaixo para iniciar sua visita guiada! (Duração Posto de 3 minutos 22 segundo)';
		var label = 'Começo';
		var dload = 'Baixe Ryuzine';
		break;
		case 'ru':
		var title = 'Добро пожаловать на демонстрационную!';
		var text = 'Это онлайн демо нашего Ryuzine Писатель авторской веб-приложение, поэтому некоторые функции были отключены. Если вам нравится попал в ссылку "Скачать" на стартовом экране. Нажмите на кнопку ниже, чтобы начать экскурсию! (Продолжительность тура 3 минуты 22 секунд)';
		var label = 'начало';
		var dload = 'Скачать Ryuzine';
		break;
		case 'sv':
		var title = 'Välkommen till Demo!';
		var text = 'Detta är online demo av vår Ryuzine Writer författande webapp så vissa funktioner har inaktiverats. Om du gillar det drabbade länken "Download" på Start-skärmen. Tryck på knappen nedan för att börja din Guided Tour! (Tour varaktighet 3 minuter 22 sekunder)';
		var label = 'Start';
		var dload = 'Ladda Ryuzine';
		break;
		default:
		var title = 'Welcome to the Demo!'; 
		var text = 'This is the online demo of our Ryuzine Writer authoring webapp so some features have been disabled. If you like it hit the "Download" link on the Start Screen. Press the button below to begin your Guided Tour! (Tour duration 3 minutes 22 seconds)';
		var label = 'Start';
		var dload = 'Download Ryuzine';
	};
	} else {
		var title = 'Welcome to the Demo!'; 
		var text = 'This is the online demo of our Ryuzine Writer authoring webapp so some features have been disabled. If you like it hit the "Download" link on the Start Screen. Press the button below to begin your Guided Tour! (Tour duration 3 minutes 22 seconds)';
		var label = 'Start';
		var dload = 'Download Ryuzine';
	}
	text = '<img src="ryuzinewriter/images/app/help/ryuzine_logo.png"class="center" />'+text;
	return {
		name : 'demo',
		requires : ['ryuzinewriter'],
		info : {
			name	: "Demo",
			version	: "1.0",
			author	: "K.M. Hansen",
			url		: "http://www.kmhcreative.com/labs",
			license	: "MIT",
			about	: "Adds an automatic Demo Mode to Ryuzine Writer."
		},	
		ui : {
			dialogs : [
				['dialog',title,text,[['button1','go_demo',label,function(){RYU.toggleDialog('demo_dialog');RYU.helpPlay(1);setTimeout("RYU.playHelp(0)",1500);},'preview right']],1,1]
			],
			controls : [
				['button1','dlryuzine',dload,function(){window.open('http://www.ryumaru.com/products/ryuzine/download/');},0,0,'start'],
				['button3','guidedtour','Guided Tour',function(){RYU.helpPlay(1);},0,0,'start']
			]
		},
	
		actions : function() {	// preload variables
			var chooser = document.getElementById('chooser') || document.getElementById('file_chooser');
			chooser.value = "wip_newsample.htm";
			document.getElementById('edition1').checked = true;
			document.getElementById('editionName').value = "newsample.css";
			var chooser4 = document.getElementById('chooser4') || document.getElementById('file_chooser4');
			chooser4.value = "2013_catalog.htm";
			var chooser5 = document.getElementById('chooser5') || document.getElementById('file_chooser5');
			chooser5.value = "newsample.css";
			var chooser6 = document.getElementById('chooser6') || document.getElementById('file_chooser6');
			chooser6.value = "simplestyles.css";
			setTimeout("RYU.toggleDialog('demo_dialog')",1000);
		}
	
	};
}()
);