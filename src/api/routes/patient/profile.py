from flask import request, jsonify, make_response

from ...middleware.firebase_auth import token_required
from ...models.user import User
from ...models.patient import Patient
from ...routes import api as app

from ...utils.predict import predict_from_symptoms


@app.route("/user/profile/<patientId>", methods=["GET"])
@token_required
def patient_profile(current_user: User, patientId):
    patient_obj: Patient = Patient.query.filter_by(id=patientId).first()

    if patient_obj:
        return make_response(
            jsonify({"status": "OK", "data": patient_obj.serialize}),
            200,
        )
    else:
        return make_response(
            jsonify({"status": "NOT_FOUND", "data": None}),
            400,
        )


@app.route("/user/disease-from-symptoms", methods=["POST"])
@token_required
def patient_symptoms(current_user: User):
    symptoms = list(request.json["symptoms"])
    resp = predict_from_symptoms(symptoms)
    return make_response(
        jsonify({
            "status": "OK",
            "data": resp
        }), 200,
    )
