document.addEventListener('DOMContentLoaded', () => {

    // ================================================================= //
    //                      DICTIONNAIRE DE TRADUCTIONS                  //
    // ================================================================= //
    const translations = {
        fr: {
            nav_home: "Accueil",
            nav_services: "Service",
            nav_about: "À propos",
            nav_projects: "Projets",
            nav_contact: "Contacts",
            hero_headline: "DÉVELOPPEUR",
            hero_intro: `Je suis Fabien Téo KPEKPASSi, développeur <strong>full stack</strong> spécialisé dans le développement d'applications avec <strong>Flutter</strong>. Je conçois des solutions logicielles efficaces pour automatiser vos tâches, optimiser vos processus métier et vous faire gagner du temps comme de l'argent.`,
            hero_contact_btn: "Contactez-moi",
            hero_cv_btn: "télécharger mon CV",
            hero_scroll_services: "↓ Mes services",
            services_title: "*SERVICES",
            service_1_title: "*Développement sur mesure",
            service_1_desc: "Création d'outils web et mobiles pensés pour votre métier, avec une attention portée sur l'efficacité, la simplicité et l'expérience utilisateur.",
            service_2_title: "*Automatisation de vos tâches",
            service_2_desc: "Remplacez les tâches manuelles par des processus fluides et intelligents. Moins d'erreurs, plus de temps pour ce qui compte.",
            service_3_title: "*Maintenance et amélioration continue",
            service_3_desc: "Je reste à vos côtés pour faire évoluer vos outils, corriger les problèmes rapidement et intégrer de nouvelles fonctionnalités.",
            service_4_title: "*Ouvert aux opportunités",
            service_4_desc: "Je suis également disponible pour des missions freelance, des contrats de stage ou des propositions d'emploi dans le domaine du développement.",
            services_scroll_about: "↓ A propos de moi",
            about_subtitle: "Développeur créatif",
            about_description: "Mon parcours est marqué par une démarche autodidacte constante, complétée par une formation en Licence Développement d'application à l'Université Catholique de L’Afrique De L’Ouest - Unité Universitaire du Togo (UCAO-UUT) de 2021 à 2024. C'est cette curiosité et cette soif d'apprendre par moi-même qui m'ont permis de maîtriser les technologies actuelles et de transformer des idées complexes en solutions numériques concrètes, intuitives et performantes.",
            about_study_title: "Etude :",
            about_study_content: `<p>- 2021 - 2024:<br>Université Catholique De L'Afrique De L'Ouest (UCAO-UUT)</p><p>Licence développement d'application</p>`,
            about_skills_title: "Compétences :",
            about_skills_content: `<ul><li>-Recherche et dévellopement : 5/5</li><li>-Flutter : 4/5</li><li>-Figma : 4/5</li><li>-Python : 4/5</li><li>-UX/UI : 4/5</li></ul>`,
            about_exp_title: "Experience clé :",
            about_exp_content: "- Bien que je n'aie pas encore eu d'expérience en entreprise, j'ai eu l'occasion de développer un projet complet pour une quincaillerie, utilisé en conditions réelles.",
            about_scroll_projects: "↓ Quelques projets",
            projects_header_title: "MES PROJETS",
            projects_header_desc: "Voici une sélection de projets que j'ai développés dans le cadre de mon apprentissage en développement.",
            project_1_title: "GESTION DE QUINCAILLERIE",
            project_learn_more: "en savoir plus ->",
            project_learn_more_2: "en savoir plus →",
            project_learn_more_3: "en savoir plus ->",
            project_2_title: "GmailSorter — IA de tri automatique d’e-mails",
            project_3_title: "ALGORITHME IA",
            contact_title: "Donnons vie à votre projet :",
            contact_intro: "Mon objectif : vous simplifier la vie en transformant vos défis quotidiens en applications intuitives et performantes. Les tâches complexes, répétitives ou fastidieuses ? C'est mon terrain de jeu. Racontez-moi votre idée, et construisons ensemble la solution qui vous fera gagner du temps et de la sérénité et de l'argent.",
            contact_form_name: "Votre nom :",
            contact_form_email: "Votre email :",
            contact_form_message: "Votre message :",
            contact_form_submit: "Envoyer",
            contact_cta: "↓ CONTACTEZ-MOI",
            contact_social_fb: "Facebook",
            contact_social_ig: "Instagram",
            contact_social_li: "Linkedin",
        },
        en: {
            nav_home: "Home",
            nav_services: "Services",
            nav_about: "About",
            nav_projects: "Projects",
            nav_contact: "Contact",
            hero_headline: "developer",
            hero_intro: `I am Fabien Téo KPEKPASSi, a <strong>full stack</strong> developer specializing in application development with <strong>Flutter</strong>. I design effective software solutions to automate your tasks, optimize your business processes, and save you time and money.`,
            hero_contact_btn: "Contact me",
            hero_cv_btn: "download my resume",
            hero_scroll_services: "↓ My services",
            services_title: "*SERVICES",
            service_1_title: "*Custom Development",
            service_1_desc: "Creation of web and mobile tools designed for your business, with a focus on efficiency, simplicity, and user experience.",
            service_2_title: "*Task Automation",
            service_2_desc: "Replace manual tasks with fluid and intelligent processes. Fewer errors, more time for what matters.",
            service_3_title: "*Maintenance & Continuous Improvement",
            service_3_desc: "I remain by your side to evolve your tools, fix issues quickly, and integrate new features.",
            service_4_title: "*Open to Opportunities",
            service_4_desc: "I am also available for freelance missions, internship contracts, or job offers in the development field.",
            services_scroll_about: "↓ About me",
            about_subtitle: "Creative Developer",
            about_description: "My journey is marked by a constant self-taught approach, complemented by a Bachelor's degree in Application Development from the Catholic University of West Africa - Togo University Unit (UCAO-UUT) from 2021 to 2024. It is this curiosity and thirst for self-learning that have allowed me to master current technologies and transform complex ideas into concrete, intuitive, and high-performing digital solutions.",
            about_study_title: "Education:",
            about_study_content: `<p>- 2021 - 2024:<br>Catholic University of West Africa (UCAO-UUT)</p><p>Bachelor's degree in Application Development</p>`,
            about_skills_title: "Skills:",
            about_skills_content: `<ul><li>-Research and Development: 5/5</li><li>-Flutter: 4/5</li><li>-Figma: 4/5</li><li>-Python: 4/5</li><li>-UX/UI: 4/5</li></ul>`,
            about_exp_title: "Key Experience:",
            about_exp_content: "- Although I have not yet had corporate experience, I had the opportunity to develop a complete project for a hardware store, which is used in real-world conditions.",
            about_scroll_projects: "↓ Some projects",
            projects_header_title: "MY PROJECTS",
            projects_header_desc: "Here is a selection of projects that I have developed as part of my development learning.",
            project_1_title: "HARDWARE STORE MANAGEMENT",
            project_learn_more: "learn more ->",
            project_learn_more_2: "learn more →",
            project_learn_more_3: "learn more ->",
            project_2_title: "GmailSorter — AI-powered email sorter",
            project_3_title: "AI ALGORITHM",
            contact_title: "Let's bring your project to life:",
            contact_intro: "My goal: to simplify your life by transforming your daily challenges into intuitive and high-performing applications. Complex, repetitive, or tedious tasks? That's my playground. Tell me about your idea, and let's build the solution together that will save you time, peace of mind, and money.",
            contact_form_name: "Your name:",
            contact_form_email: "Your email:",
            contact_form_message: "Your message:",
            contact_form_submit: "Send",
            contact_cta: "↓ CONTACT ME",
            contact_social_fb: "Facebook",
            contact_social_ig: "Instagram",
            contact_social_li: "Linkedin",
        }
    };

    // ================================================================= //
    //                      LOGIQUE DE TRADUCTION                      //
    // ================================================================= //
    const languageLinks = document.querySelectorAll('.lang-link');
    
    function translatePage(lang) {
        const translatableElements = document.querySelectorAll('[data-key]');
        translatableElements.forEach(el => {
            const key = el.dataset.key;
            if (translations[lang] && translations[lang][key]) {
                const translation = translations[lang][key];
                if (el.placeholder) {
                    el.placeholder = translation;
                } else {
                    el.innerHTML = translation;
                }
            }
        });
        document.documentElement.lang = lang;
    }

    languageLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const selectedLang = link.dataset.lang;
            
            translatePage(selectedLang);

            languageLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            localStorage.setItem('language', selectedLang);
        });
    });

    const savedLang = localStorage.getItem('language') || 'fr';
    translatePage(savedLang);
    languageLinks.forEach(l => {
        l.classList.remove('active');
        if (l.dataset.lang === savedLang) {
            l.classList.add('active');
        }
    });

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
    const breakpoint = 992;

    if (burgerMenu && mainNav) {
        burgerMenu.addEventListener('click', () => {
            mainNav.classList.toggle('nav-active');
            burgerMenu.classList.toggle('toggle');
            const isExpanded = burgerMenu.getAttribute('aria-expanded') === 'true';
            burgerMenu.setAttribute('aria-expanded', !isExpanded);
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('nav-active')) {
                mainNav.classList.remove('nav-active');
                burgerMenu.classList.remove('toggle');
                burgerMenu.setAttribute('aria-expanded', 'false');
            }
        });
    });

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