from .. import db


class MedicalHistoryBlockChain(db.Model):
    __tablename__ = "medical_history_block_chain"

    patient_id = db.Column(db.String(150), db.ForeignKey("patient.id"))

    id = db.Column(db.Integer, primary_key=True)
    d_type = db.Column(db.String(50))
    title = db.Column(db.String(150))
    description = db.Column(db.String(500))
    year = db.Column(db.String(4))
    sha_hash = db.Column(db.Integer)

    def __init__(self, d_type, title, description, year, sha_hash):
        self.d_type = d_type
        self.title = title
        self.description = description
        self.year = year
        self.sha_hash = sha_hash

    def __repr__(self):
        return f"<MedicalHistoryBlockChain(id={self.id}, patient_id={self.patient_id})>"

    @property
    def serialize(self):
        return {
            "id": self.id,
            "type": self.d_type,
            "title": self.title,
            "description": self.description,
            "year": self.year,
            "hash": self.sha_hash,
        }

    @property
    def serialize_all(self):
        return {
            "id": self.id,
            "type": self.d_type,
            "title": self.title,
            "description": self.description,
            "year": self.year,
            "hash": self.sha_hash,
        }
