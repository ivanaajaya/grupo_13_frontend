document.getElementById("saveChanges").addEventListener("click", function () {
    updateProfile();
});


function updateProfile() {
    const data = {
        alias: document.getElementById("editAlias").value,
        nombre: document.getElementById("editNombre").value,
        apellido: document.getElementById("editApellido").value,
        fecha_nacimiento: document.getElementById("editFechaNacimiento").value,
        password: document.getElementById("editPassword").value,
        correo_electronico: document.getElementById("editCorreo").value,
        estado_activo: document.getElementById("editEstadoActivo").checked ? true : false,
        imagen: document.getElementById("editImagen").value,
    };
    // imagen: null, // para manejar la imagen
    // id_rol: parseInt(document.getElementById("editIdRol").value) 
    console.log(typeof  data);

    fetch("http://127.0.0.1:5000/auth/update", {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include'
    })
    .then(response => {
        if (response.status === 200) {
            // Actualización exitosa, redireccionar o mostrar un mensaje de éxito
            console.log("EXITOOOOOOOOO-------")
            window.location.href = "login.html"; // Redirecciona a la página de perfil
        } else {
            // Mostrar mensaje de error
            console.log("fue para else , no fue exito-------")
            return response.json().then(data => {
                document.getElementById("message").innerHTML = data.message;
            });
        }
    })
    .catch(error => {
        // Manejar errores de red u otros errores
        console.log("Error al actualizar el perfil.")
        document.getElementById("message").innerHTML = "Error al actualizar el perfil.";
    });
}

function logout() {
    const url = "http://127.0.0.1:5000/auth/logout";

    fetch(url, {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => {
        if (response.status === 200) {
            return response.json().then(data => {
                window.location.href = "../templates/login.html";
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
