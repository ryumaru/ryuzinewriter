/**
 * Add an empty master_style to Config object's prototype
 *  the format is { '.className' : 'Description' }
 */

Xinha.Config.prototype.master_style = { };

/**
 * This method loads an external stylesheet and uses it in the ryu_master_styles
 *
 * @param string URL to the stylesheet
 * @param hash Alternate descriptive names for your classes 
 *              { '.fooclass': 'Foo Description' }
 * @param bool If set true then @import rules in the stylesheet are skipped,
 *   otherwise they will be incorporated if possible.
 */

// we need some way to get reference back from RYU Dialog
var RYU = RYU || {};
	RYU.RYUMasterStyles = RYU.RYUMasterStyles || {};
Xinha.prototype.ryu_load_master_css = function() {
/***	OLD CONFIRM BOX METHOD	***
	// clear stored data
	for (var k in this.config.master_style) {
		delete this.config.master_style[k];
	}
	var url = prompt(Xinha._lc("Import stylesheet (in /css)","RYUMasterStyles"),RYU.config.importStyles);
  	if (url) {
  		document.getElementById('show_css_file').innerHTML=url;
  		if (url=="thisissue.css") {
  			document.getElementById('edition0').checked;
  		} else {	// port into Output Dialog
  			document.getElementById('edition1').checked=true;
  			document.getElementById('customFile').style.display="table-cell";
  			document.getElementById('editionName').value = url;
  		}
		url = _editor_url + "../../css/"+url
		this.config.ryu_master_stylesLoadStylesheet(url);
		this.addEditorStylesheet(url,1);
		this._fillRYUMasterStyles();
  	}
****	END OLD METHOD ***** */
	RYU.RYUMasterStyles = this;
	RYU.toggleDialog('import_master_styles',1);
		if (RYU.config.xfileman==1) {
			// refresh file list
			document.getElementById('file_list').src="ryuzinewriter/php/scandir.php";
			setTimeout(function(){
				var styles = document.getElementById('file_list').contentWindow.styles;
				var stylebox = '<select id="chooser5">';
				for (var s=0; s < styles.length; s++) {
					stylebox += '<option>'+styles[s]+'</option>';
				}
				stylebox += '</select>';
				document.getElementById('file_chooser5').innerHTML = stylebox;},300);
		}
}

