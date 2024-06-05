document.addEventListener("DOMContentLoaded", function () {
    const navToggle = document.querySelector(".nav-toggle");
    const navbar = document.querySelector(".navbar");
    const backToTopBtn = document.querySelector(".backToTopBtn");

    navToggle.addEventListener("click", function () {
        navbar.classList.toggle("active");
    });

    // Show or hide the back to top button based on scroll position
    window.addEventListener("scroll", function () {
        if (window.scrollY > 200) {
            backToTopBtn.style.display = "block";
        } else {
            backToTopBtn.style.display = "none";
        }
    });
    
// Show or hide the back to top button based on scroll position
window.addEventListener("scroll", function () {
    if (window.scrollY > 200) {
        backToTopBtn.style.display = "block";
    } else {
        backToTopBtn.style.display = "none";
    }
});

// Scroll back to top when the button is clicked
backToTopBtn.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
});