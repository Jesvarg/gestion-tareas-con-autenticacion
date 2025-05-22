# Ejemplo básico de config.py
import os
from datetime import timedelta

# Configuración general
DEBUG = True
SECRET_KEY = os.environ.get('SECRET_KEY', 'mi-clave-secreta-desarrollo')

# Configuración JWT
JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY', SECRET_KEY)
JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)
JWT_TOKEN_LOCATION = ['headers']  # Busca el token en los encabezados
JWT_HEADER_NAME = 'Authorization'  # Nombre del encabezado
JWT_HEADER_TYPE = 'Bearer'

# Configuración SSL para desarrollo
# SSL_CONTEXT = ('cert.pem', 'key.pem')  # Requiere generar certificados