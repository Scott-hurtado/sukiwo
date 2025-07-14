// 🚀 Sukiwo JavaScript - Diseño moderno con animaciones fluidas y efectos smooth

// Función principal para detectar visibilidad y activar animaciones
function observeElements() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

// Función para manejar efectos del dropdown de búsqueda y categorías
function initSearchDropdownEffects() {
    const searchInput = document.querySelector('.search-input');
    const searchDropdown = document.querySelector('.search-dropdown');
    const categorySelect = document.querySelector('.category-select-custom');
    const categoryDropdown = document.querySelector('.category-dropdown-menu');
    
    // Efectos para el input de búsqueda
    if (searchInput && searchDropdown) {
        // Mostrar dropdown al hacer focus en el input
        searchInput.addEventListener('focus', (e) => {
            e.target.style.background = '#f8fafc';
            e.target.style.boxShadow = '0 0 0 3px rgba(220, 20, 60, 0.1)';
            e.target.style.transform = 'scale(1.01)';
            
            // Mostrar dropdown con animación
            searchDropdown.classList.add('active');
        });
        
        // Efecto smooth al escribir en el input
        searchInput.addEventListener('input', (e) => {
            const value = e.target.value;
            
            if (value.length > 0) {
                e.target.style.boxShadow = '0 0 0 3px rgba(220, 20, 60, 0.15)';
                e.target.style.transform = 'scale(1.01)';
                
                // Filtrar sugerencias basadas en el input
                filterSuggestions(value);
            } else {
                e.target.style.boxShadow = '0 0 0 3px rgba(220, 20, 60, 0.1)';
                e.target.style.transform = 'scale(1.01)';
                
                // Mostrar todas las sugerencias
                showAllSuggestions();
            }
        });
        
        // Manejar clics en sugerencias
        const suggestionItems = document.querySelectorAll('.suggestion-item');
        suggestionItems.forEach(item => {
            item.addEventListener('click', (e) => {
                const suggestionText = e.currentTarget.querySelector('span').textContent;
                searchInput.value = suggestionText;
                searchDropdown.classList.remove('active');
                
                // Efecto visual al seleccionar
                e.currentTarget.style.background = 'var(--crimson-light)';
                e.currentTarget.style.color = 'var(--sakura-white)';
                
                setTimeout(() => {
                    e.currentTarget.style.background = '';
                    e.currentTarget.style.color = '';
                }, 200);
                
                showElegantNotification(`Seleccionaste: "${suggestionText}"`, 'search');
            });
            
            // Efectos hover mejorados
            item.addEventListener('mouseenter', (e) => {
                e.currentTarget.style.background = '#f8fafc';
                e.currentTarget.style.transform = 'translateX(6px)';
                
                const icon = e.currentTarget.querySelector('i');
                if (icon) {
                    icon.style.transform = 'scale(1.2)';
                    icon.style.color = 'var(--crimson)';
                }
            });
            
            item.addEventListener('mouseleave', (e) => {
                e.currentTarget.style.background = '';
                e.currentTarget.style.transform = '';
                
                const icon = e.currentTarget.querySelector('i');
                if (icon) {
                    icon.style.transform = '';
                }
            });
        });
    }
    
    // Efectos para el dropdown de categorías
    if (categorySelect && categoryDropdown) {
        let selectedValue = '';
        
        // Mostrar/ocultar dropdown al hacer clic
        categorySelect.addEventListener('click', (e) => {
            e.stopPropagation();
            
            const isActive = categoryDropdown.classList.contains('active');
            
            // Cerrar todos los dropdowns abiertos
            document.querySelectorAll('.search-dropdown, .category-dropdown-menu').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
            
            if (!isActive) {
                categoryDropdown.classList.add('active');
                categorySelect.classList.add('active');
            } else {
                categorySelect.classList.remove('active');
            }
        });
        
        // Manejar clics en opciones de categoría
        const categoryOptions = document.querySelectorAll('.category-option');
        categoryOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.stopPropagation();
                
                const value = option.getAttribute('data-value');
                const text = option.querySelector('span').textContent;
                
                // Actualizar selección visual
                categoryOptions.forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
                
                // Actualizar texto seleccionado
                const selectedText = categorySelect.querySelector('.selected-category');
                selectedText.textContent = text;
                
                // Guardar valor seleccionado
                selectedValue = value;
                
                // Cerrar dropdown
                categoryDropdown.classList.remove('active');
                categorySelect.classList.remove('active');
                
                // Efecto visual al seleccionar
                option.style.background = 'var(--crimson-light)';
                option.style.color = 'var(--sakura-white)';
                
                setTimeout(() => {
                    option.style.background = '';
                    option.style.color = '';
                    if (!option.classList.contains('selected')) {
                        option.classList.remove('selected');
                    }
                }, 200);
                
                // Notificación
                showElegantNotification(`Categoría seleccionada: ${text}`, 'info');
            });
            
            // Efectos hover para opciones de categoría
            option.addEventListener('mouseenter', (e) => {
                if (!e.currentTarget.classList.contains('selected')) {
                    e.currentTarget.style.background = '#f8fafc';
                    e.currentTarget.style.transform = 'translateX(6px)';
                    
                    const icon = e.currentTarget.querySelector('i');
                    if (icon) {
                        icon.style.transform = 'scale(1.2)';
                        icon.style.color = 'var(--crimson)';
                    }
                }
            });
            
            option.addEventListener('mouseleave', (e) => {
                if (!e.currentTarget.classList.contains('selected')) {
                    e.currentTarget.style.background = '';
                    e.currentTarget.style.transform = '';
                    
                    const icon = e.currentTarget.querySelector('i');
                    if (icon) {
                        icon.style.transform = '';
                    }
                }
            });
        });
        
        // Función para obtener el valor seleccionado
        categorySelect.getValue = () => selectedValue;
    }
    
    // Cerrar dropdowns al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-input-container') && !e.target.closest('.category-dropdown')) {
            document.querySelectorAll('.search-dropdown, .category-dropdown-menu').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
            
            const categorySelect = document.querySelector('.category-select-custom');
            if (categorySelect) {
                categorySelect.classList.remove('active');
            }
            
            if (searchInput && searchInput.value.length === 0) {
                searchInput.style.background = 'transparent';
                searchInput.style.boxShadow = '';
                searchInput.style.transform = '';
            }
        }
    });
}

