document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");
  const notification = document.getElementById("notification");
  const navToggle = document.querySelector(".nav-toggle");
  const navbar = document.querySelector(".navbar");
  const backToTopBtn = document.querySelector(".backToTopBtn");

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent default form submission

      // Check if the form is valid
      if (contactForm.checkValidity()) {
        // Form is valid, proceed with submission
        // Simulate form submission (replace with actual submission logic)
        // In a real application, you'd send the form data to a server using AJAX or fetch
        // For demonstration purposes, I'll just display a success message
        displayNotification("Form submitted successfully!", "success");
      } else {
        // Form is invalid, display error message
        displayNotification("Please fill in all required fields!", "error");
      }
    });
  }

  function displayNotification(message, type) {
    notification.innerHTML = `<div class="alert ${type}">${message}</div>`;
  }

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
        behavior: "smooth",
      });
    });
  }
});
