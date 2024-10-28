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
});