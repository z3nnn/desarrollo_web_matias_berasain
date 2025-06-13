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
    
    <h4>Comentarios</h4>
    <div style="margin-bottom: 20px;">
      <div id="comentarios-list">
      ${act.comentarios.map(c => `
        <div class="comentario">
          <strong>${c.nombre}</strong> <em>(${c.fecha})</em>
          <p>${c.texto}</p>
        </div>
      `).join("")}
      </div>
    </div>

    <form id="form-comentario-${act.id}">
      <h4>Agregar Comentario</h4>
      <label for="nombre">Nombre:</label><br>
      <input type="text" name="nombre" required minlength="3" maxlength="80"><br><br>
      <label for="texto">Comentario:</label><br>
      <textarea name="texto" rows="4" cols="50" required minlength="5"></textarea><br><br>
      <button type="submit" class="boton-volver">Enviar Comentario</button>
    </form>
  `;

  // esto se hace para validar y agregar los comentarios en una lista
  const form = document.getElementById(`form-comentario-${act.id}`);
  const lista = document.getElementById("comentarios-list");
  form.addEventListener("submit", async e => {
    e.preventDefault();

    const nombre = form.nombre.value.trim();
    const texto  = form.texto.value.trim();

    if (nombre.length < 3 || texto.length < 5) {
      return alert("El nombre debe tener entre 3 y 80 caracteres, y el comentario al menos 5.");
    }

     const res = await fetch(`/comentar/${act.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, texto })
    });

    if (!res.ok) {
      const err = await res.json();
      return alert(err.error || "Error al agregar comentario.");
    }

    const { comentario: nuevo } = await res.json();

    lista.insertAdjacentHTML("beforeend", `
      <div class="comentario">
        <strong>${nuevo.nombre}</strong> <em>(${nuevo.fecha})</em>
        <p>${nuevo.texto}</p>
      </div>
    `);

    form.reset();
  });

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
