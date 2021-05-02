import json

from .. import db


class Doctor(db.Model):
    __tablename__ = "doctor"

    user_id = db.Column(db.String(150), db.ForeignKey("user.uid"), unique=True)
    hospital_id = db.Column(
        db.String(150), db.ForeignKey("hospital.id"), nullable=True)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    picture = db.Column(db.String(100))
    license_no = db.Column(db.String(100))
    license_photo = db.Column(db.String(100))
    specialization = db.Column(db.String(100))
    contact = db.Column(db.String(10))
    chamber_location = db.Column(db.String(100), nullable=True)
    timings = db.Column(db.String(100))

    verified = db.Column(db.Boolean)

    def __init__(
        self,
        name,
        picture,
        license_no,
        license_photo,
        specialization,
        contact,
        timings,
        verified=False,
    ):
        self.name = name
        self.picture = picture
        self.license_no = license_no
        self.license_photo = license_photo
        self.specialization = specialization
        self.contact = contact
        self.timings = timings
        self.verified = verified

    def __repr__(self):
        return f"<Doctor(id={self.id})>"

    @property
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "verified": self.verified,
        }

    @property
    def serialize_all(self):
        return {
            "id": self.id,
            "name": self.name,
            "verified": self.verified,
            "picture": self.picture,
            "license_no": self.license_no,
            "license_photo": self.license_photo,
            "specialization": self.specialization,
            "contact": self.contact,
            "timings": self.timings,
            "hospital_id": self.hospital_id,
            "chamber_location": self.chamber_location,
            "type": "doctor",
        }
