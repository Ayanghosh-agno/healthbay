import React, { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import L from "leaflet";

import InputField from "../../components/InputField";

const iconOptions = {
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, 0],
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
};

const hospitalIcon = L.icon({
  iconUrl: "/assets/icons/hospital.png",
  ...iconOptions,
});

const doctorIcon = L.icon({
  iconUrl: "/assets/icons/doctor.png",
  ...iconOptions,
});

function Nearby(props) {
  const findDoc = useRef(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState(null);

  useEffect(() => {
    if (!map) return;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const x = [position.coords.latitude, position.coords.longitude];
        map.flyTo(x);
      });
    }
  }, [map]);

  useEffect(() => {
    setMarkers([
      { type: "hospital", position: { lat: -0.29353, lng: 6.73502 } },
      { type: "doctor", position: { lat: 43.72295, lng: -49.21835 } },
      { type: "doctor", position: { lat: -70.25275, lng: 91.81623 } },
      { type: "hospital", position: { lat: 20.57212, lng: 103.55156 } },
      { type: "doctor", position: { lat: 19.16377, lng: -121.23815 } },
    ]);
  }, [setMarkers]);

  useEffect(() => {
    if (props.location.state && props.location.state.findDocClick)
      findDoc.current.focus();
  }, [props.location.state]);

  return (
    <div className="px-4 mb-4">
      <div className="mt-4 flex flex-col">
        <label className="font-medium text-xl" htmlFor="symptoms">
          Find your Doctor
        </label>
        <InputField
          className="mt-2 text-md h-10"
          type="text"
          id="symptoms"
          ref={findDoc}
          placeholder="Search using name, profession..."
        />
      </div>
      <div className="mt-4 flex flex-col">
        <div className="font-medium text-xl">Nearby Doctos & Hospitals</div>
        <div className="text-sm" style={{ color: "#888" }}>
          We are displaying all local and global doctor chamber locations as
          well as hospital locations. Drag, zoom and move around the map to find
          all the hospitals you can find nearby.
        </div>
      </div>
      <MapContainer
        className="rounded-md mt-2"
        style={{
          height: "28rem",
        }}
        whenCreated={setMap}
        center={[51.5074, 0.1278]}
        zoom={12}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {markers &&
          markers.map((m, i) => (
            <Marker
              key={i}
              icon={m.type === "hospital" ? hospitalIcon : doctorIcon}
              position={m.position}
            >
              <Popup>{m.type}</Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
}

export default Nearby;
