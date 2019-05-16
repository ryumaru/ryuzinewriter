/*	
name	: "Legacy Skins"
version	: 1.0
author	: K.M. Hansen
url		: http://www.kmhcreative.com/labs
license	: MIT
	
	Adds older devices to the Ryuzine Writer simulator.
	These are all the original skins that were included
	with RyuzineWriter now moved into an optional add-on.
	
	If a device with the same name is already in the list
	the one in this add-on will not be added as well (but
	note that it ONLY checks for the name, nothing else).
	
	If you have created custom device profiles the devices
	list is saved into a cookie file which may already have
	the devices below in it.  If that's the case, even if this
	add-on isn't loaded the Simulator will still try to refer
	to the profiles in it, which is only a problem if you move
	or delete this add-on from your "addons" folder.

*/
RYU.addon.register(function(){
	// list of devices to add to Simulator
	var deviceList = [
		["iPhone 3gs","phone","iOS_5","iphone3","legacy_skins"],
		["iPad (original)","tablet","iOS_5","ipad","legacy_skins"],
		["HTC Droid","phone","Android2","htc_droid","legacy_skins"],
		["Samsung Focus S","phone","WP7","focus_s","legacy_skins"],
		["Surface RT","tablet","W8M","surface_rt","legacy_skins"],
		["Surface Pro","tablet","W8M","surface_pro","legacy_skins"],
		["BB Playbook","tablet","BBOS","playbook","legacy_skins"],
		["HP TouchPad","tablet","webOS","touchpad","legacy_skins"]
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
		name : 'legacy_skins',
		requires : ['ryuzinewriter'],
		info : {
			name	: "Legacy Skins",
			version	: "1.0",
			author	: "K.M. Hansen",
			url		: "http://www.kmhcreative.com/labs",
			license	: "MIT",
			about	: "Adds skins for older devices to RyuzineWriter Simulator"
		},
		inject : {css:[['os/os.css?0.9',2,'legacy_os']]}
	}
}()
);