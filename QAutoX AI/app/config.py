import os
from dotenv import load_dotenv

# Find the .env file in the project root
env_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env')
load_dotenv(dotenv_path=env_path)

class Config:
    UPLOAD_FOLDER = os.environ.get('UPLOAD_FOLDER') or 'uploads'
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB max file size
    ALLOWED_EXTENSIONS = {'pdf', 'docx', 'txt'}
    GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
    DATABASE_URI = os.environ.get('DATABASE_URI') or 'database.db'
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-key-change-this-in-prod'
    
    # Confluence Configuration
    CONFLUENCE_URL = os.environ.get('CONFLUENCE_URL')
    CONFLUENCE_EMAIL = os.environ.get('CONFLUENCE_EMAIL')
    CONFLUENCE_API_TOKEN = os.environ.get('CONFLUENCE_API_TOKEN')

    # Jira Configuration
    JIRA_URL = os.environ.get('JIRA_URL')
    JIRA_EMAIL = os.environ.get('JIRA_EMAIL')
    JIRA_API_TOKEN = os.environ.get('JIRA_API_TOKEN')
    JIRA_PROJECT_KEY = os.environ.get('JIRA_PROJECT_KEY', 'TEST')
    
    # Available products in the system
    AVAILABLE_PRODUCTS = [
        'ERP',
        'HRMS',
        'Camp Nueron',
        'Camp Accomodation Management'
    ]

class DevelopmentConfig(Config):
    DEBUG = True

class ProductionConfig(Config):
    DEBUG = False

config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}