// Función para filtrar sugerencias
function filterSuggestions(searchTerm) {
    const suggestionItems = document.querySelectorAll('.suggestion-item');
    const lowerCaseSearch = searchTerm.toLowerCase();
    
    suggestionItems.forEach(item => {
        const text = item.querySelector('span').textContent.toLowerCase();
        
        if (text.includes(lowerCaseSearch)) {
            item.style.display = 'flex';
            item.style.animation = 'fadeInSuggestion 0.3s ease';
        } else {
            item.style.display = 'none';
        }
    });
}

// Función para mostrar todas las sugerencias
function showAllSuggestions() {
    const suggestionItems = document.querySelectorAll('.suggestion-item');
    
    suggestionItems.forEach((item, index) => {
        item.style.display = 'flex';
        item.style.animation = `fadeInSuggestion 0.3s ease ${index * 0.05}s`;
    });
}

// Función para manejar búsqueda minimalista mejorada
function handleSearch(event) {
    event.preventDefault();
    
    const searchInput = document.querySelector('.search-input');
    const categorySelect = document.querySelector('.category-select-custom');
    const searchTerm = searchInput.value.trim();
    const selectedCategory = categorySelect ? categorySelect.getValue() : '';
    
    if (searchTerm || selectedCategory) {
        let searchMessage = 'Buscando';
        if (searchTerm && selectedCategory) {
            searchMessage += `: "${searchTerm}" en ${getCategoryName(selectedCategory)}`;
        } else if (searchTerm) {
            searchMessage += `: "${searchTerm}"`;
        } else {
            searchMessage += ` en ${getCategoryName(selectedCategory)}`;
        }
        
        showElegantNotification(searchMessage, 'search');
        
        // Cerrar dropdowns después de buscar
        const searchDropdown = document.querySelector('.search-dropdown');
        const categoryDropdown = document.querySelector('.category-dropdown-menu');
        
        if (searchDropdown) {
            searchDropdown.classList.remove('active');
        }
        if (categoryDropdown) {
            categoryDropdown.classList.remove('active');
            categorySelect.classList.remove('active');
        }
        
        // Simular navegación a resultados
        setTimeout(() => {
            console.log('🔍 Navegando a resultados:', { searchTerm, selectedCategory });
        }, 1500);
    } else {
        showElegantNotification('Escribe algo para buscar o selecciona una categoría', 'info');
    }
}

