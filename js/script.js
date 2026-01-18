// Datos del portafolio
const portfolioData = {
    galleryImages: [
        {
            // RUTA DE IMAGENES: img 
            src: "img/galeria.gif",
            alt: "modelado 3D wi"
        },
        {
            src: "img/galeria1.png",
            alt: "ideas 3D wi wi"
        },
        {
            src: "img/galeria2.jpg",
            alt: "logo wi 3D"
        },
        {
            // Si necesitas más imágenes, súbelas a la carpeta img/
            // y agrégalas aquí
            src: "img/imagen.jpg", //  Ejmplo Cambia esto por tu imagen
            alt: "Fanart de amigs"
        },
        {
            src: "img/imagen1.png", // Cambia esto por tu imagen
            alt: "arte casual"
        },
        {
            src: "img/imagen2.png", // Cambia esto por tu imagen
            alt: "Foto blender xd"
        }
    ]
};

// Verificar si es dispositivo móvil
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// Elementos del DOM - verificación segura
function getElement(id) {
    const element = document.getElementById(id);
    if (!element) {
        console.warn(`Elemento con ID "${id}" no encontrado`);
    }
    return element;
}

// Actualizar estadísticas
function updateStats() {
    const statValues = document.querySelectorAll('.stat-value');
    
    statValues.forEach((value, index) => {
        value.style.animation = 'none';
        void value.offsetWidth; // Trigger reflow
        value.style.animation = 'colorChange 4s infinite alternate';
        value.style.animationDelay = `${index * 1}s`;
    });
}

// Actualizar fecha
function updateDateTime() {
    try {
        const now = new Date();
        const options = { 
            weekday: 'short',
            day: '2-digit', 
            month: 'short',
            year: 'numeric'
        };
        const formattedDate = now.toLocaleDateString('es-ES', options);
        
        const currentDateElement = getElement('current-date');
        if (currentDateElement) {
            currentDateElement.textContent = formattedDate.toUpperCase();
        }
        
        const footerYearElement = getElement('footer-year');
        if (footerYearElement) {
            footerYearElement.textContent = now.getFullYear();
        }
    } catch (error) {
        console.error('Error actualizando fecha:', error);
    }
}

// Cargar galería
function loadGallery() {
    const galleryElement = getElement('gallery');
    if (!galleryElement || !portfolioData.galleryImages) return;
    
    try {
        galleryElement.innerHTML = '';
        const imagesToShow = portfolioData.galleryImages.slice(0, 6);
        
        imagesToShow.forEach((imgData, index) => {
            const mosaicItem = document.createElement('div');
            mosaicItem.className = 'mosaic-item';
            mosaicItem.tabIndex = 0;
            mosaicItem.setAttribute('role', 'button');
            mosaicItem.setAttribute('aria-label', `Ver imagen ${index + 1}: ${imgData.alt}`);
            mosaicItem.style.animationDelay = `${index * 0.1}s`;
            
            const img = document.createElement('img');
            img.src = imgData.src;
            img.alt = imgData.alt;
            img.className = 'mosaic-img';
            img.loading = 'lazy';
            img.width = 300;
            img.height = 300;
            
            img.onerror = function() {
                this.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><rect width="400" height="400" fill="%231a1a2e"/><text x="200" y="200" font-family="Arial" font-size="20" fill="%23ffffff" text-anchor="middle" dominant-baseline="middle">Imagen ' + (index + 1) + '</text></svg>';
            };
            
            mosaicItem.addEventListener('click', (e) => {
                e.preventDefault();
                openImageModal(imgData.src, imgData.alt);
            });
            
            mosaicItem.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openImageModal(imgData.src, imgData.alt);
                }
            });
            
            mosaicItem.appendChild(img);
            galleryElement.appendChild(mosaicItem);
        });
    } catch (error) {
        console.error('Error cargando galería:', error);
    }
}

