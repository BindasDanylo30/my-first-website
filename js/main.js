// main.js
import { initCart } from './cart.js';
import { initAuth } from './auth.js';
import { initMobileMenu } from './mobile-menu.js';
import { setupGlobalEventListeners } from './event-listeners.js';

// Initialize the application
function init() {
    // Add event listeners
    setupGlobalEventListeners();
    
    // Initialize modules
    initCart();
    initAuth();
    initMobileMenu();
    
    console.log('Приложение инициализировано');
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);