// Función auxiliar para obtener nombre de categoría
function getCategoryName(categoryValue) {
    const categoryNames = {
        'traduccion': 'Traducción',
        'musica': 'Música',
        'diseno': 'Diseño Gráfico',
        'hogar': 'Hogar',
        'tecnologia': 'Programación',
        'construccion': 'Construcción',
        'educacion': 'Educación',
        'marketing': 'Marketing Digital',
        'fotografia': 'Fotografía'
    };
    return categoryNames[categoryValue] || 'Esta categoría';
}

// Sistema de notificaciones elegante
function showElegantNotification(message, type = 'info') {
    // Remover notificación existente
    const existing = document.querySelector('.elegant-notification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.className = 'elegant-notification';
    
    const icons = {
        search: 'fas fa-search',
        success: 'fas fa-check',
        info: 'fas fa-info-circle',
        error: 'fas fa-exclamation-triangle'
    };
    
    const colors = {
        search: 'var(--crimson)',
        success: 'var(--crimson-light)',
        info: 'var(--crimson)',
        error: '#ff6b6b'
    };
    
    notification.innerHTML = `
        <i class="${icons[type] || icons.info}"></i>
        <span>${message}</span>
    `;
    
    // Estilos elegantes
    Object.assign(notification.style, {
        position: 'fixed',
        top: '32px',
        right: '32px',
        background: 'var(--sakura-white)',
        color: colors[type],
        padding: '16px 24px',
        borderRadius: 'var(--border-radius-large)',
        boxShadow: 'var(--shadow-medium)',
        border: `1px solid var(--crimson-light)`,
        zIndex: '10000',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        fontSize: '0.9rem',
        fontWeight: '400',
        transform: 'translateX(120%)',
        transition: 'var(--transition-smooth)',
        backdropFilter: 'blur(10px)',
        maxWidth: '300px'
    });
    
    document.body.appendChild(notification);
    
    // Animación de entrada
    requestAnimationFrame(() => {
        notification.style.transform = 'translateX(0)';
    });
    
    // Auto-remover con animación suave
    setTimeout(() => {
        notification.style.transform = 'translateX(120%)';
        setTimeout(() => notification.remove(), 400);
    }, 3000);
}

// Manejo elegante de clics en categorías compactas
function handleCategoryClick(categoryName, categoryData = null) {
    showElegantNotification(`Explorando ${categoryName}`, 'search');
    
    // Animación suave al hacer clic en la card
    const categoryCards = document.querySelectorAll('.category-compact-card');
    categoryCards.forEach(card => {
        const cardText = card.querySelector('.card-text');
        if (cardText && cardText.textContent.replace(/\s+/g, ' ').trim() === categoryName.replace(/\s+/g, ' ').trim()) {
            // Efecto de pulsación
            card.style.transform = 'translateY(-2px) scale(0.98)';
            
            // Animar la imagen
            const image = card.querySelector('img');
            if (image) {
                image.style.transform = 'scale(1.1)';
            }
            
            setTimeout(() => {
                card.style.transform = 'translateY(-4px)';
                if (image) {
                    image.style.transform = 'scale(1.05)';
                }
            }, 150);
        }
    });
    
    // Simular navegación
    setTimeout(() => {
        console.log('📂 Navegando a categoría:', categoryName, categoryData);
    }, 800);
}

// Función para contactar proveedores (adaptada para nuevo diseño)
function contactProvider(providerName, serviceTitle) {
    showElegantNotification(`Conectando con ${providerName}`, 'success');
    
    // Simular envío de mensaje
    setTimeout(() => {
        console.log('💬 Mensaje enviado a:', providerName, 'para:', serviceTitle);
    }, 1000);
}

// Vista rápida de servicios (adaptada para nuevo diseño)
function quickViewService(serviceTitle) {
    showElegantNotification('Abriendo vista del servicio...', 'info');
    console.log('👁️ Vista del servicio:', serviceTitle);
}

// Vista de artículo de blog
function viewBlogPost(blogTitle) {
    showElegantNotification(`Abriendo artículo: ${blogTitle}`, 'info');
    console.log('📖 Vista del artículo:', blogTitle);
}

// Efectos suaves en tarjetas
function initCardInteractions() {
    // Efecto hover suave en servicios
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-12px) scale(1.01)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Efecto hover simple en categorías compactas
    const categoryCards = document.querySelectorAll('.category-compact-card');
    categoryCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const image = card.querySelector('img');
            if (image) {
                image.style.transform = 'scale(1.05)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const image = card.querySelector('img');
            if (image) {
                image.style.transform = 'scale(1)';
            }
        });
    });
    
    // Las imágenes de profesionales mantienen su animación continua
}

