from flask import request, jsonify, make_response
from geopy.distance import geodesic
import json

from ... import db
from ...middleware.firebase_auth import token_required
from ...models.user import User
from ...models.patient import Patient
from ...models.ambulance import Ambulance
from ...routes import api as app


@app.route("/user/emergency", methods=["POST"])
@token_required
def user_in_emergency(current_user: User):
    patient_obj: Patient = Patient.query.filter_by(
        user_id=current_user.uid).first()

    if patient_obj and patient_obj.serialize:
        ambs = [a.serialize_all for a in Ambulance.query.filter_by(
            in_service=True).all()]

        ploc = json.loads(request.json["location"])
        p_lat, p_lng = ploc["lat"], ploc["lng"]

        ax = []
        for amb in ambs:
            if amb["location"] != None:
                amb_l = json.loads(amb["location"])
                amb_lat, amb_lng = amb_l["lat"], amb_l["lng"]

                ax.append({"entity": amb, "distance": geodesic(
                    (p_lat, p_lng), (amb_lat, amb_lng)).kilometers})

        try:
            best_amb = sorted(ax, key=lambda a: a["distance"])[0]

            patient_obj.emergency = True
            patient_obj.emergency_ambulance = best_amb["entity"]["id"]
            patient_obj.emergency_location = request.json["location"]

            db.session.add(patient_obj)
            db.session.commit()

            return make_response(
                jsonify(
                    {
                        "status": "OK",
                        "data": best_amb
                    }
                ),
                200,
            )
        except IndexError:
            return make_response(
                jsonify(
                    {
                        "status": "OK",
                        "data": None
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


@app.route("/user/emergency/add-hospital", methods=["POST"])
@token_required
def user_add_hosp_emer(current_user: User):
    patient_obj: Patient = Patient.query.filter_by(
        user_id=current_user.uid).first()

    if patient_obj and patient_obj.serialize["emergency"] == True:
        patient_obj.emergency_hospital = request.json["hospital_id"]

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


@app.route("/user/emergency", methods=["DELETE"])
@token_required
def user_del_emergency(current_user: User):
    patient_obj: Patient = Patient.query.filter_by(
        user_id=current_user.uid).first()

    if patient_obj and patient_obj.serialize["emergency"] == True:
        patient_obj.emergency = False
        patient_obj.emergency_location = None
        patient_obj.emergency_hospital = None
        patient_obj.emergency_ambulance = None

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
