// Agregar event listeners para los botones de "Mostrar/Ocultar contraseña"
document.getElementById("showCurrentPassword").addEventListener("click", togglePasswordVisibility);
document.getElementById("showNewPassword").addEventListener("click", togglePasswordVisibility);
document.getElementById("showConfirmPassword").addEventListener("click", togglePasswordVisibility);

// Agregar event listener para el formulario
document.getElementById("changePasswordForm").addEventListener("submit", function (event) {
    event.preventDefault();
    console.log("paso por el formulario");

    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const passwordMatchError = document.getElementById("passwordMatchError");
    const changePasswordButton = document.getElementById("changePasswordButton");

    if (newPassword === confirmPassword) {
        console.log("paso por el if")
        // Las contraseñas coinciden, eliminar el mensaje de error y habilitar el botón
        passwordMatchError.textContent = "";
        changePasswordButton.disabled = false; // Habilitar el botón
        // Aquí puedes continuar con el envío del formulario o la lógica necesaria
    } else {
        console.log("paso por el elsse")
        // Las contraseñas no coinciden, mostrar un mensaje de error y deshabilitar el botón
        passwordMatchError.textContent = "Las contraseñas no coinciden.";
        changePasswordButton.disabled = true; // Deshabilitar el botón
    }
});


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

// Agregar event listener al botón "Cambiar Contraseña"
// document.getElementById("submit").addEventListener("click", function (event) {
//     event.preventDefault(); // Prevenir la acción predeterminada del formulario
//     resetPassword();
// });
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
