from utils.data_store import DataStore
from utils.jwt_handler import generate_token
from models.user import User

class AuthManager:
    @staticmethod
    def register_user(username, password):
        if DataStore.get_user_by_username(username):
            raise ValueError("Usuario ya existe")
        user = User(username, password)
        DataStore.add_user(user)
        return {"message": "Usuario creado", "username": username}

    @staticmethod
    def login_user(username, password):
        user = DataStore.get_user_by_username(username)
        if not user or user.password != password:
            raise ValueError("Credenciales inválidas")
        return {"token": generate_token(username)}