/*
name	: "Marvel Skins",
version	: "1.0",
author	: "Marvelapp",
url		: "https://github.com/marvelapp/devices.css",
license	: "MIT",
about	: "Adds pure CSS device skins for Ryuzine Writer Simulator adapted for Ryuzine by K.M. Hansen."
	
	Adds Pure CSS Skins to Ryuzine Writer Simulator
	These skins are light-weight, flat, and resolution
	independent vector artwork.
	
	These were created by Marvelapp and released under
	an MIT License.  The Source Code and latest version
	is available at:
	
	https://github.com/marvelapp/devices.css
	
	Note: Marvelapp did not create and does not maintain
	this Ryuzine Writer add-on.

*/
RYU.addon.register(function(){
	// list of devices to add to Simulator
	var deviceList = [
		["iPhone 4s (Black)","phone","iOS","marvel-device iphone4s black","marvel_skins","iphone4s"],
		["iPhone 4s (Silver)","phone","iOS","marvel-device iphone4s silver","marvel_skins","iphone4s"],
		["iPad Mini (Black)","tablet","iOS","marvel-device ipad black","marvel_skins","ipad"],
		["iPad Mini (Silver)","tablet","iOS","marvel-device ipad silver","marvel_skins","ipad"],
		["iPhone 6 (Black)","phone","iOS","marvel-device iphone6 black","marvel_skins","iphone6"],
		["iPhone 6 (White)","phone","iOS","marvel-device iphone6 white","marvel_skins","iphone6"],
		["iPhone 6 (Gold)","phone","iOS","marvel-device iphone6 gold","marvel_skins","iphone6"],
		["iPhone 6 Plus (Black)","phone","iOS","marvel-device iphone6plus black","marvel_skins","iphone6plus"],
		["iPhone 6 Plus (White)","phone","iOS","marvel-device iphone6plus white","marvel_skins","iphone6plus"],
		["iPhone 6 Plus (Gold)","phone","iOS","marvel-device iphone6plus gold","marvel_skins","iphone6plus"],
		["iPhone 5s (Black)","phone","iOS","marvel-device iphone5s black","marvel_skins","iphone5s"],
		["iPhone 5s (Silver)","phone","iOS","marvel-device iphone5s silver","marvel_skins","iphone5s"],
		["iPhone 5s (Gold)","phone","iOS","marvel-device iphone5s gold","marvel_skins","iphone5s"],
		["iPhone 5c (White)","phone","iOS","marvel-device iphone5c white","marvel_skins","iphone5c"],
		["iPhone 5c (Red)","phone","iOS","marvel-device iphone5c red","marvel_skins","iphone5c"],
		["iPhone 5c (Yellow)","phone","iOS","marvel-device iphone5c yellow","marvel_skins","iphone5c"],
		["iPhone 5c (Green)","phone","iOS","marvel-device iphone5c green","marvel_skins","iphone5c"],
		["iPhone 5c (Blue)","phone","iOS","marvel-device iphone5c blue","marvel_skins","iphone5c"],
		["Nexus 5 (Marvel)","phone","Android4","marvel-device nexus5","marvel_skins","nexus5"],
		["HTC One (Marvel)","phone","Android4","marvel-device htc-one","marvel_skins","htc-one"],
		["Samsung S5 (White)","phone","TouchWiz3","marvel-device s5 white","marvel_skins","s5"],
		["Samsung S5 (Black)","phone","TouchWiz3","marvel-device s5 black","marvel_skins","s5"],
		["Nokia Lumia 920 (Black)","phone","WP7","marvel-device lumia920 black","marvel_skins","lumia920"],
		["Nokia Lumia 920 (White)","phone","WP7","marvel-device lumia920 white","marvel_skins","lumia920"],
		["Nokia Lumia 920 (Yellow)","phone","WP7","marvel-device lumia920 yellow","marvel_skins","lumia920"],
		["Nokia Lumia 920 (Red)","phone","WP7","marvel-device lumia920 red","marvel_skins","lumia920"],
		["Nokia Lumia 920 (Blue)","phone","WP7","marvel-device lumia920 blue","marvel_skins","lumia920"],
	];
	// Push them onto the main config.deviceList
	for (var d=0; d < deviceList.length; d++) {
		var append = true;	// assume it will be appended
		for (var s=0; s < RYU.config.deviceList.length; s++) {
			if (deviceList[d][0] == RYU.config.deviceList[s][0]) {
				append = false;	// item with name already in list!
			}
		}
		if (append!=false) {
			RYU.config.deviceList.push(deviceList[d]);
		}
	}
	// update the drop-down menu in Simulator workspace
	var devOpts = "";
	for (var m=0; m < RYU.config.deviceList.length; m++) {
		devOpts = devOpts+'<option value="'+m+'">'+RYU.config.deviceList[m][0]+'</option>\n';
	}
	document.getElementById('device_selector').innerHTML = devOpts;
	return {
		name : 'marvel_skins',
		requires : ['ryuzinewriter'],
		info : {
			name	: "Marvel Skins",
			version	: "1.0",
			author	: "Marvelapp",
			url		: "https://github.com/marvelapp/devices.css",
			license	: "MIT",
			about	: "Adds pure CSS device skins for Ryuzine Writer Simulator adapted for Ryuzine by K.M. Hansen."
		},
		// Add Marvel-Device elements to the Ryuzine Writer Simulator
		actions : function() {
			var device = document.getElementById('device');
			var screen = document.getElementById('screen');
			var newdivs = [];
			var classes = ['top-bar','sleep','volume','camera','sensor','speaker','home','bottom-bar'];
			for (var n=0; n < 9; n++) {
				newdivs[n] = document.createElement('div');
				newdivs[n].className = classes[n];
				if (n<7) {
					device.appendChild(newdivs[n]);
				}
			}
			device.appendChild(screen);
			device.appendChild(newdivs[7]);	
		}
	}
}()
);