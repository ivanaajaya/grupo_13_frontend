var fecha = getElementById("fecha_nacimiento");
// Fecha en formato año mes día
// var fecha = "20-09-2018"; // Por ejemplo, 18 de septiembre de 2023

// Dividir la fecha en partes
var partesFecha = fecha.split("-"); // Esto crea un array ["2023", "09", "18"]

// Crear un nuevo objeto Date con las partes de la fecha
var fechaConvertida = new Date(partesFecha[2], partesFecha[1] - 1, partesFecha[0]);

// Obtener el día, mes y año en el nuevo formato
var dia = fechaConvertida.getDate();
var mes = fechaConvertida.getMonth() + 1; // Sumar 1 porque los meses van de 0 a 11
var año = fechaConvertida.getFullYear();

// Formatear la fecha en el nuevo formato (día mes año)
var fechaFinal = año + " " + mes + " " + dia;

console.log(fechaFinal); // Esto mostrará "18 9 2023" en la consola


document.getElementById("Registro_Form").addEventListener("submit", function (event) {
    event.preventDefault();
    login();
});

function registro() {
    const data = {
        alias: document.getElementById("alias").value,
        nombre: document.getElementById("nombre").value,
        apellido: document.getElementById("apellido").value,
        fecha_nacimiento: fechaFinal,
        password: document.getElementById("password").value,
    };

    fetch("http://127.0.0.1:5000/servidores", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include'
    })

    .then(response => {
        if (response.status === 200) {
            // Redirect to profile page if login is successful
            return response.json().then(data => {
                window.location.href = "profile.html";
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