document.addEventListener("DOMContentLoaded", () => {
  const darkModeToggle = document.getElementById("darkmode-toggle");

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
  });

  const images = [
    //{ src: "assets/profile/1.jpg", weight: 3 },
    { src: "assets/profile/2.jpg", weight: 10 },
    //{ src: "assets/profile/3.jpg", weight: 2 },
    //{ src: "assets/profile/4.jpg", weight: 1.5 },
    //{ src: "assets/profile/5.jpg", weight: 1 },
    //"assets/profile/6.jpg",
    //"assets/profile/7.jpg",
    //"assets/profile/8.jpg",
    //"assets/profile/9.jpg",
    //"assets/profile/10.jpg",
    //"assets/profile/11.jpg",
  ];

  const totalWeight = images.reduce((sum, img) => sum + img.weight, 0);

  let random = Math.random() * totalWeight;

  for (const image of images) {
    random -= image.weight;
    if (random < 0) {
      document.getElementById("profile-pic").src = image.src;
      break;
    }
  }

  // Handle section highlighting on scroll
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".scroll-indicator a");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").substring(1) === current) {
        link.classList.add("active");
      }
    });

    // Show sections on scroll
    const screenPosition = window.innerHeight / 1.3;

    const aboutMeSection = document.getElementById("about-me");
    if (
      aboutMeSection &&
      aboutMeSection.getBoundingClientRect().top < screenPosition
    ) {
      aboutMeSection.classList.add("visible");
    }

    const portfolioSection = document.getElementById("portfolio");
    if (
      portfolioSection &&
      portfolioSection.getBoundingClientRect().top < screenPosition
    ) {
      portfolioSection.classList.add("visible");
    }

    const articlesSection = document.getElementById("articles");
    if (
      articlesSection &&
      articlesSection.getBoundingClientRect().top < screenPosition
    ) {
      articlesSection.classList.add("visible");
    }
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
