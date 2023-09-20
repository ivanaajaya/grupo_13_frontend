// JavaScript para manejar la lógica del chat
const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message');
const sendButton = document.getElementById('send');

// Función para obtener la hora y fecha actual en formato legible
function getCurrentDateTime() {
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    return `${date} ${time}`;
}

// Función para agregar un nuevo mensaje al chat
function addMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.innerHTML = `
        <span class="message">${message.messageText}</span>
        <span class="timestamp">${message.timestamp}</span>
        <button class="edit">Editar</button>
        <button class="delete">Borrar</button>
    `;
    chatBox.appendChild(messageDiv);

    // Agregar evento de clic para editar
    const editButton = messageDiv.querySelector('.edit');
    editButton.addEventListener('click', () => {
        messageToEdit = messageDiv;
        messageInput.value = message.messageText;
        showEditBox();
    });

    // Agregar evento de clic para borrar
    const deleteButton = messageDiv.querySelector('.delete');
    deleteButton.addEventListener('click', () => {
        messageDiv.remove();
    });
}

let messageToEdit = null;

// Mostrar el cuadro de edición
function showEditBox() {
    editBox.style.display = 'block';
    messageInput.disabled = true;
    sendButton.disabled = true;
}

// Ocultar el cuadro de edición
function hideEditBox() {
    editBox.style.display = 'none';
    messageInput.disabled = false;
    sendButton.disabled = false;
    messageToEdit = null;
}

sendButton.addEventListener('click', () => {
    const messageText = messageInput.value;
    if (messageText.trim() !== '') {
        const timestamp = getCurrentDateTime();
        const message = { messageText, timestamp };
        // Agregar el mensaje al chatBox
        addMessage(message);
        messageInput.value = '';
    }
});

// Agregar la capacidad de enviar mensajes con la tecla "ENTER"
messageInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const messageText = messageInput.value;
        if (messageText.trim() !== '') {
            const timestamp = getCurrentDateTime();
            const message = { messageText, timestamp };
            // Agregar el mensaje al chatBox
            addMessage(message);
            messageInput.value = '';
        }
    }
});

// Botón de guardar en el cuadro de edición
const editMessageInput = document.getElementById('edit-message');
const saveEditButton = document.getElementById('save-edit');
const cancelEditButton = document.getElementById('cancel-edit');

saveEditButton.addEventListener('click', () => {
    const editedMessageText = editMessageInput.value;
    if (messageToEdit && editedMessageText.trim() !== '') {
        // Actualiza el mensaje existente con el nuevo contenido editado
        messageToEdit.querySelector('.message').textContent = editedMessageText;
        messageToEdit.querySelector('.timestamp').textContent = getCurrentDateTime();
        hideEditBox();
    }
});

cancelEditButton.addEventListener('click', () => {
    hideEditBox();


});
    