from flask import jsonify, make_response

from . import api as app
from ..settings import ADMIN
from ..middleware.firebase_auth import token_required
from ..models.user import User

from ..models.doctor import Doctor
from ..models.patient import Patient
from ..models.hospital import Hospital
from ..models.ambulance import Ambulance


@app.route("/whoami", methods=["GET"])
@token_required
def whoami(current_user: User):
    try:
        if current_user.email == ADMIN:
            res = {"status": "OK", "type": "ADMIN"}
        else:
            data = current_user.serialize

            id = None
            if data.get("type") == "DOCTOR":
                id = (
                    Doctor.query.filter_by(user_id=data.get("uid"))
                    .first()
                    .serialize.get("id")
                )
            elif data.get("type") == "PATIENT":
                id = (
                    Patient.query.filter_by(user_id=data.get("uid"))
                    .first()
                    .serialize.get("id")
                )
            elif data.get("type") == "HOSPITAL":
                id = (
                    Hospital.query.filter_by(user_id=data.get("uid"))
                    .first()
                    .serialize.get("id")
                )
            else:
                id = (
                    Ambulance.query.filter_by(user_id=data.get("uid"))
                    .first()
                    .serialize.get("id")
                )

            res = {"status": "OK", "type": data.get("type"), "id": id}
        return make_response(jsonify(res), 200)
    except Exception as e:
        return make_response(
            jsonify(
                {
                    "status": "ERROR",
                }
            ),
            500,
        )
