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