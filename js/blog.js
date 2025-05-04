// Funcionalidades específicas del blog 
// Funcionalidades específicas para el blog de Patitas Conectadas

document.addEventListener('DOMContentLoaded', function() {
    // Funcionalidad del menú de categorías en dispositivos móviles
    const categoryToggle = document.createElement('div');
    categoryToggle.classList.add('category-toggle');
    categoryToggle.innerHTML = '<span>Categorías</span> <i class="fas fa-chevron-down"></i>';
    
    const blogCategories = document.querySelector('.blog-categories');
    if (blogCategories) {
        if (window.innerWidth < 768) {
            blogCategories.prepend(categoryToggle);
            const categoryList = blogCategories.querySelector('ul');
            categoryList.style.display = 'none';
            
            categoryToggle.addEventListener('click', function() {
                categoryList.style.display = categoryList.style.display === 'none' ? 'flex' : 'none';
                categoryToggle.classList.toggle('active');
            });
        }
    }
    
    // Funcionalidad de búsqueda
    const searchForm = document.getElementById('searchForm');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchTerm = this.querySelector('input').value.trim();
            
            if (searchTerm.length > 0) {
                // Aquí iría la lógica de búsqueda real
                alert(`Buscando: ${searchTerm}`);
                // Redireccionar a página de resultados o mostrar resultados dinámicamente
            }
        });
    }
    
    // Formulario de suscripción al boletín
    const newsletterForms = document.querySelectorAll('#sidebarNewsletter, #newsletterForm');
    newsletterForms.forEach(form => {
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                const email = this.querySelector('input[type="email"]').value.trim();
                
                if (email.length > 0) {
                    // Aquí iría la lógica de suscripción real
                    alert(`¡Gracias por suscribirte con ${email}! Pronto recibirás nuestro boletín.`);
                    this.reset();
                }
            });
        }
    });
    
    // Formulario de comentarios
    const commentForm = document.getElementById('commentForm');
    if (commentForm) {
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('commentName').value.trim();
            const email = document.getElementById('commentEmail').value.trim();
            const content = document.getElementById('commentContent').value.trim();
            
            if (name && email && content) {
                // Aquí iría la lógica para enviar el comentario
                alert('¡Gracias por tu comentario! Será revisado y publicado pronto.');
                this.reset();
            }
        });
    }
    
    // Botones para compartir en redes sociales
    const shareButtons = document.querySelectorAll('.article-share a');
    if (shareButtons.length > 0) {
        shareButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                const url = encodeURIComponent(window.location.href);
                const title = encodeURIComponent(document.title);
                let shareUrl;
                
                // Diferentes URLs para diferentes redes sociales
                if (this.classList.contains('facebook')) {
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                } else if (this.classList.contains('twitter')) {
                    shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
                } else if (this.classList.contains('pinterest')) {
                    const img = encodeURIComponent(document.querySelector('.article-featured-image img').src);
                    shareUrl = `https://pinterest.com/pin/create/button/?url=${url}&media=${img}&description=${title}`;
                } else if (this.classList.contains('whatsapp')) {
                    shareUrl = `https://api.whatsapp.com/send?text=${title} ${url}`;
                }
                
                // Abrir ventana de compartir
                if (shareUrl) {
                    window.open(shareUrl, '_blank', 'width=600,height=400');
                }
            });
        });
    }
    
    // Botones de "ver más comentarios"
    const moreCommentsBtn = document.querySelector('.more-comments a');
    if (moreCommentsBtn) {
        moreCommentsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Cargando más comentarios...');
            // Aquí iría la lógica para cargar más comentarios
        });
    }
    
    // Botones de respuesta a comentarios
    const replyButtons = document.querySelectorAll('.reply-btn');
    if (replyButtons.length > 0) {
        replyButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Scroll al formulario de comentarios
                const commentForm = document.getElementById('commentForm');
                commentForm.scrollIntoView({ behavior: 'smooth' });
                
                // Cambiar el título del formulario para indicar que es una respuesta
                const formTitle = commentForm.querySelector('h3');
                const commentAuthor = this.closest('.comment-content').querySelector('h4').textContent;
                formTitle.textContent = `Responder a ${commentAuthor}`;
                
                // Agregar un campo oculto para indicar que es una respuesta
                let replyField = document.getElementById('replyTo');
                if (!replyField) {
                    replyField = document.createElement('input');
                    replyField.type = 'hidden';
                    replyField.id = 'replyTo';
                    replyField.name = 'replyTo';
                    commentForm.appendChild(replyField);
                }
                
                // Establecer el ID del comentario al que se responde
                replyField.value = this.closest('.comment').dataset.id || '1';
                
                // Enfocar el campo de comentario
                document.getElementById('commentContent').focus();
            });
        });
    }
    
    // Destacar artículo actual en la barra lateral
    const currentPageUrl = window.location.pathname;
    const sidebarLinks = document.querySelectorAll('.sidebar-widget a');
    
    sidebarLinks.forEach(link => {
        if (link.getAttribute('href') === currentPageUrl) {
            link.classList.add('current-page');
            if (link.closest('.popular-post')) {
                link.closest('.popular-post').classList.add('current-article');
            }
        }
    });

    // Búsqueda y filtrado avanzado
    const searchInput = document.getElementById('blogSearch');
    const categoryFilter = document.getElementById('categoryFilter');
    const dateFilter = document.getElementById('dateFilter');
    const posts = document.querySelectorAll('.blog-post');

    function normalize(str) {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    }

    function postMatches(post, searchTerm, selectedCategory, selectedDate) {
        // Título
        const title = normalize(post.querySelector('h2').textContent);
        // Etiquetas (data-tags="cuidados,adopcion")
        const tags = (post.dataset.tags || "").split(',').map(t => normalize(t.trim()));
        // Fecha (data-date="2023-05-10")
        const postDate = post.dataset.date ? new Date(post.dataset.date) : null;

        // Buscar por término (en título o etiquetas)
        let matchesSearch = true;
        if (searchTerm) {
            matchesSearch =
                title.includes(searchTerm) ||
                tags.some(tag => tag.includes(searchTerm));
        }

        // Filtrar por categoría
        let matchesCategory = true;
        if (selectedCategory) {
            matchesCategory = tags.includes(normalize(selectedCategory));
        }

        // Filtrar por fecha
        let matchesDate = true;
        if (selectedDate && postDate) {
            const now = new Date();
            if (selectedDate === 'month') {
                const monthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
                matchesDate = postDate >= monthAgo;
            } else if (selectedDate === 'year') {
                const yearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
                matchesDate = postDate >= yearAgo;
            }
        }

        return matchesSearch && matchesCategory && matchesDate;
    }

    function filterPosts() {
        const searchTerm = normalize(searchInput.value.trim());
        const selectedCategory = categoryFilter.value;
        const selectedDate = dateFilter.value;

        posts.forEach(post => {
            if (postMatches(post, searchTerm, selectedCategory, selectedDate)) {
                post.style.display = '';
            } else {
                post.style.display = 'none';
            }
        });
    }

    if (searchInput) searchInput.addEventListener('input', filterPosts);
    if (categoryFilter) categoryFilter.addEventListener('change', filterPosts);
    if (dateFilter) dateFilter.addEventListener('change', filterPosts);

    // Etiquetas clickeables para filtrar por categoría
    document.querySelectorAll('.post-tags a').forEach(tagLink => {
        tagLink.addEventListener('click', function(e) {
            e.preventDefault();
            const tag = this.textContent.trim();
            categoryFilter.value = tag.toLowerCase();
            filterPosts();
        });
    });

    // Inicializar data-tags y data-date en los posts si no existen (para compatibilidad)
    posts.forEach(post => {
        // Etiquetas
        if (!post.dataset.tags) {
            const tagLinks = post.querySelectorAll('.post-tags a');
            const tags = Array.from(tagLinks).map(a => a.textContent.trim().toLowerCase());
            post.dataset.tags = tags.join(',');
        }
        // Fecha
        if (!post.dataset.date) {
            const dateText = post.querySelector('.post-date')?.textContent.match(/\d{1,2} \w+, \d{4}/);
            if (dateText) {
                // Convierte "10 mayo, 2023" a "2023-05-10"
                const meses = {
                    'enero': '01', 'febrero': '02', 'marzo': '03', 'abril': '04', 'mayo': '05', 'junio': '06',
                    'julio': '07', 'agosto': '08', 'septiembre': '09', 'octubre': '10', 'noviembre': '11', 'diciembre': '12'
                };
                const parts = dateText[0].replace(',', '').split(' ');
                if (parts.length === 3) {
                    const dia = parts[0].padStart(2, '0');
                    const mes = meses[parts[1].toLowerCase()] || '01';
                    const anio = parts[2];
                    post.dataset.date = `${anio}-${mes}-${dia}`;
                }
            }
        }
    });
});