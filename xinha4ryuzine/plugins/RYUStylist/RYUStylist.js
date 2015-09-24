/**
 * Add an empty css_style to Config object's prototype
 *  the format is { '.className' : 'Description' }
 */

Xinha.Config.prototype.css_style = { };

/**
 * This method loads an external stylesheet and uses it in the ryu_stylist
 *
 * @param string URL to the stylesheet
 * @param hash Alternate descriptive names for your classes 
 *              { '.fooclass': 'Foo Description' }
 * @param bool If set true then @import rules in the stylesheet are skipped,
 *   otherwise they will be incorporated if possible.
 */
// we need some way to get reference back from RYU Dialog
var RYU = RYU || {};
	RYU.RYUStylist = RYU.RYUStylist || {};
Xinha.prototype.ryu_load_css = function() {
/******	 OLD PROMPT BOX METHOD *****	
	// clear stored data
	for (var k in this.config.css_style) {
		delete this.config.css_style[k];
	}
	var url = prompt(Xinha._lc("Import stylesheet (located in /css) WARNING: This will clear anything in the Edition Styles panel and cannot be undone!","RYUStylist"));
	if (url) {
  	this.ryu_stylist_reset();
  	  		document.getElementById('custCSS').checked=true;
  			document.getElementById('custCSS_li').style.display="table-cell";
  			document.getElementById('custCSSName').value = 'css/'+url;
	url = _editor_url + "../../css/"+url
	this.config.ryu_stylistLoadStylesheet(url);
//  	this.addEditorStylesheet(url,0);
  	this._fillRYUStylist();
  	}
***** END OLD METHOD ******** */
  	RYU.RYUStylist = this;
  	RYU.toggleDialog('import_edition_styles',1);
		if (RYU.config.xfileman==1) {
			// refresh file list
			document.getElementById('file_list').src="ryuzinewriter/php/scandir.php";
			setTimeout(function(){
				var styles = document.getElementById('file_list').contentWindow.styles;
				var stylebox = '<select id="chooser6">';
				for (var s=0; s < styles.length; s++) {
					stylebox += '<option>'+styles[s]+'</option>';
				}
				stylebox += '</select>';
				document.getElementById('file_chooser6').innerHTML = stylebox;},300);
		}  	
}

Xinha.prototype.ryu_import_edition_css = function() {
	// clear stored data
	for (var k in this.config.css_style) {
		delete this.config.css_style[k];
	}
	var url = document.getElementById('chooser6').value;
  	this.ryu_stylist_reset();
  	  		document.getElementById('custCSS').checked=true;
  			document.getElementById('custCSS_li').style.display="table-cell";
  			document.getElementById('custCSSName').value = 'css/'+url;
	url = _editor_url + "../../css/"+url
	this.config.ryu_stylistLoadStylesheet(url);
  	this._fillRYUStylist();
}

Xinha.prototype.addEditorStylesheet = function(url,target) {
	if (url==null) { url = "";}
	if (target==null || target==0) { target = 'custom_css';} else { target = 'master_styles'; }
	var ryu_editor = document.getElementById('XinhaIFrame_inputBox').contentWindow.document;
	if (!ryu_editor.getElementById(''+target+'')) {
		var link = document.createElement("link");
			link.setAttribute('rel','stylesheet');
			link.setAttribute('type','text/css');
			link.setAttribute('href',url);
			link.id=''+target+'';
		ryu_editor.getElementsByTagName('head')[0].appendChild(link);
	}
	ryu_editor.getElementById(''+target+'').href=url;
}
 
Xinha.Config.prototype.ryu_stylistLoadStylesheet = function(url, altnames, skip_imports)
{
  console.log('Loading Stylesheet: '+url);
  if(!altnames) altnames = { };
  var newStyles = Xinha.ripStylesFromCSSFile(url, skip_imports);
  for(var i in newStyles)
  {
    if(altnames[i])
    {
      this.css_style[i] = altnames[i];
    }
    else
    {
      this.css_style[i] = newStyles[i];
    }
  }
  /*
  for(var x = 0; x < this.pageStyleSheets.length; x++)
  {
    if(this.pageStyleSheets[x] == url) return;
  }
  this.pageStyleSheets[this.pageStyleSheets.length] = url;
  */
};

/**
 * This method takes raw style ruless and uses them in the ryu_stylist
 *
 * @param string CSS
 *
 * @param hash Alternate descriptive names for your classes 
 *              { '.fooclass': 'Foo Description' }
 *
 * @param bool If set true then @import rules in the stylesheet are skipped,
 *   otherwise they will be incorporated if possible.
 *
 * @param string If skip_imports is false, this string should contain
 *   the "URL" of the stylesheet these styles came from (doesn't matter
 *   if it exists or not), it is used when resolving relative URLs etc.  
 *   If not provided, it defaults to Xinha.css in the Xinha root.
 */
 
