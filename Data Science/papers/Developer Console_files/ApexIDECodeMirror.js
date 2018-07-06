/*
 * This code is for Internal Salesforce use only, and subject to change without notice.
 * Customers shouldn't reference this file in any web pages.
 */
var CodemirrorAutocomplete=function(b,f){function n(c){c.stopPropagation();c.stopImmediatePropagation();c.preventDefault()}function h(c,a,b){"function"==typeof c.addEventListener?c.addEventListener(a,b,!1):c.attachEvent("on"+a,b)}function k(){if(b.completeCt){var c=b.completeCt;b.completeCt=null;c.parentNode.removeChild(c)}}function r(){var c=b.completeCt.sel,a=b.completeCt.token,c=c.options[c.selectedIndex].text,d=b.completionSelected(a,c,b),c=d?"string"===typeof d.completed?d.completed:c:c,d=d?
d.cursorOffset?d.cursorOffset:0:0,e=b.getCursor(!1);b.replaceRange(c,{line:e.line,ch:a.start},{line:e.line,ch:a.end});k();setTimeout(function(){b.focus()},50);a=b.getCursor();a.ch+=d;b.setCursor(a)}function p(){k();if(!b.somethingSelected()){var c=b.getCursor(!1),a=b.getTokenAt(c),d=b.getLine(c.line);a.display=a.string;a.string=a.string.toLowerCase();var e=null,d=b.getCompletions(a,c,d,b);d.error&&(e=d.error,e===s&&(e=null),s=d.error,d=d.completions);if(d.length||e){c=document.createElement("div");
c.id="codemirror_completions";c.className="codemirror_completions";c.token=a;if(0<d.length){var g=c.appendChild(document.createElement("select"));g.multiple=!0;c.sel=g;for(a=0;a<d.length;++a){var f=document.createElement("option");f.appendChild(document.createTextNode(d[a]));g.appendChild(f)}g.firstChild.selected=!0;g.size=10}if(e){var l=document.createElement("div");c.appendChild(l);l.className="error";l.innerHTML=e}a=b.cursorCoords(!0,"local");f=b.getScrollInfo();e=a.left-f.left;a=a.top-f.top+20;
c.style.left=e+"px";c.style.top=a+"px";b.getWrapperElement().appendChild(c);b.completeCt=c;10>=d.length&&g&&(c.style.width=g.clientWidth-1+"px");d=t();f=c.offsetWidth;e+f>d.width&&(e=d.width-f,c.style.left=(0>e?0:e)+"px");e=c.offsetHeight;0<a-e&&a+e>d.height&&(c.style.top=a-e-20+"px");h(g||l,"blur",function(){g.justClicked||k()});g&&(h(g,"focus",function(){g.justClicked=!0;setTimeout(function(){g.justClicked=!1},20)}),h(g,"click",r),h(g,"mouseover",function(){g.shouldFocus=!0}),h(g,"mouseout",function(){g.shouldFocus=
!1}))}}}function t(){var c=630,a=460;document.body&&document.body.offsetWidth?(c=document.body.offsetWidth,a=document.body.offsetHeight):"CSS1Compat"==document.compatMode&&document.documentElement&&document.documentElement.offsetWidth?(c=document.documentElement.offsetWidth,a=document.documentElement.offsetHeight):window.innerWidth&&window.innerHeight&&(c=window.innerWidth,a=window.innerHeight);try{var d=b.getScrollerElement(),c=d.offsetWidth||d.clientWidth||c,a=d.offsetHeight||d.clientHeight||a}catch(e){}return{width:c,
height:a}}if(!(this instanceof arguments.callee))throw"Constructor called as a function";if(!b||!("object"===typeof b&&"function"===typeof b.on&&"function"===typeof b.getCursor&&"function"===typeof b.getTokenAt&&"function"===typeof b.somethingSelected&&"function"===typeof b.getWrapperElement))throw"Invalid CodeMirror editor";if("function"!==typeof b.getCompletions)throw"Editor instance must override getCompletions function";if("function"!==typeof b.completionSelected)throw"Editor instance must override completionSelected function";
if("function"!==typeof b.shouldEndAutoComplete)throw"Editor instance must override shouldEndAutoComplete function";f||(f={});void 0===f.autoCompletion&&(f.autoCompletion=!0);f.completionKey||(f.completionKey={ctrl:!0,code:32});var q=!1;b.on("keydown",function(c,a){var d=a.keyCode?a.keyCode:a.which;q=!1;if(b.completeCt)if(27===d)k(),n(a);else if(b.shouldEndAutoComplete(a))k();else{if(38===d||40===d){n(a);var e=b.completeCt.sel,g=e.selectedIndex,h=b.completeCt.sel.scrollTop;0<g&&38===d&&(e[g].selected=
0,e[g-1].selected=1);g<e.length-1&&40===d&&(e[g].selected=0,e[g+1].selected=1);if(0<=navigator.userAgent.indexOf("WebKit")&&10<e.length){var g=e.selectedIndex,l=Math.round(e.offsetHeight/10),m=h/l;38===d&&g<m?h-=l:40===d&&g>=m+10&&(h=l*(e.selectedIndex-9));b.completeCt.sel.scrollTop=h}return!0}if(13===d)return n(a),r(),!0;f.autoCompletion||(q=!0)}else!f.autoCompletion&&(d===f.completionKey.code&&a.ctrlKey===f.completionKey.ctrl)&&p();return!f.autoCompletion&&d===f.completionKey.code&&a.ctrlKey===
f.completionKey.ctrl?(n(a),!0):!1});b.on("keyup",function(c,a){var d=a.keyCode?a.keyCode:a.which;!f.autoCompletion&&b.completeCt&&40!==d&&38!==d?p():!f.autoCompletion&&(SfdcDevConsole.Preferences.get("autocompleteApexAfterKeyPress")&&f.completeAfterChar&&d===f.completeAfterChar)&&p();return!f.autoCompletion&&d===f.completionKey.code&&a.ctrlKey===f.completionKey.ctrl?(n(a),!0):!1});b.on("blur",function(){b.completeCt&&b.completeCt.sel&&b.completeCt.sel.shouldFocus?b.completeCt.focus():k()});var m;
b.on("cursorActivity",function(){if(f.autoCompletion)p();else if(q){if(m){var c=b.getCursor();(c.line!==m.line||1<Math.abs(c.ch-m.ch))&&k()}}else k();m=b.getCursor()});var s};
Sfdc.ns("SfdcDevConsole.Core.Autocomplete.Apex");
SfdcDevConsole.Core.Autocomplete.Cache=function(){var c={},a=function(a){return!a||!a.visibility||"PUBLIC"===a.visibility||"GLOBAL"===a.visibility},h={getClass:function(a,b){return c[(a?a.toLowerCase()+".":"")+b.toLowerCase()]},hasClass:function(a,b){return c.hasOwnProperty((a?a.toLowerCase()+".":"")+b.toLowerCase())},setClass:function(a,b,d){var e=(a?a.toLowerCase()+".":"")+b.toLowerCase();c[e]={namespace:a||"",name:b,symbolTable:d,accessibleSymbols:null};if(d&&Sfdc.isArray(d.innerClasses))for(a=
0;a<d.innerClasses.length;a++)b=d.innerClasses[a],h.setClass(d.namespace,d.name+"."+b.name,b);return e},forEachClass:function(a){for(var b in c)c.hasOwnProperty(b)&&a(b,c[b])},getName:function(a,b){if(h.hasClass(a,b))return h.getClass(a,b).name},getSymbolTable:function(a,b){if(h.hasClass(a,b))return h.getClass(a,b).symbolTable},hasSymbolTable:function(a,b){return h.hasClass(a,b)&&null!==h.getSymbolTable(a,b)},getAccessibleSymbols:function(c,b){if(h.hasSymbolTable(c,b)){var d=h.getClass(c,b);if(null===
d.accessibleSymbols){var e=d.symbolTable,k=[];if(e&&Sfdc.isArray(e.methods))for(var f=0;f<e.methods.length;f++){var l=e.methods[f];a(l)&&k.push(l)}if(e&&Sfdc.isArray(e.constructors))for(f=0;f<e.constructors.length;f++)l=e.constructors[f],a(l)&&k.push(l);if(e&&Sfdc.isArray(e.properties))for(f=0;f<e.properties.length;f++)l=e.properties[f],a(l)&&k.push(l);if(e&&Sfdc.isArray(e.innerClasses))for(f=0;f<e.innerClasses.length;f++)l=e.innerClasses[f],a(l)&&k.push(l);d.accessibleSymbols=k}return d.accessibleSymbols}},
addSymbolTables:function(a){for(var b in a)if(a.hasOwnProperty(b)){var c=a[b],e;for(e in c)c.hasOwnProperty(e)&&h.setClass(b,e,c[e])}}};return h};
SfdcDevConsole.Core.Autocomplete.Apex={SYSTEM:"system",MAX_LIST_SIZE:500,NO_SYMBOLS:"No symbols found. Attempting to retrieve symbols from Salesforce.",UNKNOWN_SYMBOL:"Can't find a type for the given symbol.",INVALID_REFERENCE_ON_SOBJECT:"Can't use a static reference for sObject fields.",MORE_ITEMS:"There are too many results to display. Keep typing to filter your results.",CLASS_SEPARATOR:" - ",TYPE_SEPARATOR:" : ",ADD_SOBJECT:"- Add custom field",tables:new SfdcDevConsole.Core.Autocomplete.Cache,
getInstance:function(c){if(!c.editorInfo)throw"Can't create an Apex autocomplete instance on an editor without editorInfo";this.publicSymbolTables.load();this.userClassList.load();this.sObjectList.load();c.completionSelected=this.completionSelected;c.getCompletions=this.getCompletions;c.shouldEndAutoComplete=this.shouldEndAutoComplete;return new CodemirrorAutocomplete(c,{autoCompletion:!1,completeAfterChar:"undefined"!==typeof KEY_PERIOD?KEY_PERIOD:190})},completionSelected:function(c,a,h){var g=
SfdcDevConsole.Core.Autocomplete.Apex;h=0;0<a.indexOf(")")&&(a=a.substring(0,a.indexOf(")")+1),-1===a.indexOf("()")&&(h=a.indexOf("(")-a.length));if(a===g.ADD_SOBJECT)return apex.ide.IDE.createCustomField(c.state.context.object.type,c.display),{completed:c.display};c=a.indexOf(g.CLASS_SEPARATOR);0<=c&&(a=a.substring(0,c));c=a.indexOf(g.TYPE_SEPARATOR);0<=c&&(a=a.substring(0,c));c=a.indexOf("(");if(0===a.indexOf("debug")&&0>a.indexOf(","))a=a.substring(0,c+1),a+="'');",h=-3;else try{0<=c&&(a=a.replace(/(\w+) (\w+)/g,
"$2"),a.match(/\(\s*\w+.*?\)/)&&(h=c-a.length+1))}catch(b){}return{completed:a,cursorOffset:h}},stripToken:function(c){if(!c||!Sfdc.isString(c.string))return"";var a=Sfdc.String.trim(c.string);1===a.length&&!a.match(/[a-zA-Z0-9_]/)&&(c.start+=c.string.length,a="");return a},methodSignature:function(c){for(var a=c.name+"(",h=[],g=0;g<c.parameters.length;g++){var b=c.parameters[g],d="unknown";b?d=b.type+(b.name&&"null"!==b.name?" "+b.name:""):Sfdc.log("Param "+g+" is undefined for "+symbol.name);h.push(d)}a+=
h.join(", ")+")";return a+=" : "+c.returnType},addMatchedCompletions:function(c,a,h,g){for(var b=0;b<a.length;b++){var d=a[b];if(0===d.name.toLowerCase().indexOf(c)){var e=d.name;d.parameters?e=this.methodSignature(d):d.type&&(e+=this.TYPE_SEPARATOR+d.type);g&&(e+=this.CLASS_SEPARATOR+g);h.add(Sfdc.String.unescapeHtml(e))}}},findObjectType:function(c,a,h){if(!c||!a||!a.name)return null;var g=a.name.toLowerCase();if(a.isMethod){if(Sfdc.isArray(c.methods))for(var b=0;b<c.methods.length;b++)if(a=c.methods[b],
a.name.toLowerCase()===g)return a.returnType}else if(a.isConstructor){if(Sfdc.isArray(c.constructors))for(b=0;b<c.constructors.length;b++)if(a=c.constructors[b],a.name.toLowerCase()===g)return a.name}else{if(Sfdc.isArray(c.variables))for(b=0;b<c.variables.length;b++){var d=c.variables[b];if(d.name.toLowerCase()===g)return d.type}if(Sfdc.isArray(c.properties))for(b=0;b<c.properties.length;b++)if(d=c.properties[b],d.name.toLowerCase()===g)return d.type;try{var e=RegExp("(\\w+\\.\\w+)\\s+"+a.name+"\\s*[;\x3d),]",
"i"),k=e.exec(h.getValue());if(k&&k[1])return k[1];e=RegExp("(\\w+)\\s*(\x3c[\\s\\w\x3c\x3e,]*\x3e)? (\\s*\\w*\\s*,)*\\s*"+a.name+"\\s*[;\x3d),]","i");if((k=e.exec(h.getValue()))&&k[1])return k[1]}catch(f){}}return null},NUM_0:48,NUM_9:57,DASH:189,CHAR_Z:90,shouldEndAutoComplete:function(c){var a=SfdcDevConsole.Core.Autocomplete.Apex,h=c.keyCode?c.keyCode:c.which,h=parseInt(h,10);c=c.shiftKey;return h>=a.NUM_0&&h<=a.NUM_9&&c?!0:h==a.DASH&&c||h<=a.CHAR_Z?!1:!0},getCompletions:function(c,a,h,g){var b=
SfdcDevConsole.Core.Autocomplete.Apex,d=new SfdcDevConsole.FixedSizeList(b.MAX_LIST_SIZE,!0,!0),e=null;a=null;var k=SfdcDevConsole.namespace;try{var f=c.state.context.object,l=b.stripToken(c);if(g&&g.editorInfo){var m=g.editorInfo;m.symbolTable?f?a=b.findObjectType(m.symbolTable,f,g):b.addMatchedCompletions(l,m.getSymbolsFromTable(!0),d,m.name):m.getSymbolTableFromCache()}c=function(a,c){b.sObjectList.hasSObject(c)?(b.sObjectList.loadFields(c),e=b.NO_SYMBOLS):e=b.userClassList.loadSymbolTable(a,c)?
b.NO_SYMBOLS:b.UNKNOWN_SYMBOL};if(f){f.on&&b.namespaces[f.on.name]&&(k=f.on.name);if(a){var n=b.sObjectList.hasSObject(a);g=n?"":k;b.tables.hasSymbolTable(g,a)?(b.addMatchedCompletions(l,b.tables.getAccessibleSymbols(g,a),d,a),n&&(f.type=a,d.add(b.ADD_SOBJECT))):b.tables.hasSymbolTable(b.SYSTEM,a)?b.addMatchedCompletions(l,b.tables.getAccessibleSymbols(b.SYSTEM,a),d,a):c(g,a);if(0===d.getSize()&&m.symbolTable&&Sfdc.isArray(m.symbolTable.innerClasses))for(var q=m.symbolTable.innerClasses,n=0;n<q.length;n++){var r=
q[n];if(a.toLowerCase()===r.name.toLowerCase()){var e=null,p=m.symbolTable.name+"."+a;b.tables.hasSymbolTable(k,p)||b.tables.setClass(k,p,into.symbolTable);b.addMatchedCompletions(l,b.tables.getAccessibleSymbols(k,p),d,a);break}}}else b.sObjectList.hasSObject(f.name)?e=b.INVALID_REFERENCE_ON_SOBJECT:b.tables.hasSymbolTable(k,f.name)?b.addMatchedCompletions(l,b.tables.getAccessibleSymbols(k,f.name),d,f.name):b.tables.hasSymbolTable(b.SYSTEM,f.name)?b.addMatchedCompletions(l,b.tables.getAccessibleSymbols(b.SYSTEM,
f.name),d,f.name):c(k,f.name);b.namespaces[f.name]&&(e=null,b.tables.forEachClass(function(a,b){b.namespace.toLowerCase()===f.name&&0===b.name.toLowerCase().indexOf(l)&&d.add(Sfdc.String.unescapeHtml(b.name))}))}else b.tables.forEachClass(function(a,c){var f=""===c.namespace||c.namespace===k||c.namespace.toLowerCase()===b.SYSTEM;0===c.name.toLowerCase().indexOf(l)&&f&&d.add(Sfdc.String.unescapeHtml(c.name));(f=c.namespace.toLowerCase())&&(0<f.length&&0===f.indexOf(l))&&d.add(Sfdc.String.unescapeHtml(c.namespace))})}catch(s){s===
d.FULL_LIST_EXCEPTION&&(e=b.MORE_ITEMS)}m=d.getList().sort(function(a,c){if(a===b.ADD_SOBJECT)return 1;if(c===b.ADD_SOBJECT)return-1;var f=a.toLowerCase(),k=c.toLowerCase();return f===k?0:f<k?-1:1});return e?{error:e,completions:m}:m},Modifier:{STATIC:"STATIC",TEST:"TEST"},hasModifier:function(c,a){return c&&Sfdc.isArray(c.modifiers)&&void 0!==Modifier[a]?0<=Sfdc.Array.indexOf(c.modifiers,a):!1},initialized:!1};
(function(){var c=SfdcDevConsole.Core.Autocomplete.Apex,a=SfdcDevConsole.ToolingAPI,h=function(a,b){if(Sfdc.isFunction(b))for(var c in a)a.hasOwnProperty(c)&&b(c,a[c])},g=function(a){this.loading=!0;a.call(this,this)},b=function(a,b){var c=this;return function(d){try{Sfdc.isFunction(b)&&b(d),c.initialized=!!a}finally{c.loading=!1}}};c.namespaces={};var d=function(a){if(!a||"null"===a)a="";c.namespaces[a.toLowerCase()]=!0};c.publicSymbolTables={initialized:!1,loading:!1,raw:null,load:function(){!this.initialized&&
!this.loading&&g.call(this,function(k){a.request({url:a.URLs.api(!0)+"/completions?type\x3dapex",continuation:b.call(k,!0,function(a){k.raw=a.publicDeclarations;c.tables.addSymbolTables(a.publicDeclarations);for(var b in a.publicDeclarations)a.publicDeclarations.hasOwnProperty(b)&&d(b)}),failure:b.call(k)})})},toString:function(a){if(this.loading)return"Loading public symbols...";if(!this.initialized)return"The public symbol tables are not initialized";if(!this.raw)throw"The public symbols are initialized but there is no data.";
var b={};h(this.raw,function(l,d){var e={};h(d,function(b,f){var l=[];Sfdc.Array.forEach(f.methods,function(b){a?l.push(b.name):l.push(Sfdc.String.unescapeHtml(c.methodSignature(b)))});e[b]=l});b[l]=e});return JSON.stringify(b,void 0,4)}};c.userClassList={initialized:!1,loading:!1,namespaces:{},invalidClassList:{},load:function(){!this.initialized&&!this.loading&&(g.call(this,function(a){SfdcDevConsole.Extents.ApexClass.getRecords(b.call(a,!0,function(a){for(var b=0,k=a.length;b<k;b++){var d=a[b];
c.tables.setClass(d.NamespacePrefix,d.Name,null)}}))}),a.query("SELECT NamespacePrefix FROM ApexClass GROUP BY NamespacePrefix",{continuation:function(a){for(var b=0;b<a.size;b++)d(a.records[b].NamespacePrefix)}}))},loadSymbolTable:function(k,f){if(this.loading)return!0;var l=(k?k:"")+f;if(this.invalidClassList[l])return!1;g.call(this,function(d){a.getSymbolTable(k,f,{continuation:b.call(d,!0,function(a){a&&a.SymbolTable?(a=a.SymbolTable,c.tables.setClass(a.namespace,a.name,a)):d.invalidClassList[l]=
!0}),failure:b.call(d,!0)})});return!0}};c.sObjectList={NS_SEPERATOR:"__",CUSTOM_OBJECT:/^(\w+__c)$/,CUSTOM_OBJECT_WITH_NS_REGEX:/^(\w+)__(\w+__c)$/,initialized:!1,loading:!1,sObjectList:{},hasSObject:function(a){return void 0!==this.sObjectList[a.toLowerCase()]},hasSObjectFields:function(a){return Sfdc.isObject(this.sObjectList[a.toLowerCase()])},load:function(){!this.initialized&&!this.loading&&g.call(this,function(d){a.sobject("",{tooling:!1,continuation:b.call(d,!0,function(a){for(var b=0;b<a.sobjects.length;b++){var e=
a.sobjects[b],h=e.name,g=e.name.match(d.CUSTOM_OBJECT_WITH_NS_REGEX);g&&(g[1]&&g[2])&&0<=SfdcDevConsole.hasNamespace(g[1])&&(c.tables.setClass("",g[2],null),d.sObjectList[g[2].toLowerCase()]=null);c.tables.setClass("",h,null);d.sObjectList[e.name.toLowerCase()]=null}}),failure:b.call(d)})})},loadFields:function(d){if(!this.loading&&(SfdcDevConsole.hasNamespace()&&(d.match(this.CUSTOM_OBJECT)&&!d.match(this.CUSTOM_OBJECT_WITH_NS_REGEX))&&(d=SfdcDevConsole.namespace+this.NS_SEPERATOR+d),this.hasSObject(d)&&
!this.hasSObjectFields(d)))return g.call(this,function(f){a.sobject(d,{describe:!0,tooling:!1,continuation:b.call(f,!0,function(a){var b=[];if(a&&a.fields)for(var e=0;e<a.fields.length;e++){var g=a.fields[e];b.push({name:g.name,scope:"GLOBAL",type:g.type})}a={properties:b};f.sObjectList[d.toLowerCase()]=a;c.tables.setClass("",d,a)}),failure:b.call(f,!0)})}),!0}};try{SfdcDevConsole.Events.EventDispatcher.on("commandLine:init",function(a,b){b.addAction("publicSymbols",{format:function(a){a=c.publicSymbolTables.toString(a).split("\n");
for(var b=function(a){for(var b="",c=0;c<a.length;c++)b+="\x26nbsp;";return b},d=0;d<a.length;d++)a[d]=a[d].replace(/^(\s+)/,b);return a.join("\x3cbr /\x3e")},options:{onlyNames:{description:"Only output the names of the public symbols",run:function(a,b,c){a.output(c.format(!0));return!1}}},run:function(a,b){a.output(this.format(!1))},help:"Output the public symbols accessible to apex editors"})})}catch(e){}})();
Sfdc.ns("SfdcDevConsole.Core.Autocomplete.Visualforce");
SfdcDevConsole.Core.Autocomplete.Visualforce={getInstance:function(a){if(!a.possibleTags)throw"Can't create a VF autocomplete instance on an editor without possibleTags";a.completionSelected=this.completionSelected;a.getCompletions=this.getCompletions;a.shouldEndAutoComplete=this.shouldEndAutoComplete;return new CodemirrorAutocomplete(a)},completionSelected:function(a,b,c){var g=SfdcDevConsole.Core.Autocomplete.Visualforce,h=a.state.outer?a.state.outer:a.state,e=0;g.isAttribute.call(c,a,h)?(b=b.substring(0,
b.indexOf(" "))+'\x3d""',e=-1):g.isAttributValue.call(c,a,h)?b='"'+b+'"':c.possibleTags[b].simple?(b="\x3c"+b+" /\x3e",e=-2):(e="\x3c/"+b+"\x3e",b="\x3c"+b+"\x3e"+e,e=-e.length);return{completed:b,cursorOffset:e}},isAttribute:function(a,b){return("attribute"===a.className||"openTag"===b.type||null===a.className)&&void 0!==this.possibleTags[b.tagName]},isAttributValue:function(a,b){var c=this.possibleTags[b.tagName];return"string"===a.className&&c&&c.attribs},shouldEndAutoComplete:function(a){return!1},
getCompletions:function(a,b,c,g){function h(b){0===b.toLowerCase().indexOf(Sfdc.String.trim(m))&&(n.isAttribute.call(g,a,f)&&void 0!==k[f.tagName].attribs&&void 0!==k[f.tagName].attribs[b]?l.push(b+" ("+k[f.tagName].attribs[b].type+")"):l.push(b))}function e(a,b){for(var c in a)"string"===typeof c&&b(c)}var n=SfdcDevConsole.Core.Autocomplete.Visualforce,k=g.possibleTags,f=a.state.outer?a.state.outer:a.state;("error"==a.className||"tag"==a.className)&&/^<[\w$_]*:?[\w$_]*$/.test(a.string)?a.string=
a.string.substring(1,a.string.length):n.isAttribute.call(g,a,f)&&""===Sfdc.String.trim(a.string)&&(a.start=b.ch,a.end=b.ch,a.string="");var l=[],m=a.string;if("error"==a.className||"tag"===a.className)e(k,h);else if(n.isAttribute.call(g,a,f))e(k[f.tagName].attribs,h);else if(n.isAttributValue.call(g,a,f)&&b.ch!=a.end){var m=trim(m,'"').substring(1,m.length-1),d=a.start-1;b=c.substring(0,d);for(var p=-1,d=d-1;0<=d;d--)if(" "===c.charAt(d)){p=d+1;break}else if("\x3c"===c.charAt(d))break;if(0<=p&&(b=
b.substring(p),(b=k[f.tagName].attribs[b])&&b.values)){c=b.values;for(d=0;d<c.length;d++)h(c[d])}}1==l.length&&(c=l[0].toLowerCase(),0<=c.indexOf(" ")&&(c=c.substring(0,c.indexOf(" "))),c===m&&(l=[]));return l}};

//# sourceMappingURL=/javascript/1524652778000/sfdc/source/ApexIDECodeMirror.js.map
