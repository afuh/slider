"use strict";function _toConsumableArray(e){if(Array.isArray(e)){for(var r=0,t=Array(e.length);r<e.length;r++)t[r]=e[r];return t}return Array.from(e)}var app=document.getElementById("app"),slider=app.querySelector(".slider"),next=app.querySelector(".next"),prev=app.querySelector(".prev"),pics=[],images=20,count=0,addImages=function(){for(var e=0;e<images;e++){var r='<div class="pics">\n          <img src="https://source.unsplash.com/random?sig='+e+'" alt="pic'+(e+1)+'/1980x1080">\n        </div>';slider.insertAdjacentHTML("beforeend",r)}pics.push.apply(pics,_toConsumableArray(app.querySelectorAll(".pics")))},slide={next:function(){count===images-1?(count=0,pics.forEach(function(e){return e.style.transform="translateX(0)"})):(count++,pics.forEach(function(e){return e.style.transform="translateX("+-100*count+"%)"}))},prev:function(){0===count?(count=images-1,pics.forEach(function(e){return e.style.transform="translateX("+-100*(images-1)+"%)"})):(count--,pics.forEach(function(e){return e.style.transform="translateX("+-100*count+"%)"}))}};next.addEventListener("click",slide.next),prev.addEventListener("click",slide.prev);var interval=setInterval(slide.next,1e4);window.onload=addImages;