window.addEventListener('load', function () {
    getservidor();
});

function getservidor() {
    const url = "http://127.0.0.1:5000/servidores";

    // Obtener el contenedor de la lista de servidores
    const containerListaServidores = document.getElementById("container_lista_servidores");

    // Limpiar el contenido anterior de la lista de servidores
    while (containerListaServidores.firstChild) {
        containerListaServidores.removeChild(containerListaServidores.firstChild);
    }

    fetch(url, {
        method: 'GET',
        credentials: 'include'
    })
        .then(response => {
            if (response.status === 200) {
                return response.json().then(data => {
                    // data es un arreglo, puedes iterar sobre él para mostrar cada servidor
                    for (let i = 0; i < data.length; i++) {
                        const servidor = data[i];
                        const servidorElement = document.createElement("div");
                        servidorElement.innerHTML = `
                            <h3>${servidor.nombre_servidor}</h3>
                        `;
                        containerListaServidores.appendChild(servidorElement);
                    }
                });
            } else {
                return response.json().then(data => {
                    document.getElementById("message").innerHTML = data.message;
                });
            }
        })
        .catch(error => {
            document.getElementById("message").innerHTML = "An error occurred.";
        });
}


document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('modal');
    const closeModalButton = document.getElementById('close-modal');
    const openModalButton = document.getElementById('open-modal');

    openModalButton.addEventListener('click', function () {
        modal.style.display = 'block';
    });

    closeModalButton.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function (e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Agrega un evento de clic al botón "Crear Servidor" dentro del formulario
    const crearServidorButton = document.querySelector('#nuevo_servidor_form button[type="submit"]');
    crearServidorButton.addEventListener('click', function (e) {
        e.preventDefault(); // Evita que se envíe el formulario por defecto
        enviarDatosServidor(); // Llama a la función para enviar los datos al servidor
    });
});
function enviarDatosServidor() {
    const url = "http://127.0.0.1:5000/servidores";

    // Obtener los datos del formulario
    const nombreServidor = document.getElementById('nombre_servidor').value;
    const descripcion = document.getElementById('descripcion').value;
    const fechaCreacion = document.getElementById('fecha_creacion').value;


    // Crear un objeto con los datos del servidor, incluyendo id_usuario
    const nuevoServidor = {
        nombre_servidor: nombreServidor,
        descripcion: descripcion,
        fecha_creacion: fechaCreacion,
    };
    // Realizar la solicitud POST al servidor
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(nuevoServidor)
    })
    .then(response => {
        if (response.status === 201) {
            // El servidor ha sido creado con éxito
            console.log("Servidor creado con éxito.");
            // Cierra el modal después de crear el servidor
            modal.style.display = 'none';
            // Actualiza la lista de servidores
            getservidor();
        } else {
            return response.json().then(data => {
                // Manejar errores, por ejemplo, mostrar un mensaje de error
                console.error("Error al crear el servidor:", data.message);
            });
        }
    })
    .catch(error => {
        console.error("Error de red:", error);
    });
}

