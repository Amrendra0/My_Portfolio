
// =========================================
// 1. MOBILE NAVIGATION MENU
// =========================================

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", function () {

        navLinks.classList.toggle("active");

        const isOpen = navLinks.classList.contains("active");

        menuToggle.setAttribute("aria-expanded", isOpen);

        menuToggle.textContent = isOpen ? "✕" : "☰";

    });

}


// =========================================
// 2. CLOSE MOBILE MENU AFTER CLICK
// =========================================

if (navLinks && menuToggle) {

    document.querySelectorAll(".nav-links a").forEach(function (link) {

        link.addEventListener("click", function () {

            navLinks.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.textContent = "☰";

        });

    });

}


// =========================================
// 3. SMOOTH SCROLLING
// =========================================

document.querySelectorAll('a[href^="#"]').forEach(function (link) {

    link.addEventListener("click", function (event) {

        const targetId = this.getAttribute("href");

        if (!targetId || targetId === "#") {
            return;
        }

        const targetElement = document.querySelector(targetId);

        if (targetElement) {

            event.preventDefault();

            targetElement.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });

});


// =========================================
// 4. ACTIVE NAVBAR LINK
// =========================================

const sections = document.querySelectorAll("main section");

const navigationLinks = document.querySelectorAll(".nav-links a");

function updateActiveLink() {

    let currentSection = "";

    sections.forEach(function (section) {

        const sectionTop = section.offsetTop - 150;

        const sectionBottom = sectionTop + section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionBottom
        ) {

            currentSection = section.getAttribute("id");

        }

    });

    navigationLinks.forEach(function (link) {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + currentSection) {

            link.classList.add("active");

        }

    });

}

window.addEventListener("scroll", updateActiveLink);

updateActiveLink();


// =========================================
// 5. AUTOMATIC FOOTER YEAR
// =========================================

const currentYear = document.querySelector("#current-year");

if (currentYear) {

    currentYear.textContent = new Date().getFullYear();

}


// =========================================
// 6. CONTACT FORM VALIDATION
// =========================================

const contactForm = document.querySelector("#contact-form");

const formStatus = document.querySelector("#form-status");

if (contactForm && formStatus) {

    contactForm.addEventListener("submit", async function (event) {

        // Prevent default form submission
        event.preventDefault();

        // Get input values
        const name = document.querySelector("#name").value.trim();

        const email = document.querySelector("#email").value.trim();

        const subject = document.querySelector("#subject").value.trim();

        const message = document.querySelector("#message").value.trim();

        // Validate empty fields
        if (!name || !email || !subject || !message) {

            formStatus.textContent = "Please fill in all fields.";

            formStatus.style.color = "red";

            return;

        }

        // Validate email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            formStatus.textContent = "Please enter a valid email address.";

            formStatus.style.color = "red";

            return;

        }

        // Get submit button
        const submitButton = contactForm.querySelector(
            'button[type="submit"]'
        );

        // Disable button while sending
        if (submitButton) {

            submitButton.disabled = true;

            submitButton.textContent = "Sending...";

        }

        formStatus.textContent = "Sending your message...";

        formStatus.style.color = "blue";

        try {

            // Send data to Formspree
            const response = await fetch(
                "https://formspree.io/f/xqppdqnw",
                {
                    method: "POST",

                    body: new FormData(contactForm),

                    headers: {
                        "Accept": "application/json"
                    }
                }
            );

            // Check response
            if (response.ok) {

                formStatus.textContent =
                    "Thank you! Your message has been sent successfully.";

                formStatus.style.color = "green";

                // Clear form after successful submission
                contactForm.reset();

            } else {

                formStatus.textContent =
                    "Unable to send your message. Please try again.";

                formStatus.style.color = "red";

            }

        } catch (error) {

            formStatus.textContent =
                "Network error! Please check your internet connection.";

            formStatus.style.color = "red";

            console.error("Form submission error:", error);

        } finally {

            // Enable button again
            if (submitButton) {

                submitButton.disabled = false;

                submitButton.textContent = "Send Message";

            }

        }

    });

}


// =========================================
// 7. WELCOME MESSAGE
// =========================================

console.log("Welcome to Amrendra Patel's Portfolio!");

console.log("Portfolio JavaScript loaded successfully.");
