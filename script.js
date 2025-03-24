


// Session variables
let loggedIn = false;
let rememberMe = false;


// Alert functions
const alertTimeoutDuration = 3000;
let alertTimeout;

function showAlert(message, type = 'info') {
    const alertBox = document.getElementById('alertBox');
    const alertMessage = document.getElementById('alertMessage');
    const alertIcon = document.getElementById('alertIcon');

    // Clear existing alert timeout
    if (alertTimeout) {
        clearTimeout(alertTimeout);
    }

    // Set icon and colour based on alert type
    let iconClass = '';
    let iconColor = '';

    switch (type) {
        case 'success':
            iconClass = 'fa-check-circle';
            iconColor = 'text-green-600';
            break;
        case 'error':
            iconClass = 'fa-exclamation-circle';
            iconColor = 'text-red-600';
            break;
        case 'warning':
            iconClass = 'fa-exclamation-triangle';
            iconColor = 'text-yellow-600';
            break;
        default:
            iconClass = 'fa-info-circle';
            iconColor = 'text-blue-600';
            break;
    }

    alertIcon.innerHTML = `<i class="fas ${iconClass} ${iconColor} text-xl"></i>`;
    alertMessage.textContent = message;
    alertBox.classList.remove('hidden');

    // Auto-hide after 5 seconds
    alertTimeout = setTimeout(hideAlert, alertTimeoutDuration);
}

function hideAlert() {
    const alertBox = document.getElementById('alertBox');
    alertBox.classList.add('hidden');
}

// Update UI function
function updateUI() {
    const mainContent = document.getElementById('mainContent');
    const loginContent = document.getElementById('loginContent');
    const registerContent = document.getElementById('registerContent');
    const forgotPasswordContent = document.getElementById('forgotPasswordContent');
    const navButtons = document.getElementById('navButtons');
    const profileDegree = document.getElementById('profileDegree');

    if (loggedIn) {
        // Show main social media content
        loginContent.classList.add('hidden');
        registerContent.classList.add('hidden');
        forgotPasswordContent.classList.add('hidden');
        mainContent.classList.remove('hidden');

        // Update profile degree
        if (profileDegree) {
            //profileDegree.textContent = userDegree;
        }

        // Render posts and events
        //displayPosts();
        //renderEvents();

        navButtons.innerHTML = `
            <button class="bg-white text-blue-600 px-4 py-2 rounded-full hover:bg-blue-50">Profile</button>
            <button class="border border-white px-4 py-2 rounded-full hover:bg-blue-700" onclick="logout()">Logout</button>
        `;
    } else {
        // Hide main content and show login page
        mainContent.classList.add('hidden');

        navButtons.innerHTML = `
            <button class="bg-white text-blue-600 px-4 py-2 rounded-full hover:bg-blue-50" onclick="showLoginForm()">Sign In</button>
            <button class="border border-white px-4 py-2 rounded-full hover:bg-blue-700" onclick="showRegisterForm()">Sign Up</button>
        `;

        showLoginForm();
    }
}

// Show login form function
function showLoginForm() {
    clearAllErrors();
    const registerContent = document.getElementById('registerContent');
    const forgotPasswordContent = document.getElementById('forgotPasswordContent');
    const loginContent = document.getElementById('loginContent');

    registerContent.classList.add('hidden');
    forgotPasswordContent.classList.add('hidden');
    loginContent.classList.remove('hidden');
}

// Login function
function login() {
    clearAllErrors();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const rememberMeChecked = document.getElementById('rememberMe').checked;
    let invalidInput = false;

    // Input validation
    if (!email) {
        setInputError('loginEmail', 'loginEmailError', 'Please enter your email address');
        invalidInput = true;
    }

    if (!password) {
        setInputError('loginPassword', 'loginPasswordError', 'Please enter your password');
        invalidInput = true;
    }

    if (invalidInput) return;

    // Use API here in the future
    loggedIn = true;

    if (rememberMeChecked) {
        rememberMe = true;
    }

    showAlert('Successfully logged in!', 'success');
    updateUI();
}

// Logout function
function logout() {
    loggedIn = false;
    
    showAlert('Successfully logged out', 'info');
    
    updateUI();
    
    showLoginForm();
}

