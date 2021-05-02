from .. import db


class Patient(db.Model):
    __tablename__ = "patient"

    user_id = db.Column(db.String(150), db.ForeignKey("user.uid"), unique=True)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    height = db.Column(db.Float)
    weight = db.Column(db.Float)
    dob = db.Column(db.String(10))
    blood_group = db.Column(db.String(3))
    picture = db.Column(db.String(100))
    contact = db.Column(db.String(10))
    device_id = db.Column(db.String(10), nullable=True)
    emergency = db.Column(db.Boolean, default=False)
    emergency_location = db.Column(db.String(150), nullable=True, default=None)
    emergency_hospital = db.Column(
        db.Integer, db.ForeignKey("hospital.id"), nullable=True, default=None)
    emergency_ambulance = db.Column(db.Integer, db.ForeignKey(
        "ambulance.id"), nullable=True, default=None)

    def __init__(
        self, name, height: float, weight: float, dob, blood_group, picture, contact
    ):
        self.name = name
        self.height = height
        self.weight = weight
        self.dob = dob
        self.blood_group = blood_group
        self.picture = picture
        self.contact = contact
        self.device_id = None

    def __repr__(self):
        return f"<Patient(uid={self.name})>"

    @property
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "height": self.height,
            "weight": self.weight,
            "dob": self.dob,
            "blood_group": self.blood_group,
            "picture": self.picture,
            "contact": self.contact,
            "device_id": self.device_id,
            "emergency": self.emergency,
            "emergency_location": self.emergency_location,
            "emergency_hospital": self.emergency_hospital,
            "emergency_ambulance": self.emergency_ambulance,
        }
