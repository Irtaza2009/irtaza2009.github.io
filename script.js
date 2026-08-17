document.addEventListener("DOMContentLoaded", () => {
  const darkModeToggle = document.getElementById("darkmode-toggle");

  const initializeParticles = () => {
    const isDarkMode = document.body.classList.contains("dark");
    const lineColor = isDarkMode ? "#ffffff" : "#434853";

    particlesJS("particles-js", {
      particles: {
        color: { value: "#6db5ff" },
        number: { value: 100 },
        size: { value: 4 },
        move: { speed: 1 },
        line_linked: {
          color: lineColor,
        },
      },
      interactivity: {
        events: {
          onhover: { enable: true, mode: "grab" },
          onclick: { enable: true, mode: "push" },
        },
        modes: {
          repulse: { distance: 50 },
        },
      },
    });
  };

  // Initialize particles on page load
  initializeParticles();

  // Toggle dark/light mode
  darkModeToggle.addEventListener("click", () => {
    if (document.body.classList.contains("dark")) {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
      localStorage.setItem("theme", "light");
    } else {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    // Reinitialize particles with new line color
    initializeParticles();
  });

  // Handle section highlighting on scroll
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".scroll-indicator a");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").substring(1) === current) {
        link.classList.add("active");
      }
    });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  // Cursor customization
  const cursor = document.querySelector(".cursor");
  const cursorinner = document.querySelector(".cursor2");
  const links = document.querySelectorAll("a");

  document.addEventListener("mousemove", function (e) {
    const x = e.clientX;
    const y = e.clientY;
    if (cursor) {
      cursor.style.transform = `translate3d(calc(${x}px - 50%), calc(${y}px - 50%), 0)`;
    }
    if (cursorinner) {
      cursorinner.style.left = `${x}px`;
      cursorinner.style.top = `${y}px`;
    }
  });

  document.addEventListener("mousedown", function () {
    cursor?.classList.add("click");
    cursorinner?.classList.add("cursorinnerhover");
  });

  document.addEventListener("mouseup", function () {
    cursor?.classList.remove("click");
    cursorinner?.classList.remove("cursorinnerhover");
  });

  links.forEach((link) => {
    link.addEventListener("mouseover", () => cursor?.classList.add("hover"));
    link.addEventListener("mouseleave", () =>
      cursor?.classList.remove("hover"),
    );
  });
});
