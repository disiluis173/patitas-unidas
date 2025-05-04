// Funcionalidades principales del sitio 
// Script principal para Patitas Felices

document.addEventListener('DOMContentLoaded', function() {
    // Menú móvil
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            menu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Filtros de mascotas
    const filterButtons = document.querySelectorAll('.filter-btn');
    const petCards = document.querySelectorAll('.pet-card');

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remover clase active de todos los botones
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Añadir clase active al botón clickeado
                button.classList.add('active');
                
                const filter = button.dataset.filter;
                
                // Filtrar tarjetas de mascotas
                petCards.forEach(card => {
                    if (filter === 'all' || card.dataset.type === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // Slider de testimonios
    const testimonials = document.querySelectorAll('.testimonial-item');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentTestimonial = 0;

    if (testimonials.length > 0) {
        // Ocultar todos los testimonios excepto el primero
        testimonials.forEach((testimonial, index) => {
            if (index !== 0) {
                testimonial.style.display = 'none';
            }
        });

        // Función para mostrar un testimonio específico
        const showTestimonial = (index) => {
            testimonials.forEach(testimonial => {
                testimonial.style.display = 'none';
            });
            testimonials[index].style.display = 'flex';
        };

        // Botón siguiente
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentTestimonial = (currentTestimonial + 1) % testimonials.length;
                showTestimonial(currentTestimonial);
            });
        }

        // Botón anterior
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
                showTestimonial(currentTestimonial);
            });
        }

        // Cambio automático de testimonios cada 5 segundos
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }, 5000);
    }

    // Validación de formularios
    const adoptionForm = document.getElementById('adoptionForm');
    if (adoptionForm) {
        adoptionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aquí iría la lógica de validación y envío del formulario
            alert('¡Formulario de adopción enviado con éxito! Nos pondremos en contacto contigo pronto.');
            adoptionForm.reset();
        });
    }

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aquí iría la lógica de validación y envío del formulario
            alert('¡Mensaje enviado con éxito! Te responderemos lo antes posible.');
            contactForm.reset();
        });
    }

    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aquí iría la lógica de validación y envío del formulario
            alert('¡Te has suscrito a nuestro boletín! Gracias por tu interés.');
            newsletterForm.reset();
        });
    }

    // Efecto de scroll suave para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70, // Ajuste para el header fijo
                    behavior: 'smooth'
                });
            }
        });
    });

    // Efecto de aparición al hacer scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.pet-card, .blog-card, .help-card, .team-member, .step');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('visible');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Ejecutar una vez al cargar la página

    // Header Scroll Effect
    const header = document.getElementById('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && !menuToggle.contains(e.target)) {
            menu.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });

    // Close menu when clicking on a link
    const menuLinks = document.querySelectorAll('.menu a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

    // Scroll Progress
    function updateScrollProgress() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        document.querySelector('.scroll-progress').style.width = scrolled + '%';
    }

    // Back to Top Button
    function toggleBackToTop() {
        const backToTop = document.querySelector('.back-to-top');
        if (window.scrollY > 300) {
            backToTop.style.display = 'block';
            setTimeout(() => backToTop.classList.add('visible'), 50);
        } else {
            backToTop.classList.remove('visible');
            setTimeout(() => backToTop.style.display = 'none', 300);
        }
    }

    // Improved Menu Toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !expanded);
            document.querySelector('.menu').classList.toggle('active');
        });
    }

    // Event Listeners
    window.addEventListener('scroll', () => {
        updateScrollProgress();
        toggleBackToTop();
    });
});