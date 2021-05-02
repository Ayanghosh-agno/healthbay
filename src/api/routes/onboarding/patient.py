from flask import request, jsonify, make_response, current_app
from werkzeug.utils import secure_filename
from google.cloud import storage

import os
import uuid

from ... import db
from ...middleware.firebase_auth import token_required
from ...models.user import User
from ...routes import api as app
from ...models.patient import Patient

storage_client = storage.Client()
bucket_name = os.environ.get("bucket_name", "healthbay")


@app.route("/onboarding/user", methods=["POST"])
@token_required
def create_user(current_user: User):
    name, height, weight = (
        request.form["name"],
        float(request.form["height"]),
        float(request.form["weight"]),
    )
    dob, blood_group, contact = (
        request.form["dob"],
        request.form["blood_group"],
        request.form["contact"],
    )

    file = request.files["picture"]
    filename = secure_filename(file.filename)
    filepath = os.path.join(current_app.config["UPLOAD_FOLDER"], filename)
    file.save(filepath)

    picture_name = f"{uuid.uuid4()}{os.path.splitext(filepath)[1]}"
    storage_client = storage.Client()
    bucket = storage_client.get_bucket(bucket_name)
    blob = storage.Blob(picture_name, bucket)
    blob.upload_from_filename(filepath)

    picture = f"https://storage.googleapis.com/{bucket_name}/{picture_name}"

    os.unlink(filepath)

    try:
        patient_obj = Patient(name, height, weight, dob, blood_group, picture, contact)
        patient_obj.user_id = current_user.uid
        current_user.type = 2
        db.session.add(patient_obj)
        db.session.add(current_user)
        db.session.commit()

    except Exception as e:
        return make_response(
            jsonify(
                {
                    "status": "Failed",
                    "message": e,
                }
            ),
            400,
        )

    return make_response(
        jsonify(
            {
                "status": "OK",
                "message": "Successfully onboarded patient",
                "data": patient_obj.serialize,
            }
        ),
        200,
    )
