FCK.Description="FCKeditor for Gecko Browsers";FCK.InitializeBehaviors=function(){if(window.onresize){window.onresize();}FCKFocusManager.AddWindow(this.EditorWindow);this.ExecOnSelectionChange=function(){FCK.Events.FireEvent("OnSelectionChange");};this._ExecDrop=function(a){if(FCK.MouseDownFlag){FCK.MouseDownFlag=false;return;}if(FCKConfig.ForcePasteAsPlainText){if(a.dataTransfer){var b=a.dataTransfer.getData("Text");b=FCKTools.HTMLEncode(b);b=FCKTools.ProcessLineBreaks(window,FCKConfig,b);FCK.InsertHtml(b);}else{if(FCKConfig.ShowDropDialog){FCK.PasteAsPlainText();}}a.preventDefault();a.stopPropagation();}};this._ExecCheckCaret=function(a){if(FCK.EditMode!=FCK_EDITMODE_WYSIWYG){return;}if(a.type=="keypress"){var b=a.keyCode;if(b<33||b>40){return;}}var d=function(f){if(f.nodeType!=1){return false;}var e=f.tagName.toLowerCase();return(FCKListsLib.BlockElements[e]||FCKListsLib.EmptyElements[e]);};var c=function(){var i=FCKSelection.GetSelection();var f=i.getRangeAt(0);if(!f||!f.collapsed){return;}var j=f.endContainer;if(j.nodeType!=3){return;}if(j.nodeValue.length!=f.endOffset){return;}var l=j.parentNode.tagName.toLowerCase();if(!(l=="a"||(!FCKBrowserInfo.IsOpera&&String(j.parentNode.contentEditable)=="false")||(!(FCKListsLib.BlockElements[l]||FCKListsLib.NonEmptyBlockElements[l])&&b==35))){return;}var h=FCKTools.GetNextTextNode(j,j.parentNode,d);if(h){return;}f=FCK.EditorDocument.createRange();h=FCKTools.GetNextTextNode(j,j.parentNode.parentNode,d);if(h){if(FCKBrowserInfo.IsOpera&&b==37){return;}f.setStart(h,0);f.setEnd(h,0);}else{while(j.parentNode&&j.parentNode!=FCK.EditorDocument.body&&j.parentNode!=FCK.EditorDocument.documentElement&&j==j.parentNode.lastChild&&(!FCKListsLib.BlockElements[j.parentNode.tagName.toLowerCase()]&&!FCKListsLib.NonEmptyBlockElements[j.parentNode.tagName.toLowerCase()])){j=j.parentNode;}if(FCKListsLib.BlockElements[l]||FCKListsLib.EmptyElements[l]||j==FCK.EditorDocument.body){f.setStart(j,j.childNodes.length);f.setEnd(j,j.childNodes.length);}else{var g=j.nextSibling;while(g){if(g.nodeType!=1){g=g.nextSibling;continue;}var k=g.tagName.toLowerCase();if(FCKListsLib.BlockElements[k]||FCKListsLib.EmptyElements[k]||FCKListsLib.NonEmptyBlockElements[k]){break;}g=g.nextSibling;}var e=FCK.EditorDocument.createTextNode("");if(g){j.parentNode.insertBefore(e,g);}else{j.parentNode.appendChild(e);}f.setStart(e,0);f.setEnd(e,0);}}i.removeAllRanges();i.addRange(f);FCK.Events.FireEvent("OnSelectionChange");};setTimeout(c,1);};this.ExecOnSelectionChangeTimer=function(){if(FCK.LastOnChangeTimer){window.clearTimeout(FCK.LastOnChangeTimer);}FCK.LastOnChangeTimer=window.setTimeout(FCK.ExecOnSelectionChange,100);};this.EditorDocument.addEventListener("mouseup",this.ExecOnSelectionChange,false);this.EditorDocument.addEventListener("keyup",this.ExecOnSelectionChangeTimer,false);this._DblClickListener=function(a){FCK.OnDoubleClick(a.target);a.stopPropagation();};this.EditorDocument.addEventListener("dblclick",this._DblClickListener,true);this.EditorDocument.addEventListener("keydown",this._KeyDownListener,false);if(FCKBrowserInfo.IsGecko){this.EditorWindow.addEventListener("dragdrop",this._ExecDrop,true);}else{if(FCKBrowserInfo.IsSafari){this.EditorDocument.addEventListener("dragover",function(a){if(!FCK.MouseDownFlag&&FCK.Config.ForcePasteAsPlainText){a.returnValue=false;}},true);this.EditorDocument.addEventListener("drop",this._ExecDrop,true);this.EditorDocument.addEventListener("mousedown",function(b){var a=b.srcElement;if(a.nodeName.IEquals("IMG","HR","INPUT","TEXTAREA","SELECT")){FCKSelection.SelectNode(a);}},true);this.EditorDocument.addEventListener("mouseup",function(a){if(a.srcElement.nodeName.IEquals("INPUT","TEXTAREA","SELECT")){a.preventDefault();}},true);this.EditorDocument.addEventListener("click",function(a){if(a.srcElement.nodeName.IEquals("INPUT","TEXTAREA","SELECT")){a.preventDefault();}},true);}}if(FCKBrowserInfo.IsGecko||FCKBrowserInfo.IsOpera){this.EditorDocument.addEventListener("keypress",this._ExecCheckCaret,false);this.EditorDocument.addEventListener("click",this._ExecCheckCaret,false);}FCK.ContextMenu._InnerContextMenu.SetMouseClickWindow(FCK.EditorWindow);FCK.ContextMenu._InnerContextMenu.AttachToElement(FCK.EditorDocument);};FCK.MakeEditable=function(){this.EditingArea.MakeEditable();};function Document_OnContextMenu(a){if(!a.target._FCKShowContextMenu){a.preventDefault();}}document.oncontextmenu=Document_OnContextMenu;FCK._BaseGetNamedCommandState=FCK.GetNamedCommandState;FCK.GetNamedCommandState=function(a){switch(a){case"Unlink":return FCKSelection.HasAncestorNode("A")?FCK_TRISTATE_OFF:FCK_TRISTATE_DISABLED;default:return FCK._BaseGetNamedCommandState(a);}};FCK.RedirectNamedCommands={Print:true,Paste:true};FCK.ExecuteRedirectedNamedCommand=function(a,b){switch(a){case"Print":FCK.EditorWindow.print();break;case"Paste":try{if(FCKBrowserInfo.IsSafari){throw"";}if(FCK.Paste()){FCK.ExecuteNamedCommand("Paste",null,true);}}catch(c){if(FCKConfig.ForcePasteAsPlainText){FCK.PasteAsPlainText();}else{FCKDialog.OpenDialog("FCKDialog_Paste",FCKLang.Paste,"dialog/fck_paste.html",400,330,"Security");}}break;default:FCK.ExecuteNamedCommand(a,b);}};FCK._ExecPaste=function(){FCKUndo.SaveUndoStep();if(FCKConfig.ForcePasteAsPlainText){FCK.PasteAsPlainText();return false;}return true;};FCK.InsertHtml=function(d){var i=FCK.EditorDocument,a;d=FCKConfig.ProtectedSource.Protect(d);d=FCK.ProtectEvents(d);d=FCK.ProtectUrls(d);d=FCK.ProtectTags(d);FCKUndo.SaveUndoStep();if(FCKBrowserInfo.IsGecko){d=d.replace(/&nbsp;$/,'$&<span _fcktemp="1"/>');var c=new FCKDocumentFragment(this.EditorDocument);c.AppendHtml(d);var g=c.RootNode.lastChild;a=new FCKDomRange(this.EditorWindow);a.MoveToSelection();var b=c.RootNode.firstChild;while(b&&b.nodeType!=1){b=b.nextSibling;}if(b&&FCKListsLib.BlockElements[b.nodeName.toLowerCase()]){a.SplitBlock();}a.DeleteContents();a.InsertNode(c.RootNode);a.MoveToPosition(g,4);}else{i.execCommand("inserthtml",false,d);}this.Focus();if(!a){a=new FCKDomRange(this.EditorWindow);a.MoveToSelection();}var f=a.CreateBookmark();FCKDocumentProcessor.Process(i);try{a.MoveToBookmark(f);a.Select();}catch(h){}this.Events.FireEvent("OnSelectionChange");};FCK.PasteAsPlainText=function(){FCKTools.RunFunction(FCKDialog.OpenDialog,FCKDialog,["FCKDialog_Paste",FCKLang.PasteAsText,"dialog/fck_paste.html",400,330,"PlainText"]);};FCK.GetClipboardHTML=function(){return"";};FCK.CreateLink=function(b,e){var a=new Array();if(FCKSelection.GetSelection().isCollapsed){return a;}FCK.ExecuteNamedCommand("Unlink",null,false,!!e);if(b.length>0){var d="javascript:void(0);";FCK.ExecuteNamedCommand("CreateLink",d,false,!!e);var f=this.EditorDocument.evaluate("//a[@href='"+d+"']",this.EditorDocument.body,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);for(var c=0;c<f.snapshotLength;c++){var g=f.snapshotItem(c);g.href=b;a.push(g);}}return a;};FCK._FillEmptyBlock=function(b){if(!b||b.nodeType!=1){return;}var a=b.tagName.toLowerCase();if(a!="p"&&a!="div"){return;}if(b.firstChild){return;}FCKTools.AppendBogusBr(b);};FCK._ExecCheckEmptyBlock=function(){FCK._FillEmptyBlock(FCK.EditorDocument.body.firstChild);var b=FCKSelection.GetSelection();if(!b||b.rangeCount<1){return;}var a=b.getRangeAt(0);FCK._FillEmptyBlock(a.startContainer);};