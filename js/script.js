const API_URL = "http://44.193.15.36/api/devices";
const tableBody = document.getElementById("deviceTableBody");
const statusActual = document.getElementById("statusActual");

function cargarDatos() {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            tableBody.innerHTML = "";

            if (data.devices[0].status != "") {
                statusActual.textContent = `Estado actual: + ${data.devices[0].status}`;
            } else {
                statusActual.textContent = "Estado actual: sin datos";
            }
            console.table(data.devices);

            data.devices.forEach(dispositivo => {
                const fila = document.createElement("tr");

                fila.innerHTML = `
                    <td>${dispositivo.id}</td>
                    <td>${dispositivo.name}</td>
                    <td>${dispositivo.ip}</td>
                    <td>${dispositivo.status}</td>
                    <td>${dispositivo.date}</td>
                `;

                tableBody.appendChild(fila);
            });
        })
        .catch(error => {
            console.error("Error al obtener los datos:", error);
            statusActual.textContent = "Error al cargar estado actual";
        });
}

cargarDatos();
setInterval(cargarDatos, 2000);
