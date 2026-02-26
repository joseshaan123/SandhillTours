
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
    let touchStartX = 0;
    let touchStartY = 0;

    function updateMaxScroll() {
        // Recalculate the total scrollable width
        maxScroll = whyTrack.scrollWidth - whySection.clientWidth;
    }

    updateMaxScroll();
    window.addEventListener("resize", updateMaxScroll);

    // --- SHARED SCROLL HANDLER ---
    function handleScroll(deltaY) {
        const sectionTop = whySection.offsetTop;
        const scrollY = window.scrollY;

        // Check if user is viewing the section
        if (scrollY >= sectionTop - 10 && scrollY < sectionTop + whySection.offsetHeight) {
            
            // Allow natural scroll if at the very beginning or very end
            if ((scrollAmount <= 0 && deltaY < 0) || (scrollAmount >= maxScroll && deltaY > 0)) {
                return false; // Don't prevent default
            }

            scrollAmount += deltaY;
            scrollAmount = Math.max(0, Math.min(scrollAmount, maxScroll));

            whyTrack.style.transform = `translateX(-${scrollAmount}px)`;

            // Active Class logic
            boxes.forEach((box) => {
                const boxRect = box.getBoundingClientRect();
                if (boxRect.left < window.innerWidth * 0.75) {
                    box.classList.add("active");
                } else {
                    box.classList.remove("active");
                }
            });
            return true; // Prevent default scroll
        }
        return false;
    }

    // DESKTOP: Wheel Event
    window.addEventListener("wheel", (e) => {
        if (handleScroll(e.deltaY)) {
            e.preventDefault();
        }
    }, { passive: false });

    // MOBILE: Touch Events
    window.addEventListener("touchstart", (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    }, { passive: true });

    window.addEventListener("touchmove", (e) => {
        const touchX = e.touches[0].clientX;
        const touchY = e.touches[0].clientY;

        // Calculate how much the finger moved vertically or horizontally
        const deltaY = touchStartY - touchY;
        const deltaX = touchStartX - touchX;

        // Use the larger movement to determine intent
        // If swiping horizontally or scrolling vertically, trigger the track
        let movement = Math.abs(deltaY) > Math.abs(deltaX) ? deltaY : deltaX;

        if (handleScroll(movement)) {
            if (e.cancelable) e.preventDefault();
        }
        
        // Update starts for continuous swiping
        touchStartX = touchX;
        touchStartY = touchY;
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










(function() {
    emailjs.init("Co2dPvmB3WpFoB3KY");
})();

document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("contact-form");
    const overlay = document.getElementById("popupOverlay");
    const popupBox = document.getElementById("popupBox");
    const popupMessage = document.getElementById("popupMessage");
    const popupOkBtn = document.getElementById("popupOkBtn");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        emailjs.sendForm("service_jmcy9em", "template_ynj46pr", form)
        .then(function(response) {
            console.log("SUCCESS", response);
            showPopup(" Your message has been sent successfully!", "success");
            form.reset();
        })
        .catch(function(error) {
            console.error("ERROR DETAILS:", error);
            showPopup(" Failed to send message. Please try again.", "error");
        });
    });

    function showPopup(message, type) {
        popupMessage.textContent = message;
        popupBox.classList.remove("success", "error");
        popupBox.classList.add(type);
        overlay.classList.add("active");
    }

    popupOkBtn.addEventListener("click", function() {
        overlay.classList.remove("active");
    });

});