// Efectos específicos para cada categoría
function addCategoryHoverEffects(card) {
    const categoryData = card.getAttribute('data-category');
    
    switch (categoryData) {
        case 'diseno':
            const colorSwatches = card.querySelectorAll('.color-swatch');
            colorSwatches.forEach((swatch, index) => {
                setTimeout(() => {
                    swatch.style.transform = 'scale(1.2) rotate(180deg)';
                }, index * 100);
            });
            break;
            
        case 'tecnologia':
            const terminalCursor = card.querySelector('.terminal-cursor');
            if (terminalCursor) {
                terminalCursor.style.animation = 'blink 0.3s infinite';
            }
            break;
            
        case 'traduccion':
            const bubbles = card.querySelectorAll('.bubble');
            bubbles.forEach((bubble, index) => {
                setTimeout(() => {
                    bubble.style.transform = 'scale(1.1) translateY(-5px)';
                }, index * 150);
            });
            break;
            
        case 'musica':
            const notes = card.querySelectorAll('.note');
            notes.forEach((note, index) => {
                setTimeout(() => {
                    note.style.transform = 'translateY(-10px) scale(1.2)';
                    note.style.color = 'var(--crimson-light)';
                }, index * 200);
            });
            break;
            
        case 'marketing':
            const analyticsDotsContainer = card.querySelector('.analytics-dots');
            if (analyticsDotsContainer) {
                analyticsDotsContainer.style.animation = 'pulse 0.5s ease-in-out infinite';
            }
            break;
    }
}

// Remover efectos específicos
function removeCategoryHoverEffects(card) {
    const categoryData = card.getAttribute('data-category');
    
    switch (categoryData) {
        case 'diseno':
            const colorSwatches = card.querySelectorAll('.color-swatch');
            colorSwatches.forEach(swatch => {
                swatch.style.transform = '';
            });
            break;
            
        case 'tecnologia':
            const terminalCursor = card.querySelector('.terminal-cursor');
            if (terminalCursor) {
                terminalCursor.style.animation = 'blink 1s infinite';
            }
            break;
            
        case 'traduccion':
            const bubbles = card.querySelectorAll('.bubble');
            bubbles.forEach(bubble => {
                bubble.style.transform = '';
            });
            break;
            
        case 'musica':
            const notes = card.querySelectorAll('.note');
            notes.forEach(note => {
                note.style.transform = '';
                note.style.color = '';
            });
            break;
            
        case 'marketing':
            const analyticsDotsContainer = card.querySelector('.analytics-dots');
            if (analyticsDotsContainer) {
                analyticsDotsContainer.style.animation = '';
            }
            break;
    }
}

// Función para duplicar imágenes para animación continua
function setupInfiniteAnimation() {
    const columns = document.querySelectorAll('.professionals-column');
    
    columns.forEach(column => {
        const images = Array.from(column.children);
        
        // Duplicar imágenes para crear loop infinito
        images.forEach(image => {
            const clone = image.cloneNode(true);
            column.appendChild(clone);
        });
    });
}

// Manejo elegante de errores de imágenes
function handleImageFallbacks() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Determinar imagen de respaldo según contexto
            if (this.closest('.service-image')) {
                this.src = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=220&fit=crop';
                this.alt = 'Imagen del servicio no disponible';
            } else if (this.closest('.provider-avatar') || this.closest('.professional-avatar')) {
                this.src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face';
                this.alt = 'Avatar del profesional';
            } else {
                this.src = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=200&fit=crop';
                this.alt = 'Imagen no disponible';
            }
        });
        
        // Efecto de carga suave
        img.addEventListener('load', function() {
            this.style.opacity = '0';
            this.style.transition = 'opacity 0.6s ease';
            setTimeout(() => {
                this.style.opacity = '1';
            }, 50);
        });
    });
}

