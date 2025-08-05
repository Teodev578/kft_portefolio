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
/* ======================================================== */
/*             GESTION DES DIALOGUES (MODALS)               */
/* ======================================================== */
document.addEventListener('DOMContentLoaded', () => {

    const projectCards = document.querySelectorAll('.project-card');
    const closeButtons = document.querySelectorAll('.dialog-close');
    const dialogs = document.querySelectorAll('.dialog');

    // --- CORRECTION APPLIQUÉE ICI ---
    // Fonction pour ouvrir un dialogue
    const openDialog = (dialog) => {
        if (dialog) {
            dialog.classList.add('is-open');
            // On utilise la classe CSS pour bloquer le scroll
            document.body.classList.add('dialog-open'); 
        }
    };

    // --- CORRECTION APPLIQUÉE ICI ---
    // Fonction pour fermer un dialogue
    const closeDialog = (dialog) => {
        if (dialog) {
            dialog.classList.remove('is-open');
            // On retire la classe pour rétablir le scroll
            document.body.classList.remove('dialog-open'); 
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

document.addEventListener('DOMContentLoaded', function() {

    const burgerMenu = document.getElementById('burger-menu');
    const mainNav = document.getElementById('main-nav');
    const breakpoint = 992; // Le point de rupture défini dans votre CSS

    // Votre code existant pour le clic sur le burger
    burgerMenu.addEventListener('click', () => {
        burgerMenu.classList.toggle('toggle');
        mainNav.classList.toggle('nav-active');
    });

    // --- LA CORRECTION EST ICI ---
    // On ajoute une fonction pour gérer le redimensionnement de la fenêtre
    function handleResize() {
        // Si la largeur de la fenêtre est supérieure à notre point de rupture
        if (window.innerWidth > breakpoint) {
            // On s'assure que le menu mobile est bien fermé
            // en retirant les classes qui le rendent actif.
            burgerMenu.classList.remove('toggle');
            mainNav.classList.remove('nav-active');
        }
    }

    // On écoute l'événement 'resize' sur la fenêtre
    window.addEventListener('resize', handleResize);

    // On exécute la fonction une fois au chargement pour s'assurer
    // que l'état initial est correct.
    handleResize();

    // ... (le reste de votre code JavaScript : gestion du thème, des boîtes de dialogue, etc.)

});

//animation section service

document.addEventListener("DOMContentLoaded", function() {

    const animatedSection = document.querySelector(".services-new");

    if (!animatedSection) {
        return; // Si la section n'existe pas, on arrête tout.
    }

    // L'Intersection Observer va nous dire quand la section est visible
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            // Si l'élément est dans le viewport (visible à l'écran)
            if (entry.isIntersecting) {
                // On ajoute la classe 'is-visible' pour déclencher les animations CSS
                animatedSection.classList.add("is-visible");
                // On peut arrêter d'observer une fois l'animation déclenchée
                observer.unobserve(entry.target);
            }
        });
    }, {
        // L'animation se déclenchera quand 20% de la section sera visible
        threshold: 0.2 
    });

    // On dit à l'observer de surveiller notre section
    observer.observe(animatedSection);

});

//animation pour la section #about
document.addEventListener("DOMContentLoaded", function() {

    // On sélectionne TOUTES les sections qu'on veut animer
    const animatedSections = document.querySelectorAll(".services-new, .about-section");

    // Si aucune section à animer n'est trouvée, on s'arrête là.
    if (animatedSections.length === 0) {
        return;
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            // Si la section est visible à l'écran
            if (entry.isIntersecting) {
                // On ajoute la classe .is-visible à la section concernée
                entry.target.classList.add("is-visible");
                // On arrête d'observer cette section pour que l'animation ne se répète pas
                observer.unobserve(entry.target);
            }
        });
    }, {
        // L'animation se déclenchera quand 20% de la section sera visible
        threshold: 0.2 
    });

    // On demande à l'observer de surveiller CHAQUE section que nous avons sélectionnée
    animatedSections.forEach(section => {
        observer.observe(section);
    });

});

//fonction qui gère les animations de la section projet 
document.addEventListener("DOMContentLoaded", function() {

    // MISE À JOUR ICI : on ajoute .projects-section à la liste des sélecteurs
    const animatedSections = document.querySelectorAll(".services-new, .about-section, .projects-section");

    if (animatedSections.length === 0) {
        return;
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2 
    });

    animatedSections.forEach(section => {
        observer.observe(section);
    });

});

//animation s'apparition de la section contact
document.addEventListener("DOMContentLoaded", function() {

    // MISE À JOUR FINALE : on ajoute .contact-section-new à la liste
    const animatedSections = document.querySelectorAll(".services-new, .about-section, .projects-section, .contact-section-new");

    if (animatedSections.length === 0) {
        return;
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, {
        // Se déclenche quand 20% de la section entre dans le viewport
        threshold: 0.2 
    });

    // On observe chaque section de notre liste
    animatedSections.forEach(section => {
        observer.observe(section);
    });

});

// AJOUTEZ CE BLOC AU DÉBUT DE VOTRE FICHIER SCRIPT.JS

// Fonction pour calculer la largeur de la barre de défilement et la stocker dans une variable CSS
function updateScrollbarWidth() {
    // On crée une div invisible
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.width = '100px';
    outer.style.msOverflowStyle = 'scrollbar'; // Nécessaire pour IE et Edge

    document.body.appendChild(outer);

    const widthNoScroll = outer.offsetWidth;
    // On force l'affichage de la scrollbar
    outer.style.overflow = 'scroll';

    // On crée une div intérieure
    const inner = document.createElement('div');
    inner.style.width = '100%';
    outer.appendChild(inner);

    const widthWithScroll = inner.offsetWidth;

    // On retire la div de test du DOM
    outer.parentNode.removeChild(outer);

    // On calcule la largeur de la scrollbar et on la stocke dans une variable CSS
    const scrollbarWidth = widthNoScroll - widthWithScroll;
    document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
}

// Appeler la fonction au chargement et lors du redimensionnement de la fenêtre
document.addEventListener('DOMContentLoaded', updateScrollbarWidth);
window.addEventListener('resize', updateScrollbarWidth);

// ... (le reste de votre code JS existant)