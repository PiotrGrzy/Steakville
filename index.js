/****** GALLERY SLIDER *******/

(function() {
  const gallerySection = document.querySelector(".gallery");
  const gallery = document.querySelector(".gallery__img");
  const dotsContainer = document.querySelector(".gallery__dots");
  const dots = document.querySelectorAll(".gallery__dot");

  let currentImg = 1;

  const changeDots = index => {
    dots.forEach(dot => dot.classList.remove("gallery__dot--active"));
    dots[index].classList.add("gallery__dot--active");
  };

  const changeBackGround = () => {
    const viewportWidth = window.innerWidth;
    if (viewportWidth > 600) {
      gallery.src = `img/gall-${currentImg}.jpg`;
      changeDots(currentImg - 1);
      currentImg < 5 ? currentImg++ : (currentImg = 1);
    } else {
      gallery.src = `img/gall-${currentImg}--small.jpg`;
      changeDots(currentImg - 1);
      currentImg < 5 ? currentImg++ : (currentImg = 1);
    }
  };

  const handleClick = e => {
    if (e.target.nodeName === "SPAN") {
      const idNum = e.target.id[e.target.id.length - 1];
      currentImg = idNum;
      changeBackGround();
      clearInterval(sliderInterval);
      sliderInterval = setInterval(changeBackGround, 3000);
    }
  };

  let sliderInterval = setInterval(changeBackGround, 3000);
  dotsContainer.addEventListener("click", handleClick);

  /**** MOBILE SWIPE HANDLER *****/

  let startX = null;
  let endX = null;

  handleTouchStart = e => {
    startX = e.touches[0].pageX;
  };

  handleTouchEnd = e => {
    endX = e.changedTouches[0].pageX;

    const touchRange = Math.abs(startX) - Math.abs(endX);

    if (touchRange > 150 || touchRange < -150) {
      if (startX > endX) {
        // SWIPE LEFT
        clearInterval(sliderInterval);
        sliderInterval = setInterval(changeBackGround, 3000);

        if (currentImg === 2) {
          currentImg = 5;
        } else if (currentImg === 1) {
          currentImg = 4;
        } else if (currentImg <= 5) {
          currentImg -= 2;
        }

        changeBackGround();
      } else {
        //SWIPE RIGHT

        clearInterval(sliderInterval);
        sliderInterval = setInterval(changeBackGround, 3000);
        changeBackGround();
      }
      startX = null;
      endX = null;
    }
  };

  gallerySection.addEventListener("touchstart", handleTouchStart);
  gallerySection.addEventListener("touchend", handleTouchEnd);
})();

/****MOBILE MENU*****/
(function() {
  const mobileWrapper = document.querySelector(".navbar__mobileContainer");
  const burger = document.querySelector(".navbar__burger");
  const mobileList = document.querySelector(".navbar__mobileList");
  const listItems = document.querySelectorAll(
    ".navbar__mobileList .navbar__item"
  );

  let listOn = false;

  mobileWrapper.addEventListener("click", () => {
    burger.classList.toggle("navbar__burger--active");

    listOn
      ? (mobileList.style.display = "none")
      : (mobileList.style.display = "flex");
    listOn = !listOn;
  });

  //closing menu after link was chosen:

  listItems.forEach(item => {
    item.addEventListener("click", () => {
      mobileList.style.display = "none";

      burger.classList.toggle("navbar__burger--active");
      listOn = !listOn;
    });
  });
})();

/*********ANIMATION SCRIPT*********/

AOS.init();
