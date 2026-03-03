document.addEventListener("DOMContentLoaded", () => {
    const aside = document.querySelector(".aside");
    const navbar = document.getElementById("navbar-container");
    const body = document.body;

    if (!aside || !navbar) return;

    const sections = document.querySelectorAll("section[id]");
    let lastScrollY = 0;

    window.addEventListener("scroll", () => {
        const scrollY = window.pageYOffset;
        lastScrollY = scrollY;

        // Si scrollea más allá del navbar, pégalo al tope y añade padding al body
        if (scrollY > 0) {
            navbar.classList.add("sticky-navbar");
            body.style.paddingTop = navbar.offsetHeight + "px";
        } else {
            navbar.classList.remove("sticky-navbar");
            body.style.paddingTop = "0";
        }

        // El aside usa sticky naturalmente dentro del contentIndex
        aside.classList.add("sticky-aside");

        // Resaltar el enlace activo
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

    // Eventos para los enlaces del aside
    document.querySelectorAll(".aside a.nav-link").forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            const targetId = link.getAttribute("href").substring(1);
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
                // Abrir accordion si existe
                if (targetEl.classList.contains('collapse')) {
                    const collapseInstance = bootstrap.Collapse.getOrCreateInstance(targetEl, { toggle: false });
                    collapseInstance.show();
                }
                // Esperar un poco para que se abra el accordion
                setTimeout(() => {
                    window.scrollTo({
                        top: targetEl.offsetTop - (navbar.offsetHeight || 0) - 20,
                        behavior: "smooth"
                    });
                }, 100);
            }
        });
    });

});
