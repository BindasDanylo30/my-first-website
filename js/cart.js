// cart.js
let cart = [];

// DOM Elements
const cartModal = document.getElementById('cartModal');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartCounts = document.querySelectorAll('.header__cart-count');

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
export function addToCart(id, name, price) {
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

// Initialize cart module
export function initCart() {
    // Load cart from localStorage if available
    const savedCart = localStorage.getItem('pizzaCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
}

// Get cart items (for other modules if needed)
export function getCart() {
    return cart;
}

// Clear cart (for checkout)
export function clearCart() {
    cart = [];
    updateCart();
}