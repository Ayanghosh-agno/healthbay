from .. import db


class Treatment(db.Model):
    __tablename__ = "treatment"

    patient_id = db.Column(db.Integer, db.ForeignKey("patient.id"))
    doctor_id = db.Column(db.Integer, db.ForeignKey("doctor.id"))

    id = db.Column(db.Integer, primary_key=True)
    closed = db.Column(db.Boolean)

    def __init__(self, closed: bool = False):
        self.closed = closed


class TreatmentChats(db.Model):
    __tablename__ = "treatment_chats"

    treatment_id = db.Column(db.Integer, db.ForeignKey("treatment.id"))

    id = db.Column(db.Integer, primary_key=True)
    by = db.Column(db.Integer)
    _type = db.Column(db.String(20))
    msg = db.Column(db.String(200))

    def __init__(self, by, _type, msg):
        self.by = by
        self._type = _type
        self.msg = msg

    _map = {
        1: "DOCTOR",
        2: "PATIENT",
        3: "HOSPITAL",
        4: "AMBULANCE",
    }

    def __get_type(self):
        return self._map[self._type]

    @property
    def serialize(self):
        return {
            "by": self.by,
            "type": self._type,
            "msg": self.msg,
        }
