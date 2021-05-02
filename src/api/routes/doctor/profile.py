from flask import request, jsonify, make_response

from ...middleware.firebase_auth import token_required
from ...models.user import User
from ...models.doctor import Doctor
from ...routes import api as app


@app.route("/doctor/profile/<doctorId>", methods=["GET"])
@token_required
def doctor_profile(current_user: User, doctorId):
    doctor_obj: Doctor = Doctor.query.filter_by(id=doctorId).first()

    if doctor_obj:
        return make_response(
            jsonify({"status": "OK", "data": doctor_obj.serialize_all}),
            200,
        )
    else:
        return make_response(
            jsonify({"status": "NOT_FOUND", "data": None}),
            400,
        )
