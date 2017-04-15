"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var app = document.getElementById("app");
var slider = app.querySelector(".slider");
var next = app.querySelector(".next");
var prev = app.querySelector(".prev");
var dots = app.querySelector(".dots");
var dot = [];
var pics = [];
var images = 6;
var count = 0;

var render = {
  addImages: function addImages() {
    for (var i = 0; i < images; i++) {
      var _render = "<div class=\"pics fl\">\n            <img src=\"https://source.unsplash.com/random?sig=" + i + "\" alt=\"pic" + (i + 1) + "/900x500\">\n          </div>";
      slider.insertAdjacentHTML("beforeend", _render);
    }
    pics.push.apply(pics, _toConsumableArray(app.querySelectorAll(".pics")));
  },
  addDots: function addDots() {
    for (var i = 0; i < images; i++) {
      var _render2 = "<div class=\"dot\" data-pos=\"" + i + "\">\n            <i class=\"fa fa-stop\" aria-hidden=\"true\"></i>\n          </div>";
      dots.insertAdjacentHTML("beforeend", _render2);
    }
    dot.push.apply(dot, _toConsumableArray(app.querySelectorAll(".dot")));
    dot.forEach(function (e) {
      return e.addEventListener("click", setDot.select);
    });
  }
};

var slide = {
  next: function next() {
    if (count === images - 1) {
      count = 0;
      pics.forEach(function (i) {
        return i.style.transform = "translateX(" + count + ")";
      });
    } else {
      count++;
      pics.forEach(function (i) {
        return i.style.transform = "translateX(" + -100 * count + "%)";
      });
    }
    setDot.paint();
  },
  prev: function prev() {
    if (count === 0) {
      count = images - 1;
      pics.forEach(function (i) {
        return i.style.transform = "translateX(" + -100 * (images - 1) + "%)";
      });
    } else {
      count--;
      pics.forEach(function (i) {
        return i.style.transform = "translateX(" + -100 * count + "%)";
      });
    }
    setDot.paint();
  },
  jump: function jump(val) {
    pics.forEach(function (i) {
      return i.style.transform = "translateX(" + -100 * val + "%)";
    });
    count = val;
  }
};

var setDot = {
  select: function select() {
    var val = this.attributes["data-pos"].value;
    slide.jump(val);
    setDot.paint();
  },
  paint: function paint() {
    var on = app.querySelector(".dot[data-pos=\"" + count + "\"]");
    var off = app.querySelectorAll(".dot:not([data-pos=\"" + count + "\"])");
    on.classList.add("dot-on");
    off.forEach(function (i) {
      return i.classList.remove("dot-on");
    });
  }
};

var init = function init() {
  render.addImages();
  render.addDots();
  setDot.paint();
};

next.addEventListener('click', slide.next);
prev.addEventListener('click', slide.prev);

// const interval = setInterval(slide.next, 10000);

window.onload = init;