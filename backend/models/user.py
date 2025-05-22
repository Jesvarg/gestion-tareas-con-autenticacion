class User:
    def __init__(self, username, password):
        self.username = username
        self.password = password  # En producción debe hashear
        self.tasks = []