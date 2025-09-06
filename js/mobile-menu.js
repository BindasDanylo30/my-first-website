// mobile-menu.js
// DOM Elements
const menuToggle = document.getElementById('menuToggle');
const menuClose = document.getElementById('menuClose');
const mobileMenu = document.getElementById('mobileMenu');
const exitbutton = document.getElementById('closeCart');

// Initialize mobile menu
export function initMobileMenu() {
    // Mobile menu toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.add('mobile-menu--active');
        });
    }

    if (menuClose) {
        menuClose.addEventListener('click', function() {
            mobileMenu.classList.remove('mobile-menu--active');
        });
    }
}

// Open mobile menu
export function openMobileMenu() {
    if (mobileMenu) {
        mobileMenu.classList.add('mobile-menu--active');
    }
}

// Close mobile menu
export function closeMobileMenu() {
    if (mobileMenu) {
        mobileMenu.classList.remove('mobile-menu--active');
    }
}