// Abrir modal de imagen
function openImageModal(src, alt) {
    try {
        const modalImage = getElement('modalImage');
        const imageModal = getElement('imageModal');
        const modalTitle = getElement('modalTitle');
        
        if (!modalImage || !imageModal) return;
        
        modalImage.src = src;
        modalImage.alt = alt;
        if (modalTitle) modalTitle.textContent = alt;
        
        imageModal.classList.add('active');
        imageModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        
        if (isMobile) {
            document.body.style.position = 'fixed';
        }
    } catch (error) {
        console.error('Error abriendo modal:', error);
    }
}

// Cerrar modal de imagen
function closeImageModal() {
    try {
        const imageModal = getElement('imageModal');
        if (!imageModal) return;
        
        imageModal.classList.remove('active');
        imageModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = 'auto';
        
        if (isMobile) {
            document.body.style.position = 'static';
        }
    } catch (error) {
        console.error('Error cerrando modal:', error);
    }
}

// Efectos para widgets
function initWidgetEffects() {
    const widgets = document.querySelectorAll('.widget');
    
    widgets.forEach(widget => {
        widget.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        widget.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });
}

// Efectos táctiles para móviles
function initTouchEffects() {
    if (!isMobile) return;
    
    const interactiveElements = document.querySelectorAll('.widget, .mosaic-item, .stat-item, .social-widget');
    
    interactiveElements.forEach(element => {
        element.addEventListener('touchstart', () => {
            element.style.transition = 'transform 0.15s ease';
        });
        
        element.addEventListener('touchend', () => {
            setTimeout(() => {
                element.style.transform = '';
            }, 150);
        });
    });
}

// Prevenir zoom en doble toque
function preventDoubleTapZoom() {
    if (!isMobile) return;
    
    let lastTouchEnd = 0;
    
    document.addEventListener('touchend', (event) => {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, { passive: false });
}

// Efecto parallax optimizado
function initParallaxEffect() {
    if (isMobile) return;
    
    let ticking = false;
    
    document.addEventListener('mousemove', (e) => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const x = (e.clientX / window.innerWidth) * 100;
                const y = (e.clientY / window.innerHeight) * 100;
                
                const backgroundEffects = document.querySelector('.background-effects');
                if (backgroundEffects) {
                    backgroundEffects.style.backgroundPosition = `${x}% ${y}%`;
                }
                ticking = false;
            });
            ticking = true;
        }
    });
}

// Manejar eventos de teclado
function initKeyboardEvents() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeImageModal();
        }
    });
}

// Animar entrada de widgets
function animateWidgetsEntry() {
    const widgets = document.querySelectorAll('.widget');
    
    widgets.forEach((widget, index) => {
        widget.style.opacity = '0';
        widget.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            widget.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            widget.style.opacity = '1';
            widget.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Inicializar aplicación
function initializeApp() {
    try {
        console.log('🚀 Inicializando aplicación...');
        
        updateStats();
        updateDateTime();
        loadGallery();
        initWidgetEffects();
        initTouchEffects();
        preventDoubleTapZoom();
        initParallaxEffect();
        initKeyboardEvents();
        
        const closeModalButton = getElement('closeModal');
        const imageModal = getElement('imageModal');
        
        if (closeModalButton) {
            closeModalButton.addEventListener('click', closeImageModal);
        }
        
        if (imageModal) {
            imageModal.addEventListener('click', (e) => {
                if (e.target === imageModal) {
                    closeImageModal();
                }
            });
        }
        
        setInterval(updateDateTime, 60000);
        
        setTimeout(() => {
            document.body.style.opacity = '1';
            animateWidgetsEntry();
        }, 100);
        
        console.log('✅ Aplicación inicializada correctamente');
    } catch (error) {
        console.error('❌ Error inicializando aplicación:', error);
    }
}

// Manejar redimensionamiento
let resizeTimeout;
function handleResize() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        loadGallery();
        updateStats();
    }, 250);
}

// Configurar event listeners
function setupEventListeners() {
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', () => {
        setTimeout(() => {
            loadGallery();
            updateStats();
        }, 300);
    });
}

// Inicializar cuando esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setupEventListeners();
        initializeApp();
    });
} else {
    setupEventListeners();
    initializeApp();
}