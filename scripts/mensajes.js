document.addEventListener("DOMContentLoaded", () => {
    const chatMessages = document.getElementById('chat-messages');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');

    // Función para cargar los mensajes desde el servidor
    const cargarMensajes = () => {
        fetch('http://127.0.0.1:5000/mensajes/canal/1') // Cambia el número de canal según tus necesidades
            .then((response) => response.json())
            .then((data) => {
                chatMessages.innerHTML = ''; // Limpiar el contenedor de mensajes antes de cargar nuevos datos
                data.forEach((mensaje) => {
                    agregarMensaje(mensaje.contenido, mensaje.id_usuario, mensaje.hora_mensaje);
                });
            })
            .catch((error) => {
                console.error('Error al cargar mensajes:', error);
            });
    };

    // Función para agregar un mensaje al contenedor de mensajes
    const agregarMensaje = (contenido, idUsuario, horaMensaje) => {
        const mensajeElement = document.createElement('div');
        mensajeElement.classList.add('message');
        
        const horaElement = document.createElement('span');
        horaElement.classList.add('message-time');

        // Formatear la hora para que sea más legible (por ejemplo, de "HH:MM:SS" a "HH:MM")
        const horaFormateada = horaMensaje.substring(0, 5);
        horaElement.textContent = horaFormateada;

        // Agregar la hora y el contenido al mensaje
        mensajeElement.appendChild(horaElement); // Agregar la hora al mensaje
        mensajeElement.appendChild(document.createTextNode(`${idUsuario}: ${contenido}`)); // Agregar contenido

        chatMessages.appendChild(mensajeElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    // Cargar mensajes al cargar la página
    cargarMensajes();

    // Agregar un evento para enviar el formulario y crear un mensaje
    sendButton.addEventListener('click', () => {
        const contenido = messageInput.value.trim();

        if (contenido !== '') {
            // Enviar el contenido del mensaje al servidor
            fetch('http://127.0.0.1:5000/mensajes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ contenido }),
            })
                .then((response) => response.json())
                .then(() => {
                    // Limpiar el campo de contenido después de enviar el mensaje
                    messageInput.value = '';

                    // Recargar los mensajes para mostrar el nuevo mensaje
                    cargarMensajes();
                })
                .catch((error) => {
                    console.error('Error al crear un mensaje:', error);
                });
        }
    });
});
