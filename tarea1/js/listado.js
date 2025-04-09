
// listado de actividades placeholders
const actividades = [
  {
    inicio: "2025-04-01 10:00",
    termino: "2025-04-01 12:00",
    comuna: "Providencia",
    sector: "Biblioteca Central",
    tema: "Ciencias",
    organizador: "José Maza",
    descripcion: "Charla sobre astronomía para jóvenes.",
    fotos: ["img/listado/ciencias1.jpg", "img/listado/ciencias2.jpg"]
  },
  {
    inicio: "2025-04-02 18:00",
    termino: "2025-04-02 20:00",
    comuna: "Santiago",
    sector: "Parque O'Higgins",
    tema: "Música",
    organizador: "Jorge Drexler",
    descripcion: "Festival urbano con bandas emergentes.",
    fotos: ["img/listado/mus1.jpg", "img/listado/mus2.jpg"]
  },
  {
    inicio: "2025-04-03 14:25",
    termino: "2025-04-03 15:25",
    comuna: "Las Condes",
    sector: "Empresa",
    tema: "Tecnología",
    organizador: "Bill Gates",
    descripcion: "Conferencia sobre inteligencia artificial y futuro digital.",
    fotos: ["img/listado/tec1.jpg", "img/listado/tec2.jpg"]
  },
  {
    inicio: "2025-04-04 16:45",
    termino: "2025-04-04 18:45",
    comuna: "Ñuñoa",
    sector: "Centro de videojuegos",
    tema: "Juegos",
    organizador: "Insert Coin",
    descripcion: "Campeonato de videojuegos retro.",
    fotos: ["img/listado/juegos1.jpg", "img/listado/juegos2.jpg"]
  },
  {
    inicio: "2025-04-05 09:00",
    termino: "2025-04-05 10:00",
    comuna: "La Reina",
    sector: "Estadio Bicentenario",
    tema: "Deporte",
    organizador: "Alexis Sanchez",
    descripcion: "Clínica de fútbol para niños y jóvenes.",
    fotos: ["img/listado/deporte1.jpg", "img/listado/deporte2.jpg"]
  }
];

// función para mostrar la información de una actividad en particular
// al hacer click en una foto la agranda y permite cerrarla
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
      ${act.fotos.map(src => `<img src="${src}" width="320" height="240" style="margin:5px; cursor:pointer;" alt="Foto actividad" onclick="verFoto('${src}')">`).join("")}
    </div>
    <br>
    <div style="text-align: center; margin-top: 15px;">
      <a href="listado.html" class="boton-volver">Volver al listado</a>
      <a href="index.html" class="boton-volver">Volver a portada</a>
    </div>
  `;
}

// función para ver la foto en grande
function verFoto(src) {
  const dialog = document.getElementById("foto-dialog");
  const img = document.getElementById("foto-grande");
  img.src = src;
  dialog.showModal();
}

// función para cerrar la foto grande
function cerrarFoto() {
  document.getElementById("foto-dialog").close();
}
