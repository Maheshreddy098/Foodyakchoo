console.log("home.js loaded");

(function () {
  /* ==========================
     YAKCHOO INTRO ANIMATION
  ========================== */

  function initIntro() {
    const intro = document.getElementById("yakchoo-intro");
    console.log("Intro Found:", intro);

    if (!intro) {
      initWheelCar();
      return;
    }

    const logo = intro.querySelector(".intro-logo");
    const left = intro.querySelector(".intro-left");
    const right = intro.querySelector(".intro-right");
    const bottom = intro.querySelector(".intro-bottom");

    function playIntro() {
      intro.style.display = "flex";
      intro.classList.remove("hide");
      if (logo) logo.classList.remove("zoom");
      if (left) left.classList.remove("open-left");
      if (right) right.classList.remove("open-right");
      if (bottom) bottom.classList.remove("rise");

      void intro.offsetWidth;

      // Logo Zoom
      setTimeout(function () {
        if (logo) logo.classList.add("zoom");
      }, 300);

      // Mountains Open after logo centers
      setTimeout(function () {
        if (left) left.classList.add("open-left");
        if (right) right.classList.add("open-right");
        if (bottom) bottom.classList.add("rise");
      }, 800);

      // Bottom Mountain rises after split
      setTimeout(function () {
        if (bottom) bottom.classList.add("rise");
      }, 100);

      // Hide Intro
      setTimeout(function () {
        intro.classList.add("hide");
      }, 4200);

      // Finish Intro + Start Wheel
      setTimeout(function () {
        intro.style.display = "none";

        const hero = document.querySelector(".scroll-rotate-section");
        if (hero) {
          hero.style.display = "block";
          hero.style.visibility = "visible";
          hero.style.opacity = "1";
        }

        initWheelCar();
      }, 4700);
    }

    playIntro();

    // Replay intro on logo click

    document.addEventListener("click", function (e) {
      const logoBtn =
        e.target.closest(".header__heading-link") ||
        e.target.closest(".header__heading") ||
        e.target.closest(".header__logo") ||
        e.target.closest(".site-logo");

      if (!logoBtn) return;

      e.preventDefault();

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      setTimeout(function () {
        playIntro();
      }, 500);
    });
  }

  /* ==========================
      WHEEL CAR ANIMATION
  ========================== */

  function initWheelCar(sectionRoot) {
    if (!sectionRoot) {
      sectionRoot = document.querySelector(".yakchoo-hero");
    }

    if (!sectionRoot || sectionRoot.dataset.wheelCarInit === "true") return;

    sectionRoot.dataset.wheelCarInit = "true";

    const circle = sectionRoot.querySelector('[data-behavior="banner-circle"]');

    const items = sectionRoot.querySelectorAll(".banner-item");

    const textSlides = sectionRoot.querySelectorAll(".banner-content");

    const scrollArea = sectionRoot.classList.contains("scroll-area")
      ? sectionRoot
      : sectionRoot.querySelector(".scroll-area");

    const sectionEl = sectionRoot.querySelector(".scroll-rotate-section");

    if (
      !circle ||
      !items.length ||
      !textSlides.length ||
      !sectionEl ||
      !scrollArea
    )
      return;

    const WHEEL_THRESHOLD =
      parseInt(sectionEl.dataset.wheelThreshold, 10) || 160;

    const lockTime = parseInt(sectionEl.dataset.wheelLockTime, 10) || 650;

    let current = 0;
    let scrolling = false;
    let wheelAccumulated = 0;
    let wheelLocked = false;
    let lastSlideScroll = 0;

    const total = items.length;

    const angleGap = 360 / total;

    const radius = "-32vh";

    function updateTextSlides() {
      const active = current % textSlides.length;

      textSlides.forEach((slide, i) => {
        slide.style.display = i === active ? "flex" : "none";
      });
    }

    function applyRotation() {
      circle.style.transform = `rotate(${-current * angleGap}deg)`;

      items.forEach((item, i) => {
        item.style.opacity = i === current ? "1" : "0";

        item.style.transform = `translate(-50%, -50%)
        rotate(${i * angleGap}deg)
        translateY(${radius})
        scale(${i === current ? 1.05 : 0.96})`;

        item.style.zIndex = i === current ? "10" : "1";
      });

      updateTextSlides();
    }

    function updatePageLock() {
      document.body.classList.toggle(
        "hero-wheel-lock",
        current < total - 1 || lastSlideScroll === 0,
      );
    }

    function handleScroll(direction) {
      if (scrolling) return;

      scrolling = true;

      wheelAccumulated = 0;

      wheelLocked = true;

      if (direction === "down") {
        if (current < total - 1) {
          current++;

          lastSlideScroll = 0;
        } else {
          lastSlideScroll++;

          if (lastSlideScroll >= 1) {
            document.body.classList.remove("hero-wheel-lock");
          }
        }
      } else {
        if (current > 0) {
          current--;

          lastSlideScroll = 0;
        }
      }

      applyRotation();

      updatePageLock();

      setTimeout(() => {
        scrolling = false;

        wheelLocked = false;

        wheelAccumulated = 0;
      }, lockTime);
    }

    function isSectionVisible() {
      const rect = scrollArea.getBoundingClientRect();

      return rect.top <= window.innerHeight && rect.bottom >= 0;
    }

    function isPointerInsideHero(x, y) {
      const rect = scrollArea.getBoundingClientRect();

      return (
        x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom
      );
    }

    updatePageLock();

    applyRotation();

    scrollArea.addEventListener(
      "wheel",
      function (e) {
        if (!isSectionVisible()) return;

        if (!isPointerInsideHero(e.clientX, e.clientY)) return;

        if (scrolling || wheelLocked) return;

        wheelAccumulated += e.deltaY;

        if (Math.abs(wheelAccumulated) < WHEEL_THRESHOLD) return;

        e.preventDefault();

        handleScroll(wheelAccumulated > 0 ? "down" : "up");
      },
      { passive: false },
    );

    let touchStartY = 0;

    scrollArea.addEventListener("touchstart", function (e) {
      touchStartY = e.touches[0].clientY;
    });

    scrollArea.addEventListener("touchend", function (e) {
      const diff = touchStartY - e.changedTouches[0].clientY;

      if (Math.abs(diff) < 80) return;

      handleScroll(diff > 0 ? "down" : "up");
    });
  }

  /* ==========================
     START
  ========================== */

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initIntro);
  } else {
    initIntro();
  }

  document.addEventListener("shopify:section:load", function () {
    initWheelCar();
  });
})();
