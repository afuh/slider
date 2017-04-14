"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var app = document.getElementById("app");
var slider = app.querySelector(".slider");
var next = app.querySelector(".next");
var prev = app.querySelector(".prev");
var pics = [];

var count = 0;
var photos = 4;

var addContent = function addContent() {
  for (var i = 0; i < photos; i++) {
    var render = "<div class=\"pics\">\n          <img src=\"https://source.unsplash.com/random?sig=" + i + "\" alt=\"pic" + (i + 1) + "/1440x720\">\n        </div>";

    slider.insertAdjacentHTML("beforeend", render);
  }
  pics.push.apply(pics, _toConsumableArray(app.querySelectorAll(".pics")));
};

var slide = {
  next: function next() {
    if (count === photos - 1) {
      count = 0;
      pics.forEach(function (i) {
        return i.style.transform = "translateX(0)";
      });
    } else {
      count++;
      pics.forEach(function (i) {
        return i.style.transform = "translateX(" + -100 * count + "%)";
      });
    }
  },
  prev: function prev() {
    if (count === 0) {
      count = photos - 1;
      pics.forEach(function (i) {
        return i.style.transform = "translateX(" + -100 * (photos - 1) + "%)";
      });
    } else {
      count--;
      pics.forEach(function (i) {
        return i.style.transform = "translateX(" + -100 * count + "%)";
      });
    }
  }
};

next.addEventListener('click', slide.next);
prev.addEventListener('click', slide.prev);

var interval = setInterval(slide.next, 5000);

window.onload = addContent;