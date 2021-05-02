from .. import db


class User(db.Model):
    __tablename__ = "user"

    uid = db.Column(db.String(150), unique=True, primary_key=True)
    email = db.Column(db.String(150))
    type = db.Column(db.Integer, nullable=True)

    def __init__(self, uid: str, email: str, _type: str = None):
        self.uid = uid
        self.email = email
        if _type is not None:
            self.type = self._reverse_map[_type.upper()]

    def __repr__(self):
        return f"<User(uid={self.uid}, email={self.email}, type={self.type})>"

    @property
    def serialize(self):
        return {"uid": self.uid, "email": self.email, "type": self.__get_type()}

    _map = {
        1: "DOCTOR",
        2: "PATIENT",
        3: "HOSPITAL",
        4: "AMBULANCE",
    }

    _reverse_map = {
        "DOCTOR": 1,
        "PATIENT": 2,
        "HOSPITAL": 3,
        "AMBULANCE": 4,
    }

    def __get_type(self):
        return self._map[self.type]