// Scroll suave para navegación interna
function enableSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Función para manejar interacciones táctiles en móviles
function setupMobileInteractions() {
    if ('ontouchstart' in window) {
        // Manejar toques en imágenes de profesionales
        const professionalImages = document.querySelectorAll('.professional-image');
        professionalImages.forEach(image => {
            image.addEventListener('touchstart', (e) => {
                e.preventDefault();
                // Solo efecto visual simple
                image.style.transform = 'scale(0.95)';
                
                // Restaurar después de un momento
                setTimeout(() => {
                    image.style.transform = '';
                }, 150);
            });
        });
        
        // Efectos táctiles para service cards modernas
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach(card => {
            card.addEventListener('touchstart', (e) => {
                card.style.transform = 'translateY(-4px)';
                
                const image = card.querySelector('.card-image-wrapper img');
                if (image) {
                    image.style.transform = 'scale(1.02)';
                }
            });
            
            card.addEventListener('touchend', (e) => {
                setTimeout(() => {
                    card.style.transform = '';
                    
                    const image = card.querySelector('.card-image-wrapper img');
                    if (image) {
                        image.style.transform = '';
                    }
                }, 150);
            });
        });

        // Efectos táctiles para blog cards simplificadas
        const blogCards = document.querySelectorAll('.blog-card');
        blogCards.forEach(card => {
            card.addEventListener('touchstart', (e) => {
                card.style.transform = 'translateY(-2px)';
                
                const image = card.querySelector('img');
                if (image) {
                    image.style.transform = 'scale(1.01)';
                }
            });
            
            card.addEventListener('touchend', (e) => {
                setTimeout(() => {
                    card.style.transform = '';
                    
                    const image = card.querySelector('img');
                    if (image) {
                        image.style.transform = '';
                    }
                }, 150);
            });
        });

        // Efectos táctiles simples para categorías compactas
        const categoryCards = document.querySelectorAll('.category-compact-card');
        categoryCards.forEach(card => {
            card.addEventListener('touchstart', (e) => {
                card.style.transform = 'translateY(-2px)';
                
                const image = card.querySelector('img');
                if (image) {
                    image.style.transform = 'scale(1.02)';
                }
            });
            
            card.addEventListener('touchend', (e) => {
                setTimeout(() => {
                    card.style.transform = '';
                    
                    const image = card.querySelector('img');
                    if (image) {
                        image.style.transform = '';
                    }
                }, 150);
            });
        });
    }
}

// Configuración de eventos principales
function setupEventListeners() {
    // Formulario de búsqueda
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', handleSearch);
    }
    
    // Inicializar efectos del dropdown de búsqueda y categorías
    initSearchDropdownEffects();
    
    // Botones y elementos interactivos
    document.addEventListener('click', (e) => {
        // Clics en service cards (nuevo diseño)
        if (e.target.closest('.service-card') && !e.target.closest('.heart-icon')) {
            const serviceCard = e.target.closest('.service-card');
            const providerName = serviceCard.querySelector('.author-name').textContent;
            const serviceTitle = serviceCard.querySelector('.title').textContent;
            quickViewService(serviceTitle);
        }
        
        // Clics en blog cards simplificadas
        if (e.target.closest('.blog-card')) {
            const blogCard = e.target.closest('.blog-card');
            const blogTitle = blogCard.querySelector('.blog-title').textContent;
            viewBlogPost(blogTitle);
        }
        
        // Categorías compactas
        if (e.target.closest('.category-compact-card')) {
            const categoryCard = e.target.closest('.category-compact-card');
            const categoryName = categoryCard.querySelector('.card-text').textContent.replace(/\s+/g, ' ').trim();
            const categoryData = categoryCard.getAttribute('data-category');
            handleCategoryClick(categoryName, categoryData);
        }
        
        // Botones CTA
        if (e.target.closest('.cta-actions .btn')) {
            const isStartBtn = e.target.textContent.includes('ahora') || e.target.textContent.includes('vender');
            const action = isStartBtn ? 'Registro de proveedor' : 'Información para proveedores';
            showElegantNotification(`Navegando a: ${action}`, 'info');
        }
        
        // Botón "Ver todos los servicios"
        if (e.target.closest('.section-action .btn')) {
            const buttonText = e.target.textContent.toLowerCase();
            if (buttonText.includes('servicios')) {
                showElegantNotification('Navegando a todos los servicios...', 'info');
            } else if (buttonText.includes('artículos') || buttonText.includes('blog')) {
                showElegantNotification('Navegando a todos los artículos...', 'info');
            }
        }
    });
}

