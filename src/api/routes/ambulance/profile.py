from flask import request, jsonify, make_response

from ...middleware.firebase_auth import token_required
from ...models.user import User
from ...models.ambulance import Ambulance
from ...models.patient import Patient
from ...routes import api as app
from ... import db, socketio


@app.route("/ambulance/profile/<ambulanceId>", methods=["GET"])
@token_required
def ambulance_profile(current_user: User, ambulanceId):
    ambulance_obj: Ambulance = Ambulance.query.filter_by(
        id=ambulanceId).first()

    if ambulance_obj:
        return make_response(
            jsonify({"status": "OK", "data": ambulance_obj.serialize_all}),
            200,
        )
    else:
        return make_response(
            jsonify({"status": "NOT_FOUND", "data": None}),
            400,
        )


@app.route("/ambulance/service", methods=["POST"])
@token_required
def ambulance_service(current_user: User):
    ambulance_obj: Ambulance = Ambulance.query.filter_by(
        user_id=current_user.uid).first()

    if ambulance_obj:
        ambulance_obj.in_service = request.json["in_service"]
        db.session.add(ambulance_obj)
        db.session.commit()

        return make_response(
            jsonify(
                {
                    "status": "OK",
                    "message": "Ambulance In/Out Service Updated!",
                }
            ),
            200,
        )
    else:
        return make_response(
            jsonify({"status": "NOT_FOUND", "data": None}),
            400,
        )


@app.route("/ambulance/update-location", methods=["POST"])
@token_required
def ambulance_update_location(current_user: User):
    ambulance_obj: Ambulance = Ambulance.query.filter_by(
        user_id=current_user.uid).first()

    if ambulance_obj:
        ambulance_obj.location = request.json["lox"]
        db.session.add(ambulance_obj)
        db.session.commit()

        socketio.emit("ambulance-location", {'id': ambulance_obj.serialize["id"], 'loc': request.json["lox"]}, broadcast=False,
                      namespace="/ambLocation")

        return make_response(
            jsonify(
                {
                    "status": "OK",
                    "message": "Ambulance location updated successfully",
                }
            ),
            200,
        )
    else:
        return make_response(
            jsonify({"status": "NOT_FOUND", "data": None}),
            400,
        )


@app.route("/ambulance/emergency", methods=["GET"])
@token_required
def ambulance_get_emergency(current_user: User):
    ambulance_obj: Ambulance = Ambulance.query.filter_by(
        user_id=current_user.uid).first()

    if ambulance_obj:
        patient_obj: Patient = Patient.query.filter_by(
            emergency_ambulance=ambulance_obj.id).first()

        if patient_obj and patient_obj.serialize["emergency"] == True:
            return make_response(jsonify({
                "status": "OK",
                "data": patient_obj.serialize
            }), 200)

        return make_response(
            jsonify(
                {
                    "status": "NOT_FOUND",
                    "message": "Patient not found",
                }
            ),
            400,
        )
    else:
        return make_response(
            jsonify({"status": "NOT_FOUND", "data": None}),
            400,
        )
