from flask import Blueprint, request, jsonify
from models.auth import AuthManager
from flask_jwt_extended import create_access_token

auth_bp = Blueprint('auth', __name__, url_prefix='/api')

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if not data.get('username') or not data.get('password'):
        return jsonify({"error": "Ingresa los datos faltantes"}), 400
    try:
        result = AuthManager.register_user(data['username'], data['password'])
        return jsonify(result), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

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