Xinha.prototype.updatePanel = function() {
	this.onUpdateToolbar();
}
 
Xinha.Config.prototype.ryu_stylistLoadStyles = function(styles, altnames, skip_imports, imports_relative_to)
{
console.log('Load Styles');
  if(!altnames) altnames = { };
  var newStyles = Xinha.ripStylesFromCSSString(styles, skip_imports);
  for(var i in newStyles)
  {
    if(altnames[i])
    {
      this.css_style[i] = altnames[i];
    }
    else
    {
      this.css_style[i] = newStyles[i];
    }
  }
 // this.pageStyle += styles;
};

Xinha.prototype.createNewStyle = function() {
	RYU.RYUStylist = this;
	RYU.toggleDialog('newstyle',1);
	// populate drop-downs in Add Style dialog
	var ul = document.getElementById('ryu_stylist_list').getElementsByTagName('ul')[0];
	var list = ul.getElementsByTagName('span'); // <li><span>.classname</span></li>
	document.getElementById('css_basedon').innerHTML ='<option value="">None</option>';
	for (var a=0; a < list.length; a++) {
		document.getElementById('css_basedon').innerHTML+='<option>'+list[a].innerHTML+'</option>\n';
	}
}
var custom_styles = [];	// somewhere to store our custom styles
// store internal editor styles
var xinha_internal_css = '.htmtableborders, .htmtableborders td, .htmtableborders th {\n'+
'border : 1px dashed lightgrey ! important;}\n'+
'html, body { border: 0px; }\n'+
'body { background-color: #eeeeee; }\n'+
'#skip2nav, #toc, #splash { display: none; }\n'+
'img, hr { cursor: default }\n';

var selected_styles = [];
Xinha.prototype.selectStyles = function(style,action) {
	var selected = false;	// assume it is not selected
	if (action==1) { // add to list
		for (var s=0; s < selected_styles.length; s++) {
			if (style == selected_styles[s]) {
				selected = true;
			}
		}
		if (selected == false) {
			selected_styles.push(style);
		}
	} else {	// remove from list
		var filtered = [];
		for (var s=0; s < selected_styles.length; s++) {
			if (style != selected_styles[s]) {
				filtered.push(selected_styles[s]);
			}
		}
		selected_styles = filtered;
	}
}

Xinha.prototype.trashCustomCSS = function() {
	if (selected_styles.length == 0) { 
		alert('Nothing is selected for deletion.');
		return;
	}
	var deathnote = "";
	for (var s=0; s < selected_styles.length; s++) {
		deathnote = deathnote + selected_styles[s]+'\n';
	}
	var c = confirm(Xinha._lc('Are you sure you want to permanently DELETE the following class(es)?','RYUStylist')+'\n'+deathnote+'\n'+Xinha._lc('This will also delete ALL compound or multiple selectors that use this class!\nTHIS CANNOT BE UNDONE','RYUStylist'));
	if (c==true) {
		var filtered = [];
		for (var x=0; x < selected_styles.length; x++) {
			// remove from plugin object
			for (var k in this.config.css_style) {
				if (k==selected_styles[x] || k.indexOf(''+selected_styles[x]+'.')!=-1 || k.indexOf(''+selected_styles[x]+' ')!=-1) {
				// either it has to match EXACTLY, or be followed by a DOT, or be followed by a SPACE to match
					delete this.config.css_style[k];
				}
			}
			for (var k=0; k < custom_styles.length; k++) {
				if (custom_styles[k][0]==selected_styles[x] || custom_styles[k][0].indexOf(''+selected_styles[x]+'.')!=-1 || custom_styles[k][0].indexOf(''+selected_styles[x]+' ')!=-1) {
				} else { 
					filtered.push(custom_styles[k]);
				}
			}
		}
		custom_styles = filtered;
//		for (var x=0; x < custom_styles.length; x++) {
//			this.appendCustomCSS(custom_styles[x][0],custom_styles[x][1],x);
//		}
		this.appendCustomCSS('','',0);	// avoids repeating append for EVERY deletion, takes care of them all in one run
		selected_styles.length = 0;	// clear out selections
    }
}

