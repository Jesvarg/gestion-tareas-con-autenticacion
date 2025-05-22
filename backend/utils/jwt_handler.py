from functools import wraps
from flask_jwt_extended import (
    create_access_token,
    verify_jwt_in_request,
    get_jwt_identity
)

def generate_token(username):
    return create_access_token(identity=username)

def token_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        verify_jwt_in_request()
        current_user = get_jwt_identity()
        return fn(current_user, *args, **kwargs)
    return wrapper