Xinha.prototype.ryu_import_master_css = function() {
	for (var k in this.config.master_style) {
		delete this.config.master_style[k];
	}
	var url = document.getElementById('chooser5').value;
  		document.getElementById('show_css_file').innerHTML=url;
  		if (url=="thisissue.css") {
  			document.getElementById('edition0').checked;
  		} else {	// port into Output Dialog
  			document.getElementById('edition1').checked=true;
  			document.getElementById('customFile').style.display="table-cell";
  			document.getElementById('editionName').value = url;
  		}
		url = _editor_url + "../../css/"+url
		this.config.ryu_master_stylesLoadStylesheet(url);
		this.addEditorStylesheet(url,1);
		this._fillRYUMasterStyles();
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

Xinha.Config.prototype.ryu_master_stylesLoadStylesheet = function(url, altnames, skip_imports)
{
  console.log('Loading Stylesheet: '+url);
  
  if(!altnames) altnames = { };
  var newStyles = Xinha.ripMasterStylesFromCSSFile(url, skip_imports);
  for(var i in newStyles)
  {
    if(altnames[i])
    {
      this.master_style[i] = altnames[i];
    }
    else
    {
      this.master_style[i] = newStyles[i];
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
 * This method takes raw style definitions and uses them in the ryu_master_styles
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
 
Xinha.Config.prototype.ryu_master_stylesLoadStyles = function(styles, altnames, skip_imports, imports_relative_to)
{
console.log('Load Styles');
  if(!altnames) altnames = { };
  var newStyles = Xinha.ripStylesFromCSSString(styles, skip_imports);
  for(var i in newStyles)
  {
    if(altnames[i])
    {
      this.master_style[i] = altnames[i];
    }
    else
    {
      this.master_style[i] = newStyles[i];
    }
  }
  this.pageStyle += styles;
};




/**
 * Fill the ryu_master_styles panel with styles that may be applied to the current selection.  Styles
 * are supplied in the master_style property of the Xinha.Config object, which is in the format
 * { '.className' : 'Description' }
 * classes that are defined on a specific tag (eg 'a.email_link') are only shown in the panel
 *    when an element of that type is selected.
 * classes that are defined with selectors/psuedoclasses (eg 'a.email_link:hover') are never
 *    shown (if you have an 'a.email_link' without the pseudoclass it will be shown of course)
 * multiple classes (eg 'a.email_link.staff_member') are shown as a single class, and applied
 *    to the element as multiple classes (class="email_link staff_member")
 * you may click a class name in the ryu_master_styles panel to add it, and click again to remove it
 * you may add multiple classes to any element
 * spans will be added where no single _and_entire_ element is selected
 */
Xinha.prototype._fillRYUMasterStyles = function()
{
console.log('fill RYU Master Styles');
  if(!this.plugins.RYUMasterStyles.instance.dialog) return false;
  var main = this.plugins.RYUMasterStyles.instance.dialog.main.getElementsByTagName('div')[0];
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

  for(var x in this.config.master_style)
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

      // Replace any futher ones with spaces (for multiple class definitions)
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
/*
	for(var q=0; q < items.length; q++) {	// only add to list if not already there
		if (items[q].innerHTML == '<span>'+this.config.master_style[x]+'</span>') {
			applicable=false;
		}
	}
*/
			if(applicable)
			{
			  var anch = document.createElement('li');
			  anch.onfocus = function () { this.blur() } // prevent dotted line around link that causes horizontal scrollbar
			  anch._ryu_master_styles_className = className.trim();
			  anch._ryu_master_styles_applied   = applied;
			  anch._ryu_master_styles_appliedTo = applied_to;
			  anch._ryu_master_styles_applyTo = apply_to;
			  anch._ryu_master_styles_applyTag = tag;

			  anch.innerHTML = '<span>'+this.config.master_style[x]+'</span>';
		//    anch.href = 'javascript:void(0)';
			  var editor = this;
			  anch.ondblclick = function()
			  {
				if(this._ryu_master_styles_applied == true)
				{
				  editor._ryu_master_stylesRemoveClasses(this._ryu_master_styles_className, this._ryu_master_styles_appliedTo);
				}
				else
				{
				  editor._ryu_master_stylesAddClasses(this._ryu_master_styles_applyTo, this._ryu_master_styles_applyTag, this._ryu_master_styles_className);
				}
				return false;
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
Xinha.prototype._ryu_master_stylesAddClasses = function(el, tag, classes)
  {
  console.log('element: '+el);
  console.log('tag: '+tag);
  console.log('classes: '+classes);
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

        if(typeof el._ryu_master_styles_usedToBe != 'undefined')
        {
          new_el._ryu_master_styles_usedToBe = el._ryu_master_styles_usedToBe;
          new_el._ryu_master_styles_usedToBe[new_el._ryu_master_styles_usedToBe.length] = {'tagName' : el.tagName, 'className' : el.getAttribute('class')};
        }
        else
        {
          new_el._ryu_master_styles_usedToBe = [{'tagName' : el.tagName, 'className' : el.getAttribute('class')}];
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
Xinha.prototype._ryu_master_stylesRemoveClasses = function(classes, from)
  {
    for(var x = 0; x < from.length; x++)
    {
      this._ryu_master_stylesRemoveClassesFull(from[x], classes);
    }
    this.focusEditor();
    this.updateToolbar();
  };

Xinha.prototype._ryu_master_stylesRemoveClassesFull = function(el, classes)
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

    if(new_thiers.length == 0 && el._ryu_master_styles_usedToBe && el._ryu_master_styles_usedToBe.length > 0 && el._ryu_master_styles_usedToBe[el._ryu_master_styles_usedToBe.length - 1].className != null)
    {
      // Revert back to what we were IF the classes are identical
      var last_el = el._ryu_master_styles_usedToBe[el._ryu_master_styles_usedToBe.length - 1];
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
        el._ryu_master_styles_usedToBe = [ ];
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
          this._ryu_master_stylesRemoveClassesFull(el.firstChild, classes);
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
  new_el._ryu_master_styles_usedToBe = [el.tagName];
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


Xinha.ripMasterStylesFromCSSFile = function(URL, skip_imports)
{
  console.log('ripMasterStylesFromCSSFile');
  var css = Xinha._geturlcontent(URL);
 
  return Xinha.ripMasterStylesFromCSSString(css, skip_imports, URL);
};

Xinha.ripMasterStylesFromCSSString = function(css, skip_imports, imports_relative_to)
{
  console.log('ripMasterStylesFromCSSString');
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
  

  
  css = css.replace(RE_rule, ',');
  css = css.replace(RE_comment, '');

  // And split on commas
  css = css.split(',');

  // And add those into our structure
  var selectors = { };
  for(var x = 0; x < css.length; x++)
  {
    if(css[x].trim())
    {
      selectors[css[x].trim()] = css[x].trim();
    }
  }


  return selectors;
};


// Make our right side panel and insert appropriatly
function RYUMasterStyles(editor, args)
{
  this.editor = editor;
 
  var ryu_master_styles = this;

}

RYUMasterStyles._pluginInfo =
{
  name     : "RYUMasterStyles",
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

RYUMasterStyles.prototype.onGenerateOnce = function()
{
  var cfg = this.editor.config;
  if(typeof cfg.master_style != 'undefined' && Xinha.objectProperties(cfg.master_style).length != 0)
  {
    this._prepareDialog();
  }

};
RYUMasterStyles.prototype._prepareDialog = function()
{
  var editor = this.editor;
  var ryu_master_styles = this;

  var html = '<h1 class="popout"><l10n>Master Styles</l10n></h1>';
  
  this.dialog = new Xinha.Dialog(editor, html, 'RYUMasterStyles',{width:200},{modal:false,closable:false});
	Xinha._addClass( this.dialog.rootElem, 'RYUMasterStyles' );
	this.dialog.attachToPanel('right');
  this.dialog.show();
  
	var dialog = this.dialog;
	var main = this.dialog.main;
	var caption = this.dialog.captionBar;
	
  main.style.overflow = "auto";
  main.setAttribute('id','ryu_master_styles_list');
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

	var loadCSS = document.createElement('div');
		loadCSS.className='panel_button left openfile';
		loadCSS.id = 'load_master_styles_button';
		loadCSS.title=Xinha._lc("Load Stylesheet","RYUMasterStyles");
		loadCSS.onclick=function(){
			editor.ryu_load_master_css();
		}
	ctrls.appendChild(loadCSS);
	var showFile = document.createElement('p');
		showFile.innerHTML = '<span id="show_css_file"></span>';
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
      ryu_master_styles.resize();
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
    ryu_master_styles.resize();
  }
  );
}
RYUMasterStyles.prototype.resize = function()
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

RYUMasterStyles.prototype.onUpdateToolbar = function()
{
  if(this.dialog)
  {
    if(this._timeoutID)
    {
      window.clearTimeout(this._timeoutID);
    }
	console.log('onUpdateToolbar');
    var e = this.editor;
    this._timeoutID = window.setTimeout(function() { e._fillRYUMasterStyles(); }, 250);
  }
};
