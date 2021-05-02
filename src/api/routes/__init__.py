from flask import Blueprint

api = Blueprint("api", __name__)

from . import onboarding
from . import verify
from . import patient
from . import doctor
from . import ambulance
from . import hospital

from . import whoami
from . import hospitals
