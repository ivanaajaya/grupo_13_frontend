// MÉTODO POST - PARA CREAR CANAL

document.addEventListener('load', function () {
    const form = document.getElementById('crear_canal');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Evita que el formulario se envíe automáticamente

        // Obtiene los valores del formulario
        const nombre = document.getElementById('nombre').value;
        const descripcion = document.getElementById('descripcion').value;
 

        // Crea un objeto con los datos del formulario
        const canalData = {
            nombre: nombre,
            descripcion: descripcion
        }; 

        // Realiza una solicitud POST al servidor
        fetch('http://127.0.0.1:5000/canales', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(canalData)
        })
        .then(response => {
            if (response.ok) {
                // La solicitud fue exitosa, puedes hacer algo aquí si lo deseas
                console.log('Canal creado exitosamente');
            } else {
                // La solicitud falló, puedes manejar errores aquí si es necesario
                console.error('Error al crear el canal');
            }
        })
        .catch(error => {
            // Manejar errores de red aquí
            console.error('Error de red:', error);
        });
    });
});


 // Agregar un evento para redirigir al usuario a la página de visualización de canales
    const verCanalesButton = document.getElementById('ver-canales');
    verCanalesButton.addEventListener('click', function () {
    window.location.href = 'canales_creados.html'; // Redirige a la página de visualización
    });






/* window.addEventListener("load", function () {
    getCanal();
  });
  
  function getCanal() {
    const url = "http://127.0.0.1:5000/canales";
  
    // Obtener la lista de servidores
    const listaCanales = document.getElementById(
      "lista_canales"
    );
  
  
    fetch(url, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json().then((data) => {
            // data es un arreglo, puedes iterar sobre él para mostrar cada servidor
            for (let i = 0; i < data.length; i++) {
              const servidor = data[i];
              const servidorElement = document.createElement("li");
              servidorElement.innerHTML = `
                          <header>
                              <h3>${servidor.nombre_servidor}</h3>
                              <p>${servidor.id_usuario}</p>
                              <button class="btn_borrar">Delete</button>
                          </header>
                          `;
              const btn_delete = servidorElement.querySelector(".btn_borrar");
              btn_delete.addEventListener("click", () => {
                eliminarServidor(servidor.id_servidor);
              });
              listaCanales.appendChild(servidorElement);
            }
          });
        } else {
          return response.json().then((data) => {
            document.getElementById("message").innerHTML = data.message;
          });
        }
      })
      .catch((error) => {
        document.getElementById("message").innerHTML = "An error occurred.";
      });
  }
  document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("modal");
    const closeModalButton = document.getElementById("close-modal");
    const openModalButton = document.getElementById("open-modal");
  
    openModalButton.addEventListener("click", function () {
      modal.style.display = "block";
    });
  
    closeModalButton.addEventListener("click", function () {
      modal.style.display = "none";
    });
  
    window.addEventListener("click", function (e) {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  
    // Agrega un evento de clic al botón "Crear Servidor" dentro del formulario
    const crearServidorButton = document.querySelector(
      '#nuevo_servidor_form button[type="submit"]'
    );
    crearServidorButton.addEventListener("click", function (e) {
      e.preventDefault(); // Evita que se envíe el formulario por defecto
      enviarDatosServidor(); // Llama a la función para enviar los datos al servidor
    });
  });
  
  
  function eliminarServidor(servidorId) {
    const url = `http://127.0.0.1:5000/servidores/${servidorId}`;
  
    fetch(url, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 204) {
          // Éxito, el servidor se eliminó con éxito
          console.log("Servidor eliminado con éxito.");
          // Actualiza la lista de servidores
          getCanal();
        } else {
          console.error("Error al eliminar el servidor.");
        }
      })
      .catch((error) => {
        console.error("Error de red:", error);
      });
  }
  
  
  function enviarDatosServidor() {
    const url = "http://127.0.0.1:5000/servidores";
  
    // Obtener los datos del formulario
    const nombreServidor = document.getElementById("nombre_servidor").value;
    const descripcion = document.getElementById("descripcion").value;
    const fechaCreacion = document.getElementById("fecha_creacion").value;
    const idUsuario = localStorage.getItem('idUsuario');
  
  
    // Crear un objeto con los datos del servidor, incluyendo id_usuario
    const nuevoServidor = {
      id_usuario:idUsuario,
      nombre_servidor: nombreServidor,
      descripcion: descripcion,
      fecha_creacion: fechaCreacion,
    };
    // Realizar la solicitud POST al servidor
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(nuevoServidor),
    })
      .then((response) => {
        if (response.status === 201) {
          // El servidor ha sido creado con éxito
          console.log("Servidor creado con éxito.");
          // Cierra el modal después de crear el servidor
          modal.style.display = "none";
          // Actualiza la lista de servidores
          getCanal();
        } else {
          return response.json().then((data) => {
            // Manejar errores, por ejemplo, mostrar un mensaje de error
            console.error("Error al crear el servidor:", data.message);
          });
        }
      })
      .catch((error) => {
        console.error("Error de red:", error);
      });
  }  */