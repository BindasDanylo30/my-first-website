// Cart functionality
let cart = [];

// DOM Elements
const cartButton = document.getElementById('cartButton');
const cartModal = document.getElementById('cartModal');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartCounts = document.querySelectorAll('.header__cart-count');

// Auth functionality
const loginButton = document.getElementById('loginButton');
const authModal = document.getElementById('authModal');
const closeAuth = document.getElementById('closeAuth');
const authTabs = document.querySelectorAll('.auth__tab');

// Mobile menu
const menuToggle = document.getElementById('menuToggle');
const menuClose = document.getElementById('menuClose');
const mobileMenu = document.getElementById('mobileMenu');

// Add to cart buttons
const addToCartButtons = document.querySelectorAll('.product-card__button');

// Mobile buttons
const mobileLoginButton = document.getElementById('mobileLoginButton');
const mobileCartButton = document.getElementById('mobileCartButton');

// Update cart
function updateCart() {
    // Update cart count
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCounts.forEach(count => {
        count.textContent = totalItems;
    });
    
    // Update cart items
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="cart__empty">Корзина пуста</div>';
    } else {
        cartItems.innerHTML = '';
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart__item';
            cartItem.innerHTML = `
                <div class="cart__item-details">
                    <div class="cart__item-name">${item.name}</div>
                    <div class="cart__item-price">${item.price} ₽</div>
                </div>
                <div class="cart__item-controls">
                    <button class="cart__item-button" data-id="${item.id}" data-action="decrease">-</button>
                    <span class="cart__item-quantity">${item.quantity}</span>
                    <button class="cart__item-button" data-id="${item.id}" data-action="increase">+</button>
                </div>
            `;
            cartItems.appendChild(cartItem);
        });
    }
    
    // Update total
    const total = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    cartTotal.textContent = `${total} ₽`;
    
    // Add event listeners to cart controls
    document.querySelectorAll('.cart__item-button').forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            const action = this.getAttribute('data-action');
            updateCartItem(id, action);
        });
    });
    
    // Save to localStorage
    localStorage.setItem('pizzaCart', JSON.stringify(cart));
}

// Update cart item
function updateCartItem(id, action) {
    const item = cart.find(item => item.id == id);
    
    if (item) {
        if (action === 'increase') {
            item.quantity++;
        } else if (action === 'decrease') {
            item.quantity--;
            if (item.quantity === 0) {
                cart = cart.filter(i => i.id != id);
            }
        }
    }
    
    updateCart();
}

// Add to cart
function addToCart(id, name, price) {
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id,
            name,
            price,
            quantity: 1
        });
    }
    
    updateCart();
}

// Initialize the application
function init() {
    // Add event listeners
    setupEventListeners();
    
    // Load cart from localStorage if available
    const savedCart = localStorage.getItem('pizzaCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
}

// Set up all event listeners
function setupEventListeners() {
    // Cart functionality
    if (cartButton) {
        cartButton.addEventListener('click', function(e) {
            e.preventDefault();
            cartModal.classList.add('modal--active');
        });
    }

    if (mobileCartButton) {
        mobileCartButton.addEventListener('click', function(e) {
            e.preventDefault();
            cartModal.classList.add('modal--active');
            mobileMenu.classList.remove('mobile-menu--active');
        });
    }

    if (closeCart) {
        closeCart.addEventListener('click', function() {
            cartModal.classList.remove('modal--active');
        });
    }

    // Auth functionality
    if (loginButton) {
        loginButton.addEventListener('click', function(e) {
            e.preventDefault();
            authModal.classList.add('modal--active');
        });
    }

    if (mobileLoginButton) {
        mobileLoginButton.addEventListener('click', function(e) {
            e.preventDefault();
            authModal.classList.add('modal--active');
            mobileMenu.classList.remove('mobile-menu--active');
        });
    }

    if (closeAuth) {
        closeAuth.addEventListener('click', function() {
            authModal.classList.remove('modal--active');
        });
    }

    // Auth tabs
    if (authTabs.length > 0) {
        authTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const tabName = this.getAttribute('data-tab');
                
                // Update active tab
                authTabs.forEach(t => t.classList.remove('auth__tab--active'));
                this.classList.add('auth__tab--active');
                
                // Show active form
                document.querySelectorAll('.auth__form').forEach(form => {
                    form.classList.remove('auth__form--active');
                });
                
                const activeForm = document.getElementById(`${tabName}Form`);
                if (activeForm) {
                    activeForm.classList.add('auth__form--active');
                }
            });
        });
    }

    // Mobile menu
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

    // Add to cart buttons
    if (addToCartButtons.length > 0) {
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                const name = this.getAttribute('data-name');
                const price = parseInt(this.getAttribute('data-price'));
                
                addToCart(id, name, price);
                
                // Show cart modal
                cartModal.classList.add('modal--active');
            });
        });
    }

    // Close modals when clicking outside
    document.addEventListener('click', function(e) {
        if (e.target === cartModal) {
            cartModal.classList.remove('modal--active');
        }
        if (e.target === authModal) {
            authModal.classList.remove('modal--active');
        }
    });

    // Form submissions
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Вход выполнен успешно!');
            authModal.classList.remove('modal--active');
        });
    }

    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Регистрация выполнена успешно!');
            authModal.classList.remove('modal--active');
        });
    }

    // Checkout button
    const checkoutButton = document.querySelector('.cart__checkout');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', function() {
            if (cart.length === 0) {
                alert('Корзина пуста!');
                return;
            }
            
            alert('Заказ оформлен! Спасибо за покупку!');
            cart = [];
            updateCart();
            cartModal.classList.remove('modal--active');
        });
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);