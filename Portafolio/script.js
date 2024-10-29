document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeToggle = document.querySelector('.theme-toggle input');
    const currentTheme = localStorage.getItem('theme');
    const header = document.querySelector('header');
    let lastScrollY = window.pageYOffset;
    let isHeaderVisible = true;
    let scrollTimeout;
    let isSmoothScrolling = false;

    // Theme initialization
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            themeToggle.checked = true;
        }
    }

    // Theme toggle handler
    themeToggle.addEventListener('change', function() {
        setTimeout(() => {
            if (this.checked) {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
            }
        }, 1200);
    });

    // Header visibility functions
    function hideHeader() {
        if (isHeaderVisible) {
            header.style.transform = 'translateY(-100%)';
            isHeaderVisible = false;
        }
    }

    function showHeader() {
        if (!isHeaderVisible) {
            header.style.transform = 'translateY(0)';
            isHeaderVisible = true;
        }
    }

    // Scroll handler
    window.addEventListener('scroll', () => {
        if (isSmoothScrolling) return;

        clearTimeout(scrollTimeout);
        
        const currentScrollY = window.pageYOffset;
        
        if (Math.abs(currentScrollY - lastScrollY) > 10) {
            if (currentScrollY < lastScrollY) {
                showHeader();
            } else if (currentScrollY > lastScrollY) {
                hideHeader();
            }
        }
        
        lastScrollY = currentScrollY;

        scrollTimeout = setTimeout(() => {
            showHeader();
        }, 1000);
    });

    // Smooth scroll handling with center positioning
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId && targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    isSmoothScrolling = true;
                    showHeader();

                    // Obtener dimensiones necesarias
                    const headerHeight = header.offsetHeight;
                    const targetRect = targetElement.getBoundingClientRect();
                    const targetHeight = targetRect.height;
                    const viewportHeight = window.innerHeight;
                    
                    // Calcular la posición para centrar la sección
                    const startPosition = window.pageYOffset;
                    const targetPosition = window.pageYOffset + targetRect.top;
                    const centerOffset = (viewportHeight - targetHeight) / 7;
                    const finalPosition = targetPosition - headerHeight - centerOffset;
                    
                    // Calcular la distancia total a recorrer
                    const distance = finalPosition - startPosition;

                    // Implementación de smooth scroll
                    const duration = 1000;
                    const start = performance.now();

                    function animation(currentTime) {
                        const timeElapsed = currentTime - start;
                        const progress = Math.min(timeElapsed / duration, 1);

                        // Función de easing
                        const easing = t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
                        
                        window.scrollTo(0, startPosition + distance * easing(progress));

                        if (progress < 1) {
                            requestAnimationFrame(animation);
                        } else {
                            // Asegurarse de que llegamos exactamente a la posición deseada
                            window.scrollTo(0, finalPosition);
                            setTimeout(() => {
                                isSmoothScrolling = false;
                            }, 100);
                        }
                    }

                    requestAnimationFrame(animation);
                }
            }
        });
    });
});// Traducciones
const translations = {
    es: {
        // Navegación
        'about': 'Sobre mi',
        'technologies': 'Tecnologias',
        'contact': 'Contáctame',
        
        // Hero Section
        'hero-title': 'Soy Kevin Brando',
        'hero-subtitle': 'Ingeniero de Software de aplicaciones de escritorio y desarrollador Web',
        'location': 'Santiago de los Caballeros - República Dominicana',
        
        // Botones sociales
        'email': 'Email',
        'curriculum': 'Curriculum',
        'github': 'GitHub',
        'linkedin': 'LinkedIn',
        
        // Sobre mi
        'about-title': 'Sobre mi',
        'about-description': 'Soy un Ingeniero en Software en formación en la Universidad Abierta Para Adultos (UAPA), especializado en el desarrollo de soluciones tecnológicas integrales con experiencia en desarrollo de aplicaciones de escritorio, en bases de datos y en el desarrollo web.',
        
        // Tecnologías
        'tech-title': 'Tecnologias',
        'frontend': 'Front-end',
        'backend': 'Back-end',
        'databases': 'Bases de datos',
        'tools': 'Herramientas',
        
        // Contacto
        'contact-title': 'Contáctame',
        'phone': 'Teléfono',
        'whatsapp': 'WhatsApp',
        'email-contact': 'Email'
    },
    en: {
        // Navigation
        'about': 'About me',
        'technologies': 'Technologies',
        'contact': 'Contact me',
        
        // Hero Section
        'hero-title': "I'm Kevin Brando",
        'hero-subtitle': 'Desktop Application Software Engineer and Web Developer',
        'location': 'Santiago de los Caballeros - Dominican Republic',
        
        // Social buttons
        'email': 'Email',
        'curriculum': 'Resume',
        'github': 'GitHub',
        'linkedin': 'LinkedIn',
        
        // About
        'about-title': 'About me',
        'about-description': "I'm a Software Engineer in training at Universidad Abierta Para Adultos (UAPA), specialized in developing comprehensive technological solutions with experience in desktop application development, databases, and web development.",
        
        // Technologies
        'tech-title': 'Technologies',
        'frontend': 'Front-end',
        'backend': 'Back-end',
        'databases': 'Databases',
        'tools': 'Tools',
        
        // Contact
        'contact-title': 'Contact me',
        'phone': 'Phone',
        'whatsapp': 'WhatsApp',
        'email-contact': 'Email'
    }
};

// Función para cambiar el idioma
function changeLanguage(language) {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[language][key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translations[language][key];
            } else {
                element.textContent = translations[language][key];
            }
        }
    });
    
    // Actualizar el atributo lang del HTML
    document.documentElement.lang = language;
    
    // Guardar la preferencia en localStorage
    localStorage.setItem('preferred-language', language);
}
document.addEventListener('DOMContentLoaded', () => {
    // Crear el contenedor para ambos switches
    const switchesContainer = document.createElement('div');
    switchesContainer.className = 'switches-container';
    
    // Crear el switch de idioma
    const langToggle = document.createElement('div');
    langToggle.className = 'language-toggle';
    langToggle.innerHTML = `
        <label class="lang-switch">
            <input type="checkbox" id="language-checkbox">
            <span class="lang-slider">
                <span class="lang-option lang-es">ES</span>
                <span class="lang-option lang-en">EN</span>
            </span>
        </label>
    `;
    
    // Mover los switches al nuevo contenedor
    const nav = document.querySelector('.nav');
    const themeToggle = document.querySelector('.theme-toggle');
    
    // Remover el theme toggle de su posición actual
    themeToggle.parentNode.removeChild(themeToggle);
    
    // Agregar ambos switches al nuevo contenedor
    switchesContainer.appendChild(langToggle);
    switchesContainer.appendChild(themeToggle);
    
    // Agregar el contenedor a la navegación
    nav.appendChild(switchesContainer);
    
    // Agregar el evento de cambio
    const languageCheckbox = document.getElementById('language-checkbox');
    languageCheckbox.addEventListener('change', (e) => {
        const newLang = e.target.checked ? 'en' : 'es';
        changeLanguage(newLang);
    });
    
    // Cargar el idioma preferido guardado
    const savedLanguage = localStorage.getItem('preferred-language') || 'es';
    languageCheckbox.checked = savedLanguage === 'en';
    changeLanguage(savedLanguage);
});