# src/api/routes.py
from flask import Blueprint, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from sqlalchemy import select
from api.models import db, User

api = Blueprint('api', __name__)
CORS(api)  # también a nivel blueprint (extra)

@api.route('/hello', methods=['GET'])
def hello():
    return jsonify({"message": "Hello from Flask API 👋"}), 200

@api.route('/signup', methods=['POST'])
def signup():
    data = request.get_json() or {}
    email = (data.get("email") or "").strip().lower()
    password = (data.get("password") or "").strip()

    if not email or not password:
        return jsonify({"success": False, "msg": "email y password son requeridos"}), 400

    if db.session.execute(select(User).where(User.email == email)).scalar_one_or_none():
        return jsonify({"success": False, "msg": "email ya registrado"}), 409

    user = User(email=email, password=password, is_active=True)
    db.session.add(user)
    db.session.commit()
    return jsonify({"success": True, "msg": "usuario creado, inicia sesión"}), 201

@api.route('/login', methods=['POST'])
def login():
    data = request.get_json() or {}
    email = (data.get("email") or "").strip().lower()
    password = (data.get("password") or "").strip()

    user = db.session.execute(select(User).where(User.email == email)).scalar_one_or_none()
    if not user or user.password != password:
        return jsonify({"success": False, "msg": "email/contraseña inválidos"}), 401

    # identity debe ser string
    access_token = create_access_token(identity=str(user.id))
    return jsonify({"success": True, "token": access_token, "user": user.serialize()}), 200

@api.route('/private', methods=['GET'])
@jwt_required()
def private():
    user_id = get_jwt_identity()  # es string
    user = db.session.get(User, int(user_id))
    return jsonify({"success": True, "user": user.serialize()}), 200
