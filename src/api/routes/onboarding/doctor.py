import json

from flask import request, jsonify, make_response, current_app
from werkzeug.utils import secure_filename
from google.cloud import storage

import os
import uuid

from ... import db
from ...middleware.firebase_auth import token_required
from ...models.user import User
from ...routes import api as app
from ...models.doctor import Doctor
from ...models.hospital import Hospital

storage_client = storage.Client()
bucket_name = os.environ.get("bucket_name", "healthbay")


@app.route("/onboarding/doctor", methods=["POST"])
@token_required
def create_doctor(current_user: User):
    hospital_id = request.form.get("hospital", None)
    hospital_obj = None
    if hospital_id:
        hospital_obj: Hospital = Hospital.query.filter_by(
            id=hospital_id).first()
        if not hospital_obj:
            return make_response(
                jsonify(
                    {
                        "status": "FAIL",
                        "message": "Hospital Does not exists",
                    }
                ),
                400,
            )

    name = request.form["name"]
    license_no = request.form["license_no"]
    specialization = request.form["specialization"]
    contact = request.form["contact"]
    chamber_location = request.form.get("chamber_location", None)
    timings = request.form["timings"]
    picture = request.files["picture"]
    license_photo = request.files["license_doc"]

    # picture
    picture_filepath = secure_filename(picture.filename)
    picture_filepath = os.path.join(
        current_app.config["UPLOAD_FOLDER"], picture_filepath
    )
    picture.save(picture_filepath)
    picture_name = f"{uuid.uuid4()}{os.path.splitext(picture_filepath)[1]}"
    storage_client = storage.Client()
    bucket = storage_client.get_bucket(bucket_name)
    blob = storage.Blob(picture_name, bucket)
    blob.upload_from_filename(picture_filepath)
    picture = f"https://storage.googleapis.com/{bucket_name}/{picture_name}"
    os.unlink(picture_filepath)

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
        doctor_obj = Doctor(
            name,
            picture,
            license_no,
            license_photo,
            specialization,
            contact,
            timings,
        )
        doctor_obj.user_id = current_user.uid
        if hospital_obj:
            doctor_obj.hospital_id = hospital_obj.id
        else:
            doctor_obj.chamber_location = chamber_location
        current_user.type = 1
        db.session.add(doctor_obj)
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
                "message": "Successfully onboarded doctor",
                "data": doctor_obj.serialize,
            }
        ),
        200,
    )
