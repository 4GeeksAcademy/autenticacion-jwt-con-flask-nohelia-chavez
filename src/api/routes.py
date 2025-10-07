from flask import Blueprint, request, jsonify
from api.models import db, User
from flask_cors import CORS  #agrega los headers para que el front pueda llamar a la api
from sqlalchemy import select
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__) #se crea el blueprint llamado api
CORS(api) 


#GET /api/hello para verificar que el back corre responde con un json simple
@api.get('/hello')
def hello():
    return jsonify({"message": "Backend OK 👋"}), 200

#registro lee json del body  POST
@api.post('/signup')
def signup():
    data = request.get_json() or {}
    email = (data.get("email") or "").strip().lower() #normaliza el email: strip() quita espacios; lower() evita duplicados por mayuscula y minuscula
    password = data.get("password") # se toma tal cual , en produccion se hashea


#valida campos: sin email o password 400 bad request
    if not email or not password:
        return jsonify({"msg": "email y password requeridos"}), 400
    
    #busca el email si esta en uso sie existe entra en conflicto 409

    exists = db.session.execute(select(User).where(User.email == email)).scalar_one_or_none()
    if exists:
        return jsonify({"msg": "Ese email ya existe"}), 409
    
    #crea el user y commit responde 201 y a login

    user = User(email=email, password=password, is_active=True)
    db.session.add(user)
    db.session.commit()
    return jsonify({"msg": "usuario creado, inicia sesión"}), 201

#login  POST
@api.post('/login')
def login():
    data = request.get_json() or {}
    email = (data.get("email") or "").strip().lower()
    password = data.get("password")

#ambos campos obligatorios
    if not email or not password:
        return jsonify({"msg": "email y password requeridos"}), 400 #si no existe o la contraseña no coincide → 401 

    user = db.session.execute(select(User).where(User.email == email)).scalar_one_or_none()
    if not user or user.password != password:
        # mismísimo 401 que ves en la red
        return jsonify({"msg": "email/contraseña inválidos"}), 401

    # identity debe ser string o int; usamos str por seguridad
    token = create_access_token(identity=str(user.id))
    return jsonify({"token": token, "user": user.serialize()}), 200

#ruta privada  GET
@api.get('/private')
@jwt_required()
def private():
    uid = get_jwt_identity()  # viene como string
    user = db.session.get(User, int(uid))
    return jsonify({"msg": "acceso permitido", "user": user.serialize()}), 200
