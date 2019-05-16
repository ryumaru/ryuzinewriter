
function RYUButtons( editor )
{
  this.editor = editor;
  var cfg = editor.config;
  var self = this;
   cfg.registerButton({
   		id		 : "sink",
   		tooltip	 : Xinha._lc("Toggle Additional Button Visibility","RYUButtons"),
   		image	 : _editor_url + "plugins/RYUButtons/img/sink.gif",
   		textMode : false,
/*  	
		action	 : function(){
   			var ed = document.getElementById('leftbox').getElementsByTagName('table')[0].getElementsByTagName('div')[0];
   			if (ed.offsetHeight > 50) {
   				ed.style.height = "46px";
   				ed.style.overflow = "hidden";
   				ed.parentNode.style.height = "";
   			} else {
   				ed.style.height = "";
   				ed.style.overflow = "";
   			}
   		}
*/		// handle this with classNames instead of style attribute - RYU
		action	 : function(){ RYU.toggleToolBar();}
   	});
   	cfg.toolbar[0].splice(0, 0, "sink");
   // Add a button to toggle Unique Elements
   cfg.registerButton({
   		id		 : "uniques",
   		tooltip	 : Xinha._lc("Toggle Front/End Matter Visibility","RYUButtons"),
    	image    : _editor_url + "plugins/RYUButtons/img/matter.gif",
   		textMode : false,
   		action	 : function(){ RYU.uniqueElements();}
   	});
   	cfg.toolbar[1].splice(0, 0, "uniques");
  // Add a button to toggle the panels.
    cfg.registerButton({
     id       : "panels",
     tooltip  : Xinha._lc("Toggle Panels","RYUButtons"),
     image    : _editor_url + "plugins/RYUButtons/img/panels.gif",
     textMode : false,
     action   : function(editor) { editor._togglePanels(editor); }
   });
//   cfg.toolbar[1].splice(1, 0, "separator");
   cfg.toolbar[1].splice(0, 0, "panels");
   // the button action function code
    Xinha.prototype._togglePanels = function(editor) {
     if (editor._panelsVisible == true) {
       editor.hidePanels(['right']);
       editor.hidePanels(['left']);
       editor._panelsVisible = false;
     } else {
       editor.showPanels(['right']);
       editor.showPanels(['left']);
       editor._panelsVisible = true;
     }
   };
   // initial visibility setting
   Xinha.prototype._panelsVisible = true;
}

RYUButtons._pluginInfo =
{
  name          : "RYUButtons",
  version       : "1.0",
  developer     : "K.M. Hansen",
  developer_url : "http://www.ryumaru.com/",
  c_owner       : "Ryu Maru",
  sponsor       : "",
  sponsor_url   : "",
  license       : "HTMLArea"
};
