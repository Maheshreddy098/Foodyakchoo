<<<<<<< HEAD
(function () {
  /* ==========================
     YAKCHOO INTRO ANIMATION
  ========================== */

  function initIntro() {
    const intro = document.getElementById("yakchoo-intro");

    if (!intro) {
      initWheelCar();
      return;
    }

    const logo = intro.querySelector(".intro-logo");
    const left = intro.querySelector(".intro-left");
    const right = intro.querySelector(".intro-right");
    const bottom = intro.querySelector(".intro-bottom");

   
function playIntro() {
  const hero = document.querySelector(".scroll-rotate-section");
  const sky = intro.querySelector(".intro-sky");
  if (bottom) {
    bottom.getBoundingClientRect();
}

  intro.style.display = "flex";

  gsap.killTweensOf([
    intro,
    sky,
    logo,
    left,
    right,
    bottom,
    hero
  ]);

  /*
   * Reset intro container.
   */
  gsap.set(intro, {
    autoAlpha: 1,
    backgroundColor: "#d8eef7"
  });

  /*
   * Reset sky.
   */
  if (sky) {
    gsap.set(sky, {
      yPercent: 0,
      autoAlpha: 1
    });
  }

  /*
   * Reset logo.
   */
  if (logo) {
    gsap.set(logo, {
      scale: 0.3,
      opacity: 0,
      x: 0,
      y: -250
    });
  }

  /*
   * Reset left mountain.
   */
  if (left) {
    gsap.set(left, {
      x: 0,
      xPercent: 0,
      y: 0
    });
  }

  /*
   * Reset right mountain.
   */
  if (right) {
    gsap.set(right, {
      x: 0,
      xPercent: 0,
      y: 0
    });
  }

  /*
   * Reset bottom foreground snow.
   *
   * xPercent keeps it centered because CSS uses left: 50%.
   */
  if (bottom) {
    gsap.set(bottom, {
      x:0,
      xPercent: -50,
      y: 0,
      yPercent: 0,
      scale: 1,
      autoAlpha: 1,
      transformOrigin: "center bottom"
    });
  }

  /*
   * Home page begins below the viewport.
   */
  if (hero) {
    gsap.set(hero, {
      display: "block",
      visibility: "visible",
      autoAlpha: 1,
      yPercent: 102
    });
  }

  const tl = gsap.timeline({
    onComplete: function () {
      /*
       * Remove only the temporary transform from the home page.
       */
      if (hero) {
        gsap.set(hero, {
          clearProps: "transform"
        });
      }

      gsap.set(intro, {
        autoAlpha: 0
      });

      intro.style.display = "none";

      initWheelCar();
    }
  });

  /*
   * STEP 1:
   * Logo appears.
   */
  if (logo) {
    tl.to(logo, {
      y:0,
      scale: 1,
      opacity: 1,
      duration: 3.5,
      ease: "back.out(1.7)",
      force3D: true
    });
  }

  /*
   * STEP 2:
   * Mountains move first.
   */
  tl.addLabel("mountains-open");

  if (left) {
    tl.to(
      left,
      {
        xPercent: -110,
        duration: 3,
        ease: "sine.inOut",
        force3D: true
      },
      "mountains-open"
    );
  }

  if (right) {
    tl.to(
      right,
      {
        xPercent: 110,
        duration: 3,
        ease: "sine.inOut",
        force3D: true
      },
      "mountains-open"
    );
  }

  /*
   * This label begins after the mountains finish.
   */
  tl.addLabel("prepare-reveal", "mountains-open");

  /*
   * STEP 3:
   * Logo zooms out.
   */
  if (logo) {
    tl.to(
      logo,
      {
        scale: 0.3,
        y: -300,
        duration: 2.8,
        ease: "power2.inOut",
        force3D: true
      },
      "prepare-reveal"
    );
  }

  /*
   * STEP 4:
   * Bottom snow zooms out slightly.
   */
  if (bottom) {
    tl.to(
      bottom,
      {
        scale: 0.94,
        duration: 0.8,
        ease: "power2.inOut",
        force3D: true
      },
      "prepare-reveal"
    );
  }

  /*
   * Begin snow and home-page reveal after zoom-out.
   */
  tl.addLabel("snow-reveal", "prepare-reveal+=0.4");

  /*
   * Make the fixed intro background transparent.
   * Otherwise it would cover the rising home page.
   */
  tl.set(
    intro,
    {
      backgroundColor: "transparent"
    },
    "snow-reveal"
  );

  /*
   * Move the old sky out through the top.
   */
  if (sky) {
    tl.to(
      sky,
      {
        yPercent: -105,
        duration: 3,
        ease: "power3.inOut",
        force3D: true
      },
      "snow-reveal"
    );
  }

  /*
   * STEP 5:
   * Home page rises from below.
   */
  if (hero) {
    tl.to(
      hero,
      {
        yPercent: 0,
        duration: 3,
        ease: "power3.inOut",
        force3D: true

      },
      "snow-reveal"
    );
  }

  /*
   * STEP 6:
   * Bottom snow rises at the same time as the home page.
   */
  if (bottom) {
  tl.to(
    bottom,
    {
      y: -window.innerHeight,
      duration: 3,
      ease: "power3.inOut",
      force3D: true
    },
    "snow-reveal"
  );
}

  /*
   * Hide the intro only when the reveal is complete.
   */
  tl.to(
    intro,
    {
      autoAlpha: 0,
      duration: 0.4,
      ease: "none"
    },
    "snow-reveal+=2.4"
  );
}
      
   
     

   if (bottom && !bottom.complete) {
    bottom.onload = playIntro;
} else {
    playIntro();
}

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

     gsap.delayedCall(0.5, playIntro);
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
        item.style.visibility ="visible",
        item.style.transform = `translate(-50%, -50%)
        rotate(${i * angleGap}deg)
        translateY(${radius})
        scale(${i === current ? 1.05 : 0.96})`;

        item.style.zIndex = i === current ? "10" : "1";
      });

      updateTextSlides();
      circle.style.visibility = "visible";
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
    circle.style.visibility = "hidden";
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

  document.addEventListener("shopify:section:load", function (event) {
    initWheelCar(event.target);
  });
})();
=======
(function () {
  /* ==========================
     YAKCHOO INTRO ANIMATION
  ========================== */

  function initIntro() {
    const intro = document.getElementById("yakchoo-intro");

    if (!intro) {
      initWheelCar();
      return;
    }

    const logo = intro.querySelector(".intro-logo");
    const left = intro.querySelector(".intro-left");
    const right = intro.querySelector(".intro-right");
    const bottom = intro.querySelector(".intro-bottom");

   
function playIntro() {
  const hero = document.querySelector(".scroll-rotate-section");
  const sky = intro.querySelector(".intro-sky");

  intro.style.display = "flex";

  gsap.killTweensOf([
    intro,
    sky,
    logo,
    left,
    right,
    bottom,
    hero
  ]);

  /*
   * Reset intro container.
   */
  gsap.set(intro, {
    autoAlpha: 1,
    backgroundColor: "#d8eef7"
  });

  /*
   * Reset sky.
   */
  if (sky) {
    gsap.set(sky, {
      yPercent: 0,
      autoAlpha: 1
    });
  }

  /*
   * Reset logo.
   */
  if (logo) {
    gsap.set(logo, {
      scale: 0.3,
      opacity: 0,
      x: 0,
      y: -250
    });
  }

  /*
   * Reset left mountain.
   */
  if (left) {
    gsap.set(left, {
      x: 0,
      xPercent: 0,
      y: 0
    });
  }

  /*
   * Reset right mountain.
   */
  if (right) {
    gsap.set(right, {
      x: 0,
      xPercent: 0,
      y: 0
    });
  }

  /*
   * Reset bottom foreground snow.
   *
   * xPercent keeps it centered because CSS uses left: 50%.
   */
  if (bottom) {
    gsap.set(bottom, {
      x:0,
      xPercent: -50,
      y: 0,
      yPercent: 0,
      scale: 1,
      autoAlpha: 1,
      transformOrigin: "center bottom"
    });
  }

  /*
   * Home page begins below the viewport.
   */
  if (hero) {
    gsap.set(hero, {
      display: "block",
      visibility: "visible",
      autoAlpha: 1,
      yPercent: 102
    });
  }

  const tl = gsap.timeline({
    onComplete: function () {
      /*
       * Remove only the temporary transform from the home page.
       */
      if (hero) {
        gsap.set(hero, {
          clearProps: "transform"
        });
      }

      gsap.set(intro, {
        autoAlpha: 0
      });

      intro.style.display = "none";

      initWheelCar();
    }
  });

  /*
   * STEP 1:
   * Logo appears.
   */
  if (logo) {
    tl.to(logo, {
      y:0,
      scale: 1,
      opacity: 1,
      duration: 2.5,
      ease: "back.out(1.7)",
      force3D: true
    });
  }

  /*
   * STEP 2:
   * Mountains move first.
   */
  tl.addLabel("mountains-open");

  if (left) {
    tl.to(
      left,
      {
        xPercent: -110,
        duration: 3,
        ease: "sine.inOut",
        force3D: true
      },
      "mountains-open"
    );
  }

  if (right) {
    tl.to(
      right,
      {
        xPercent: 110,
        duration: 3,
        ease: "sine.inOut",
        force3D: true
      },
      "mountains-open"
    );
  }

  /*
   * This label begins after the mountains finish.
   */
  tl.addLabel("prepare-reveal", "mountains-open");

  /*
   * STEP 3:
   * Logo zooms out.
   */
  if (logo) {
    tl.to(
      logo,
      {
        scale: 0.3,
        y: -300,
        duration: 2.8,
        ease: "power2.inOut",
        force3D: true
      },
      "prepare-reveal"
    );
  }

  /*
   * STEP 4:
   * Bottom snow zooms out slightly.
   */
  if (bottom) {
    tl.to(
      bottom,
      {
        scale: 0.94,
        duration: 0.8,
        ease: "power2.inOut",
        force3D: true
      },
      "prepare-reveal"
    );
  }

  /*
   * Begin snow and home-page reveal after zoom-out.
   */
  tl.addLabel("snow-reveal", "prepare-reveal+=0.4");

  /*
   * Make the fixed intro background transparent.
   * Otherwise it would cover the rising home page.
   */
  tl.set(
    intro,
    {
      backgroundColor: "transparent"
    },
    "snow-reveal"
  );

  /*
   * Move the old sky out through the top.
   */
  if (sky) {
    tl.to(
      sky,
      {
        yPercent: -105,
        duration: 3,
        ease: "power3.inOut",
        force3D: true
      },
      "snow-reveal"
    );
  }

  /*
   * STEP 5:
   * Home page rises from below.
   */
  if (hero) {
    tl.to(
      hero,
      {
        yPercent: 0,
        duration: 3,
        ease: "power3.inOut",
        force3D: true

      },
      "snow-reveal"
    );
  }

  /*
   * STEP 6:
   * Bottom snow rises at the same time as the home page.
   */
  if (bottom) {
  tl.to(
    bottom,
    {
      yPercent: -246,
      duration: 3,
      ease: "power3.inOut",
      force3D: true
    },
    "snow-reveal"
  );
}

  /*
   * Hide the intro only when the reveal is complete.
   */
  tl.to(
    intro,
    {
      autoAlpha: 0,
      duration: 0.4,
      ease: "none"
    },
    "snow-reveal+=2.4"
  );
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

     gsap.delayedCall(0.5, playIntro);
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
        item.style.visibility ="visible",
        item.style.transform = `translate(-50%, -50%)
        rotate(${i * angleGap}deg)
        translateY(${radius})
        scale(${i === current ? 1.05 : 0.96})`;

        item.style.zIndex = i === current ? "10" : "1";
      });

      updateTextSlides();
      circle.style.visibility = "visible";
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
    circle.style.visibility = "hidden";
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

  document.addEventListener("shopify:section:load", function (event) {
    initWheelCar(event.target);
  });
})();
>>>>>>> d0ff70da18eda43f1fc90a4b2eb060c2eabd4c58
