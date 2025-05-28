from flask import Flask
from flask_cors import CORS
from routes.auth_routes import auth_bp
from routes.task_routes import task_bp
from config import JWT_SECRET_KEY, JWT_ACCESS_TOKEN_EXPIRES
from flask_jwt_extended import JWTManager

app = Flask(__name__)


app.config.from_object('config')
jwt = JWTManager(app)
CORS(app)

# Registrar blueprints
app.register_blueprint(auth_bp)
app.register_blueprint(task_bp)

if __name__ == '__main__':
    app.run(debug=True, port=5000) 