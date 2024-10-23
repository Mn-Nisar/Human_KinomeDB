import os
import dotenv
import pathlib
from django.core.wsgi import get_wsgi_application

CURRENT_DIR = pathlib.Path(__file__).resolve().parent
BASE_DIR = CURRENT_DIR.parent
ENV_FILE_PATH = BASE_DIR / ".env"

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "kinomeDb.settings")

application = get_wsgi_application()
