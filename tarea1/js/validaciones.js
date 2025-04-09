

// función que se ejecuta al cargar el DOM
document.addEventListener("DOMContentLoaded", function () {

  // obtenemos los elementos del html por Id
  const regionSelect = document.getElementById("region");
  const comunaSelect = document.getElementById("comuna");
  const contactarSelect = document.getElementById("contactar");
  const contactoExtra = document.getElementById("contacto-extra");
  const contactoId = document.getElementById("contacto-id");
  const temaSelect = document.getElementById("tema");
  const temaExtra = document.getElementById("tema-extra");
  const temaDescripcion = document.getElementById("tema-descripcion");
  const agregarFotoBtn = document.getElementById("agregar-foto");
  const fotosDiv = document.getElementById("fotos");

  const confirmDialog = document.getElementById("confirm-dialog");
  const graciasDialog = document.getElementById("gracias-dialog");

  const form = document.getElementById("form-actividad");

  // cargar regiones en el select
  region_comuna.regiones.forEach(region => {
    const opt = document.createElement("option");
    opt.value = region.nombre;
    opt.textContent = region.nombre;
    regionSelect.appendChild(opt);
  });

  // cargar comunas según la región seleccionada
  regionSelect.addEventListener("change", function () {
    const nombreRegion = this.value;
    comunaSelect.innerHTML = '<option value="">Seleccione comuna</option>';

    const region = region_comuna.regiones.find(r => r.nombre === nombreRegion);
    if (region) {
      region.comunas.forEach(comuna => {
        const opt = document.createElement("option");
        opt.value = comuna.nombre;
        opt.textContent = comuna.nombre;
        comunaSelect.appendChild(opt);
      });
    }
  });

  // mostrar campo adicional si red social o tema es "otro"
  contactarSelect.addEventListener("change", function () {
    contactoExtra.style.display = this.value ? "block" : "none";
  });

  // mostrar campo tema
  temaSelect.addEventListener("change", function () {
    temaExtra.style.display = this.value === "otro" ? "block" : "none";
  });

  // agregar inputs de foto hasta 5 maximo
  agregarFotoBtn.addEventListener("click", function () {
    const inputs = fotosDiv.querySelectorAll('input[type="file"]');
    if (inputs.length < 5) {
      const nuevoInput = document.createElement("label");
      nuevoInput.innerHTML = `Foto:
        <input type="file" name="foto[]" accept="image/*">`;
      fotosDiv.appendChild(nuevoInput);
    } else {
      alert("Solo puedes subir hasta 5 fotos.");
    }
  });

  // validacion del formulario si no está completo
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!formValido()) {
      alert("Por favor, completa correctamente todos los campos obligatorios.");
      return;
    }

    confirmDialog.showModal();
  });


  // cerrar el dialogo si la respuesta es si y resetear el formulario
  document.getElementById("confirm-si").addEventListener("click", () => {
    confirmDialog.close();
    graciasDialog.showModal();
    form.reset();
  });

  // cerrar el dialogo si la respuesta es no
  document.getElementById("confirm-no").addEventListener("click", () => {
    confirmDialog.close();
  });
  
  // función para validar cada campo del formulario y asegurarse de que sean correctos
  function formValido() {
    // nombre
    const nombre = form.nombre.value.trim();
    // campo del formulario es invalido si:
    // si no se seleccionó una región o comuna
    if (!regionSelect.value || !comunaSelect.value) return false;
    // si no se seleccionó un nombre o es mayor a 200 caracteres
    if (!nombre || nombre.length > 200) return false;
    
    // si no se escribio un email o es un formato invalido
    const email = form.email.value.trim();
    if (!email || !validarEmail(email)) return false;

    // si el celular no es un formato valido
    // el formato es +NNN.NNNNNNNN 
    const celular = form.celular.value.trim();
    if (celular && !/^\+\d{3}\.\d{8}$/.test(celular)) return false;

    // si el contacto es menor a 4 o mayor a 50 caracteres
    if (contactarSelect.value) {
      const valor = contactoId.value.trim();
      if (valor.length < 4 || valor.length > 50) return false;
    }

    // si la fecha de inicio es despues de la fecha de término
    const inicio = form.inicio.value;
    const termino = form.termino.value;
    if (!inicio) return false;
    if (termino && new Date(termino) <= new Date(inicio)) return false;

    if (!temaSelect.value) return false;
    if (temaSelect.value === "otro") {
      const desc = temaDescripcion.value.trim();
      if (desc.length < 3 || desc.length > 15) return false;
    }

    // si la cantidad de fotos es menos que 1 o mayor que 5
    const fotos = fotosDiv.querySelectorAll('input[type="file"]');
    let cantidadArchivos = 0;
    fotos.forEach(input => {
      if (input.files.length > 0) cantidadArchivos++;
    });
    if (cantidadArchivos < 1 || cantidadArchivos > 5) return false;

    return true;
  }

  // función para validar el formato del email
  function validarEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // función para formatear la fecha a un formato local
  // YYYY-MM-DDTHH:MM
  function formatearFechaLocal(date) {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const hh = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
  }

  // función para rellenar las fechas de inicio y término
  function rellenarFechas() {
    const ahora = new Date();
    const mas3horas = new Date(ahora.getTime() + 3 * 60 * 60 * 1000);
  
    document.getElementById("inicio").value = formatearFechaLocal(ahora);
    document.getElementById("termino").value = formatearFechaLocal(mas3horas);
  }

  // llamos a la función para rellenar las fechas al cargar el DOM
  rellenarFechas();

});
