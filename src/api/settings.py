import os

ADMIN = "admin@healthbay.us"
GENESIS = os.environ.get("GENESIS")
project_id = os.environ.get("FIREBASE_PROJECT_ID")
private_key_id = os.environ.get("FIREBASE_PRIVATE_KEY_ID")
private_key = os.environ.get("FIREBASE_PRIVATE_KEY").replace("\\n", "\n")
client_email = os.environ.get("FIREBASE_CLIENT_EMAIL")
client_id = os.environ.get("FIREBASE_CLIENT_ID")
client_x509_cert_url = os.environ.get("FIREBASE_CLIENT_CERT_URL")

FIREBASE_CONFIG = {
    "type": "service_account",
    "project_id": project_id,
    "private_key_id": private_key_id,
    "private_key": private_key,
    "client_email": client_email,
    "client_id": client_id,
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://accounts.google.com/o/oauth2/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": client_x509_cert_url,
}
