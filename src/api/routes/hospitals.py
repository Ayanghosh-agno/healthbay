from flask import jsonify, make_response

from . import api as app
from ..middleware.firebase_auth import token_required
from ..models.hospital import Hospital
from ..models.user import User


@app.route("/hospitals", methods=["GET"])
@token_required
def get_hospitals(current_user: User):
    try:
        hospitals = [
            hospital.serialize
            for hospital in Hospital.query.filter_by(verified=True).all()
        ]
        res = {"status": "OK", "data": hospitals}
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
