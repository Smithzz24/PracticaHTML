document.addEventListener("DOMContentLoaded", () => {
    const aside = document.querySelector(".aside");
    const navbar = document.getElementById("navbar-container");

    if (!aside || !navbar) return;

    let initialAsideOffset = null;
    let initialNavbarOffset = null;
    const sections = document.querySelectorAll("section[id]");

    window.addEventListener("scroll", () => {
        const scrollY = window.pageYOffset;

        if (initialNavbarOffset === null) {
            const rect = navbar.getBoundingClientRect();
            initialNavbarOffset = rect.top + scrollY;
        }
        if (initialAsideOffset === null) {
            const rect = aside.getBoundingClientRect();
            initialAsideOffset = rect.top + scrollY;
        }

        if (initialNavbarOffset !== null && scrollY >= initialNavbarOffset) {
            navbar.classList.add("sticky-navbar");
        } else {
            navbar.classList.remove("sticky-navbar");
        }

        if (initialAsideOffset !== null && scrollY >= initialAsideOffset) {
            aside.classList.add("sticky-aside");
            if (navbar.classList.contains("sticky-navbar")) {
                aside.style.top = navbar.offsetHeight + "px";
            } else {
                aside.style.top = "0";
            }
        } else {
            aside.classList.remove("sticky-aside");
            aside.style.top = "";
        }

        const scrollPos = scrollY + (navbar.offsetHeight || 0) + 20;
        sections.forEach(sec => {
            const id = sec.id;
            const link = document.querySelector(`.aside a[href="#${id}"]`);
            if (!link) return;
            if (scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
    });

    document.querySelectorAll(".aside a.nav-link").forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            const targetId = link.getAttribute("href").substring(1);
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
                if (targetEl.classList.contains('collapse')) {
                    const collapseInstance = bootstrap.Collapse.getOrCreateInstance(targetEl, {toggle:false});
                    collapseInstance.show();
                }
                window.scrollTo({
                    top: targetEl.offsetTop - (navbar.offsetHeight || 0) - 10,
                    behavior: "smooth"
                });
            }
        });
    });


});
