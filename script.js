// Typing Animation Settings
const textElement = document.getElementById("typing-text");
const words = ["Java Full Stack.", "Spring Boot Architecture.", "REST APIs.", "Clean Code."];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
        textElement.textContent = currentWord.substring(0, charIndex--);
    } else {
        textElement.textContent = currentWord.substring(0, charIndex++);
    }

    if (!isDeleting && charIndex > currentWord.length) {
        isDeleting = true;
        setTimeout(type, 1500);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, 500);
    } else {
        setTimeout(type, isDeleting ? 50 : 150);
    }
}

// Reveal Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
    });
}, { threshold: 0.1 });

// Theme Logic
const themeToggle = document.getElementById("theme-toggle");
const html = document.documentElement;
const themeIcon = document.getElementById("theme-icon");

themeToggle.addEventListener("click", () => {
    html.classList.toggle("dark");
    const isDark = html.classList.contains("dark");
    themeIcon.className = isDark ? "fa-solid fa-sun" : "fa-solid fa-moon";
    localStorage.setItem("theme", isDark ? "dark" : "light");
});

// Load Logic
document.addEventListener("DOMContentLoaded", () => {
    // Theme Persistence
    if (localStorage.getItem("theme") === "dark") {
        html.classList.add("dark");
        themeIcon.className = "fa-solid fa-sun";
    }

    type();
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Cert Carousel
    new Swiper(".certSwiper", {
        slidesPerView: 1,
        spaceBetween: 20,
        pagination: { el: ".swiper-pagination", clickable: true },
        breakpoints: {
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
        },
        autoplay: { delay: 3000 }
    });
});

// Scroll Event
window.addEventListener("scroll", () => {
    const nav = document.getElementById("navbar");
    nav.classList.toggle("nav-active", window.scrollY > 20);
});