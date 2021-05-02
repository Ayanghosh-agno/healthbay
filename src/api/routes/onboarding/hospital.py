from flask import request, jsonify, make_response, current_app
from werkzeug.utils import secure_filename
from google.cloud import storage

import os
import uuid

from ... import db
from ...middleware.firebase_auth import token_required
from ...models.user import User
from ...routes import api as app
from ...models.hospital import Hospital

storage_client = storage.Client()
bucket_name = os.environ.get("bucket_name", "healthbay")


@app.route("/onboarding/hospital", methods=["POST"])
@token_required
def create_hospital(current_user: User):
    name = request.form["name"]
    license_no = request.form["license_no"]
    location = request.form["location"]
    contact = request.form["contact"]
    bed_capacity = request.form["bed_capacity"]
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
        hospital_obj = Hospital(
            name,
            location,
            license_no,
            license_photo,
            bed_capacity,
            contact,
        )
        hospital_obj.user_id = current_user.uid
        current_user.type = 3
        db.session.add(hospital_obj)
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
                "data": hospital_obj.serialize,
            }
        ),
        200,
    )
