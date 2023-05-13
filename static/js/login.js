const eyeToggle = document.querySelector('.login-window__password-toggle');

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

const submitData = document.getElementById('submit');
const emailField = document.getElementById('email');
const passwordField = document.getElementById('password');

const login = function() {
    if (!emailField.value || !passwordField.value) {
        console.log("Error");
    } else {
        console.log(JSON.stringify({
            email: emailField.value,
            password: passwordField.value,
        }));
    }
}

submitData.addEventListener('click', login);