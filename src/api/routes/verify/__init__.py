from flask import jsonify, make_response, request

from .. import api as app
from ... import db
from ...middleware.firebase_auth import token_required
from ...models.hospital import Hospital
from ...models.doctor import Doctor
from ...models.ambulance import Ambulance
from ...models.user import User


@app.route("/unverified", methods=["GET"])
@token_required
def get_unverified(current_user: User):
    try:
        hospitals = [
            hospital.serialize_all
            for hospital in Hospital.query.filter_by(verified=False).all()
        ]
        doctors = [
            doctor.serialize_all
            for doctor in Doctor.query.filter_by(verified=False).all()
        ]
        ambulances = [
            ambulance.serialize_all
            for ambulance in Ambulance.query.filter_by(verified=False).all()
        ]
        res = {"status": "OK", "data": hospitals + doctors + ambulances}
        return make_response(jsonify(res), 200)
    except Exception as e:
        return make_response(
            jsonify(
                {
                    "status": "ERROR",
                    "message": e,
                }
            ),
            500,
        )


@app.route("/verify", methods=["POST"])
@token_required
def get_verified(current_user: User):
    _id = request.json["id"]
    _type = request.json["type"]
    if _type not in ["DOCTOR", "HOSPITAL", "AMBULANCE"]:
        return make_response(
            jsonify(
                {
                    "status": "FAIL",
                    "message": "type should be in DOCTOR, HOSPITAL, AMBULANCE",
                }
            ),
            400,
        )

    db_obj = None
    if _type == "DOCTOR":
        db_obj = Doctor.query.filter_by(id=_id).first()
    elif _type == "HOSPITAL":
        db_obj = Hospital.query.filter_by(id=_id).first()
    elif _type == "AMBULANCE":
        db_obj = Ambulance.query.filter_by(id=_id).first()

    if db_obj:
        db_obj.verified = True
        db.session.add(db_obj)
        db.session.commit()
        return make_response(
            jsonify(
                {
                    "status": "OK",
                    "message": "Hospital Verified Successfully",
                }
            ),
            200,
        )

    return make_response(
        jsonify(
            {
                "status": "OK",
                "message": "No data found",
            }
        ),
        400,
    )
