/*
This page manager is customized for Ryuzine Writer
it will not work out-of-the-box with other Xinha
------------------------------------------

*/

function RYUPageManager(editor, args) {
	this.editor = editor;
	var RYUPageManager = this;
}

RYUPageManager._pluginInfo = {
	name	: "RYUPageManager",	
	version : "2014-07",
	author	: "K.M. Hansen"
}
RYUPageManager.prototype.onGenerateOnce = function()
{
    this._prepareDialog();
};
/*RYUPageManager.prototype.onGenerateOnce = function() {
	var editor = this.editor;
	var RYUPageManager = this;
	editor._ryuPager = editor.addPanel("left");
		this.main = document.createElement("div");
	editor._ryuPager.id='ryu_pagemanager';
	editor._ryuPager.style.backgroundColor='rgb(238,238,238)';
	editor._ryuPager.style.height='auto';
	editor._ryuPager.style.overflow='visible';
	editor._ryuPager.appendChild(this.main);
	
	Xinha.freeLater(this,"main");
	editor.showPanel(editor._ryuPager);
*/	

RYUPageManager.prototype._prepareDialog = function() {
	var editor = this.editor;
	document.getElementById('XinhaIFrame_inputBox').contentWindow.document.getElementsByTagName('body')[0].addEventListener('blur', function(){
		RYU.reindex_pages();	// update panel to reflect editor content every effing time we lose editor focus.
		},false);
	var ryupager = this;
	
	  var adjhi = (document.getElementsByClassName('panels_left')[0].offsetHeight-104)/2;
	
	var html='<h1 class="popout localize"><l10n>Page Manager</l10n></h1>';

  this.dialog = new Xinha.Dialog(editor, html, 'RYUPageManager',{width:200},{modal:false,closable:false});
	Xinha._addClass( this.dialog.rootElem, 'RYUPageManager' );
	this.dialog.attachToPanel('left');
  this.dialog.show();
  
	var dialog = this.dialog;
	var main = this.dialog.main;
	var caption = this.dialog.captionBar;
	
  main.style.overflow = "visible";
  main.style.position = "relative";
  main.id='ryu_pager';
  main.className="main";
//main.style.height = this.editor._framework.ed_cell.offsetHeight - caption.offsetHeight + 'px';
//main.style.height = "auto";
  
	var adj = document.createElement('div');
		adj.className="adjustable small";
		adj.id="pagemanager"
	var uli = document.createElement('ul');
		adj.appendChild(uli);
	main.appendChild(adj);
  
  	var ctrls = document.createElement('div');
  		ctrls.className="panel_controls";
//  var ulist = document.createElement('ul');
//  main.appendChild(ulist);

	var addNewPage = document.createElement('div');
		addNewPage.className='panel_button left localize';
		addNewPage.id = 'add_page_button';
		addNewPage.title=Xinha._lc("Add Page",'RYUPageManager');
		addNewPage.onclick=function(){
			RYU.insert_page();
		}
	ctrls.appendChild(addNewPage);
	var addPages = document.createElement('div');
		addPages.className='panel_button left openfile localize';
		addPages.id = 'add_pages_button';
		addPages.title=Xinha._lc("Add Multiple Pages",'RYUPageManager');
		addPages.onclick=function(){
			RYU.toggleDialog('insert_pages_dialog',1);
		}
	ctrls.appendChild(addPages);
	var trashStyle = document.createElement('div');
		trashStyle.className='panel_button right localize';
		trashStyle.id='delete_page_button';
		trashStyle.title=Xinha._lc("Delete Page",'RYUPageManager');
		trashStyle.onclick=function(){
			RYU.delete_page();
		}
	ctrls.appendChild(trashStyle);
	var showFile = document.createElement('p');
		showFile.innerHTML = '<span id="pgcount">0</span> '+Xinha._lc('pages','RYUPageManager')+'</span>';
	ctrls.appendChild(showFile);
	main.appendChild(ctrls);
	
	var flyout = document.createElement('div');
		flyout.className='panel_flyout';
		flyout.innerHTML='	<ul>'+
		'		<li><div onclick="RYU.selectionOf(\'all\');">'+Xinha._lc("Select All",'RYUPageManager')+'</div></li>'+
		'		<li><div onclick="RYU.selectionOf(\'none\');"><span class="localize">'+Xinha._lc("Deselect All",'RYUPageManager')+'</span></div></li>'+
		'		<li><input type="checkbox" checked id="show_thumbs" onchange="RYU.refresh_thumbnails(this.checked);"> '+Xinha._lc("Show Thumbnails",'RYUPageManager')+'</li>'+
		'		<li><input type="radio" checked id="size_thumbs" name="thumb_size" value="small" onchange="RYU.thumbnail_size(this.value);"/> '+Xinha._lc("Small Thumbnail",'RYUPageManager')+'</li>'+
		'		<li><input type="radio" name="thumb_size" value="medium" onchange="RYU.thumbnail_size(this.value);"/> '+Xinha._lc("Medium Thumbnail",'RYUPageManager')+'</li>'+
		'		<li><input type="radio" name="thumb_size" value="large" onchange="RYU.thumbnail_size(this.value);"/> '+Xinha._lc("Large Thumbnail",'RYUPageManager')+'</li>'+
		'		<li><input type="radio" id="show_single"  name="imposition" onchange="RYU.editor_layout(0);" checked> '+Xinha._lc("Single Pages",'RYUPageManager')+'</li>'+
		'		<li><input type="radio" id="show_inline"  name="imposition" onchange="RYU.editor_layout(1);"> '+Xinha._lc("Continuous View",'RYUPageManager')+'</li>'+
		'		<li><input type="radio" id="show_spreads" name="imposition" onchange="RYU.editor_layout(2);"> '+Xinha._lc("Facing Pages",'RYUPageManager')+'</li>'+
		'		<li><input type="checkbox" id="right_bound"  onchange="RYU.right_bound(this.checked);" class="subli"> '+Xinha._lc("Right Binding",'RYUPageManager')+'</li>'+
		'		<li><input type="checkbox" id="show_outline" onchange="RYU.show_outline(this.checked);">'+Xinha._lc("Outline Elements",'RYUPageManager')+'</li>'+
		'	</ul>';
	main.appendChild(flyout);
	
//	insert_page();	// make sure there is one page ready

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
      ryupager.resize();
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
    ryupager.resize();
  }
  );
}
RYUPageManager.prototype.resize = function() {
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

