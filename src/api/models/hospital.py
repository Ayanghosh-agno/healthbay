import json

from .. import db


class Hospital(db.Model):
    __tablename__ = "hospital"

    user_id = db.Column(db.String(150), db.ForeignKey("user.uid"), unique=True)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    location = db.Column(db.JSON)
    license_no = db.Column(db.String(100))
    license_photo = db.Column(db.String(100))
    bed_capacity = db.Column(db.String(100))
    contact = db.Column(db.String(10))
    verified = db.Column(db.Boolean)

    def __init__(
        self,
        name,
        location,
        license_no,
        license_photo,
        bed_capacity,
        contact,
        verified=False,
    ):
        self.name = name
        self.location = json.loads(location)
        self.license_no = license_no
        self.license_photo = license_photo
        self.bed_capacity = bed_capacity
        self.contact = contact
        self.verified = verified

    def __repr__(self):
        return f"<Hospital(id={self.id})>"

    @property
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "location": self.location,
            "verified": self.verified,
        }

    @property
    def serialize_all(self):
        return {
            "id": self.id,
            "name": self.name,
            "location": self.location,
            "verified": self.verified,
            "license_no": self.license_no,
            "license_photo": self.license_photo,
            "bed_capacity": self.bed_capacity,
            "contact": self.contact,
            "type": "hospital",
        }
