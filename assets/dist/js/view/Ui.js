define("view/ui",["jquery","backbone"],function($,Backbone){"use strict";var UiView=Backbone.View.extend({el:"body",initialize:function(){console.log("UiView")},resetForm:function(context){context.$(".an-input").each(function(){$(this).val("")})},createCookie:function(id,name){var date=new Date;date.setTime(date.getTime()+2592e6);var expires="expires="+date.toGMTString();document.cookie="anacapri=&"+name+"&"+id+";"+expires},getCookie:function(){if(!document.cookie.match("anacapri"))return!1;for(var name="anacapri=",ca=document.cookie.split(";"),i=0;i<ca.length;i++){for(var c=ca[i];" "==c.charAt(0);)c=c.substring(1);if(0==c.indexOf(name)){var d=c.substring(name.length,c.length),e=d.split("&");$('input[name="friend-id"').val(e[2]),this.hideCreateForm(),this.showWelcomeBlock(e[1]),this.gotoSection("content","convide"),this.disabledForm()}}},hideCreateForm:function(){$(".create").addClass("hide")},showWelcomeBlock:function(name){$(".an-welcome span").text(name),$(".an-welcome").removeClass("hide")},disabledForm:function(){$(".friends .an-input").each(function(){$(this).removeAttr("disabled")})},showLoader:function(){$(".an-modal").addClass("open")},hideLoader:function(){$(".an-modal").removeClass("open")},gotoSection:function(section,hash){setTimeout(function(){$("html, body").animate({scrollTop:$("."+section).offset().top},"slow"),window.location.hash="!/"+hash},1e3)},setIdFriend:function(id){$('input[name="friend-id"').val(id)},showOverlay:function(){$(".an-overlay").removeClass("hide")},hideOverlay:function(){$(".an-overlay").addClass("hide")}});return UiView});