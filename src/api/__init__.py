from gevent import monkey
monkey.patch_all()

import os
import pathlib
from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_mqtt import Mqtt
from flask_socketio import SocketIO

from engineio.payload import Payload
Payload.max_decode_packets = 100

db = SQLAlchemy()
mqtt = Mqtt()
socketio = SocketIO(async_mode="gevent", cors_allowed_origins="*")

upload_folder = os.path.join(
    pathlib.Path(__file__).parent.parent.parent.absolute(), "uploads"
)
if not os.path.exists(upload_folder):
    os.mkdir(upload_folder)


def init_app():
    app = Flask(__name__)

    app.config["UPLOAD_FOLDER"] = upload_folder
    app.config["MQTT_BROKER_URL"] = "api.healthbay.us"
    app.config["MQTT_BROKER_PORT"] = 1883
    app.config["MQTT_USERNAME"] = "healthbay"
    app.config["MQTT_PASSWORD"] = "PassKey321"
    app.config["MQTT_KEEPALIVE"] = 5

    app.config["AMBULANCE_LOCX"] = {}

    # app.config.from_object(os.environ["APP_SETTINGS"])
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db.sqlite"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    db.init_app(app)  # for initializing refactored cyclic imports

    socketio.init_app(app)  # for initializing
    mqtt.init_app(app)  # for initializing

    with app.app_context():
        from .routes import api

        CORS(
            app,
            resources={
                r"/*": {
                    "origins": ["http://localhost:3000", "https://app.healthbay.us"]
                }
            },
        )

        app.register_blueprint(api)

        mqtt.subscribe("#")

        @mqtt.on_message()
        def handle_mqtt_message(client, userdata, message):
            TOPIC, MSG = message.topic, message.payload.decode()
            print("@MQTT: ", TOPIC, MSG)
            socketio.emit(TOPIC, MSG, broadcast=False,
                          namespace="/hrtspo2reading")

        return (app, mqtt, socketio)
