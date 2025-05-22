from utils.data_store import DataStore
from models.task import Task

class TaskManager:
    @staticmethod
    def get_tasks_for_user(username):
        user = DataStore.get_user_by_username(username)
        if not user:
            raise ValueError("Usuario no encontrado")
        return DataStore.tasks.get(user.id, [])

    @staticmethod
    def create_task(title, description, user_id):
        task = Task(title, description, user_id)
        DataStore.tasks[user_id].append(task)
        return task