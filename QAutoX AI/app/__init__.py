import os
import logging
from flask import Flask
from .config import config
from flask_login import LoginManager

# Configure logging
logging.basicConfig(level=logging.DEBUG, 
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
                    filename='app.log',
                    filemode='a')
logger = logging.getLogger(__name__)

def create_app(config_name='default'):
    app = Flask(__name__)
    app.config.from_object(config[config_name])
    
    # Initialize Flask-Login
    login_manager = LoginManager()
    login_manager.login_view = 'auth.login'
    login_manager.init_app(app)

    from .models import get_user_by_id
    @login_manager.user_loader
    def load_user(user_id):
        return get_user_by_id(user_id)
    
    # Ensure upload folder exists
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    
    # Initialize Database
    from .models import init_db
    init_db()
    
    # Register Blueprints
    from .routes import main_bp
    app.register_blueprint(main_bp)

    from .auth.routes import auth_bp
    app.register_blueprint(auth_bp)

    from .admin.routes import admin_bp
    app.register_blueprint(admin_bp)
    
    return app
