/*! npm.im/object-fit-images 3.2.4 */
var objectFitImages=function(){"use strict";function l(n,t){return"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='"+n+"' height='"+t+"'%3E%3C/svg%3E"}function a(n){if(n.srcset&&!k&&window.picturefill){var t=window.picturefill._;n[t.ns]&&n[t.ns].evaled||t.fillImg(n,{reselect:!0});n[t.ns].curSrc||(n[t.ns].supported=!1,t.fillImg(n,{reselect:!0}));n.currentSrc=n[t.ns].curSrc||n.src}}function v(n){for(var t,r=getComputedStyle(n).fontFamily,i={};null!==(t=w.exec(r));)i[t[1]]=t[2];return i}function o(n,t,i){var f=l(t||1,i||0);u.call(n,"src")!==f&&r.call(n,"src",f)}function f(n,t){n.naturalWidth?t(n):setTimeout(f,100,n,t)}function s(t){var e=v(t),i=t[n];if(e["object-fit"]=e["object-fit"]||"fill",!i.img){if("fill"===e["object-fit"])return;if(!i.skipTest&&h&&!e["object-position"])return}if(!i.img){i.img=new Image(t.width,t.height);i.img.srcset=u.call(t,"data-ofi-srcset")||t.srcset;i.img.src=u.call(t,"data-ofi-src")||t.src;r.call(t,"data-ofi-src",t.src);t.srcset&&r.call(t,"data-ofi-srcset",t.srcset);o(t,t.naturalWidth||t.width,t.naturalHeight||t.height);t.srcset&&(t.srcset="");try{y(t)}catch(t){window.console&&console.warn("https://bit.ly/ofi-old-browser")}}a(i.img);t.style.backgroundImage='url("'+(i.img.currentSrc||i.img.src).replace(/"/g,'\\"')+'")';t.style.backgroundPosition=e["object-position"]||"center";t.style.backgroundRepeat="no-repeat";t.style.backgroundOrigin="content-box";/scale-down/.test(e["object-fit"])?f(i.img,function(){t.style.backgroundSize=i.img.naturalWidth>t.width||i.img.naturalHeight>t.height?"contain":"auto"}):t.style.backgroundSize=e["object-fit"].replace("none","auto").replace("fill","100% 100%");f(i.img,function(n){o(t,n.naturalWidth,n.naturalHeight)})}function y(t){var i={get:function(i){return t[n].img[i?i:"src"]},set:function(i,u){return t[n].img[u?u:"src"]=i,r.call(t,"data-ofi-"+u,i),s(t),i}};Object.defineProperty(t,"src",i);Object.defineProperty(t,"currentSrc",{get:function(){return i.get("currentSrc")}});Object.defineProperty(t,"srcset",{get:function(){return i.get("srcset")},set:function(n){return i.set(n,"srcset")}})}function p(){function t(t,i){return t[n]&&t[n].img&&("src"===i||"srcset"===i)?t[n].img:t}e||(HTMLImageElement.prototype.getAttribute=function(n){return u.call(t(this,n),n)},HTMLImageElement.prototype.setAttribute=function(n,i){return r.call(t(this,n),n,String(i))})}function i(t,r){var f=!c&&!t,u;if(r=r||{},t=t||"img",e&&!r.skipTest||!b)return!1;for("img"===t?t=document.getElementsByTagName("img"):"string"==typeof t?t=document.querySelectorAll(t):("length"in t)||(t=[t]),u=0;u<t.length;u++)t[u][n]=t[u][n]||{skipTest:r.skipTest},s(t[u]);f&&(document.body.addEventListener("load",function(n){"IMG"===n.target.tagName&&i(n.target,{skipTest:r.skipTest})},!0),c=!0,t="img");r.watchMQ&&window.addEventListener("resize",i.bind(null,t,{skipTest:r.skipTest}))}var n="bfred-it:object-fit-images",w=/(object-fit|object-position)\s*:\s*([-.\w\s%]+)/g,t="undefined"==typeof Image?{style:{"object-position":1}}:new Image,h="object-fit"in t.style,e="object-position"in t.style,b="background-size"in t.style,k="string"==typeof t.currentSrc,u=t.getAttribute,r=t.setAttribute,c=!1;return i.supportsObjectFit=h,i.supportsObjectPosition=e,p(),i}();(function(n){n(function(){var t=n("#sidebar");t.find(".panel-collapse").hide();n(document).on("click","#sidebar .panel-title > a",function(i){i.preventDefault();var r=n(this).attr("href");n(r).parents(".panel-primary").hasClass("open")||t.find(".panel-primary.open").toggleClass("open").find(".panel-collapse").slideToggle(300);n(r).slideToggle(300);n(r).parent().toggleClass("open")});n('button.sidebar-closed[data-toggle="sidebar"]').on("click",function(){var t=n(this);n("html").addClass("show-sidebar-right");t.hide();t.siblings("button").show()});n('button.sidebar-opened[data-toggle="sidebar"]').on("click",function(t){t.preventDefault();var i=n(this).parent("div.btn-group-vertical");i.find("button").hide();i.find('button.sidebar-closed[data-toggle="sidebar"]').show();n("html").removeClass("show-sidebar-right")})})})(window.jQuery);jQuery(window).bind("load",function(){var n=n||jQuery;if(typeof jQuery.fn.popover=="undefined")n(document).on("click",'[data-toggle="tab"]',function(t){t.preventDefault();var u=n(this).attr("href"),i=n(this).parents(".nav-tabs"),r=i.siblings(".tab-content");n(this).parent().hasClass("active")||(i.find(".active").removeClass("active"),n(this).parent().addClass("active"),r.find(".active").removeClass("active"),r.find(u).addClass("active"))})}),function(n){var t=function(){var t=n("#experiencedata");n.ajax({url:"/api/Demo/ExperienceDataContent",method:"get",cache:!1,success:function(i){t.replaceWith(i);n("#sidebar").find(".panel-collapse").hide()}})};n(function(){n(".refresh-sidebar").click(function(){n(this).fadeOut();t();n(this).fadeIn()});n(".end-visit").click(function(){n(this).fadeOut();n.ajax({url:"/api/Demo/EndVisit",method:"get",cache:!1,success:function(){t()}});n(this).fadeIn()})})}(jQuery),function(n){n(function(){})}(window.jQuery,window,document),function(n){n(function(){function r(t){t.click(function(){e(n(this))});t.find(">.component-content").click(function(n){n.stopPropagation()})}function e(n){var r=n.hasClass("open");t.find(".open").removeClass("open");r||(n.addClass("open"),i.find(".language-selector-item-container").css("display","none"))}var t=n(".primary-nav"),i=n(".language-selector"),u=t.find(".main-search"),f=t.find(".megadrop");r(u);r(f);i.find(".language-selector-select-link").click(function(){i.find(".language-selector-item-container").is(":visible")||t.find(".open").removeClass("open")})})}(window.jQuery)