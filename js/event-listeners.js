// event-listeners.js
import { addToCart, clearCart } from './cart.js';
import { openAuthModal, closeAuthModal, closeAuthButton } from './auth.js';
import { closeMobileMenu } from './mobile-menu.js';

// DOM Elements
const cartButton = document.getElementById('cartButton');
const closeCart = document.getElementById('closeCart');
const loginButton = document.getElementById('loginButton');
const mobileLoginButton = document.getElementById('mobileLoginButton');
const mobileCartButton = document.getElementById('mobileCartButton');
const addToCartButtons = document.querySelectorAll('.product-card__button');
const checkoutButton = document.querySelector('.cart__checkout');
const clossButton = document.getElementById('clossAuth');

// Set up all event listeners
export function setupGlobalEventListeners() {
    // Cart functionality
    if (cartButton) {
        cartButton.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('cartModal').classList.add('modal--active');
        });
    }

    if (mobileCartButton) {
        mobileCartButton.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('cartModal').classList.add('modal--active');
            closeMobileMenu();
        });
    }

    if (closeCart) {
        closeCart.addEventListener('click', function() {
            document.getElementById('cartModal').classList.remove('modal--active');
        });
    }

    // Auth functionality
    if (loginButton) {
        loginButton.addEventListener('click', function(e) {
            e.preventDefault();
            openAuthModal();
        });
    }

    if (mobileLoginButton) {
        mobileLoginButton.addEventListener('click', function(e) {
            e.preventDefault();
            openAuthModal();
            closeMobileMenu();
        });
    }

    // Add to cart buttons
    if (addToCartButtons.length > 0) {
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                const name = this.getAttribute('data-name');
                const price = parseInt(this.getAttribute('data-price'));
                
                addToCart(id, name, price);
                
                // Show cart modal
                document.getElementById('cartModal').classList.add('modal--active');
            });
        });
    }

    // Close modals when clicking outside
    document.addEventListener('click', function(e) {
        const cartModal = document.getElementById('cartModal');
        const authModal = document.getElementById('authModal');
        //const exitbutton = document.getElementById('clossButton');
        
        if (e.target === cartModal) {
            cartModal.classList.remove('modal--active');
        }

        
        if (e.target === authModal) {
            closeAuthModal();
        }

        if (e.target === clossButton) {
            closeAuthButton();
        } 
    }
);

    // Checkout button
    if (checkoutButton) {
        checkoutButton.addEventListener('click', function() {
            const cart = JSON.parse(localStorage.getItem('pizzaCart') || '[]');
            
            if (cart.length === 0) {
                alert('Корзина пуста!');
                return;
            }
            
            alert('Заказ оформлен! Спасибо за покупку!');
            clearCart();
            document.getElementById('cartModal').classList.remove('modal--active');
        });
    }
}