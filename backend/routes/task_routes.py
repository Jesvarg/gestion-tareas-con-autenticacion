from flask import Blueprint, request, jsonify
from flask_jwt_extended import get_jwt_identity
from services.task_manager import TaskManager
from utils.data_store import DataStore
from utils.jwt_handler import token_required 

task_bp = Blueprint('tasks', __name__, url_prefix='/api')

# Obtener todas las tareas
@task_bp.route('/tasks', methods=['GET'])
@token_required
def get_tasks(username):
    try:
        user = DataStore.get_user_by_username(username)
        if not user:
            return jsonify({"error": "Usuario no encontrado"}), 404
        tasks = TaskManager.get_tasks_for_user(username)
        return jsonify([t.__dict__ for t in tasks] if tasks else []), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Obtener una tarea por ID    
@task_bp.route('/tasks/<task_id>', methods=['GET'])
@token_required
def get_task(username, task_id):
    try:
        user = DataStore.get_user_by_username(username)
        if not user:
            return jsonify({"error": "Usuario no encontrado"}), 404
        task = TaskManager.get_task_by_id(task_id, user.id)
        if not task:
            return jsonify({"error": "Tarea no encontrada"}), 404
        return jsonify(task.__dict__), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Crear una nueva tarea
@task_bp.route('/tasks', methods=['POST'])
@token_required
def create_task(username):
    data = request.get_json()
    if not data.get('title') or not data.get('description'):
        return jsonify({"error": "Ingresa los datos faltantes"}), 400
    try:
        user = DataStore.get_user_by_username(username)
        if not user:
            return jsonify({"error": "Usuario no encontrado"}), 404
        task = TaskManager.create_task(data['title'], data['description'], user.id)
        return jsonify(task.__dict__), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Actualizar una tarea
@task_bp.route('/tasks/<task_id>', methods=['PUT'])
@token_required
def update_task(username, task_id):
    data = request.get_json()
    if not data.get('title') or not data.get('description'):
        return jsonify({"error": "Ingresa los datos faltantes"}), 400
    try:
        user = DataStore.get_user_by_username(username)
        if not user:
            return jsonify({"error": "Usuario no encontrado"}), 404
        task = TaskManager.update_task(task_id, data['title'], data['description'], user.id)
        return jsonify(task.__dict__), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Eliminar una tarea
@task_bp.route('/tasks/<task_id>', methods=['DELETE'])
@token_required
def delete_task(username, task_id):
    try:
        user = DataStore.get_user_by_username(username)
        if not user:
            return jsonify({"error": "Usuario no encontrado"}), 404
        TaskManager.delete_task(task_id, user.id)
        return jsonify({"message": "Tarea eliminada"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400