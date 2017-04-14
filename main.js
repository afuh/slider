const app = document.getElementById("app");
const slider = app.querySelector(".slider");
const next = app.querySelector(".next");
const prev = app.querySelector(".prev");
const pics = [];
const images = 20;
let count = 0;

const addImages = () => {
      for (let i = 0; i < images; i++) {
        const render =
        `<div class="pics">
          <img src="https://source.unsplash.com/random?sig=${i}" alt="pic${i + 1}/1980x1080">
        </div>`;

        slider.insertAdjacentHTML("beforeend", render);
      }
      pics.push(...app.querySelectorAll(".pics"));
};

const slide = {
      next: () => {
        if (count === images - 1){
          count = 0;
          pics.forEach(i => i.style.transform = `translateX(0)`);
        }
        else {
          count++;
          pics.forEach(i => i.style.transform = `translateX(${-100 * count}%)`);
        }
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
      }
};

next.addEventListener('click', slide.next);
prev.addEventListener('click', slide.prev);

const interval = setInterval(slide.next, 10000);

window.onload = addImages;
