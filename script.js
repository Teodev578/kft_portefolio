document.addEventListener('DOMContentLoaded', () => {

    // ================================================================= //
    //          CALCUL DE LA LARGEUR DE LA SCROLLBAR (POUR MODALS)       //
    // ================================================================= //
    function updateScrollbarWidth() {
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
    }
    updateScrollbarWidth();
    window.addEventListener('resize', updateScrollbarWidth);

    // ================================================================= //
    //                      GESTION DU MENU BURGER                       //
    // ================================================================= //
    const burgerMenu = document.getElementById('burger-menu');
    const mainNav = document.getElementById('main-nav');
    const navLinks = document.querySelectorAll('.nav-links li a');
    const breakpoint = 992; // Point de rupture CSS

    if (burgerMenu && mainNav) {
        burgerMenu.addEventListener('click', () => {
            mainNav.classList.toggle('nav-active');
            burgerMenu.classList.toggle('toggle');
            
            const isExpanded = burgerMenu.getAttribute('aria-expanded') === 'true';
            burgerMenu.setAttribute('aria-expanded', !isExpanded);
        });
    }

    // Fermer le menu en cliquant sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('nav-active')) {
                mainNav.classList.remove('nav-active');
                burgerMenu.classList.remove('toggle');
                burgerMenu.setAttribute('aria-expanded', 'false');
            }
        });
    });
    
    // Gérer la fermeture du menu si la fenêtre est redimensionnée au-delà du breakpoint
    function handleResize() {
        if (window.innerWidth > breakpoint) {
            mainNav.classList.remove('nav-active');
            burgerMenu.classList.remove('toggle');
            burgerMenu.setAttribute('aria-expanded', 'false');
        }
    }
    window.addEventListener('resize', handleResize);

    // ================================================================= //
    //                     GESTION DU DARK/LIGHT MODE                    //
    // ================================================================= //
    const themeToggle = document.getElementById('theme-toggle');
    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.body.classList.add('dark-mode');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
        });
    }

    // ================================================================= //
    //               EFFET SUR LE HEADER AU DÉFILEMENT                   //
    // ================================================================= //
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    // ================================================================= //
    //                  ANIMATIONS AU DÉFILEMENT (SCROLL)                //
    // ================================================================= //
    const animatedSections = document.querySelectorAll(".services-new, .about-section, .projects-section, .contact-section-new");
    if (animatedSections.length > 0) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        animatedSections.forEach(section => {
            observer.observe(section);
        });
    }

    // ================================================================= //
    //               GESTION DE L'ENVOI DU FORMULAIRE DE CONTACT         //
    // ================================================================= //
    const form = document.getElementById('contact-form');
    const statusDiv = document.getElementById('form-status');

    if (form && statusDiv) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(form);
            const object = {};
            formData.forEach((value, key) => { object[key] = value; });
            const json = JSON.stringify(object);

            statusDiv.innerHTML = "Envoi en cours...";
            statusDiv.style.color = 'var(--text-color)';

            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: json
            })
            .then(async (response) => {
                let jsonResponse = await response.json();
                if (response.status == 200) {
                    statusDiv.innerHTML = "Message envoyé avec succès !";
                    statusDiv.style.color = 'green';
                } else {
                    statusDiv.innerHTML = jsonResponse.message || "Une erreur s'est produite.";
                    statusDiv.style.color = 'var(--accent-color)';
                }
            })
            .catch(error => {
                console.log(error);
                statusDiv.innerHTML = "Une erreur s'est produite lors de l'envoi.";
                statusDiv.style.color = 'var(--accent-color)';
            })
            .finally(() => {
                form.reset();
                setTimeout(() => { statusDiv.innerHTML = ''; }, 5000);
            });
        });
    }

    // ================================================================= //
    //                       GESTION DES DIALOGUES (MODALS)              //
    // ================================================================= //
    const projectCards = document.querySelectorAll('.project-card');
    const dialogs = document.querySelectorAll('.dialog');

    const openDialog = (dialog) => {
        if (dialog) {
            dialog.classList.add('is-open');
            document.body.classList.add('dialog-open');
        }
    };

    const closeDialog = (dialog) => {
        if (dialog) {
            dialog.classList.remove('is-open');
            document.body.classList.remove('dialog-open');
        }
    };

    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const targetId = card.dataset.dialogTarget;
            const dialog = document.querySelector(targetId);
            openDialog(dialog);
        });
    });

    dialogs.forEach(dialog => {
        dialog.addEventListener('click', (event) => {
            if (event.target === dialog) closeDialog(dialog);
        });
        
        const closeButton = dialog.querySelector('.dialog-close');
        if(closeButton) {
            closeButton.addEventListener('click', () => closeDialog(dialog));
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            const openDialogEl = document.querySelector('.dialog.is-open');
            if (openDialogEl) closeDialog(openDialogEl);
        }
    });

});
