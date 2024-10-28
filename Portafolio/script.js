document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeToggle = document.querySelector('.theme-toggle input');
    const currentTheme = localStorage.getItem('theme');
    const header = document.querySelector('header');
    let lastScrollY = window.pageYOffset;
    let isHeaderVisible = true;
    let scrollTimeout;
    let isSmoothScrolling = false; // Nueva bandera para controlar el smooth scroll

    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            themeToggle.checked = true;
        }
    }

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

    // Header behavior
    function hideHeader() {
        header.style.transform = 'translateY(-100%)';
        isHeaderVisible = false;
    }

    function showHeader() {
        header.style.transform = 'translateY(0)';
        isHeaderVisible = true;
    }

    // Mostrar header inicialmente
    showHeader();

    // Control del header al hacer scroll
    window.addEventListener('scroll', () => {
        // No ejecutar la lógica de ocultar/mostrar header durante el smooth scroll
        if (isSmoothScrolling) return;

        clearTimeout(scrollTimeout);
        
        const currentScrollY = window.pageYOffset;
        
        // Mostrar header cuando se hace scroll hacia arriba
        if (currentScrollY < lastScrollY) {
            showHeader();
        } 
        // Ocultar header cuando se hace scroll hacia abajo
        else if (currentScrollY > lastScrollY) {
            hideHeader();
        }
        
        lastScrollY = currentScrollY;

        // Mostrar header después de que el usuario deje de hacer scroll
        scrollTimeout = setTimeout(() => {
            showHeader();
        }, 1000);
    });

    // Smooth scroll functionality
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            // Verificar si el targetId es válido y existe en el documento
            if (targetId && targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Activar bandera de smooth scroll
                    isSmoothScrolling = true;
                    showHeader(); // Asegurarnos que el header esté visible

                    // Calcular la posición considerando el header
                    const headerHeight = header.offsetHeight;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    // Desactivar la bandera después de que termine el smooth scroll
                    setTimeout(() => {
                        isSmoothScrolling = false;
                    }, 1000); // El tiempo debe ser suficiente para que termine la animación
                }
            }
        });
    });

    // Añadir estilos CSS para las transiciones
    const style = document.createElement('style');
    style.textContent = `
        header {
            transition: transform 0.3s ease-in-out;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 1000;
        }
    `;
    document.head.appendChild(style);
});