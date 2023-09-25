// Agregar event listener para el botón "Mostrar contraseña"
document.getElementById("showPasswordButton").addEventListener("click", function () {
    const passwordInput = document.getElementById("password");
    if (passwordInput.type === "password") {
        passwordInput.type = "text"; // Cambiar el tipo de entrada a "text" para mostrar la contraseña
        this.textContent = "Ocultar"; // Cambiar el texto del botón
    } else {
        passwordInput.type = "password"; // Cambiar el tipo de entrada a "password" para ocultar la contraseña
        this.textContent = "Mostrar"; // Cambiar el texto del botón
    }
});

document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();
    login();
});

function login() {
    const data = {
        alias: document.getElementById("alias").value,
        password: document.getElementById("password").value,
    };

    fetch("http://127.0.0.1:5000/auth/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include'
    })
    .then(response => {
        if (response.status === 200) {
            // Si el inicio de sesión es exitoso, obtener el id_usuario y almacenarlo
            return response.json().then(data => {
                idUsuario = data.id_usuario;
                window.location.href = "servidores.html";
            });
        } else {
            return response.json().then(data => {
                document.getElementById("message").innerHTML = data.message;
            });
        }
    })
    .catch(error => {
        document.getElementById("message").innerHTML = "Ocurrió un error.";
    });
}