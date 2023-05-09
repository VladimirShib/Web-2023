const emailField = document.getElementById('email');
const passwordField = document.getElementById('password');
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

function previewFile() {
    const preview = document.querySelector("img");
    const file = document.querySelector("input[type=file]").files[0];
    const reader = new FileReader();
  
    reader.addEventListener(
      "load",
      () => {
        // convert image file to base64 string
        preview.src = reader.result;
      },
      false
    );
  
    if (file) {
      reader.readAsDataURL(file);
    }
  }