Xinha.prototype.addCustomCSS = function(selector,rules) {
	var regex = /^\s*$/;
	if (regex.test(selector)) { 
		alert(Xinha._lc('Missing Class Name','RYUStylist'));
		return;
	} 
	regex = /#/;
	if (regex.test(selector)) {
		alert(Xinha._lc('#ID declarations not supported','RYUStylist'));
		return;
	}
	selector = selector.trim();	// trim off leading/trailing white space
	regex = /\s/;
	if (regex.test(selector)) {
		alert(Xinha._lc('Parent-Child declarations are preserved, but are also split with any new declarations added to list so they can be applied individually.','RYUStylist'));
		var split = selector.split(' ');
		for (var s=0; s < split.length; s++) {
			this.addCustomCSS(split[s],'');	
		}
	}
	if (this.config.css_style[''+selector+'']) {
		// already exists!
	} else {
		rules = '{'+rules+'}';
		custom_styles.push([selector,rules]);		// store in our custom array
		this.config.css_style[''+selector+'']=''+selector+'';	// store in plugin object
		this.appendCustomCSS(selector,rules);	
	}
}


Xinha.prototype.appendCustomCSS = function(selector,rules,wipe) {
	
	/* 	Let us not screw around trying to figure out editor instance since this is a
		plugin for Ryuzine Writer we know there is only ONE instance and we know the
		id of it too.  We can actually append styles in TWO places depending on what
		we plan to do with them.
		
		Append to first STYLE tag in HEAD: in editor styling that does not export
		
		Append to second STYLE tag in BODY: edition styling that can be exported
		
	*/
	
	var ryu_editor = document.getElementById('XinhaIFrame_inputBox').contentWindow.document;
		regex = /editor/;
	if (regex.test(selector)) {	// in-editor style
		var editor_styles = ryu_editor.getElementsByTagName('head')[0].getElementsByTagName('style');
		var x_exists = false;	// assume it does not exist
		var internal = null;	// assume there is no index
		for (var x=0; x < editor_styles.length; x++) {
			// find out if any style blocks in head are called XinhaInternalCSS
			if (editor_styles[x].title=='XinhaInternalCSS') {
				internal = x;
				x_exists = true;
			}
		}
		if (x_exists==false) {
			var internal_block = document.createElement('style');
				internal_block.title = 'XinhaInternalCSS';
			ryu_editor.getElementsByTagName('head')[0].appendChild(internal_block);
			internal = editor_styles.length-1;
		}
		editor_styles[internal].innerHTML = editor_styles[internal].innerHTML+'\n'+selector+''+rules+'';	
	} else {
		var edition_styles = ryu_editor.getElementsByTagName('body')[0].getElementsByTagName('style');
		if (edition_styles.length < 1) { // we need to create it first
			var edition_block = document.createElement('style');
			ryu_editor.getElementsByTagName('body')[0].appendChild(edition_block);
		}
		if (wipe==0) { // we're removing styles, rebuild whole list
			alert('wiping edition styles');
			edition_styles[0].innerHTML='';
			for (var x=0; x < custom_styles.length; x++) {
				edition_styles[0].innerHTML += '\n'+custom_styles[x][0]+''+custom_styles[x][1]+'';
			}
		} else {	// we're adding A style just append it
			edition_styles[0].innerHTML=edition_styles[0].innerHTML+'\n'+selector+''+rules+'';
		}
	}
	
	console.log(custom_styles);
    this._fillRYUStylist();
//    this.focusEditor();
//    this.updateToolbar();
}

Xinha.prototype.ryu_stylist_reset = function() {
	var ryu_editor = document.getElementById('XinhaIFrame_inputBox').contentWindow.document;
	var editor_styles = ryu_editor.getElementsByTagName('head')[0].getElementsByTagName('style');
		for (var x=0; x < editor_styles.length; x++) {
			// find out if any style blocks in head are called XinhaInternalCSS
			if (editor_styles[x].title=='XinhaInternalCSS') {
				editor_styles[x].innerHTML = xinha_internal_css;
			}
		}	
	var edition_styles = ryu_editor.getElementsByTagName('body')[0].getElementsByTagName('style');
		if (edition_styles.length > 0) {	// yay there is one!
			edition_styles[0].innerHTML = '';
		}
	// now we need to clear out the selector object
	this.config.css_style.length = 0;
	// and the custom_styles variable
	custom_styles.length = 0;
}


/**
 * Fill the ryu_stylist panel with styles that may be applied to the current selection.  Styles
 * are supplied in the css_style property of the Xinha.Config object, which is in the format
 * { '.className' : 'Description' }
 * classes that are defined on a specific tag (eg 'a.email_link') are only shown in the panel
 *    when an element of that type is selected.
 * classes that are defined with selectors/psuedoclasses (eg 'a.email_link:hover') are never
 *    shown (if you have an 'a.email_link' without the pseudoclass it will be shown of course)
 * multiple classes (eg 'a.email_link.staff_member') are shown as a single class, and applied
 *    to the element as multiple classes (class="email_link staff_member")
 * you may click a class name in the ryu_stylist panel to add it, and click again to remove it
 * you may add multiple classes to any element
 * spans will be added where no single _and_entire_ element is selected
 */
