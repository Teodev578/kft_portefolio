document.addEventListener('DOMContentLoaded', () => {

    // ================================================================= //
    //                      GESTION DU MENU BURGER                       //
    // ================================================================= //
    const burger = document.getElementById('burger-menu');
    const nav = document.getElementById('main-nav');
    const navLinks = document.querySelectorAll('.nav-links li a');

    if (burger && nav) {
        burger.addEventListener('click', () => {
            // Toggle la navigation
            nav.classList.toggle('nav-active');
            
            // Animation du Burger
            burger.classList.toggle('toggle');
            
            // Gérer le focus et l'accessibilité
            const isExpanded = burger.getAttribute('aria-expanded') === 'true';
            burger.setAttribute('aria-expanded', !isExpanded);
        });
    }

    // Fermer le menu en cliquant sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
                burger.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // ================================================================= //
    //                     GESTION DU DARK/LIGHT MODE                    //
    // ================================================================= //
    const themeToggle = document.getElementById('theme-toggle');

    // Vérifier le thème sauvegardé ou le thème préféré du système
    if (localStorage.getItem('theme') === 'dark' || 
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.body.classList.add('dark-mode');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            
            // Sauvegarder le choix de l'utilisateur
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // ================================================================= //
    //               EFFET SUR LE HEADER AU DÉFILEMENT                   //
    // ================================================================= //
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // ================================================================= //
    //                  ANIMATION AU DÉFILEMENT (SCROLL)                 //
    // ================================================================= //
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.1 // L'élément devient visible quand 10% est à l'écran
    });

    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    elementsToAnimate.forEach(el => observer.observe(el));
    
    // ================================================================= //
    //               GESTION DE L'ENVOI DU FORMULAIRE DE CONTACT         //
    // ================================================================= //
    const form = document.getElementById('contact-form');
    const statusDiv = document.getElementById('form-status');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(form);
            const object = {};
            formData.forEach((value, key) => {
                object[key] = value;
            });
            const json = JSON.stringify(object);

            if (statusDiv) {
                statusDiv.innerHTML = "Envoi en cours...";
                statusDiv.style.color = 'var(--text-color)';
            }

            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            })
            .then(async (response) => {
                let jsonResponse = await response.json();
                if (statusDiv) {
                    if (response.status == 200) {
                        statusDiv.innerHTML = "Message envoyé avec succès !";
                        statusDiv.style.color = 'green';
                    } else {
                        console.log(response);
                        statusDiv.innerHTML = jsonResponse.message || "Une erreur s'est produite.";
                        statusDiv.style.color = 'var(--accent-color)';
                    }
                }
            })
            .catch(error => {
                console.log(error);
                if (statusDiv) {
                    statusDiv.innerHTML = "Une erreur s'est produite lors de l'envoi.";
                    statusDiv.style.color = 'var(--accent-color)';
                }
            })
            .then(function() {
                form.reset(); // Vide les champs du formulaire
                if (statusDiv) {
                    setTimeout(() => {
                        statusDiv.innerHTML = ''; // Efface le message après 5 secondes
                    }, 5000);
                }
            });
        });
    }

});

/* ======================================================== */
/*             GESTION DES DIALOGUES (MODALS)               */
/* ======================================================== */
document.addEventListener('DOMContentLoaded', () => {

    const projectCards = document.querySelectorAll('.project-card');
    const closeButtons = document.querySelectorAll('.dialog-close');
    const dialogs = document.querySelectorAll('.dialog');

    // Fonction pour ouvrir un dialogue
    const openDialog = (dialog) => {
        if (dialog) {
            dialog.classList.add('is-open');
            document.body.style.overflow = 'hidden'; // Empêche le scroll en arrière-plan
        }
    };

    // Fonction pour fermer un dialogue
    const closeDialog = (dialog) => {
        if (dialog) {
            dialog.classList.remove('is-open');
            document.body.style.overflow = ''; // Rétablit le scroll
        }
    };

    // Ouvre le dialogue au clic sur une carte
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const targetId = card.dataset.dialogTarget;
            const dialog = document.querySelector(targetId);
            openDialog(dialog);
        });
    });

    // Ferme le dialogue au clic sur le bouton de fermeture
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const dialog = button.closest('.dialog');
            closeDialog(dialog);
        });
    });

    // Ferme le dialogue au clic sur le fond (l'overlay)
    dialogs.forEach(dialog => {
        dialog.addEventListener('click', (event) => {
            if (event.target === dialog) {
                closeDialog(dialog);
            }
        });
    });
    
    // Ferme le dialogue avec la touche "Echap"
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            const openDialog = document.querySelector('.dialog.is-open');
            if (openDialog) {
                closeDialog(openDialog);
            }
        }
    });

});

document.addEventListener('DOMContentLoaded', () => {

    const cursorDot = document.querySelector('.cursor-dot');
    const cursorBubble = document.querySelector('.cursor-bubble');
    
    let dotX = 0, dotY = 0;
    let bubbleX = 0, bubbleY = 0;

    // Écouteur pour le mouvement de la souris
    window.addEventListener('mousemove', (e) => {
        dotX = e.clientX;
        dotY = e.clientY;
    });

    // Fonction d'animation pour fluidifier le mouvement
    const animateCursor = () => {
        // Le point (dot) est mis à jour instantanément pour être réactif
        cursorDot.style.left = `${dotX}px`;
        cursorDot.style.top = `${dotY}px`;

        // La bulle (bubble) se déplace progressivement vers la position du point
        // C'est ce qui crée l'effet de "retard" ou de "traînée"
        bubbleX += (dotX - bubbleX) * 0.15; // 0.15 est le facteur de "lissage"
        bubbleY += (dotY - bubbleY) * 0.15;

        cursorBubble.style.left = `${bubbleX}px`;
        cursorBubble.style.top = `${bubbleY}px`;

        requestAnimationFrame(animateCursor);
    };

    animateCursor();
});