/*
This is a customized version of CSS Picker
originally created by Justin Rovang
------------------------------------------
(I broke this out into its own plugin so it
wouldn't cause conflicts with CSSPicker)

SAMPLE CONFIG:

You can configure the appearance of the item/style list using the following CSS classes:
	.RYUPickerOption (Normal state)
	.RYUPickerOptionOver (Mouse-over state, typically border change)
	.RYUPickerOptionActive (Indicator for active classes under the selection/carat)
	
Keys are CSS Class names
	wrapper: tag to wrap selected text with
	name: friendly name to display in panel with that class style applied to it.

Sample config: 
RYUPicker.cssList = {
		'xinhaDashedBox'	: { 'wrapper':'div',	'name':'Breakout box' }
		'xinhaMiniHeadline' : { 'wrapper':'div',	'name':'Sub-headline' }
}
*/

// we need some way to get reference back from RYU Dialog
var RYU = RYU || {};
	RYU.RYUPicker = RYU.RYUPicker || {};

function RYUPicker(editor, args) {
	this.editor = editor;
	var RYUPicker = this;
}

RYUPicker._pluginInfo = {
	name	: "RYUPicker",	
	version : "2015-05",
	author	: "K.M. Hansen"
}

RYUPicker.prototype.onGenerateOnce = function() {  
 // check for cssList exist and populated - if empty don't bother generating panel
 if(typeof RYUPicker.cssList != 'undefined' && Xinha.objectProperties(RYUPicker.cssList).length != 0)
  {
    this._prepareDialog();
  }
};
RYUPicker.prototype._prepareDialog = function() {
	var editor = this.editor;
	var ryupicker = this;
	
	var html= '<h1 class="popout"><l10n>Ryuzine Elements</l10n></h1>';
	
  this.dialog = new Xinha.Dialog(editor, html, 'RYUPicker',{width:200},{modal:false,closable:false});
	Xinha._addClass( this.dialog.rootElem, 'RYUPicker' );
	this.dialog.attachToPanel('left');
  this.dialog.show();
  
	var dialog = this.dialog;
	var main = this.dialog.main;
	var caption = this.dialog.captionBar;
	
  main.style.overflow = "auto";
  main.id='ryu_picker';
  main.className="main";

	var adj = document.createElement('div');
		adj.className="adjustable";
	main.appendChild(adj);

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
      ryupicker.resize();
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
    ryupicker.resize();
  }
  );
}
RYUPicker.prototype.resize = function() {
  var editor = this.editor;
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

RYUPicker.prototype.onUpdateToolbar = function() {
 if(this.dialog) {
    if(this._timeoutID) { window.clearTimeout(this._timeoutID);}
    var e = this.editor;
    this._timeoutID = window.setTimeout(function() { e._gen(); }, 250);
  	}
}

Xinha.prototype.listStyles = function(s) {
	var editor = this;
	var mySel = this.getSelection();
	var myRange;


	if(Xinha.is_ie) {
		myRange = this.saveSelection();//mySel;
		mySel = this.createRange(mySel).text;
	}
	var d = document.createElement("li");

	if (RYUPicker.cssList[s].blue) {
		d.className = "RYUPickerOption altbutton";
	} else {
		d.className='RYUPickerOption';
	}
	
	/* If our carat is within an active class, highlight it */
	var toggleState = editor.getStyleInfo(s);
	if(toggleState) Xinha._addClass(d, 'RYUPickerOptionActive');
	
	d.align='center';
	d.innerHTML='<span>'+RYUPicker.cssList[s].name+'</span>';
	d.onclick = function() {
		editor.RYUPickerDialog(s, mySel, myRange, RYUPicker.cssList[s].wrapper);
		return false;
	};
	
	Xinha._addEvent(d, 'mouseover', function(ev) {
		Xinha._addClass(d, 'RYUPickerOptionOver');
	});
	
	Xinha._addEvent(d, 'mouseout', function(ev) {
		Xinha._removeClass(d, 'RYUPickerOptionOver');
	});
	
	return d;
}

Xinha.prototype._gen = function() {
	var main = this.plugins.RYUPicker.instance.dialog.main.getElementsByTagName('div')[0];
	main.innerHTML='';
	var ulist = document.createElement('ul');
	for(var s in RYUPicker.cssList) {
		if (s=="addEvent" || s=="removeEvent") {} else {  // Hack to prevent xtra buttons??
			ulist.appendChild(this.listStyles(s));
		}
	}
	main.appendChild(ulist);
	return true;
}

Xinha.prototype.RYUPickerDialog = function(s, mySel, myRange, sWrapper) {
	var editor = this;
	if (s=='caption') {
		var insert = false;	// assume no
		var ancestors = this.getAllAncestors();
		if(ancestors.length > 0) {
			for(var o in ancestors){
				a = ancestors[o];
				console.log(a.tagName);
				if (a.tagName != undefined) {
					if (a.tagName.toLowerCase() == 'figure') {	// make sure there is a FIGURE somewhere back up the chain
						insert = true;
					}
				}
			}
		}
		if (insert==false) { // cannot insert captions outside of figures
			alert('You can only insert a '+s+' element inside of a Lightbox (<figure>)'); 
			return;
		};
	}
	if (s!="caption") {
		RYU.RYUPicker = this;	// gives us back reference from outside
		RYUPicker.s = s;
		RYUPicker.mySel = mySel;
		RYUPicker.myRange = myRange;
		RYUPicker.sWrapper = sWrapper;
		RYU.toggleDialog("picker_dialog");
		var sets = document.getElementById('picker_dialog').getElementsByTagName('fieldset');
		for (var f=0; f < sets.length; f++) {
			if (sets[f].hasAttribute('id')) {
				if (sets[f].id==s) { sets[f].style.display='block';
				} else { sets[f].style.display='none';}
			}
		}
	} else {
		editor.wrapStyle(s, mySel, myRange, RYUPicker.cssList[s].wrapper);
	}
}


/*
	(string) s: style name
	(string) sel: selection text
	(object) myRange: selection object
	(string) sWrapper: wrapper tag (e.g.: div, span)
*/


Xinha.prototype.wrapStyle = function(s, sel, myRange, sWrapper) {
	if (!s) { s = RYUPicker.s;}
	if (!sel) { sel = RYUPicker.mySel;}
	if (!myRange) { myRange = RYUPicker.myRange;}
	if (!sWrapper) { sWrapper = RYUPicker.sWrapper || 'div';}
	console.log('s = '+s+'\n'+
				'sel = '+sel+'\n'+
				'myRange = '+myRange+'\n'+
				'sWrapper = '+sWrapper);
	sWrapper=sWrapper.toLowerCase();

	var link_href   = document.getElementById('link_href').value;
	var link_rel	= document.getElementById('link_rel').value;
	var data_target = document.getElementById('data_target').value;
	var link_target = document.getElementById('link_target').value;
	var link_type   = document.getElementById('link_type').value;
	var plus_class  = document.getElementById('plus_class').value;
	var data_gallery = document.getElementById('data_gallery').value;
	var link_gallery = document.getElementById('link_gallery').value;
	var data_title = document.getElementById('data_title').value;
	var link_title = document.getElementById('link_title').value;
	var data_caption = document.getElementById('data_caption').value;
	var link_caption = document.getElementById('link_caption').value;
	var lb_id = document.getElementById('lb_id').value;
	var radios = document.getElementById('lb_layout').getElementsByTagName('input');
	var lb_layout = "";
	for (var b=0; b < radios.length; b++) {
		if (radios[b].checked) { lb_layout = radios[b].value;}
	}
	var dyn_thumb_id = document.getElementById('dyn_thumb_id').value;
	var dyn_img_id = document.getElementById('dyn_img_id').value;
	var ovr_id = document.getElementById('ovr_id').value;
	var ovr_frames = document.getElementById('ovr_frames').value || '4';
	
	/* The reason for these next lines is that we want the user to be able to place
	 * their cursor below the new div element. Otherwise they can't which makes
	 * placing anything after a div wrapper difficult/almost impossible. */
	var divBreak='<br />';
	
	var editor=this;
	this.focusEditor();
	if(Xinha.is_ie) this.restoreSelection(myRange);

	/* 
	 * First - Get parent elements and see if the style is already applied.
	 */
	var toggleState = editor.getStyleInfo(s);
	if(!toggleState) {
	var contents = sel.getRangeAt(0)
	var fragment = contents.cloneContents();
	var img_sel = false; // assume no image is selected
	for (var d=0; d < fragment.childNodes.length; d++) {
		if (fragment.childNodes[d].tagName) { // text-only selection won't have tagName
			if (fragment.childNodes[d].tagName.toLowerCase()=="img") {
				// if you find an image set nontxt to true
				var img_sel = true;
			}
		}
	}
	if (img_sel==true) {
		if (s=='caption') {
			alert('Image detected in CAPTION. Please select only text and reapply.');
			return;
		}
		// create a disposable div
		var ghost = document.createElement('div');
		var wraps = document.createElement('div');
		wraps.appendChild(fragment);ghost.appendChild(wraps);
		// append the fragment into it
		ghost.appendChild(fragment);
		// now we can get innerHTML text
		sel = ghost.innerHTML;
		// discard the div without adding it to the DOM
		ghost = null;
		var pad = '';
	} else {
		var pad = '<div></div>';
	}
	if(sel == '') sel = '&nbsp;'; //We insert this if the selection is empty, making it easier for carat placement via click
		if (s=='lightbox_link') {
			if (link_href == '') { link_href = '#'; }
			if (link_target != '') {
				link_target = ' '+data_target+'="'+link_target+'" ';
			}
			if (link_type != '') {
				link_type = ' '+link_type;
			}
			if (lb_layout != '') {
				lb_layout = ' data-layout="'+lb_layout+'" ';
			}
			if (link_title != '') {
				link_title = ' '+data_title+'="'+link_title+'" ';
			}
			if (link_caption != '') {
				link_caption = ' '+data_caption+'="'+link_caption+'" ';
			}
			if (link_gallery != '') {
				link_gallery = ' '+data_gallery+'="'+link_gallery+'" ';
			}
			if (plus_class != '') {
				plus_class = ' '+plus_class;
			}
			if (link_rel == '') { link_rel = 'lightbox';}
			this.insertHTML('<a href="'+link_href+'"'+link_target+'rel="'+link_rel+'"'+lb_layout+''+link_gallery+''+link_title+''+link_caption+' class="lightbox_link'+link_type+plus_class+'">'+sel+'</a>'+divBreak);
		} else if (s=='light_boxed') {
			this.insertHTML('<figure id="'+lb_id+'" class="light_boxed">'+pad+sel+'<figcaption class="caption">'+Xinha._lc("Caption","RYUPicker")+'</figcaption></figure>'+divBreak);
		} else if (s=='dyn_thumb') {
			this.insertHTML('<'+sWrapper+' id="'+dyn_thumb_id+'-thumb" class="'+s+'">'+sel+'</'+sWrapper+'>'+divBreak);	
		} else if (s=='dyn_img') {
			this.insertHTML('<'+sWrapper+' id="'+dyn_img_id+'" class="'+s+'">'+sel+'</'+sWrapper+'>'+divBreak);	
		} else if (s=='ovr') {
			if (ovr_id != '') { ovr_id = ' id="'+ovr_id+'" ';}
			this.insertHTML('<'+sWrapper+''+ovr_id+' class="ovr f-'+ovr_frames+'">'+sel+'</'+sWrapper+'>'+divBreak);
		} else {	// generic fallback
			this.insertHTML('<'+sWrapper+' class="'+s+'">'+sel+'</'+sWrapper+'>'+divBreak);
		};
	} else {
		Xinha._removeClass(toggleState, s);
	}		
	return true;
}

Xinha.prototype.getStyleInfo = function(sClassToProbe) {
	var editor = this;
	var aList = this.getAllAncestors();
	var a,s;

	if(aList) aList.pop(); //We don't want the body element to show up in this list.
	if(aList.length > 0) {
		for(var o in aList){
			a = aList[o];
			/* Instead of break down and rebuild the array for this search, we're going
			 * to do some string trickery...
			 *  // NOTE: THIS MAY BE PRONE TO PARTIAL MATCHES. SOLUTION IS TO ADD A SPACE PREPEND 
			 */
			if(a.className) {
				s = a.className.trim()+' ';
				if(s.toLowerCase().match(sClassToProbe.toLowerCase()+' ')) {
					return a;
				}
			}
		}
	}
	return false;
}