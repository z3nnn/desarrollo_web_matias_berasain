# CC5002-2  Desarrollo de Aplicaciones Web - Otoño 2025

## Página web para mostrar actividades recreativas

La idea de este proyecto es poder mostrar en una aplicación web que permita gestionar actividades recreativas, cuenta con una portada donde hay enlaces a otras páginas para:

- Agregar actividades
- Ver listado de actividades (ahora con lista de comentarios)
- Ver estadisticas

## Decisiones de implementación tomadas (Tarea 3)


- Ahora se utiliza jsonify para facilitar la entrega de datos
- Para la parte de comentarios: se añadio el archivo "tabla-comentario.sql" que se utiliza para crear la tabla de comentarios en la DB, se añadio también la clase Comentario para poder añadir comentarios con sus contenidos (nombre, texto, fecha, actividad_id, actividad) para este ultimo parametro se utilizo la relacion para la Actividad, en "app.py" se añadio a las actividades los comentarios con nombre, texto y fecha; para las rutas de la app, se añadio /comentar/<int:actividad_id> con el metodo POST, el cual tiene definida una funcion comentar la cual recibe el json de la actividad_id y obtiene su nombre y texto, valida por el lado del servidor, y luego añade a la DB. Ahora tambien en la funcion de mostrarDetalle de los listados, se añadio el html para los comentarios, donde se muestra el listado de comentarios ya hechos y el formulario para poder agregar más comentarios, al final de esta función se incorporó un script de js para poder validar los comentarios en el cliente, enviar por AJAX con fetch, leer los comentarios y actualizar el DOM.
- Para la parte de estadisticas: en "app.py" se añadio la ruta tipo /api/ para cada uno de los 3 graficos: por dia, por tipo y por mes horario, se modifico el html de estadisticas para utilizar highcharts.js y se creó un archivo estadisticas.js para hacerles fetch a las rutas utilizando highcharts para hacer los graficos de lineas, de torata y los de barras, posteriormente lo que se muestra en el HTML son los graficos creados con las actividades que se encuentran en la base de datos.

