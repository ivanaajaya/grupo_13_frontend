window.addEventListener('load', function () {
    getProfile();
    document.getElementById("logout").addEventListener("click", logout);
});


function getProfile() {
    const url = "http://127.0.0.1:5000/auth/profile";

    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "short",
    };

    fetch(url, {
        method: 'GET',
        credentials: 'include'
    })
        .then(response => {
            if (response.status === 200) {
                return response.json().then(data => {
                    document.getElementById("alias").innerText = data.alias;
                    document.getElementById("correo_electronico").innerText = data.correo_electronico;
                    document.getElementById("nombre").innerText = data.nombre;
                    document.getElementById("apellido").innerText = data.apellido;

                    // Formatear y mostrar la fecha de nacimiento en español
                    const fechaNacimiento = new Date(data.fecha_nacimiento);
                    const fechaFormateada = fechaNacimiento.toLocaleDateString("es-ES", options);
                    document.getElementById("fecha_nacimiento").innerText = fechaFormateada;

                    document.getElementById("estado_activo").innerText = data.estado_activo ? "Activo" : "Inactivo";

                    // Mostrar la imagen del perfil
                    if (data.imagen) {
                        document.getElementById("imagen").src = data.imagen;
                    } else {
                        // Mostrar una imagen por defecto si no hay imagen de perfil
                        document.getElementById("imagen").src = "../assets/jiji.jpg";
                    }
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

function logout() {
    console.log("Se hizo clic en el botón Cerrar sesión"); // Agrega este console.log
    const url = "http://127.0.0.1:5000/auth/logout";

    fetch(url, {
        method: 'GET',
        credentials: 'include'
    })
        .then(response => {
            if (response.status === 200) {
                return response.json().then(data => {
                    window.location.href = "login.html";
                });
            } else {
                return response.json().then(data => {
                    document.getElementById("message").innerHTML = data.message;
                });
            }
        })
        .catch(error => {
            console.error("Error al cerrar sesión:", error);
            document.getElementById("message").innerHTML = "Ocurrió un error al cerrar sesión.";
        });
}
