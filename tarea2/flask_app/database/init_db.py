from app import app
from database.db import db
import database.models  

# crear tablas en la db
with app.app_context():
    db.drop_all()      
    db.create_all()     
    print("Tablas creadas")
