from flask import request, jsonify, make_response

from ... import db
from ...middleware.firebase_auth import token_required
from ...models.user import User
from ...models.patient import Patient
from ...routes import api as app


@app.route("/user/add-oxymeter", methods=["POST"])
@token_required
def add_patient_oxymeter(current_user: User):
    patient_obj: Patient = Patient.query.filter_by(user_id=current_user.uid).first()

    if patient_obj:
        patient_obj.device_id = request.json["oxymeter_id"]

        db.session.add(patient_obj)
        db.session.commit()

        return make_response(
            jsonify(
                {
                    "status": "OK",
                }
            ),
            200,
        )
    else:
        return make_response(
            jsonify(
                {
                    "status": "NOT_FOUND",
                }
            ),
            400,
        )
