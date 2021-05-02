from .. import db


class Ambulance(db.Model):
    __tablename__ = "ambulance"

    user_id = db.Column(db.String(150), db.ForeignKey("user.uid"), unique=True)

    id = db.Column(db.Integer, primary_key=True)
    vehicle_number = db.Column(db.String(100))
    facilities = db.Column(db.String(100))
    license_no = db.Column(db.String(100))
    license_photo = db.Column(db.String(100))
    contact = db.Column(db.String(10))
    verified = db.Column(db.Boolean)
    in_service = db.Column(db.Boolean, default=False)
    location = db.Column(db.String(150), nullable=True, default=None)

    def __init__(
        self,
        vehicle_number,
        facilities,
        license_no,
        license_photo,
        contact,
        verified=False,
    ):
        self.vehicle_number = vehicle_number
        self.facilities = facilities
        self.license_no = license_no
        self.license_photo = license_photo
        self.contact = contact
        self.verified = verified

    def __repr__(self):
        return f"<Ambulance(id={self.id})>"

    @property
    def serialize(self):
        return {
            "id": self.id,
            "vehicle_number": self.vehicle_number,
        }

    @property
    def serialize_all(self):
        return {
            "id": self.id,
            "vehicle_number": self.vehicle_number,
            "facilities": self.facilities,
            "license_no": self.license_no,
            "license_photo": self.license_photo,
            "contact": self.contact,
            "verified": self.verified,
            "in_service": self.in_service,
            "location": self.location,
            "type": "ambulance",
        }
