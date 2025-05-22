class DataStore:
    users = {}  # {username: User}
    tasks = {}  # {user_id: [Task]}
    next_user_id = 1

    @classmethod
    def get_user_by_username(cls, username):
        return cls.users.get(username)

    @classmethod
    def add_user(cls, user):
        user.id = cls.next_user_id
        cls.users[user.username] = user
        cls.tasks[user.id] = []
        cls.next_user_id += 1