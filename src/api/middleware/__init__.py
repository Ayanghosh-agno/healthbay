import firebase_admin

from api import settings

cred = firebase_admin.credentials.Certificate(settings.FIREBASE_CONFIG)

firebase_app = firebase_admin.initialize_app(cred)
