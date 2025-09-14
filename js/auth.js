// auth.js
// DOM Elements
const authModal = document.getElementById('authModal');
const authTabs = document.querySelectorAll('.auth__tab');

const clossButton = document.getElementById('closeAuth');
// Initialize auth module
export function initAuth() {
    // Auth tabs functionality
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
}

// Open auth modal
export function openAuthModal() {
    if (authModal) {
        authModal.classList.add('modal--active');
    }
}

// Close auth modal
export function closeAuthModal() {
    if (authModal) {
        authModal.classList.remove('modal--active');
    }
    if (clossButton) {
        authModal.classList.remove('modal--active');
    }
}
export function closeAuthButton() {
    if (clossButton) {
        authModal.classList.remove('modal--active');
    }
}


