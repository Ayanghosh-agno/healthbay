from functools import wraps
from typing import Optional
from flask import request, jsonify, make_response

from firebase_admin import auth

from .. import db
from ..models.user import User


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        bearer_token = None
        auth_header = request.headers.get("Authorization")
        if auth_header:
            try:
                bearer_token = auth_header.split(" ")[1]
            except Exception:
                pass
        if bearer_token:
            current_user = Middleware.get_user_from_token(bearer_token)
            if isinstance(current_user, User):
                return f(current_user, *args, **kwargs)
            return make_response(
                jsonify({"status": "FAIL", "message": "Authorization failed"}), 401
            )

    return decorated


class Middleware:
    @classmethod
    def get_user_from_token(cls, firebase_token) -> Optional[User]:
        try:
            payload = auth.verify_id_token(firebase_token)
        except (
            auth.ExpiredIdTokenError,
            auth.InvalidIdTokenError,
            auth.RevokedIdTokenError,
        ):
            return None

        if payload["firebase"]["sign_in_provider"] == "anonymous":
            return None

        uid = payload["uid"]

        user = cls.get_user(uid)
        if not user:
            user = cls.create_user(uid, payload["email"])

        return user

    @staticmethod
    def get_user(uid: str) -> User:
        return User.query.filter_by(uid=uid).first()

    @staticmethod
    def create_user(uid: str, email: str) -> User:
        user_obj = User(uid, email)
        db.session.add(user_obj)
        db.session.commit()

        return user_obj
