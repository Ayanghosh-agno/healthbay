from flask import request, jsonify, make_response

from ...middleware.firebase_auth import token_required
from ... import db
from ...models.user import User
from ...models.hospital import Hospital
from ...routes import api as app


@app.route("/hospital/profile/<hospitalId>", methods=["GET"])
@token_required
def hospital_profile(current_user: User, hospitalId):
    hospital_obj: Hospital = Hospital.query.filter_by(id=hospitalId).first()

    if hospital_obj:
        return make_response(
            jsonify({"status": "OK", "data": hospital_obj.serialize_all}),
            200,
        )
    else:
        return make_response(
            jsonify({"status": "NOT_FOUND", "data": None}),
            400,
        )


@app.route("/hospital/beds", methods=["PUT"])
@token_required
def hospital_bed_update(current_user: User):
    hospital_obj: Hospital = Hospital.query.filter_by(user_id=current_user.uid).first()
    hospital_obj.bed_capacity = request.json["filled_beds"]

    db.session.add(hospital_obj)
    db.session.commit()

    return make_response(
        jsonify({"status": "OK", "data": "Successfully updated bed"}),
        200,
    )
