console.log("home.js loaded");

(function () {
  function initWheelCar(sectionRoot) {
    if (!sectionRoot || sectionRoot.dataset.wheelCarInit === "true") return;
    sectionRoot.dataset.wheelCarInit = "true";

    const circle = sectionRoot.querySelector('[data-behavior="banner-circle"]');
    const items = sectionRoot.querySelectorAll(".banner-item");
    const textSlides = sectionRoot.querySelectorAll(".banner-content");
    const scrollArea = sectionRoot.classList.contains("scroll-area")
      ? sectionRoot
      : sectionRoot.querySelector(".scroll-area");
    const sectionEl = sectionRoot.querySelector(".scroll-rotate-section");

    if (!circle || !items.length || !textSlides.length || !sectionEl) return;
    if (!scrollArea) return;

    const loopWheel = sectionEl.dataset.wheelLoop === "true";
    const WHEEL_THRESHOLD =
      parseInt(sectionEl.dataset.wheelThreshold, 10) || 160;
    const lockTime = parseInt(sectionEl.dataset.wheelLockTime, 10) || 650;

    let current = 0;
    let scrolling = false;
    let wheelAccumulated = 0;
    let wheelLocked = false;

    const total = items.length;
    const angleGap = 360 / total;
    const radius = "-32vh";

    function updateTextSlides() {
      const activeTextIndex = textSlides.length
        ? current % textSlides.length
        : 0;
      textSlides.forEach((slide, index) => {
        slide.style.display = index === activeTextIndex ? "flex" : "none";
      });
    }

    function applyRotation() {
      circle.style.transform = `rotate(${-current * angleGap}deg)`;
      updateTextSlides();

      items.forEach((item, i) => {
        item.style.opacity = i === current ? "1" : "0";
        item.style.transform = `translate(-50%, -50%) rotate(${i * angleGap}deg) translateY(${radius}) scale(${i === current ? 1.05 : 0.96})`;
        item.style.zIndex = i === current ? "10" : "1";
      });
    }

    function handleScroll(direction) {
      if (scrolling) return;

      if (
        !loopWheel &&
        ((current === total - 1 && direction === "down") ||
          (current === 0 && direction === "up"))
      ) {
        return;
      }

      scrolling = true;
      current += direction === "down" ? 1 : -1;

      if (current < 0) current = loopWheel ? total - 1 : 0;
      if (current >= total) current = loopWheel ? 0 : total - 1;

      applyRotation();

      setTimeout(() => {
        scrolling = false;
      }, lockTime);
    }

    function isSectionVisible() {
      const rect = scrollArea.getBoundingClientRect();
      return rect.bottom >= 0 && rect.top <= window.innerHeight;
    }

    function isPointerInsideHero(clientX, clientY) {
      const rect = scrollArea.getBoundingClientRect();
      return (
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom
      );
    }

    function updatePageLock() {
      document.body.classList.toggle("hero-wheel-lock", current < total - 1);
    }

    updatePageLock();

    window.addEventListener(
      "wheel",
      function (e) {
        if (!isSectionVisible() || scrolling || wheelLocked) return;
        if (!isPointerInsideHero(e.clientX, e.clientY)) return;

        wheelAccumulated += e.deltaY;
        const direction = wheelAccumulated > 0 ? "down" : "up";

        if (Math.abs(wheelAccumulated) < WHEEL_THRESHOLD) return;

        const isLast = current === total - 1;
        const isFirst = current === 0;

        if ((direction === "down" && isLast) || (direction === "up" && isFirst)) {
          wheelAccumulated = 0;
          updatePageLock();
          return;
        }

        if (
          (direction === "down" && current < total - 1) ||
          (direction === "up" && current > -1)
        ) {
          e.preventDefault();
          handleScroll(direction);
          wheelAccumulated = 0;
          wheelLocked = true;

          setTimeout(() => {
            wheelLocked = false;
          }, lockTime);

          updatePageLock();
        } else {
          wheelAccumulated = 0;
          updatePageLock();
        }
      },
      { passive: false },
    );


    let touchStartY = 0;
    const swipeThreshold = 80;

    scrollArea.addEventListener(
      "touchstart",
      function (e) {
        touchStartY = e.touches[0].clientY;
      },
      { passive: true },
    );

    scrollArea.addEventListener(
      "touchend",
      function (e) {
        const diff = touchStartY - e.changedTouches[0].clientY;
        if (Math.abs(diff) < swipeThreshold) return;

        const direction = diff > 0 ? "down" : "up";
        if (
          !loopWheel &&
          ((current === total - 1 && direction === "down") ||
            (current === 0 && direction === "up"))
        ) {
          return;
        }

        handleScroll(direction);
      },
      { passive: true },
    );

    updateTextSlides();
    applyRotation();
  }

  function initSection(event) {
    const sectionRoot =
      event &&
      event.target &&
      event.target.dataset &&
      event.target.dataset.sectionId
        ? event.target
        : document.querySelector(".yakchoo-hero");

    initWheelCar(sectionRoot);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSection);
  } else {
    initSection();
  }

  document.addEventListener("shopify:section:load", initSection);
})();
