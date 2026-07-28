document.addEventListener("DOMContentLoaded", () => {

  document.querySelectorAll(".image-follow").forEach(card => {

    const inner = card.querySelector(".image-inner");

    if (!inner) return;

    card.addEventListener("mousemove", e => {

      const rect = card.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rotateY = (x - rect.width / 2) / 20;
      const rotateX = -(y - rect.height / 2) / 20;

      inner.style.transform =
        `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;

    });

    card.addEventListener("mouseleave", () => {

      inner.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";

    });

  });

});