from typing import List

from flask import request, jsonify, make_response

from ...middleware.firebase_auth import token_required
from ... import db
from ...models.user import User
from ...models.patient import Patient
from ...models.doctor import Doctor
from ...models.treatment import Treatment, TreatmentChats
from ...routes import api as app


@app.route("/doctor/treatment/<treatmentID>/chat", methods=["POST"])
@token_required
def doctor_make_message(current_user: User, treatmentID):
    treatment_obj: Treatment = Treatment.query.filter_by(id=treatmentID).first()
    if not treatment_obj:
        return make_response(
            jsonify({"status": "FAIL", "data": "INVALID TREATMENT ID"}),
            400,
        )

    msg = request.json["msg"]
    _type = request.json["type"]

    try:
        treatment_chat_obj: TreatmentChats = TreatmentChats(1, _type, msg)
        treatment_chat_obj.treatment_id = treatment_obj.id

        db.session.add(treatment_chat_obj)
        db.session.commit()

        return make_response(
            jsonify({"status": "OK", "data": {"id": treatment_chat_obj.id}}),
            200,
        )
    except Exception:
        return make_response(
            jsonify({"status": "FAIL", "data": "You are not a doctor"}),
            400,
        )


@app.route("/doctor/treatment/<treatmentID>/messages", methods=["GET"])
@token_required
def get_doctor_messages(current_user: User, treatmentID):
    treatment_obj: Treatment = Treatment.query.filter_by(id=treatmentID).first()
    if not treatment_obj:
        return make_response(
            jsonify({"status": "FAIL", "data": "INVALID TREATMENT ID"}),
            400,
        )

    treatment_chats_serialized = list()
    treatment_chats: List[TreatmentChats] = TreatmentChats.query.filter_by(
        treatment_id=treatment_obj.id
    ).all()

    for treatment in treatment_chats:
        treatment_chats_serialized.append(treatment.serialize)

    return make_response(
        jsonify({"status": "OK", "data": treatment_chats_serialized}),
        200,
    )


@app.route("/doctor/treatment/<treatmentID>", methods=["DELETE"])
@token_required
def close_doctor_treatment(current_user: User, treatmentID):
    treatment_obj: Treatment = Treatment.query.filter_by(id=treatmentID).first()
    if not treatment_obj:
        return make_response(
            jsonify({"status": "FAIL", "data": "INVALID TREATMENT ID"}),
            400,
        )

    treatment_obj.closed = True

    db.session.add(treatment_obj)
    db.session.commit()

    return make_response(
        jsonify({"status": "OK", "data": "Closed Treatment"}),
        200,
    )


@app.route("/doctor/treatment", methods=["GET"])
@token_required
def get_doctor_treatments(current_user: User):
    doctor_obj: Doctor = Doctor.query.filter_by(user_id=current_user.uid).first()
    treatments_obj: List[Treatment] = Treatment.query.filter_by(doctor_id=doctor_obj.id).all()
    if not treatments_obj:
        return make_response(
            jsonify({"status": "FAIL", "data": "INVALID TREATMENT ID"}),
            400,
        )

    treatment_serialized = list()

    for treatment in treatments_obj:
        patient_obj: Patient = Patient.query.filter_by(id=treatment.patient_id).first()
        if not treatment.closed:
            treatment_serialized.append({
                "treatment_id": treatment.id,
                "patient": patient_obj.serialize,
                "closes": treatment.closed,
            })

    return make_response(
        jsonify({"status": "OK", "data": treatment_serialized}),
        200,
    )
