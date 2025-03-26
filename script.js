// JavaScript pour le menu déroulant
function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('active');
}

// Fermer le menu si on clique en dehors
window.onclick = function(event) {
    const menu = document.getElementById('menu');
    if (!event.target.matches('.menu-button')) {
        if (menu.classList.contains('active')) {
            menu.classList.remove('active');
        }
    }
};

// JavaScript pour le slider
const slides = document.querySelectorAll('.slide');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
let currentSlide = 0;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
}

prevButton.addEventListener('click', () => {
    currentSlide = (currentSlide > 0) ? currentSlide - 1 : slides.length - 1;
    showSlide(currentSlide);
});

nextButton.addEventListener('click', () => {
    currentSlide = (currentSlide < slides.length - 1) ? currentSlide + 1 : 0;
    showSlide(currentSlide);
});

// Afficher le premier slide au chargement
showSlide(currentSlide);

// Désactiver le clic droit sur la page
document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
});

// Désactiver les raccourcis clavier (Ctrl+S, Ctrl+Shift+I, etc.)
document.addEventListener('keydown', function (e) {
    // Empêcher Ctrl+S (enregistrer)
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
    }
    // Empêcher Ctrl+Shift+I (outils de développement)
    if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        e.preventDefault();
    }
    // Empêcher Ctrl+U (afficher le code source)
    if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
    }
});

// Bloque le clic droit et le drag sur toutes les vidéos
document.querySelectorAll('video').forEach(video => {
  video.addEventListener('contextmenu', e => e.preventDefault());
  video.addEventListener('dragstart', e => e.preventDefault());
});

// Bloquer F12 et PrintScreen
document.addEventListener('keydown', function(e) {
  if (e.key === 'F12' || e.key === 'PrintScreen') {
    alert('Action interdite');
    e.preventDefault();
  }
});

// Pause vidéo si l'onglet est inactif (anti OBS / capture)
document.addEventListener('visibilitychange', function() {
  const video = document.querySelector('video');
  if (video) {
    if (document.hidden) {
      video.pause();
    } else {
      video.play();
    }
  }
});

// Ajout de la fonctionnalité de swipe pour le slider
let touchStartX = 0;
let touchEndX = 0;

const slider = document.querySelector('.slider');

slider.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
});

slider.addEventListener('touchmove', (e) => {
    touchEndX = e.touches[0].clientX;
});

slider.addEventListener('touchend', () => {
    const swipeDistance = touchEndX - touchStartX;

    // Si la distance de swipe est suffisante (par exemple, 50 pixels)
    if (Math.abs(swipeDistance) > 50) {
        if (swipeDistance > 0) {
            // Swipe vers la droite : slide précédente
            currentSlide = (currentSlide > 0) ? currentSlide - 1 : slides.length - 1;
        } else {
            // Swipe vers la gauche : slide suivante
            currentSlide = (currentSlide < slides.length - 1) ? currentSlide + 1 : 0;
        }
        showSlide(currentSlide);
    }
});

// Générer les points indicateurs
const sliderDots = document.querySelector('.slider-dots');

slides.forEach((slide, index) => {
    const dot = document.createElement('div');
    dot.classList.add('slider-dot');
    if (index === 0) dot.classList.add('active'); // Activer le premier point
    dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
    });
    sliderDots.appendChild(dot);
});

// Fonction pour mettre à jour les points indicateurs
function updateDots(index) {
    const dots = document.querySelectorAll('.slider-dot');
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

// Modifier la fonction showSlide pour inclure la mise à jour des points
function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
    updateDots(index); // Mettre à jour les points indicateurs
}