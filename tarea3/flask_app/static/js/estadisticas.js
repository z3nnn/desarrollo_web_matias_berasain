// static/js/estadisticas.js

document.addEventListener("DOMContentLoaded", function () {
  
    // grafico 1: cantidad de actividades por dia
  fetch("/api/estadisticas/por-dia")
    .then((res) => res.json())
    .then((data) => {
      Highcharts.chart("grafico-lineas", {
        chart: { type: "line" },
        title: { text: "Actividades por día" },
        xAxis: { categories: data.fechas },
        yAxis: { title: { text: "Cantidad" } },
        series: [{ name: "Actividades", data: data.cantidades }],
      });
    });

  // grafico 2: total de actividades por tipo
  fetch("/api/estadisticas/por-tipo")
    .then((res) => res.json())
    .then((data) => {
      Highcharts.chart("grafico-torta", {
        chart: { type: "pie" },
        title: { text: "Actividades por tipo" },
        series: [{
          name: "Actividades",
          colorByPoint: true,
          data: data.tipos.map((t, i) => ({ name: t, y: data.cantidades[i] }))
        }],
      });
    });

  // grafico 3: barras por mes y horario
  fetch("/api/estadisticas/por-mes-horario")
    .then((res) => res.json())
    .then((data) => {
      Highcharts.chart("grafico-barras", {
        chart: { type: "column" },
        title: { text: "Actividades por mes y horario" },
        xAxis: { categories: data.meses, crosshair: true },
        yAxis: { min: 0, title: { text: "Cantidad" } },
        series: [
          { name: "Mañana", data: data.manana },
          { name: "Mediodía", data: data.mediodia },
          { name: "Tarde", data: data.tarde },
        ],
      });
    });
});
