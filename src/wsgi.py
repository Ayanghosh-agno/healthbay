from dotenv import load_dotenv
from api import init_app


load_dotenv()

app, mqtt, socketio = init_app()

if __name__ == "__main__":
    print("Listeing on port 5000!")
    socketio.run(app, host="0.0.0.0", port=5000,
                 use_reloader=False, debug=True)