// Show forgot password form function
function showForgotPasswordForm() {
    clearAllErrors();
    const loginContent = document.getElementById('loginContent');
    const forgotPasswordContent = document.getElementById('forgotPasswordContent');

    loginContent.classList.add('hidden');
    forgotPasswordContent.classList.remove('hidden');
}

// Send reset password email function
function sentResetPasswordEmail() {
    clearAllErrors();
    const email = document.getElementById('resetEmail').value;

    // Basic validation
    if (!email) {
        setInputError('resetEmail', 'resetEmailError', 'Please enter your email address');
        return;
    }

    if (!isValidEmail(email)) {
        setInputError('resetEmail', 'resetEmailError', 'Please enter a valid email address');
        return;
    }

    // Here you would typically make an API call to send the reset email
    showAlert('Password reset instructions have been sent to your email address.', 'success');
    showLogin();
}

// Show register form function
function showRegisterForm() {
    clearAllErrors();
    const loginContent = document.getElementById('loginContent');
    const forgotPasswordContent = document.getElementById('forgotPasswordContent');
    const registerContent = document.getElementById('registerContent');

    loginContent.classList.add('hidden');
    forgotPasswordContent.classList.add('hidden');
    registerContent.classList.remove('hidden');
}

// Valid email check function
function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

// Register function
function register() {
    clearAllErrors();
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('registerEmail').value;
    const degree = document.getElementById('degree').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const tosChecked = document.getElementById('tosCheckbox').checked;

    let invalidInput = false;

    // Basic validation
    if (!firstName) {
        setInputError('firstName', 'firstNameError', 'Please enter your first name');
        invalidInput = true;
    }

    if (!lastName) {
        setInputError('lastName', 'lastNameError', 'Please enter your last name');
        invalidInput = true;
    }

    const emailExtension = email.split('@')[1];

    if (!email) {
        setInputError('registerEmail', 'registerEmailError', 'Please enter your email address');
        invalidInput = true;
    } else if (!isValidEmail(email)) {
        setInputError('registerEmail', 'registerEmailError', 'Please enter a valid email address');
        invalidInput = true;
    } else if (emailExtension && !emailExtension.includes('.edu.')) {
        setInputError('registerEmail', 'registerEmailError', 'Please use your uni email address');
        invalidInput = true;
    }

    if (!degree) {
        setInputError('degree', 'degreeError', 'Please enter your degree');
        invalidInput = true;
    }

    if (!password) {
        setInputError('registerPassword', 'registerPasswordError', 'Please enter a password');
        invalidInput = true;
    }

    if (!confirmPassword) {
        setInputError('confirmPassword', 'confirmPasswordError', 'Please confirm your password');
        invalidInput = true;
    } else if (password !== confirmPassword) {
        setInputError('confirmPassword', 'confirmPasswordError', 'Passwords do not match');
        invalidInput = true;
    }

    // Add a check to create a strong password

    // Check Terms of Service checkbox
    if (!tosChecked) {
        setInputError('tosCheckbox', 'tosError', 'You must agree to the Terms of Service and Privacy Policy');
        invalidInput = true;
    }

    if (invalidInput) return;

    // Store the degree
    userDegree = degree;

    // Here you would typically make an API call to create the account
    loggedIn = true;
    showAlert('Account created successfully!', 'success');
    updateUI();
}

// Error handling functions
function setInputError(inputId, errorId, message) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);

    input.classList.add('input-error');
    error.textContent = message;
    error.classList.add('show');
}

function clearAllErrors() {
    // Clear all input errors
    const inputs = document.querySelectorAll('input');
    const errors = document.querySelectorAll('.error-message');

    inputs.forEach(input => {
        input.classList.remove('input-error');
    });

    errors.forEach(error => {
        error.textContent = '';
        error.classList.remove('show');
    });
}

// Format timestamp function
function formatTimestamp(date) {
    const now = new Date();
    const diff = now - date;

    // Convert to hours
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (hours < 1) {
        const minutes = Math.floor(diff / (1000 * 60));
        return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    } else if (hours < 24) {
        return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else {
        return date.toLocaleDateString();
    }
}

// Test calls
// document.addEventListener('DOMContentLoaded', showAlert('Hello World!', 'warning'));