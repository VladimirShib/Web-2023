const eyeToggle = document.getElementById('eye');

const togglePassword = function() {
    const type = passwordField.getAttribute('type');

    if (type == 'password') {
        passwordField.setAttribute('type', 'text');
    } else {
        passwordField.setAttribute('type', 'password');
    }

    eyeToggle.classList.toggle('hide-password');
}

eyeToggle.addEventListener('click', togglePassword);

const emailField = document.getElementById('email');
const emailFieldEmpty = document.getElementById('emailRequired');
const passwordField = document.getElementById('password');
const passwordFieldEmpty = document.getElementById('passwordRequired');
const errorEmpty = document.getElementById('errorEmpty');
const errorIncorrect = document.getElementById('errorIncorrect');
const submitData = document.getElementById('submit');

const login = function() {
    if (!emailField.value || !passwordField.value) {
        errorIncorrect.classList.remove('show-error');
        errorEmpty.classList.add('show-error');
        if (!emailField.value) {
            emailField.classList.add('red-error-underline');
            emailFieldEmpty.classList.remove('hidden');
        } else {
            emailField.classList.remove('red-error-underline');
        }
        if (!passwordField.value) {
            passwordField.classList.add('red-error-underline');
            passwordFieldEmpty.classList.remove('hidden');
        } else {
            passwordField.classList.remove('red-error-underline');
        }
    } else if (emailField.value != 'admin' || passwordField.value != '1234') {
        errorEmpty.classList.remove('show-error');
        errorIncorrect.classList.add('show-error');
        emailField.classList.add('red-error-underline');
        passwordField.classList.add('red-error-underline');
    } else {
        window.location = 'http://localhost:3000/admin'
    }
}

const emailInput = function() {
    emailField.classList.remove('red-error-underline');
    emailFieldEmpty.classList.add('hidden');
}

const passwordInput = function() {
    passwordField.classList.remove('red-error-underline');
    passwordFieldEmpty.classList.add('hidden');
}

emailField.addEventListener('input', emailInput);
passwordField.addEventListener('input', passwordInput);
submitData.addEventListener('click', login);