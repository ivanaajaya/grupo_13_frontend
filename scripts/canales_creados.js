

// MÉTODO GET PARA MOSTRAR CANALES POR SERVIDOR

document.addEventListener('load', function () {
    // ...

    // Función para cargar y mostrar la lista de canales
    function cargarCanales() {
        fetch('/http:127.0.0.1:5000/canales/servidor/<int:servidor_id>', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            // Limpiar la lista de canales existente (opcional)
            const listaCanales = document.getElementById('lista-canales');
            listaCanales.innerHTML = '';

            // Iterar sobre la lista de canales y mostrarlos
            data.forEach(canal => {
                const canalDiv = document.createElement('div');
                canalDiv.innerHTML = `
                    <span>Nombre del Canal: ${canal.nombre}</span>
                    <span>Descripción: ${canal.descripcion}</span>
                `;
                listaCanales.appendChild(canalDiv);
            });
        })
        .catch(error => {
            // Manejar errores de red aquí
            console.error('Error de red:', error);
        });
    }

    // Llamar a cargarCanales al cargar la página para mostrar la lista inicial
    cargarCanales();
});



// MÉTODO DELETE - ELIMINAR CANAL
document.addEventListener('load', function () {
    // ...

    // Agrega un evento de clic a los botones de eliminación
    const deleteButtons = document.querySelectorAll('.delete-canal');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function () {
            const canalId = this.getAttribute('data-canal-id');

            // Realiza una solicitud DELETE al servidor para eliminar el canal
            fetch(`/http:127.0.0.1:5000/canales/<int:canal_id>${canalId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    // La solicitud fue exitosa, puedes hacer algo aquí si lo deseas
                    console.log('Canal eliminado exitosamente');
                    // Elimina visualmente el canal de la lista
                    this.parentElement.remove();
                } else {
                    // La solicitud falló, puedes manejar errores aquí si es necesario
                    console.error('Error al eliminar el canal');
                }
            })
            .catch(error => {
                // Manejar errores de red aquí
                console.error('Error de red:', error);
            });
        });
    });
});

