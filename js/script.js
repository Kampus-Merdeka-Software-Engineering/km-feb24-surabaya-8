document.addEventListener("DOMContentLoaded", function () {
    const navToggle = document.querySelector(".nav-toggle");
    const navbar = document.querySelector(".navbar");
    const backToTopBtn = document.querySelector(".backToTopBtn");

    if (navToggle && navbar) {
        navToggle.addEventListener("click", function () {
            navbar.classList.toggle("active");
        });
    }

    if (backToTopBtn) {
        const toggleBackToTopBtn = () => {
            if (window.scrollY > 200) {
                backToTopBtn.classList.add("visible");
            } else {
                backToTopBtn.classList.remove("visible");
            }
        };

        // Debouncing the scroll event handler
        let scrollTimeout;
        window.addEventListener("scroll", function () {
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            scrollTimeout = setTimeout(toggleBackToTopBtn, 100);
        });

        backToTopBtn.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
});
