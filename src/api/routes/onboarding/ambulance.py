from flask import request, jsonify, make_response, current_app
from werkzeug.utils import secure_filename
from google.cloud import storage

import os
import uuid

from ... import db
from ...middleware.firebase_auth import token_required
from ...models.user import User
from ...routes import api as app
from ...models.ambulance import Ambulance

storage_client = storage.Client()
bucket_name = os.environ.get("bucket_name", "healthbay")


@app.route("/onboarding/ambulance", methods=["POST"])
@token_required
def create_ambulance(current_user: User):
    vehicle_no = request.form["vehicle_no"]
    license_no = request.form["license_no"]
    facilities = request.form["facilities"]
    contact = request.form["contact"]
    license_photo = request.files["license_doc"]

    # license
    license_photo_filepath = secure_filename(license_photo.filename)
    license_photo_filepath = os.path.join(
        current_app.config["UPLOAD_FOLDER"], license_photo_filepath
    )
    license_photo.save(license_photo_filepath)
    license_name = f"{uuid.uuid4()}{os.path.splitext(license_photo_filepath)[1]}"
    storage_client = storage.Client()
    bucket = storage_client.get_bucket(bucket_name)
    blob = storage.Blob(license_name, bucket)
    blob.upload_from_filename(license_photo_filepath)
    license_photo = f"https://storage.googleapis.com/{bucket_name}/{license_name}"
    os.unlink(license_photo_filepath)

    try:
        ambulance_obj = Ambulance(
            vehicle_no, facilities, license_no, license_photo, contact
        )
        ambulance_obj.user_id = current_user.uid
        current_user.type = 4
        db.session.add(ambulance_obj)
        db.session.add(current_user)
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
                "message": "Successfully onboarded hospital",
                "data": ambulance_obj.serialize,
            }
        ),
        200,
    )
