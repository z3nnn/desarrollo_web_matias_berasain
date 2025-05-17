from flask import Flask, request, render_template, redirect, url_for, session, flash
from werkzeug.utils import secure_filename
from datetime import datetime
import os

from database import db
from database.db import SessionLocal, Region, Comuna, Actividad, Foto, ActividadTema, ContactarPor

UPLOAD_FOLDER = 'static/uploads'

app = Flask(__name__)
app.secret_key = "s3cr3t_k3y"
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route("/")
def index():
    session_db = SessionLocal()
    actividades = (
        session_db.query(Actividad)
        .order_by(Actividad.dia_hora_inicio.desc())
        .limit(5)
        .all()
    )

    datos = []
    for act in actividades:
        datos.append({
            "inicio": act.dia_hora_inicio.strftime("%Y-%m-%d %H:%M"),
            "termino": act.dia_hora_termino.strftime("%Y-%m-%d %H:%M") if act.dia_hora_termino else "-",
            "comuna": act.comuna.nombre,
            "sector": act.sector,
            "tema": act.temas[0].tema.capitalize() if act.temas else "",
            "foto": f"uploads/{act.fotos[0].nombre_archivo}" if act.fotos else None,
        })

    session_db.close()
    return render_template("index.html", actividades=datos)

@app.route("/agregar", methods=["GET", "POST"])
def agregar():
    session_db = SessionLocal()

    if request.method == "GET":
        regiones = session_db.query(Region).order_by(Region.nombre).all()
        comunas = session_db.query(Comuna).order_by(Comuna.nombre).all()
        session_db.close()
        return render_template("agregar.html", regiones=regiones, comunas=comunas)

    # procesar el formulario
    comuna_id = request.form.get("comuna")
    region_id = request.form.get("region")
    sector = request.form.get("sector")
    nombre = request.form.get("nombre")
    email = request.form.get("email")
    celular = request.form.get("celular")
    contactar = request.form.get("contactar")
    contacto_id = request.form.get("contacto-id")
    inicio = request.form.get("inicio")
    termino = request.form.get("termino") or None
    descripcion = request.form.get("descripcion")
    tema = request.form.get("tema")
    tema_otro = request.form.get("tema-descripcion") if tema == "otro" else None
    fotos = request.files.getlist("foto[]")

    # validaciones server-side
    if not comuna_id or not nombre or not email or not inicio or not tema:
        flash("Faltan campos obligatorios.")
        session_db.close()
        return redirect(url_for("agregar"))

    try:
        inicio_dt = datetime.strptime(inicio, "%Y-%m-%dT%H:%M")
        termino_dt = datetime.strptime(termino, "%Y-%m-%dT%H:%M") if termino else None
    except ValueError:
        flash("Formato de fecha inválido.")
        session_db.close()
        return redirect(url_for("agregar"))

    actividad = Actividad(
        comuna_id=comuna_id,
        sector=sector,
        nombre=nombre,
        email=email,
        celular=celular,
        dia_hora_inicio=inicio_dt,
        dia_hora_termino=termino_dt,
        descripcion=descripcion
    )

    session_db.add(actividad)
    session_db.commit()

    for foto in fotos:
        if foto.filename:
            nombre_archivo = secure_filename(foto.filename)
            ruta = os.path.join(app.config["UPLOAD_FOLDER"], nombre_archivo)
            foto.save(ruta)
            nueva_foto = Foto(nombre_archivo=nombre_archivo, ruta_archivo=ruta, actividad_id=actividad.id)
            session_db.add(nueva_foto)

    session_db.add(ActividadTema(tema=tema, glosa_otro=tema_otro, actividad_id=actividad.id))

    if contactar and contacto_id:
        contacto = ContactarPor(nombre=contactar, identificador=contacto_id, actividad_id=actividad.id)
        session_db.add(contacto)

    session_db.commit()
    session_db.close()

    flash("Actividad agregada correctamente.")
    return redirect(url_for("index"))

@app.route("/listado")
def listado():
    session_db = SessionLocal()
    page = request.args.get("page", default=1, type=int)
    per_page = 5

    actividades_query = session_db.query(Actividad).order_by(Actividad.dia_hora_inicio.desc())
    total = actividades_query.count()
    actividades = actividades_query.offset((page - 1) * per_page).limit(per_page).all()

    datos = []
    for act in actividades:
        datos.append({
            "id": act.id,
            "inicio": act.dia_hora_inicio.strftime("%Y-%m-%d %H:%M"),
            "termino": act.dia_hora_termino.strftime("%Y-%m-%d %H:%M") if act.dia_hora_termino else "-",
            "comuna": act.comuna.nombre,
            "sector": act.sector,
            "tema": act.temas[0].tema.capitalize() if act.temas else "",
            "organizador": act.nombre,
            "descripcion": act.descripcion,
            "fotos": [f"uploads/{foto.nombre_archivo}" for foto in act.fotos],
            "foto_count": len(act.fotos)
        })

    session_db.close()

    total_pages = (total + per_page - 1) // per_page
    pagination = {
        "has_prev": page > 1,
        "has_next": page < total_pages,
        "prev_num": page - 1,
        "next_num": page + 1,
        "page": page,
        "total_pages": total_pages
    }

    return render_template("listado.html", actividades=datos, pagination=pagination)

@app.route("/estadisticas")
def estadisticas():
    return render_template("estadisticas.html")

if __name__ == "__main__":
    app.run(debug=True)
