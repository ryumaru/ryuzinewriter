/*	
name	: Brand Catalog
version	: 1.0
author	: K.M. Hansen
url		: http://www.kmhcreative.com/labs
license	: MIT
about	: Adds Back to RackBuilder the ability to edit the catalog masthead image.

 */
RYU.addon.register(function(){
	var editbox = document.createElement('div');
		editbox.setAttribute('style','display:table;margin: 10px auto;');
		editbox.innerHTML = '<strong class="l10n">Catalog Branding Logo:</strong> <input id="masthead" type="text" /> <em class="l10n">(optional)</em>';
	document.getElementById('databuilder').getElementsByClassName('area')[0].insertBefore(editbox,document.getElementById('rackdata'));
	// that's it! Rest of the code is still in the RackBuilder functions.
	return {
		name : 'brand_catalog',
		requires : ['ryuzinewriter'],
		info : {
			name	: "Brand Catalog",
			version	: "1.0",
			author	: "K.M. Hansen",
			url		: "http://www.kmhcreative.com/labs",
			license	: "MIT",
			about	: "Adds Back to RackBuilder the ability to edit the catalog masthead image."
		}	
	};
}()
);