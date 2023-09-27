// Agrega event listeners para los botones de "Mostrar/Ocultar contraseña"
document.getElementById("showCurrentPassword").addEventListener("click", togglePasswordVisibility);
document.getElementById("showNewPassword").addEventListener("click", togglePasswordVisibility);
document.getElementById("showConfirmPassword").addEventListener("click", togglePasswordVisibility);
// Obtén referencias a los elementos del formulario y al párrafo de mensaje
const passwordInput = document.getElementById("newPassword");
const confirmPasswordInput = document.getElementById("confirmPassword");
const submitButton = document.getElementById("changePasswordButton");
const message = document.getElementById("mensaje");

// Agrega event listeners para los campos de contraseña
passwordInput.addEventListener("input", validatePassword);
confirmPasswordInput.addEventListener("input", validatePassword);

// Función para validar las contraseñas
function validatePassword() {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (password === confirmPassword) {
        submitButton.disabled = false;
        message.textContent = "Las contraseñas coinciden.";
    } else {
        submitButton.disabled = true;
        message.textContent = "Las contraseñas no coinciden.";
    }
}

// Función para alternar la visibilidad de la contraseña
function togglePasswordVisibility() {
    const passwordInput = this.previousElementSibling; // Obtén el campo de entrada previo al botón

    if (passwordInput.type === "password") {
        passwordInput.type = "text"; // Cambiar el tipo de entrada a "text" para mostrar la contraseña
        this.textContent = "Ocultar"; // Cambiar el texto del botón a "Ocultar"
    } else {
        passwordInput.type = "password"; // Cambiar el tipo de entrada a "password" para ocultar la contraseña
        this.textContent = "Mostrar"; // Cambiar el texto del botón a "Mostrar"
    }
}

document.getElementById("changePasswordButton").addEventListener("click", function (event) {
    event.preventDefault(); // Prevenir la acción predeterminada del formulario
    resetPassword();
});

// Función para restablecer la contraseña
function resetPassword() {
    console.log("PASO POR EL resetPassword-")
    const data = {
        password: document.getElementById("currentPassword").value,
        newPassword: document.getElementById("confirmPassword").value,
    };

    fetch("http://127.0.0.1:5000/auth/reset", {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include'
    })
    .then(response => {
        if (response.status === 200) {
            console.log("PASO POR EL IF-")
            // Contraseña restablecida exitosamente, redireccionar al inicio de sesión
            window.location.href = "login.html";
        } else {
            console.log("PASO POR EL ELSE-")
            return response.json().then(data => {
                document.getElementById("message").innerHTML = data.message;
            });
        }
    })
    .catch(error => {
        document.getElementById("message").innerHTML = "Error al restablecer la contraseña.";
    });
}