// Función de inicialización principal
function initSukiwo() {
    console.log('🚀 Inicializando Sukiwo con diseño limpio, fondos blancos y blog simplificado...');
    
    // Activar observador de elementos
    observeElements();
    
    // Configurar eventos
    setupEventListeners();
    
    // Inicializar efectos visuales
    initCardInteractions();
    handleImageFallbacks();
    enableSmoothScrolling();
    setupMobileInteractions();
    
    // Configurar animación infinita de profesionales
    setupInfiniteAnimation();
    
    // Animación de entrada inicial
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero .fade-in');
        heroElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('active');
            }, index * 200);
        });
    }, 300);
    
    console.log('✨ Sukiwo listo - Diseño limpio con fondos blancos y blog simplificado activado');
}

// CSS para animaciones adicionales
const additionalStyles = `
    @keyframes fadeInSuggestion {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .suggestion-item,
    .category-option {
        animation: fadeInSuggestion 0.3s ease;
    }
`;

// Inyectar estilos adicionales
function injectAdditionalStyles() {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = additionalStyles;
    document.head.appendChild(styleSheet);
}

// Función de utilidad para debugging elegante
function debugLog(message, data = null) {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        const style = 'color: #DC143C; font-weight: 500; font-size: 12px;';
        console.log(`%c🌸 [Sukiwo] ${message}`, style, data || '');
    }
}

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    injectAdditionalStyles();
    initSukiwo();
});

// Manejar redimensionado de ventana
window.addEventListener('resize', () => {
    // Reajustar animaciones si es necesario
    debugLog('Ventana redimensionada, reajustando elementos');
    
    // Cerrar dropdown si está abierto en resize
    const searchDropdown = document.querySelector('.search-dropdown');
    if (searchDropdown && searchDropdown.classList.contains('active')) {
        searchDropdown.classList.remove('active');
    }
});

// Manejar cambio de visibilidad de la página
document.addEventListener('visibilitychange', () => {
    const columns = document.querySelectorAll('.professionals-column');
    
    if (document.hidden) {
        // Pausar animaciones cuando la página no es visible
        columns.forEach(column => {
            column.style.animationPlayState = 'paused';
        });
    } else {
        // Reanudar animaciones cuando la página vuelve a ser visible
        columns.forEach(column => {
            column.style.animationPlayState = 'running';
        });
    }
});

// Mensaje de bienvenida moderno actualizado
console.log(`
🚀 Sukiwo - Marketplace Moderno
⚪ Diseño limpio y minimalista con fondos blancos
🔴 Paleta carmesí con degradado naranja-coral
✨ Animaciones fluidas y efectos smooth
🎯 Categorías compactas con imágenes curvadas
💳 Servicios recientes con diseño moderno
📖 Blog simplificado estilo news cards

🎯 Bienvenido a la experiencia Sukiwo

🌟 Características actualizadas:
   • Todos los fondos cambiados a blanco puro
   • Hero section con hover blanco en imágenes
   • Categorías compactas sin sombras rojas
   • Servicios recientes con diseño card limpio
   • Blog cards simplificadas: imagen + metadata + título
   • Sin bordes, sin sombras complejas
   • Efectos hover suaves y elegantes
   • Responsive design optimizado

🎨 Blog cards incluyen:
   • Imágenes 16:9 con border-radius simple
   • Metadata con categoría azul + fecha
   • Títulos grandes y legibles
   • Hover effects minimalistas
   • Layout flexbox responsive
   • Touch gestures para móviles
`);

// Exportar funciones para testing (si es necesario)
if (typeof window !== 'undefined') {
    window.SukiwoDebug = {
        showNotification: showElegantNotification,
        handleSearch,
        handleCategoryClick,
        filterSuggestions,
        debugLog
    };
}