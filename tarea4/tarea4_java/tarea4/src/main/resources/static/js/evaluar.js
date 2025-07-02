async function cargarActividades() {
  const res = await fetch('/api/evaluar');
  const actividades = await res.json();
  const tbody = document.querySelector('table tbody');
  tbody.innerHTML = '';

  actividades.forEach(act => {
    const notas = act.notas || [];
    let avg = '-';
    if (notas.length > 0) {
      const suma = notas.reduce((ac, n) => ac + n.nota, 0);
      avg = (suma / notas.length).toFixed(2);
    }

    const fecha = act.diaHoraInicio
      ? new Date(act.diaHoraInicio).toLocaleDateString()
      : '-';

    tbody.insertAdjacentHTML('beforeend', `
      <tr data-id="${act.id}">
        <td>${act.id}</td>
        <td>${fecha}</td>
        <td>${act.sector}</td>
        <td>${act.nombre}</td>
        <td>${act.tema}</td>
        <td class="nota-cell">${avg}</td>
        <td><button class="btn-eval" data-id="${act.id}">Evaluar</button></td>
      </tr>
    `);
  });

  document.querySelectorAll('.btn-eval').forEach(btn => {
    btn.onclick = async () => {
      const id = btn.dataset.id;
      const v = parseInt(prompt('ingresa nota (1–7):'), 10);
      if (!(v >= 1 && v <= 7)) return alert('nota inválida!');

      const resp = await fetch(`/api/evaluar/${id}/nota?valor=${v}`, {
        method: 'POST'
      });
      if (!resp.ok) {
        const msg = await resp.text();
        return alert(msg || 'error al guardar la nota');
      }

      // promedio solo para esta fila con 2 decimales
      const act = (await fetch('/api/evaluar').then(r => r.json()))
                    .find(a => a.id == id);
      const notas = act.notas || [];
      let nuevaAvg = '-';
      if (notas.length > 0) {
        const suma = notas.reduce((ac, n) => ac + n.nota, 0);
        nuevaAvg = (suma / notas.length).toFixed(2);
      }
      btn.closest('tr').querySelector('.nota-cell').textContent = nuevaAvg;
    };
  });
}

window.addEventListener('DOMContentLoaded', cargarActividades);
