from flask import Blueprint, request, jsonify
from flask_jwt_extended import get_jwt_identity
from services.task_manager import TaskManager
from utils.data_store import DataStore
from utils.jwt_handler import token_required 

task_bp = Blueprint('tasks', __name__, url_prefix='/api')

@task_bp.route('/tasks', methods=['GET'])
@token_required
def get_tasks(username):
    try:
        user = DataStore.get_user_by_username(username)
        if not user:
            return jsonify({"error": "Usuario no encontrado"}), 404
        tasks = TaskManager.get_tasks_for_user(username)
        return jsonify([t.__dict__ for t in tasks]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@task_bp.route('/tasks', methods=['POST'])
@token_required
def create_task(username):
    data = request.get_json()
    user = get_jwt_identity()
    if not data.get('title') or not data.get('description'):
        return jsonify({"error": "Faltan datos requeridos"}), 400
    try:
        user = DataStore.get_user_by_username(username)
        if not user:
            return jsonify({"error": "Usuario no encontrado"}), 404
        task = TaskManager.create_task(data['title'], data['description'], user.id)
        return jsonify(task.__dict__), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400