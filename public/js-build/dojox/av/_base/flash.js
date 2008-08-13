/*
	Copyright (c) 2004-2008, The Dojo Foundation
	All Rights Reserved.

	Licensed under the Academic Free License version 2.1 or above OR the
	modified BSD license. For more information on Dojo licensing, see:

		http://dojotoolkit.org/book/dojo-book-0-9/introduction/licensing
*/


if(!dojo._hasResource["dojox.av._base.flash"]){dojo._hasResource["dojox.av._base.flash"]=true;dojo.provide("dojox.av._base.flash");(function(){var _1,_2,_3={expressInstall:false,width:320,height:240,style:null,redirect:null,params:[]};var _4="dojox-av-flash-",_5=0;function prep(_6){_6=dojo.mixin(dojo.clone(_3),_6||{});if(!("path" in _6)){console.error("dojox.av._base.flash(ctor):: no path reference to a Flash movie was provided.");return null;}if(!("id" in _6)){_6.id=(_4+_5++);}return _6;};if(dojo.isIE){_1=function(_7){_7=prep(_7);if(!_7){return null;}var s="<object id=\""+_7.id+"\" "+"classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" "+"width=\""+_7.width+"\" "+"height=\""+_7.height+"\""+((_7.style)?" style=\""+_7.style+"\"":"")+">"+"<param name=\"movie\" value=\""+_7.path+"\" />";for(var i=0,l=_7.params.length;i<l;i++){s+="<param name=\""+_7.params[i].key+"\" value=\""+_7.params[i].value+"\" />";}s+="</object>";return {id:_7.id,markup:s};};_2=(function(){var _b=10,_c=null;while(!_c&&_b>7){try{_c=new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+_b--);}catch(e){}}if(_c){var v=_c.GetVariable("$version").split(" ")[1].split(",");return {major:(v[0]!=null)?parseInt(v[0]):0,minor:(v[1]!=null)?parseInt(v[1]):0,rev:(v[2]!=null)?parseInt(v[2]):0};}return {major:0,minor:0,rev:0};})();dojo.addOnUnload(function(){var _f=dojo.query("object");for(var i=_f.length-1;i>=0;i--){_f[i].style.display="none";for(var p in _f[i]){if(p!="FlashVars"&&dojo.isFunction(_f[i][p])){_f[i][p]=function(){};}}}});var _12=dojo.connect(dojo.global,"onbeforeunload",function(){try{if(__flash_unloadHandler){__flash_unloadHandler=function(){};}if(__flash_savedUnloadHandler){__flash_savedUnloadHandler=function(){};}}catch(e){}dojo.disconnect(_12);});}else{_1=function(_13){_13=prep(_13);if(!_13){return null;}var s="<embed type=\"application/x-shockwave-flash\" "+"src=\""+_13.path+"\" "+"id=\""+_13.id+"\" "+"name=\""+_13.id+"\" "+"width=\""+_13.width+"\" "+"height=\""+_13.height+"\""+(("style" in _13)?" style=\""+_13.style+"\"":"")+"swLiveConnect=\"true\" "+"allowScriptAccess=\"sameDomain\" "+"pluginspage=\""+window.location.protocol+"//www.adobe.com/go/getflashplayer\" ";for(var i=0,l=_13.params.length;i<l;i++){s+=" "+_13.params[i].key+"=\""+_13.params[i].value+"\"";}s+=" />";return {id:_13.id,markup:s};};_2=(function(){var _17=navigator.plugins["Shockwave Flash"];if(_17&&_17.description){var v=_17.description.replace(/([a-zA-Z]|\s)+/,"").replace(/(\s+r|\s+b[0-9]+)/,".").split(".");return {major:(v[0]!=null)?parseInt(v[0]):0,minor:(v[1]!=null)?parseInt(v[1]):0,rev:(v[2]!=null)?parseInt(v[2]):0};}return {major:0,minor:0,rev:0};})();}dojox.av.flash={minSupported:8,available:_2.major,supported:(_2.major>=8),version:_2,initialized:false,onInitialize:function(){dojox.av.flash.initialized=true;},__ie_markup__:function(_19){return _1(_19);}};if(dojo.isIE){if(dojo._initFired){var e=document.createElement("script");e.type="text/javascript";e.src=dojo.moduleUrl("dojox","av/_base/_ieFlash.js");e.defer=true;document.getElementsByTagName("head")[0].appendChild(e);}else{document.write("<scr"+"ipt defer type=\"text/javascript\" src=\""+dojo.moduleUrl("dojox","av/_base/_ieFlash.js")+"\">"+"</scr"+"ipt>");}}else{dojox.av.flash.place=function(_1a,_1b){_1a=dojo.byId(_1a);var o=_1(_1b);if(o){_1a.innerHTML=o.markup;return document[o.id];}return null;};if(dojo._initFired){dojox.av.flash.onInitialize();}else{dojo.addOnLoad(function(){console.log("firing off dojox.av.flash.onInitialize() for sane browsers.");dojox.av.flash.onInitialize();});}}})();}