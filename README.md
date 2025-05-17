# CC5002-2  Desarrollo de Aplicaciones Web - Otoño 2025

## Página web para mostrar actividades recreativas

La idea de este proyecto es poder mostrar en una aplicación web que permita gestionar actividades recreativas, cuenta con una portada donde hay enlaces a otras páginas para:

- Agregar actividades
- Ver listado de actividades
- Ver estadisticas

## Decisiones de implementación tomadas (Tarea 2)

- Se incorporó Flask para trabajar con una base de datos en MySQL & SQLAlchemy en el archivo app.py, plantillas en los HTMLs con Jinja.
- La estructura de archivos cambió, ahora "flask_app" es la carpeta que contiene todo el proyecto, dentro de ella se encuentra "database" la cual cuenta con los archivos "region-comuna.sql" para la creación de regiones y comunas y "tarea2.sql" para la creación de las tablas con los schemes relacionados a esta tarea, además "db. py" que contiene la conexión a la base de datos y las clases para los campos relacionados a la creación y visualización de actividades recreativas. Por otro lado ahora la carpeta "static" es la que contiene los "css" la antigua carpeta de imagenes "img", las validaciones en Javascript "js" y la carpeta "uploads" donde se irán subiendo los archivos. La carpeta "utils" contiene "validaciones.py" como se hizo en el auxiliar, pero en este caso no se utilizaron todas ellas. Se añadio un .gitignore para evitar subir el ambiente virtual "venv" y los caches de python "__pycache__". Finalmente los HTMLs ahora incorporan plantillas Jinja como se mencionó anteriormente y se encuentran en la carpeta "templates". También se incorporo un archivo "requirements.txt" para poder instalar las librerias que ocupa la aplicación actualmente.
- Como se pide en los requerimientos, ahora se muestran las ultimas 5 actividades añadidas, y al presionar el listado se muestran de 5 filas máximo y se incorporó botones de siguiente y anterior para ver las páginas una vez que se superan más de 5 actividades en la base de datos.

