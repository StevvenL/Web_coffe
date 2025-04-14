document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navClose = document.createElement('div');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Crear botón de cerrar
    navClose.className = 'nav-close';
    navClose.innerHTML = '×';
    navMenu.appendChild(navClose);

    // Función para mostrar/ocultar el menú
    const toggleMenu = () => {
        navMenu.classList.toggle('show');
    };

    // Event listeners para el menú
    navToggle.addEventListener('click', toggleMenu);
    navClose.addEventListener('click', toggleMenu);

    // Función para el scroll suave
    const scrollToSection = (e) => {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        const headerOffset = 80; // Ajusta este valor según la altura de tu header
        const elementPosition = targetSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });

        // Cerrar el menú después de hacer clic
        navMenu.classList.remove('show');
    };

    // Función para actualizar el enlace activo
    const updateActiveLink = () => {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100; // Ajusta este valor según necesites
            const sectionId = current.getAttribute('id');
            
            if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if(link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    // Event listeners para los enlaces
    navLinks.forEach(link => {
        link.addEventListener('click', scrollToSection);
    });

    // Event listener para actualizar el enlace activo al hacer scroll
    window.addEventListener('scroll', updateActiveLink);
}); 