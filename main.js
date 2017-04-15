const app = document.getElementById("app");
const slider = app.querySelector(".slider");
const next = app.querySelector(".next");
const prev = app.querySelector(".prev");
const dots = app.querySelector(".dots");
const dot = [];
const pics = [];
const images = 6;
let count = 0;

const render = {
      addImages(){
        for (let i = 0; i < images; i++) {
          const render =
          `<div class="pics fl">
            <img src="https://source.unsplash.com/random?sig=${i}" alt="pic${i + 1}/900x500">
          </div>`;
          slider.insertAdjacentHTML("beforeend", render);
        }
        pics.push(...app.querySelectorAll(".pics"));
      },
      addDots(){
        for (let i = 0; i < images; i++) {
          const render =
          `<div class="dot" data-pos="${i}">
            <i class="fa fa-stop" aria-hidden="true"></i>
          </div>`;
          dots.insertAdjacentHTML("beforeend", render);
        }
        dot.push(...app.querySelectorAll(".dot"));
        dot.forEach(e => e.addEventListener("click", setDot.select));
      }
};


const slide = {
      next: () => {
        if (count === images - 1){
          count = 0;
          pics.forEach(i => i.style.transform = `translateX(${count})`);
        }
        else {
          count++;
          pics.forEach(i => i.style.transform = `translateX(${-100 * count}%)`);
        }
        setDot.paint();
      },
      prev: () => {
        if (count === 0) {
          count = images - 1;
          pics.forEach(i => i.style.transform = `translateX(${-100 * (images - 1)}%)`);
        }
        else {
          count--;
          pics.forEach(i => i.style.transform = `translateX(${-100 * count}%)`);
        }
        setDot.paint();
      },
      jump: (val) => {
        pics.forEach(i => i.style.transform = `translateX(${-100 * val}%)`);
        count = val;
      }
};

const setDot = {
      select: function() {
        let val = this.attributes["data-pos"].value;
        slide.jump(val);
        setDot.paint();
      },
      paint: () => {
        const on = app.querySelector(`.dot[data-pos="${count}"]`);
        const off = app.querySelectorAll(`.dot:not([data-pos="${count}"])`);
        on.classList.add("dot-on");
        off.forEach(i => i.classList.remove("dot-on"));

      }
};


const init = () => {
      render.addImages();
      render.addDots();
      setDot.paint();
};



next.addEventListener('click', slide.next);
prev.addEventListener('click', slide.prev);

// const interval = setInterval(slide.next, 10000);

window.onload = init;
