document.addEventListener("DOMContentLoaded", () => {
  // Initialize AOS
  AOS.init({
    duration: 1500,
    mirror: true,
  });

  // Dark mode toggle setup
  const toggleSwitch = document.querySelector(".toggle-switch");
  if (toggleSwitch) {
    document.body.classList.add("dark");
    toggleSwitch.checked = true;

    toggleSwitch.addEventListener("change", () => {
      if (toggleSwitch.checked) {
        document.body.classList.remove("light");
        document.body.classList.add("dark");
      } else {
        document.body.classList.remove("dark");
        document.body.classList.add("light");
      }
    });
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
      cursor?.classList.remove("hover")
    );
  });

  // ArrowDown navigation
  document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowDown") {
      const nextSection = document.querySelector(".content-box:not(.hidden)");
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  });

  // Overlap detection for menu and toggle
  const toggle = document.querySelector(".toggle");
  const toggleLabel = document.querySelector(".toggle-label");
  const menuButtons = document.querySelector(".menu-buttons");

  function checkOverlap() {
    if (!toggle || !toggleLabel || !menuButtons) return;

    const toggleRect = toggleLabel.getBoundingClientRect();
    const menuRect = menuButtons.getBoundingClientRect();

    if (
      toggleRect.right > menuRect.left &&
      toggleRect.left < menuRect.right &&
      toggleRect.bottom > menuRect.top &&
      toggleRect.top < menuRect.bottom
    ) {
      toggle.classList.add("small");
    } else {
      toggle.classList.remove("small");
    }
  }

  window.addEventListener("resize", checkOverlap);
  checkOverlap();
});

// Track Image Sliding
const track = document.getElementById("image-track");
const articleTrack = document.getElementById("article-track");

const handleOnDown = (e) => {
  if (!track) return;
  track.dataset.mouseDownAt = e.clientX;
};

const handleOnUp = () => {
  if (!track) return;
  track.dataset.mouseDownAt = "0";
  track.dataset.prevPercentage = track.dataset.percentage;
};

const handleOnMove = (e) => {
  if (!track || track.dataset.mouseDownAt === "0") return;

  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
  const maxDelta = window.innerWidth / 2;
  const percentage = (mouseDelta / maxDelta) * -100;
  const nextPercentageUnconstrained =
    parseFloat(track.dataset.prevPercentage) + percentage;
  const nextPercentage = Math.max(
    Math.min(nextPercentageUnconstrained, 0),
    -100
  );

  track.dataset.percentage = nextPercentage;

  track.animate(
    { transform: `translate(${nextPercentage}%, -50%)` },
    { duration: 1200, fill: "forwards" }
  );

  for (const image of track.getElementsByClassName("image")) {
    image.animate(
      { objectPosition: `${100 + nextPercentage}% center` },
      { duration: 1200, fill: "forwards" }
    );
  }
};

const handleArticleOnDown = (e) => {
  if (!articleTrack) return;
  articleTrack.dataset.mouseDownAt = e.clientX;
};

const handleArticleOnUp = () => {
  if (!articleTrack) return;
  articleTrack.dataset.mouseDownAt = "0";
  articleTrack.dataset.prevPercentage = articleTrack.dataset.percentage;
};

const handleArticleOnMove = (e) => {
  if (!articleTrack || articleTrack.dataset.mouseDownAt === "0") return;

  const mouseDelta = parseFloat(articleTrack.dataset.mouseDownAt) - e.clientX;
  const maxDelta = window.innerWidth / 2;
  const percentage = (mouseDelta / maxDelta) * -100;
  const nextPercentageUnconstrained =
    parseFloat(articleTrack.dataset.prevPercentage) + percentage;
  const nextPercentage = Math.max(
    Math.min(nextPercentageUnconstrained, 0),
    -100
  );

  articleTrack.dataset.percentage = nextPercentage;

  articleTrack.animate(
    { transform: `translate(${nextPercentage}%, -50%)` },
    { duration: 1200, fill: "forwards" }
  );

  for (const article of articleTrack.getElementsByClassName("article-image")) {
    article.animate(
      { objectPosition: `${100 + nextPercentage}% center` },
      { duration: 1200, fill: "forwards" }
    );
  }
};

// Mouse and Touch Event Bindings
window.onmousedown = (e) => handleOnDown(e);
window.ontouchstart = (e) => handleOnDown(e.touches[0]);
window.onmouseup = (e) => handleOnUp(e);
window.ontouchend = (e) => handleOnUp(e.touches[0]);
window.onmousemove = (e) => handleOnMove(e);
window.ontouchmove = (e) => handleOnMove(e.touches[0]);
