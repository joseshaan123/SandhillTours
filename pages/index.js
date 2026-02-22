
function openSidebar() {
    document.getElementById("sidebar").classList.add("active");
}

function closeSidebar() {
    document.getElementById("sidebar").classList.remove("active");
}


document.addEventListener("DOMContentLoaded", function () {

    /* ================= WHY SECTION HORIZONTAL SCROLL ================= */

    const whySection = document.querySelector(".why-section");
    const whyTrack = document.querySelector(".why-track");
    const boxes = document.querySelectorAll(".why-box");

    if (whySection && whyTrack && boxes.length > 0) {

        let scrollAmount = 0;
        let maxScroll;

        function updateMaxScroll() {
            maxScroll = whyTrack.scrollWidth - whySection.clientWidth;
        }

        updateMaxScroll();
        window.addEventListener("resize", updateMaxScroll);

        window.addEventListener("wheel", (e) => {

            const sectionTop = whySection.offsetTop;
            const sectionHeight = whySection.offsetHeight;
            const scrollY = window.scrollY;

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {

                if ((scrollAmount <= 0 && e.deltaY < 0) ||
                    (scrollAmount >= maxScroll && e.deltaY > 0)) {
                    return;
                }

                e.preventDefault();

                scrollAmount += e.deltaY;
                scrollAmount = Math.max(0, Math.min(scrollAmount, maxScroll));

                whyTrack.style.transform = `translateX(-${scrollAmount}px)`;

                boxes.forEach((box) => {
                    const boxRect = box.getBoundingClientRect();
                    if (boxRect.left < window.innerWidth * 0.75) {
                        box.classList.add("active");
                    }
                });
            }

        }, { passive: false });
    }


    /* ================= SAFE BUTTON SCROLL ================= */

    const scrollContainer = document.getElementById("scrollContainer");
    const leftBtn = document.getElementById("scrollLeft");
    const rightBtn = document.getElementById("scrollRight");
    const progressBar = document.getElementById("progressBar");

    if (scrollContainer && leftBtn && rightBtn && progressBar) {

        const scrolling = 500;

        leftBtn.addEventListener("click", () => {
            scrollContainer.scrollBy({
                left: -scrolling,
                behavior: "smooth"
            });
        });

        rightBtn.addEventListener("click", () => {
            scrollContainer.scrollBy({
                left: scrolling,
                behavior: "smooth"
            });
        });

        scrollContainer.addEventListener("scroll", () => {

            const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
            const currentScroll = scrollContainer.scrollLeft;
            const scrollPercent = (currentScroll / maxScroll) * 100;

            progressBar.style.width = scrollPercent + "%";
        });
    }


    /* ================= GLOBAL SLIDE-UP ANIMATION ================= */

    const animatedElements = document.querySelectorAll(
        "h1, h2, h3, p, img, button"
    );

    animatedElements.forEach(el => {
        el.classList.add("slide-up-hidden");
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("slide-up-show");
            } else {
                entry.target.classList.remove("slide-up-show");
            }
        });
    }, {
        threshold: 0.1
    });

    animatedElements.forEach(el => observer.observe(el));

});

// ================= EMAILJS =================
// Initialize EmailJS with your public key (from dashboard)
emailjs.init("Co2dPvmB3WpFoB3KY"); // Replace with your own EmailJS public key

// Wait for DOM to load
document.addEventListener("DOMContentLoaded", function () {

    // Get the contact form
    const form = document.getElementById("contact-form");

    // Listen for submit
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission

        // Send the form data to EmailJS
        emailjs.sendForm(
            "service_jmcy9em",    // Replace with your service ID
            "template_ynj46pr",   // Replace with your template ID
            form
        )
        .then(function () {
            alert("Message sent successfully!");
            form.reset(); // Clear the form after sending
        })
        .catch(function (error) {
            console.error("EmailJS error:", error);
            alert("Failed to send message. Please try again.");
        });

    });

});