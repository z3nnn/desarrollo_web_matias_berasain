// listado.js

// función para mostrar la información de una actividad en particular
function mostrarDetalle(index) {
  const act = actividades[index];
  const contenedor = document.getElementById("detalle-actividad");
  contenedor.style.display = "block";
  contenedor.innerHTML = `
    <h3>Detalle de Actividad</h3>
    <p><strong>Inicio:</strong> ${act.inicio}</p>
    <p><strong>Término:</strong> ${act.termino}</p>
    <p><strong>Comuna:</strong> ${act.comuna}</p>
    <p><strong>Sector:</strong> ${act.sector}</p>
    <p><strong>Tema:</strong> ${act.tema}</p>
    <p><strong>Organizador:</strong> ${act.organizador}</p>
    <p><strong>Descripción:</strong> ${act.descripcion}</p>
    <div>
      ${act.fotos.map(src => `<img src="/static/${src}" width="320" height="240" style="margin:5px; cursor:pointer;" alt="Foto actividad" onclick="verFoto('${src}')">`).join("")}
    </div>
    <br>
    <div style="text-align: center; margin-top: 15px;">
      <button onclick="window.location.href = '/listado'" class="boton-volver">Volver al listado</button>
      <button onclick="window.location.href = '/'" class="boton-volver">Volver a la portada</button>
    </div>
  `;
}

function verFoto(src) {
  const dialog = document.getElementById("foto-dialog");
  const img = document.getElementById("foto-grande");
  img.src = "/static/" + src;
  dialog.showModal();
}

function cerrarFoto() {
  document.getElementById("foto-dialog").close();
}
