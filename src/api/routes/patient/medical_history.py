from flask import json, request, jsonify, make_response
from sqlalchemy import desc

from ... import db
from ...middleware.firebase_auth import token_required
from ...models.user import User
from ...models.patient import Patient
from ...models.medical_history import MedicalHistoryBlockChain
from ...routes import api as app
from ...settings import GENESIS
from ...utils import generate_sha_256_hash


@app.route("/user/medical-history", methods=["POST"])
@token_required
def add_medical_history(current_user: User):
    _type = request.json["type"]
    _title = request.json["title"]
    _description = request.json["description"]
    _year = int(request.json["year"])

    try:
        if current_user.type != 2:
            return make_response(
                jsonify(
                    {
                        "status": "FAIL",
                        "message": "To add medical history, you need to be a patient",
                    }
                ),
                400,
            )

        patient_obj = Patient.query.filter_by(user_id=current_user.uid).first()
        last_medical_history: MedicalHistoryBlockChain = (
            MedicalHistoryBlockChain.query.order_by(desc("id")).first()
        )
        if last_medical_history:
            _old_hash = last_medical_history.sha_hash
        else:
            _old_hash = GENESIS
        medical_history_obj = MedicalHistoryBlockChain(
            _type,
            _title,
            _description,
            _year,
            generate_sha_256_hash(
                _type, _title, _description, str(_year), _old_hash),
        )
        medical_history_obj.patient_id = patient_obj.id
        db.session.add(medical_history_obj)
        db.session.commit()

    except Exception as e:
        return make_response(
            jsonify(
                {
                    "status": "FAIL",
                    "message": e,
                }
            ),
            400,
        )

    return make_response(
        jsonify(
            {
                "status": "OK",
                "message": "Successfully added medical history",
                "data": medical_history_obj.serialize,
            }
        ),
        200,
    )


@app.route("/user/medical-history/<patientId>", methods=["GET"])
@token_required
def fetch_medical_history(current_user: User, patientId):
    patient_history: Patient = [
        history.serialize_all
        for history in
        MedicalHistoryBlockChain.query.filter_by(patient_id=patientId).all()
    ]

    return make_response(
        jsonify({"status": "OK", "data": patient_history}),
        200,
    )


@app.route("/blockchain", methods=["GET"])
def blockchain():
    chain: Patient = [
        history.serialize_all
        for history in
        MedicalHistoryBlockChain.query.all()
    ]

    return make_response(
        jsonify({
            "status": "OK",
            "genesis": GENESIS,
            "data": chain
        })
    )
