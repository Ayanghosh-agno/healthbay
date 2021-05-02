from typing import List

from flask import request, jsonify, make_response

from ...middleware.firebase_auth import token_required
from ... import db
from ...models.user import User
from ...models.patient import Patient
from ...models.doctor import Doctor
from ...models.hospital import Hospital
from ...models.treatment import Treatment, TreatmentChats
from ...routes import api as app


@app.route("/user/start-treatment", methods=["POST"])
@token_required
def start_treatment(current_user: User):
    patient_obj: Patient = Patient.query.filter_by(user_id=current_user.uid).first()
    doctor_id = request.json["doctor"]
    doctor_obj = Doctor.query.filter_by(id=doctor_id).first()

    if patient_obj:
        treatment_obj: Treatment = Treatment()
        treatment_obj.patient_id = patient_obj.id
        treatment_obj.doctor_id = doctor_obj.id

        db.session.add(treatment_obj)
        db.session.commit()

        return make_response(
            jsonify({"status": "OK", "data": {"id": treatment_obj.id}}),
            200,
        )
    else:
        return make_response(
            jsonify({"status": "FAIL", "data": "You are not a patient"}),
            400,
        )


@app.route("/user/treatment/<treatmentID>/chat", methods=["POST"])
@token_required
def make_message(current_user: User, treatmentID):
    treatment_obj: Treatment = Treatment.query.filter_by(id=treatmentID).first()
    if not treatment_obj:
        return make_response(
            jsonify({"status": "FAIL", "data": "INVALID TREATMENT ID"}),
            400,
        )

    msg = request.json["msg"]
    _type = request.json["type"]

    try:
        treatment_chat_obj: TreatmentChats = TreatmentChats(2, _type, msg)
        treatment_chat_obj.treatment_id = treatment_obj.id

        db.session.add(treatment_chat_obj)
        db.session.commit()

        return make_response(
            jsonify({"status": "OK", "data": {"id": treatment_chat_obj.id}}),
            200,
        )
    except Exception:
        return make_response(
            jsonify({"status": "FAIL", "data": "You are not a patient"}),
            400,
        )


@app.route("/user/treatment/<treatmentID>/messages", methods=["GET"])
@token_required
def get_messages(current_user: User, treatmentID):
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


@app.route("/user/treatment/<treatmentID>", methods=["DELETE"])
@token_required
def close_treatment(current_user: User, treatmentID):
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


@app.route("/user/treatments", methods=["GET"])
@token_required
def get_treatments(current_user: User):
    patient_obj: Patient = Patient.query.filter_by(user_id=current_user.uid).first()
    treatments_obj: List[Treatment] = Treatment.query.filter_by(patient_id=patient_obj.id).all()
    if not treatments_obj:
        return make_response(
            jsonify({"status": "FAIL", "data": "INVALID TREATMENT ID"}),
            400,
        )

    treatment_serialized = list()

    for treatment in treatments_obj:
        doctor_obj: Doctor = Doctor.query.filter_by(id=treatment.doctor_id).first()
        treatment_serialized.append({
            "treatment_id": treatment.id,
            "doctor": doctor_obj.serialize_all,
            "closes": treatment.closed,
        })

    return make_response(
        jsonify({"status": "OK", "data": treatment_serialized}),
        200,
    )


@app.route("/user/all-doctors-and-hospitals", methods=["GET"])
@token_required
def get_all_doctors_hospitals(current_user: User):
    doctors_obj: List[Doctor] = Doctor.query.all()
    hospitals_obj: List[Hospital] = Hospital.query.all()
    doctors, hospitals = list(), list()

    for doctor in doctors_obj:
        doctors.append(doctor.serialize_all)
    for hospital in hospitals_obj:
        hospitals.append(hospital.serialize_all)
    data = {"doctors": doctors, "hospitals": hospitals}

    return make_response(
        jsonify({"status": "OK", "data": data}),
        200,
    )
