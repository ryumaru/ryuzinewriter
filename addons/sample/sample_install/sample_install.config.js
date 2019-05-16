/*
name	: "Sample Install",
version	: "1.0",
author	: "K.M. Hansen",
url		: "http://www.github.com/ryumaru/",
license	: "MIT",
about	: "Dummy add-on installed by Ryuzine Writer Sample Add-On."

	Ryuzine Writer Add-Ons can also automatically install additional
	add-ons for Ryuzine Reader & Rack.  For example, the Writer Add-On
	might have tools for authoring content that is processed in the
	Reader/Rack webapps by a related add-on, which the the publisher
	may not already have installed.  Add-On's that install other
	Add-Ons always ask permission before doing so.
	
	See the "sample" add-on in ryuzinewriter/addons/ which is heavily
	commented in order to show you how to create your own add-ons.

 */
 RYU.addon.register(
{
	name : 'sample_install',
	info : {
		name	: "Sample Install",
		version	: "1.0",
		author	: "K.M. Hansen",
		url		: "http://www.github.com/ryumaru/",
		license	: "MIT",
		about	: "Dummy add-on installed by Ryuzine Writer Sample Add-On."
	}
});