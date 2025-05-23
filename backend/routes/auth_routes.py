from flask import Blueprint, request, jsonify
from models.auth import AuthManager
from flask_jwt_extended import create_access_token
from models.user import User

auth_bp = Blueprint('auth', __name__, url_prefix='/api')

@auth_bp.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            return jsonify({"error": "El nombre de usuario y la contraseña son obligatorios"}), 400

        if len(password) < 6:
            return jsonify({"error": "La contraseña debe tener al menos 6 caracteres"}), 400

        # Registrar al usuario utilizando AuthManager
        result = AuthManager.register_user(username, password)
        return jsonify({"message": "Usuario registrado exitosamente", "user": result}), 201
    except ValueError as ve:
        return jsonify({"error": str(ve)}), 400
    except Exception as e:
        return jsonify({"error": "Ocurrió un error al registrar el usuario", "details": str(e)}), 500

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data.get('username') or not data.get('password'):
        return jsonify({"error": "Ingresa los datos faltantes"}), 400
    try:
        access_token = create_access_token(identity=data['username'])
        return jsonify(access_token=access_token), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 401