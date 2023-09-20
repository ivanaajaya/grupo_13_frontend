
document.getElementById("registerForm").addEventListener("submit", function (event) {
    event.preventDefault();
    register();
});

function register() {
    const data = {
        alias: document.getElementById("alias").value,
        nombre: document.getElementById("nombre").value,
        apellido: document.getElementById("apellido").value,
        fecha_nacimiento: document.getElementById("fecha_nacimiento").value,
        password: document.getElementById("password").value,
        correo_electronico: document.getElementById("correo_electronico").value,
        fecha_registro: new Date().toISOString(), // Puedes establecer la fecha de registro aquí
        estado_activo: true, // Por defecto, establecemos el estado a activo
        id_rol: 1, // Debes obtener el ID del rol deseado de alguna manera
    };

    fetch("http://127.0.0.1:5000/auth/register", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include'
    })
    .then(response => {
        if (response.status === 200) {
            // Registro exitoso, redireccionar o mostrar un mensaje de éxito
            window.location.href = "login.html"; // Redirecciona a la página de inicio de sesión
        } else {
            // Mostrar mensaje de error
            return response.json().then(data => {
                document.getElementById("message").innerHTML = data.message;
            });
        }
    })
    .catch(error => {
        // Manejar errores de red u otros errores
        document.getElementById("message").innerHTML = "Error al registrar usuario.";
    });
}
