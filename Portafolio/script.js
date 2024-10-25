document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.querySelector('.theme-toggle input');
    const currentTheme = localStorage.getItem('theme');

    // Verificar tema guardado
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            themeToggle.checked = true;
        }
    }

    // Manejar cambios en el toggle
    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });
});
toggleSwitch.addEventListener('change', switchTheme, false);

// Función principal para manejar el scroll
function handleScroll() {
    const currentScrollY = window.scrollY;
    
    // Solo ejecutar si el cambio en el scroll es mayor que el umbral
    if (Math.abs(currentScrollY - lastScrollY) > scrollThreshold) {
        // Scrolling hacia abajo
        if (currentScrollY > lastScrollY) {
            hideHeader();
        } 
        // Scrolling hacia arriba
        else {
            showHeader();
        }
        
        lastScrollY = currentScrollY;
    }
}

// Debounce function para mejorar el rendimiento
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Agregar el event listener con debounce
window.addEventListener('scroll', debounce(handleScroll, 10));

// Mostrar el header cuando el mouse está cerca de la parte superior
document.addEventListener('mousemove', (e) => {
    if (e.clientY <= 150) { // Ajusta este valor según necesites
        showHeader();
    }
});

// Asegurarse de que el header sea visible cuando la página está en la parte superior
window.addEventListener('load', () => {
    if (window.scrollY === 0) {
        showHeader();
    }
});