Xinha.prototype._fillRYUStylist = function()
{
console.log('fill RYU Stylist');
  if(!this.plugins.RYUStylist.instance.dialog) return false;
  var main = this.plugins.RYUStylist.instance.dialog.main.getElementsByTagName('div')[0];
  main.innerHTML = '';
  var ulist = document.createElement('ul');
//  var ulist = main.getElementsByTagName('ul')[0];
//  var items = ulist.getElementsByTagName('li');
  var may_apply = true;
  var sel       = this._getSelection();

console.log('sel='+sel);
  // What is applied
//   var applied = this._getAncestorsClassNames(this._getSelection());

  // Get an active element
  var active_elem = this._activeElement(sel);

  for(var x in this.config.css_style)
  {
    var tag   = null;
    var className = x.trim();
    var applicable = true;
    var apply_to   = active_elem;

    if(applicable && /[^a-zA-Z0-9_.-]/.test(className))
    {
      applicable = false; // Only basic classes are accepted, no selectors, etc.. presumed
                          // that if you have a.foo:visited you'll also have a.foo
      // alert('complex');
    }
    if(className.indexOf('.') < 0)
    {
      // No class name, just redefines a tag
      applicable = false;
    }

    if(applicable && (className.indexOf('.') > 0))
    {
      // requires specific html tag
      tag = className.substring(0, className.indexOf('.')).toLowerCase();
      className = className.substring(className.indexOf('.'), className.length);
      // To apply we must have an ancestor tag that is the right type
      if(active_elem != null && active_elem.tagName.toLowerCase() == tag)
      {
        applicable = true;
        apply_to = active_elem;
      }
      else
      {
        if(this._getFirstAncestor(this._getSelection(), [tag]) != null)
        {
          applicable = true;
          apply_to = this._getFirstAncestor(this._getSelection(), [tag]);
        }
        else
        {
          // alert (this._getFirstAncestor(this._getSelection(), tag));
          // If we don't have an ancestor, but it's a div/span/p/hx stle, we can make one
          if(( tag == 'div' || tag == 'span' || tag == 'p'
              || (tag.substr(0,1) == 'h' && tag.length == 2 && tag != 'hr')))
          {
            if(!this._selectionEmpty(this._getSelection()))
            {
              applicable = true;
              apply_to = 'new';
            }
            else
            {
              // See if we can get a paragraph or header that can be converted
              apply_to = this._getFirstAncestor(sel, ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7']);
              if(apply_to != null)
              {
                applicable = true;
              }
              else
              {
                applicable = false;
              }
            }
          }
          else
          {
            applicable = false;
          }
        }
      }
    }

    if(applicable)
    {
      // Remove the first .
      className = className.substring(className.indexOf('.'), className.length);

      // Replace any futher ones with spaces (for multiple class ruless)
      className = className.replace('.', ' ');

      if(apply_to == null)
      {
        if(this._selectionEmpty(this._getSelection()))
        {
          // Get the previous element and apply to that
          apply_to = this._getFirstAncestor(this._getSelection(), null);
        }
        else
        {
          apply_to = 'new';
          tag      = 'span';
        }
      }
    }

    var applied    = (this._ancestorsWithClasses(sel, tag, className).length > 0 ? true : false);
    var applied_to = this._ancestorsWithClasses(sel, tag, className);

	// check this className is not already in the list
	for (var a=0; a < this.config.css_style.length; a++) {
		if (className==this.config.css_style[a].innerHTML) {
			applicable = false;
		}
	}
			if(applicable)
			{
			  var anch = document.createElement('li');
			  anch.onfocus = function () { this.blur() } // prevent dotted line around link that causes horizontal scrollbar
			  anch._ryu_stylist_className = className.trim();
			  anch._ryu_stylist_applied   = applied;
			  anch._ryu_stylist_appliedTo = applied_to;
			  anch._ryu_stylist_applyTo = apply_to;
			  anch._ryu_stylist_applyTag = tag;

			  anch.innerHTML = '<span>'+this.config.css_style[x]+'</span>';
		//    anch.href = 'javascript:void(0)';
			  var editor = this;
			  anch.ondblclick = function()
			  {
				if(this._ryu_stylist_applied == true)
				{
				  editor._ryu_stylistRemoveClasses(this._ryu_stylist_className, this._ryu_stylist_appliedTo);
				}
				else
				{
				  editor._ryu_stylistAddClasses(this._ryu_stylist_applyTo, this._ryu_stylist_applyTag, this._ryu_stylist_className);
				}
				return false;
			  }
			  anch.onclick = function() {
			  	if (this.className=='marked') {
			  		editor.selectStyles('.'+this._ryu_stylist_className,0);
			  		this.className='';
			  	} else {
			  		editor.selectStyles('.'+this._ryu_stylist_className,1);
			  		this.className='marked';
			  	}
			  }

		/*
			(Let us handle this in css like we are supposed to)
			  anch.style.display = 'block';
			  anch.style.paddingLeft = '3px';
			  anch.style.paddingTop = '1px';
			  anch.style.paddingBottom = '1px';
			  anch.style.textDecoration = 'none';
		*/
			  if(applied)
			  {
		//        anch.style.background = 'Highlight';
		//        anch.style.color = 'HighlightText';
				  anch.className="selected";
			  }
		//      anch.style.position = 'relative';
				ulist.appendChild(anch);
			}
	
    

  }

  main.appendChild(ulist);
  

};


/**
 * Add the given classes (space seperated list) to the currently selected element
 * (will add a span if none selected)
 */
Xinha.prototype._ryu_stylistAddClasses = function(el, tag, classes)
  {
  console.log('element: '+el);
  console.log('tag: '+tag);
  console.log('classes: '+classes);
  
  if ((/\s\./g).test(classes)) {	// [space].classname = parent+child, discard parent
  	classes = classes.split(' ');
  	classes = classes[classes.length-1];
  }
  
  classes = classes.replace(/\./g,' ');	// replace . in multi with space
  
  
    if(el == 'new')
    {
      this.insertHTML('<' + tag + ' class="' + classes + '">' + this.getSelectedHTML() + '</' + tag + '>');
    }
    else
    {
      if(tag != null && el.tagName.toLowerCase() != tag)
      {
        // Have to change the tag!
        var new_el = this.switchElementTag(el, tag);

        if(typeof el._ryu_stylist_usedToBe != 'undefined')
        {
          new_el._ryu_stylist_usedToBe = el._ryu_stylist_usedToBe;
          new_el._ryu_stylist_usedToBe[new_el._ryu_stylist_usedToBe.length] = {'tagName' : el.tagName, 'className' : el.getAttribute('class')};
        }
        else
        {
          new_el._ryu_stylist_usedToBe = [{'tagName' : el.tagName, 'className' : el.getAttribute('class')}];
        }

        Xinha.addClasses(new_el, classes);
      }
      else
      {
        Xinha._addClasses(el, classes);
      }
    }
    this.focusEditor();
    this.updateToolbar();
  };

/**
 * Remove the given classes (space seperated list) from the given elements (array of elements)
 */
Xinha.prototype._ryu_stylistRemoveClasses = function(classes, from)
  {
    for(var x = 0; x < from.length; x++)
    {
      this._ryu_stylistRemoveClassesFull(from[x], classes);
    }
    this.focusEditor();
    this.updateToolbar();
  };

Xinha.prototype._ryu_stylistRemoveClassesFull = function(el, classes)
{
  if(el != null)
  {
    var thiers = el.className.trim().split(' ');
    var new_thiers = [ ];
    var ours   = classes.split(' ');
    for(var x = 0; x < thiers.length; x++)
    {
      var exists = false;
      for(var i = 0; exists == false && i < ours.length; i++)
      {
        if(ours[i] == thiers[x])
        {
          exists = true;
        }
      }
      if(exists == false)
      {
        new_thiers[new_thiers.length] = thiers[x];
      }
    }

    if(new_thiers.length == 0 && el._ryu_stylist_usedToBe && el._ryu_stylist_usedToBe.length > 0 && el._ryu_stylist_usedToBe[el._ryu_stylist_usedToBe.length - 1].className != null)
    {
      // Revert back to what we were IF the classes are identical
      var last_el = el._ryu_stylist_usedToBe[el._ryu_stylist_usedToBe.length - 1];
      var last_classes = Xinha.arrayFilter(last_el.className.trim().split(' '), function(c) { if (c == null || c.trim() == '') { return false;} return true; });

      if(
        (new_thiers.length == 0)
        ||
        (
        Xinha.arrayContainsArray(new_thiers, last_classes)
        && Xinha.arrayContainsArray(last_classes, new_thiers)
        )
      )
      {
        el = this.switchElementTag(el, last_el.tagName);
        new_thiers = last_classes;
      }
      else
      {
        // We can't rely on the remembered tags any more
        el._ryu_stylist_usedToBe = [ ];
      }
    }

    if(     new_thiers.length > 0
        ||  el.tagName.toLowerCase() != 'span'
        || (el.id && el.id != '')
      )
    {
      el.className = new_thiers.join(' ').trim();
    }
    else
    {
      // Must be a span with no classes and no id, so we can splice it out
      var prnt = el.parentNode;
      var tmp;
      while (el.hasChildNodes())
      {
        if (el.firstChild.nodeType == 1)
        {
          // if el.firstChild is an element, we've got to recurse to make sure classes are
          // removed from it and and any of its children.
          this._ryu_stylistRemoveClassesFull(el.firstChild, classes);
        }
        tmp = el.removeChild(el.firstChild);
        prnt.insertBefore(tmp, el);
      }
      prnt.removeChild(el);
    }
  }
};

/**
 * Change the tag of an element
 */
Xinha.prototype.switchElementTag = function(el, tag)
{
  var prnt = el.parentNode;
  var new_el = this._doc.createElement(tag);

  if(Xinha.is_ie || el.hasAttribute('id'))    new_el.setAttribute('id', el.getAttribute('id'));
  if(Xinha.is_ie || el.hasAttribute('style')) new_el.setAttribute('style', el.getAttribute('style'));

  var childs = el.childNodes;
  for(var x = 0; x < childs.length; x++)
  {
    new_el.appendChild(childs[x].cloneNode(true));
  }

  prnt.insertBefore(new_el, el);
  new_el._ryu_stylist_usedToBe = [el.tagName];
  prnt.removeChild(el);
  this.selectNodeContents(new_el);
  return new_el;
};

Xinha.prototype._getAncestorsClassNames = function(sel)
{
  // Scan upwards to find a block level element that we can change or apply to
  var prnt = this._activeElement(sel);
  if(prnt == null)
  {
    prnt = (Xinha.is_ie ? this._createRange(sel).parentElement() : this._createRange(sel).commonAncestorContainer);
  }

  var classNames = [ ];
  while(prnt)
  {
    if(prnt.nodeType == 1)
    {
      var classes = prnt.className.trim().split(' ');
      for(var x = 0; x < classes.length; x++)
      {
        classNames[classNames.length] = classes[x];
      }

      if(prnt.tagName.toLowerCase() == 'body') break;
      if(prnt.tagName.toLowerCase() == 'table'  ) break;
    }
      prnt = prnt.parentNode;
  }

  return classNames;
};

Xinha.prototype._ancestorsWithClasses = function(sel, tag, classes)
{
  var ancestors = [ ];
  var prnt = this._activeElement(sel);
  if(prnt == null)
  {
    try
    {
      prnt = (Xinha.is_ie ? this._createRange(sel).parentElement() : this._createRange(sel).commonAncestorContainer);
    }
    catch(e)
    {
      return ancestors;
    }
  }
  var search_classes = classes.trim().split(' ');

  while(prnt)
  {
    if(prnt.nodeType == 1 && prnt.className)
    {
      if(tag == null || prnt.tagName.toLowerCase() == tag)
      {
        var classes = prnt.className.trim().split(' ');
        var found_all = true;
        for(var i = 0; i < search_classes.length; i++)
        {
          var found_class = false;
          for(var x = 0; x < classes.length; x++)
          {
            if(search_classes[i] == classes[x])
            {
              found_class = true;
              break;
            }
          }

          if(!found_class)
          {
            found_all = false;
            break;
          }
        }

        if(found_all) ancestors[ancestors.length] = prnt;
      }
      if(prnt.tagName.toLowerCase() == 'body')    break;
      if(prnt.tagName.toLowerCase() == 'table'  ) break;
    }
    prnt = prnt.parentNode;
  }
  return ancestors;
};


Xinha.ripStylesFromCSSFile = function(URL, skip_imports)
{
  console.log('ripStylesFromCSSFile: '+URL);
  var css = Xinha._geturlcontent(URL);
  return Xinha.ripStylesFromCSSString(css, skip_imports, URL);
};

Xinha.ripStylesFromCSSString = function(css, skip_imports, imports_relative_to)
{

  console.log('ripStylesFromCSSString');
  if(!skip_imports)
  {    
    if(!imports_relative_to) 
    {
      imports_relative_to = _editor_url + 'Xinha.css'
    }
    
    var seen = { };
    
    function resolve_imports(css, url)
    {
      seen[url] = true; // protects against infinite recursion
      
      var RE_atimport = '@import\\s*(url\\()?["\'](.*)["\'].*';
      var imports = css.match(new RegExp(RE_atimport,'ig'));
      var m, file, re = new RegExp(RE_atimport,'i');

      if (imports)
      {
        var path = url.replace(/\?.*$/,'').split("/");
        path.pop();
        path = path.join('/');
        for (var i=0;i<imports.length;i++)
        {
          m = imports[i].match(re);
          file = m[2];
          if (!file.match(/^([^:]+\:)?\//))
          {
            file = Xinha._resolveRelativeUrl(path,file);
          }
                    
          if(seen[file]) continue;
          
          css += resolve_imports(Xinha._geturlcontent(file), file);
        }
      }
      
      return css;
    }
    
    css = resolve_imports(css, imports_relative_to);
  }

  // We are only interested in the selectors, the rules are not important
  //  so we'll drop out all coments and rules
  var RE_comment = /\/\*(.|\r|\n)*?\*\//g;
  var RE_rule    = /\{(.|\r|\n)*?\}/g;
  
  var RE_atmedia = /@media/;
  var RE_compound = /,/;

  var 	mycss = css;
  var	my_rules 	= mycss.match(RE_rule) || [];
  var nested = false;
  for (var s=0; s < my_rules.length; s++) {
  	var temp = my_rules[s].trim().substr(1,my_rules[s].length-1);
  	if (RE_rule.test(temp)) {
  		nested = true;
  	}
  }
  if (nested == true) {
  	alert(Xinha._lc('Nested Rules found but cannot be imported.','RYUStylist'));
  }
  var	mycss = mycss.replace(RE_comment,''); 
  		mycss = mycss.replace(RE_rule,'|');
  		mycss = mycss.split('|');
  
  var atmedia = false;
  var compound = false;
  for (var s=0; s < mycss.length; s++) {
  	if (RE_atmedia.test(mycss[s])) {
  		atmedia = true;
  	}
  	if (RE_compound.test(mycss[s])) {
  		compound = true;
 // 		mycss[s] = mycss[s].split(',');
 //		mycss[s] = mycss[s][0];
  	}
  }


  if (atmedia==true) {
  	alert(Xinha._lc('Rules inside @media blocks were not imported.','RYUStylist'));
  }
  if (compound==true) {
  	alert(Xinha._lc('Compound selectors found, only importing the first selector from each','RYUStylist'));
  }
  
//  css = css.replace(RE_rule, ',');
//  css = css.replace(RE_comment, '');

  // And split on commas
//  css = css.split(',');

  // And add those into our structure
  var selectors = { };
//  for(var x = 0; x < css.length; x++)
//  {
//    if(css[x].trim())
//    {
//      selectors[css[x].trim()] = css[x].trim();
//    }
//  }

	for (var x=0; x < mycss.length; x++) {
		if (mycss[x].trim()) {
			selectors[mycss[x].trim()] = mycss[x].trim();
			if (my_rules[x]==undefined){my_rules[x]='';};	// fix for last @media brace
			custom_styles.push([mycss[x],my_rules[x]]);
		}
	}
	for (var x=0; x < custom_styles.length; x++) {
		var ryu_editor = document.getElementById('XinhaIFrame_inputBox').contentWindow.document;
			regex = /editor/;
		if (regex.test(custom_styles[x][0])) {	// in-editor style
			var editor_styles = ryu_editor.getElementsByTagName('head')[0].getElementsByTagName('style');
			var x_exists = false;	// assume it does not exist
			var internal = null;	// assume there is no index
			for (var x=0; x < editor_styles.length; x++) {
				// find out if any style blocks in head are called XinhaInternalCSS
				if (editor_styles[x].title=='XinhaInternalCSS') {
					internal = x;
					x_exists = true;
				}
			}
			if (x_exists==false) {
				var internal_block = document.createElement('style');
					internal_block.title = 'XinhaInternalCSS';
				ryu_editor.getElementsByTagName('head')[0].appendChild(internal_block);
				internal = editor_styles.length-1;
			}
			editor_styles[internal].innerHTML = editor_styles[internal].innerHTML+'\n'+custom_styles[x][0]+''+custom_styles[x][1]+'';	
		} else {
			var edition_styles = ryu_editor.getElementsByTagName('body')[0].getElementsByTagName('style');
			if (edition_styles.length < 1) { // we need to create it first
				var edition_block = document.createElement('style');
					edition_block.setAttribute('type','text/css');
					edition_block.id = 'myCSS';
				ryu_editor.getElementsByTagName('body')[0].appendChild(edition_block);
			}
			edition_styles[0].innerHTML=edition_styles[0].innerHTML+'\n'+custom_styles[x][0]+''+custom_styles[x][1]+'';
		}
	}
	
  return selectors;
};


// Make our right side panel and insert appropriatly
function RYUStylist(editor, args)
{
  this.editor = editor;
 
  var ryu_stylist = this;

}

RYUStylist._pluginInfo =
{
  name     : "RYUStylist",
  version  : "1.0",
/*
  Adapted from Stylist plugin to be consistent
  with other Ryuzine Writer webapp plugins.
  
  Modified so as not to conflict if the original
  plugin is also activated.  Targets left-panel
  instead of right, panel title changed.
  
  
  Original Developer Info
  developer: "James Sleeman",
  developer_url: "http://www.gogo.co.nz/",
  c_owner      : "Gogo Internet Services",
  license      : "HTMLArea",
  sponsor      : "Gogo Internet Services",
  sponsor_url  : "http://www.gogo.co.nz/"
*/ 
};

RYUStylist.prototype.onGenerateOnce = function()
{
    this._prepareDialog();
};
RYUStylist.prototype._prepareDialog = function()
{
  var editor = this.editor;
  var ryu_stylist = this;

  var html = '<h1 class="popout"><l10n>Edition Styles</l10n></h1>';
  
  this.dialog = new Xinha.Dialog(editor, html, 'RYUStylist',{width:200},{modal:false,closable:false});
	Xinha._addClass( this.dialog.rootElem, 'RYUStylist' );
	this.dialog.attachToPanel('right');
  this.dialog.show();
  
	var dialog = this.dialog;
	var main = this.dialog.main;
	var caption = this.dialog.captionBar;
	
  main.style.overflow = "auto";
  main.setAttribute('id','ryu_stylist_list');
  main.className="main";
//main.style.height = this.editor._framework.ed_cell.offsetHeight - caption.offsetHeight + 'px';
  main.style.height = "";
  
	var adj = document.createElement('div');
		adj.className="adjustable";
	main.appendChild(adj);
  
  
  	var ctrls = document.createElement('div');
  		ctrls.className="panel_controls";
//  var ulist = document.createElement('ul');
//  main.appendChild(ulist);

	var addNewStyle = document.createElement('div');
		addNewStyle.className='panel_button left';
		addNewStyle.id = 'edition_style_button';
		addNewStyle.title=Xinha._lc("New Edition Class","RYUStylist");
		addNewStyle.onclick=function(){
			editor.createNewStyle();
		}
	ctrls.appendChild(addNewStyle);
	var loadCSS = document.createElement('div');
		loadCSS.className='panel_button left openfile';
		loadCSS.id = 'load_css_button';
		loadCSS.title=Xinha._lc("Load Stylesheet","RYUStylist");
		loadCSS.onclick=function(){
			editor.ryu_load_css();
		}
	ctrls.appendChild(loadCSS);
	var trashStyle = document.createElement('div');
		trashStyle.className='panel_button right';
		trashStyle.id='trash_style_button';
		trashStyle.title=Xinha._lc("Delete Classes","RYUStylist");
		trashStyle.onclick=function(){
			editor.trashCustomCSS();
		}
	ctrls.appendChild(trashStyle);
	var showFile = document.createElement('p');
		showFile.innerHTML = '<span id="show_custom_file"></span>';
	ctrls.appendChild(showFile);
	main.appendChild(ctrls);

  editor.notifyOn('modechange',
  function(e,args)
  {
    if (!dialog.attached)
    {
      return;
    }
    switch(args.mode)
    {
      case 'text':
      {
        dialog.hide();
        break;
      }
      case 'wysiwyg':
      {
        dialog.show();
        break;
      }
    }
  }
  );
  editor.notifyOn('panel_change',
  function(e,args)
  {
    if (!dialog.attached)
    {
      return;
    }
    switch (args.action)
    {
      case 'show':
      var newHeight = main.offsetHeight - args.panel.offsetHeight;
      main.style.height = ((newHeight > 0) ?  main.offsetHeight - args.panel.offsetHeight : 0) + 'px';
      dialog.rootElem.style.height = caption.offsetHeight + "px";
      editor.sizeEditor();
      break;
      case 'hide':
      ryu_stylist.resize();
      break;
    }
  }
  );
  editor.notifyOn('before_resize',
  function()
  {
    if (!dialog.attached)
    {
      return;
    }
    dialog.rootElem.style.height = caption.offsetHeight + "px";
  }
  );
  editor.notifyOn('resize',
  function()
  {
    if (!dialog.attached)
    {
      return;
    }
    ryu_stylist.resize();
  }
  );
}
RYUStylist.prototype.resize = function()
{
  var editor = this.editor;
  EDITOR = editor;	// global reference (sux but what else can I do?)
  var rootElem = this.dialog.rootElem;
  
  if (rootElem.style.display == 'none') return;
  
  var panelContainer = rootElem.parentNode;

  var newSize = panelContainer.offsetHeight;
  for (var i=0; i < panelContainer.childNodes.length;++i)
  {
    if (panelContainer.childNodes[i] == rootElem || !panelContainer.childNodes[i].offsetHeight)
    {
      continue;
    }
    newSize -= panelContainer.childNodes[i].offsetHeight;
  }
  rootElem.style.height = newSize-5 + 'px';
  this.dialog.main.style.height = newSize - this.dialog.captionBar.offsetHeight -5 + 'px';
}

RYUStylist.prototype.onUpdateToolbar = function()
{
  if(this.dialog)
  {
    if(this._timeoutID)
    {
      window.clearTimeout(this._timeoutID);
    }
	console.log('onUpdateToolbar');
    var e = this.editor;
    this._timeoutID = window.setTimeout(function() { e._fillRYUStylist(); }, 250);
  }
};
