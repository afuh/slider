const carrousel = () => {

  const images = 12;
  const app = document.getElementById("app");
  const slider = app.querySelector(".slider");
  const next = app.querySelector(".next");
  const prev = app.querySelector(".prev");
  const dots = app.querySelector(".dots");
  const dot = [];
  const pics = [];
  let count = 0;

  const render = {
        addImages() {
          for (let i = 0; i < images; i++) {
            const render =
            `<div class="pics fl">
              <img src="https://source.unsplash.com/random?sig=${i}" alt="pic${i + 1}/900x500">
            </div>`;
            slider.insertAdjacentHTML("beforeend", render);
          }
          pics.push(...app.querySelectorAll(".pics"));
        },
        addDots() {
          for (let i = 0; i < images; i++) {
            const render =
            `<div class="dot" data-pos="${i}">
              <i class="fa fa-stop" aria-hidden="true"></i>
            </div>`;
            dots.insertAdjacentHTML("beforeend", render);
          }
          dot.push(...app.querySelectorAll(".dot"));
        },
        init() {
          render.addImages();
          render.addDots();
        }
  };

  const slide = {
        next(e) {
          if (count === images - 1){
            count = 0;
            pics.forEach(i => i.style.transform = `translateX(${count})`);
          }
          else {
            count++;
            pics.forEach(i => i.style.transform = `translateX(${-100 * count}%)`);
          }
          setDot.paint();
          if (e && e.isTrusted) {
            autoSlide.reset()
          }
        },
        prev(e) {
          if (count === 0) {
            count = images - 1;
            pics.forEach(i => i.style.transform = `translateX(${-100 * (images - 1)}%)`);
          }
          else {
            count--;
            pics.forEach(i => i.style.transform = `translateX(${-100 * count}%)`);
          }
          setDot.paint();
          if (e && e.isTrusted) {
            autoSlide.reset()
          }
        },
        jump(val = 0) {
            pics.forEach(i => i.style.transform = `translateX(${-100 * val}%)`);
            count = val;
        },
        bind() {
          next.addEventListener('click', slide.next);
          prev.addEventListener('click', slide.prev);
        }
  };

  const setDot = {
        select(e) {
          const pos = Number(this.attributes["data-pos"].value);
          slide.jump(pos);
          setDot.paint();
          if (e && e.isTrusted) {
            autoSlide.reset()
          }
        },
        paint(){
          const on = app.querySelector(`.dot[data-pos="${count}"]`);
          const off = app.querySelectorAll(`.dot:not([data-pos="${count}"])`);
          on.classList.add("dot-on");
          off.forEach(i => i.classList.remove("dot-on"));
        },
        bind() {
          dot.forEach(e => e.addEventListener("click", setDot.select));
        },
        init() {
          setDot.paint();
          setDot.bind();
        }
  };

  // If the user is inactive for 20s the the auto-slide will start
  const autoSlide = {
        interval: null,
        timeOut: null,
        next() {
          autoSlide.interval = setInterval(slide.next, 8000);
        },
        inactivity() {
          autoSlide.timeOut = setTimeout(autoSlide.next, 12000)
        },
        reset() {
          clearInterval(autoSlide.interval)
          clearTimeout(autoSlide.timeOut)
          autoSlide.inactivity()
        }
  }

  const init = () => {
        render.init();
        setDot.init();
        slide.bind();
        autoSlide.inactivity()
  };

return init();

};

carrousel();
