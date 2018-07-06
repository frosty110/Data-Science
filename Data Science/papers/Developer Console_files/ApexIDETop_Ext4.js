/*
 * This code is for Internal Salesforce use only, and subject to change without notice.
 * Customers shouldn't reference this file in any web pages.
 */
Ext.BLANK_IMAGE_URL="/s.gif";Ext.require("Ext.container.Viewport");
Ext.application({name:"DeveloperConsole",launch:function(){Sfdc.provide("SfdcDevConsole.lastAjaxRequest",{action:null});Sfdc.ClientLogging.addRelay(new Sfdc.ClientLogging.ConsoleLogger);Sfdc.ServerLogging.addRelay("WINDOWERROR",{log:apex.ide.IDE.gackRelay});Sfdc.Logging.startWindowErrorListener();Ext.Ajax.addListener("beforerequest",function(a,d,e){d.startTime=(new Date).getTime()});Ext.Ajax.addListener("requestcomplete",function(a,d,e,g){SfdcDevConsole.lastAjaxRequest.time=(new Date).getTime()-e.startTime;
SfdcDevConsole.lastAjaxRequest.action=e.url;"/_ui/common/apex/debug/ApexCSIAPI"===e.url&&(SfdcDevConsole.lastAjaxRequest.action=e.params.action,a=null,"while(1);"===d.responseText.substring(0,9)&&(a=Util.evalAjaxServletOutput(d.responseText).csiTrace),SfdcDevConsole.lastAjaxRequest.serverTrace=a)});var f=(new Date).getTime(),h=apex.ide.IDE.getBrowserWindowInfo();apex.ide.IDE.on("workspaceLoaded",function(a){var d="",e;for(e in a.panels)d+=a.panels[e].xtype+",";d=d.substring(0,d.length-1);e=Ext.getCmp("editors").getActiveTab();
var g=(new Date).getTime()-f;apex.ide.IDE.sendPerformanceMetrics("Dev Console Load",g,a&&a.panels?a.panels.length:0,d,e?e.size:0);apex.ide.IDE.un("workspaceLoaded",arguments.callee)});apex.ide.IDE.on("workspaceLoaded",function(a){if(a.window){var d=a.window.x,e=a.window.y,g=a.window.width,c=a.window.height,b=apex.ide.IDE.getBrowserWindowInfo();h.x===b.x&&(h.y===b.y&&"number"===typeof d&&"number"===typeof e&&d!==b.x&&e!==b.y)&&window.moveTo(d,e);h.width===b.width&&(h.height===b.height&&(g!==b.width||
c!==b.height))&&window.resizeTo(g,c)}apex.ide.IDE.un("workspaceLoaded",arguments.callee)});Ext.QuickTips.init();document.title=LC.getLabel("DeveloperConsole","Title");apex.ide.IDE.initialLoadingProgressBar=Ext.create("Ext.ProgressBar",{renderTo:Ext.getBody(),width:300,style:"margin: 40% auto"});apex.ide.IDE.initialLoadingProgressBar.updateProgress(0.2,"Loading configuration...");SfdcDevConsole.Events.EventDispatcher.on("devconsole:loaded",function(a,d){try{SfdcDevConsole.Themes.changeFontSize(SfdcDevConsole.Preferences.get("cmFontSize"))}catch(e){}apex.ide.IDE.initialLoadingProgressBar.updateProgress(0.6,
"Loading workspace...");Ext.create("Ext.container.Viewport",{id:"apexCSIViewport",layout:"fit",listeners:{afterrender:function(a){new Ext.util.KeyMap(a.getEl(),[{key:188,ctrl:!0,fn:function(){apex.ide.IDE.back()},defaultEventAction:"stopEvent"},{key:190,ctrl:!0,fn:function(){apex.ide.IDE.forward()},defaultEventAction:"stopEvent"}])}},items:[{xtype:"panel",layout:"border",tbar:SfdcDevConsole.Menu.toolbar,items:[{region:"center",xtype:"tabpanel",id:"editors",enableTabScroll:!0,plugins:Ext.create("Ext.ux.TabCloseMenu",
{extraItemsTail:["-",{text:LC.getLabel("DeveloperConsole","SaveButton"),hideOnClick:!0,handler:function(a,c){a.editor&&a.editor.saveEditor(a.editor)}},{text:LC.getLabel("DeveloperConsole","SaveAllButton"),hideOnClick:!0,handler:function(a,c){apex.ide.IDE.saveAll()}},{text:LC.getLabel("DevConsoleVersioning","ContectMenu_Version"),hideOnClick:!0,handler:function(a,c){a.editor&&SfdcDevConsole.Versioning.open([a.editor.id])}},{text:LC.getLabel("DevConsoleMenuItem","DownloadLog"),hideOnClick:!0,handler:function(a,
c){a.editor&&a.editor.downloadLog()}},{text:LC.getLabel("DevConsoleMenuItem","CancelSave"),hideOnClick:!0,handler:function(a,c){Ext.getCmp("cancelAllDeployments").handler()}}],listeners:{aftermenu:function(){},beforemenu:function(a,c){var b=a.child('*[text\x3d"'+LC.getLabel("DevConsoleMenuItem","DownloadLog")+'"]');c instanceof apex.csi.BaseLogViewer?(b.enable(),b.editor=c):b.disable();b=a.child('*[text\x3d"'+LC.getLabel("DeveloperConsole","SaveButton")+'"]');c.canEdit&&c.canEdit()?(b.enable(),b.editor=
c):b.disable();b=a.child('*[text\x3d"'+LC.getLabel("DevConsoleVersioning","ContectMenu_Version")+'"]');if(SfdcDevConsole.Versioning){b.show();var k=SfdcDevConsole.Extents.getExtentFromId(c.id);k&&k.versionable?(b.enable(),b.editor=c):b.disable()}else b.hide();b=a.child('*[text\x3d"'+LC.getLabel("DevConsoleMenuItem","CancelSave")+'"]');c.saving?(b.show(),b.editor=c):b.hide()}}}),listeners:{tabchange:function(a,c,b){this.suspendActivateEditorTab||apex.ide.IDE.addHistory({back:function(){var a=b?b:c;
apex.ide.Viewer.open({id:a.id,Name:a.Name,xtype:a.xtype})},forward:function(){apex.ide.Viewer.open({id:c.id,Name:c.Name,xtype:c.xtype})}})},afterrender:function(a){SfdcDevConsole.Events.EventDispatcher.on("problems:clear",function(c,b){Sfdc.isArray(b)?Sfdc.each(b,function(b){(b=a.items.get(a.items.findIndex("id",b)))&&b.clear&&b.clear()}):a.items.each(function(a){a&&a.clear&&a.clear()})},this);SfdcDevConsole.Events.EventDispatcher.on("problems:new",function(c,b){Sfdc.isArray(b)&&Sfdc.each(b,function(b){var c=
a.items.get(a.items.findIndex("id",b.id));if(c)if(c.opened&&a.getActiveTab()===c)c.cmEditor.setError(b.lineNumber);else if(c.opened)c.on("activate",function(){c.cmEditor.setError(b.lineNumber);c.un("activate",arguments.callee)});else c.on("afterOpen",function(){c.cmEditor.setError(b.lineNumber);c.un("afterOpen",arguments.callee)})})},this);new Ext.util.KeyMap(Ext.getCmp("apexCSIViewport").getEl(),[{key:Ext.EventObject.PAGE_DOWN,scope:this,ctrl:!0,fn:function(){var a=Ext.getCmp("editors");if(a){var b=
a.items.items.length,d=a.getActiveTab(),b=(Sfdc.Array.indexOf(a.items.items,d)+1)%b;a.setActiveTab(b)}},defaultEventAction:"stopEvent"},{key:Ext.EventObject.PAGE_UP,scope:this,ctrl:!0,fn:function(){var a=Ext.getCmp("editors");if(a){var b=a.items.items.length,d=a.getActiveTab(),d=Sfdc.Array.indexOf(a.items.items,d)-1;a.setActiveTab(0>d?d+b:d)}},defaultEventAction:"stopEvent"},{key:Ext.EventObject.DELETE,scope:this,ctrl:!0,fn:function(){apex.ide.IDE.deleteEditor()},defaultEventAction:"stopEvent"}])}}},
{id:"bottomPanel",region:"south",xtype:"tabpanel",title:"Logs, Tests, and Problems",collapsible:!0,split:!0,preventHeader:!0,tabBar:{items:[{xtype:"tbfill"},{type:"down",id:"SouthCollapseToolbarButton",xtype:"tool",handler:function(a,c,b,d){Ext.getCmp("bottomPanel").toggleCollapse()}}]},problems:{},numberOfProblems:function(){var a=0,c;for(c in this.problems)this.problems.hasOwnProperty(c)&&a++;return a},refreshTitle:function(){var a="Logs, Tests, and Problems",c=this.numberOfProblems();0<c&&(a=Sfdc.userAgent.isIE7||
Sfdc.userAgent.isIE8?a+('\x3cspan style\x3d"color:red"\x3e '+c+"\x3c/span\x3e"):a+(' \x3cdiv class\x3d"problemCircle"\x3e\x3cspan\x3e'+c+"\x3c/span\x3e\x3c/div\x3e"));this.setTitle(a)},height:200,forceFit:!0,listeners:{expand:function(){Ext.getCmp("SouthCollapseToolbarButton").show()},collapse:function(){Ext.getCmp("SouthCollapseToolbarButton").hide()},afterrender:function(a){Ext.get("bottomPanel-splitter").selectable();SfdcDevConsole.Events.EventDispatcher.on("problems:clear",function(c,b){Sfdc.isArray(b)?
Sfdc.Array.forEach(b,function(b){delete a.problems[b]}):a.problems={};a.refreshTitle()},this);SfdcDevConsole.Events.EventDispatcher.on("problems:new",function(c,b){Sfdc.isArray(b)&&Sfdc.Array.forEach(b,function(b){a.problems[b.id]=b});a.refreshTitle()},this)}},items:this.getBottomTabs()}]}]}).doLayout();apex.ide.IDE.workspaceId?apex.ide.IDE.openWorkspace(apex.ide.IDE.workspaceId):apex.ide.IDE.createWorkspace(apex.ide.IDE.DEFAULT);apex.ide.IDE.restAPI&&new Ext.util.KeyMap(Ext.getBody(),[{ctrl:!0,alt:!1,
key:"h",shift:!0,fn:function(){apex.ide.SearchInFiles.searchInFiles()},defaultEventAction:"stopEvent"}])},this);apex.ide.IDE.on("workspaceLoaded",function(a){apex.ide.IDE.initialLoadingProgressBar.hide()});var l={selectExtent:function(a){SfdcDevConsole.Repository.open().selectExtent(a.extent)},selectTests:function(){Ext.getCmp("bottomPanel").setActiveTab("testResults")},openFile:function(a){var d=SfdcDevConsole.Extents[a.extent];d&&(a.id||a.Id)&&d.open(a)}};apex.ide.IDE.on("workspaceLoaded",function(a){var d=
document.URL.split("?"),d=Ext.urlDecode(d[d.length-1]),e=d.action;if(l[e])l[e](d);apex.ide.IDE.un("workspaceLoaded",arguments.callee)});SfdcDevConsole.load();SfdcDevConsole.Events.EventDispatcher.on("devconsole:loaded",function(a,d){SfdcDevConsole.Session.initialize()});window.addEventListener("beforeunload",function(){apex.ide.IDE.updateWorkspaceImpl(null,!0);apex.execanon.ExecuteAnonymous.close();var a=0,d=Ext.getCmp("editors");if(void 0!==d)for(var e=0;e<d.items.length;e++)d.items.get(e).dirty&&
a++;if(0<a)return"You have "+a+" unsaved tabs. Would you like to close without saving?"});new Ext.util.KeyMap(Ext.getBody(),[{ctrl:!0,shift:!0,key:191,fn:function(){apex.ide.ShortcutRegistry.win.isVisible()?apex.ide.ShortcutRegistry.win.hide():apex.ide.ShortcutRegistry.win.show()},defaultEventAction:"stopEvent"}]);new Ext.util.KeyMap(Ext.getBody(),[{ctrl:!0,shift:!1,alt:!1,key:"e",fn:function(){apex.ide.IDE.hasApex&&apex.ide.IDE.authorApex?apex.execanon.ExecuteAnonymous.open():Ext.Msg.alert("Execute Apex",
"You don't have the permission to execute Apex")},defaultEventAction:"stopEvent"}]);new Ext.KeyMap(Ext.getBody(),[{key:"e",ctrl:!0,shift:!1,alt:!0,fn:function(){if(apex.ide.IDE.hasApex&&apex.ide.IDE.authorApex)if(apex.execanon.ExecuteAnonymous.getAnonymousWindow().hidden)apex.ide.IDE.executeAnonymous(apex.ide.IDE.lastExecuteAnon,apex.execanon.ExecuteAnonymous.openLog);else{var a=Ext.getCmp("ExecAnon").editor.getSelection();a?Ext.getCmp("ExecAnon").execAnon(a):Ext.getCmp("ExecAnon").execAnon(Ext.getCmp("ExecAnon").editor.getValue())}else Ext.Msg.alert("Execute Apex",
"You don't have the permission to execute Apex")},defaultEventAction:"stopEvent"}]);new Ext.util.KeyMap(Ext.getBody(),[{ctrl:!0,shift:!1,key:"o",fn:function(){SfdcDevConsole.Repository.open()},defaultEventAction:"stopEvent"}]);new Ext.util.KeyMap(Ext.getBody(),[{ctrl:!0,shift:!1,alt:!1,key:191,fn:function(){var a=Ext.getCmp("editors").getActiveTab();a&&a.close()},defaultEventAction:"stopEvent"}]);new Ext.util.KeyMap(Ext.getBody(),[{ctrl:!0,shift:!1,alt:!0,key:191,fn:function(){apex.ide.IDE.closeAll()},
defaultEventAction:"stopEvent"}]);new Ext.util.KeyMap(Ext.getBody(),[{ctrl:!0,shift:!1,alt:!1,key:"g",fn:function(){apex.csi.LogBrowser.openLog()},defaultEventAction:"stopEvent"}]);new Ext.util.KeyMap(Ext.getBody(),[{ctrl:!0,shift:!0,alt:!1,key:"g",fn:function(){apex.csi.LogBrowser.openLog("rawlogviewer")},defaultEventAction:"stopEvent"}]);new Ext.util.KeyMap(Ext.getBody(),[{ctrl:!0,shift:!1,alt:!0,key:"g",fn:function(){var a=Ext.getCmp("editors").getActiveTab();a&&a instanceof apex.csi.BaseLogViewer&&
a.downloadLog()},defaultEventAction:"stopEvent"}]);new Ext.util.KeyMap(Ext.getBody(),[{ctrl:!0,shift:!1,alt:!1,key:"p",fn:function(){var a=Ext.getCmp("editors").getActiveTab();a&&a instanceof apex.csi.LogViewer&&Ext.getCmp("logPanelWindow").show()},defaultEventAction:"stopEvent"}]);new Ext.KeyMap(Ext.getBody(),[{key:"s",scope:this,ctrl:!0,shift:!1,fn:function(){var a=Ext.getCmp("editors").getActiveTab();a&&Sfdc.isFunction(a.save)&&a.saveEditor(a)},defaultEventAction:"stopEvent"},{key:"s",scope:this,
ctrl:!0,shift:!0,fn:function(){apex.ide.IDE.saveAll()},defaultEventAction:"stopEvent"}]);window.addEventListener("click",function(){SfdcDevConsole.Session.keepAlive()},!0);window.addEventListener("keypress",function(){SfdcDevConsole.Session.keepAlive()},!0)},getBottomTabs:function(){var f=[];f.push(apex.csi.LogBrowser);apex.ide.IDE.hasApex&&f.push(apex.test.TestResultBrowser);apex.ide.IDE.dataPipelineDevConsole&&f.push(datapipeline.DataPipelineJobPanel);apex.ide.IDE.hasHeapdumps()&&f.push(apex.fewmet.FewmetBrowser);
apex.ide.IDE.restAPI&&f.push(apex.query.QueryEditor);apex.ide.IDE.hasVisualforce&&SfdcDevConsole.Preferences.get("visualforceViewstateInspector")&&f.push({id:"ViewState",xtype:"viewstate"});f.push({id:"progress",xtype:"progresspanel"});f.push({id:"problems",xtype:"problemspanel"});return f}});

//# sourceMappingURL=/javascript/1524652778000/sfdc/source/ApexIDETop_Ext4.js.map
