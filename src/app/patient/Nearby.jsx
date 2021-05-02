import React, { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import { FiPhone } from "react-icons/fi";
import { useHistory } from "react-router";
import L from "leaflet";

import InputField from "../../components/InputField";
import { useAuth } from "../../contexts/AuthContext";

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
  const history = useHistory();
  const { getIdToken } = useAuth();

  const findDoc = useRef(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState(null);
  const [doctors, setDoctors] = useState(null);
  const [foundDoc, setFindingDoc] = useState(null);

  useEffect(() => {
    async function fetchNearby() {
      const idToken = await getIdToken();
      const { data } = await fetch(
        "https://api.healthbay.us/user/all-doctors-and-hospitals",
        {
          headers: { authorization: "Bearer " + idToken },
        }
      ).then((x) => x.json());

      const m = [];
      const hdmap = {};
      const dr = [];

      for (let d of data.doctors.filter((x) => x.verified)) {
        if (d.hospital_id === null)
          m.push({
            type: "doctor",
            position: JSON.parse(d.chamber_location),
            profile: d,
          });
        else {
          if (Object.getOwnPropertyNames(hdmap).includes(d.hospital_id))
            hdmap[d.hospital_id].push(d);
          else hdmap[d.hospital_id] = [d];
        }
        dr.push(d);
      }

      for (let h of data.hospitals.filter((x) => x.verified)) {
        m.push({
          type: "hospital",
          position: h.location,
          profile: h,
          doctors: hdmap[h.id] || [],
        });
      }

      setMarkers(m);
      setDoctors(dr);
    }

    fetchNearby();
  }, [getIdToken, setMarkers, setDoctors]);

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
    if (props.location.state && props.location.state.findDocClick)
      findDoc.current.focus();
  }, [props.location.state]);

  const findDocChange = () => {
    if (findDoc.current.value) {
      const dx = doctors
        .map((d) => ({
          ...d,
          search_name: d.name.toLowerCase(),
          search_specialization: d.specialization.toLowerCase(),
        }))
        .filter(
          (d) =>
            d.search_name.includes(findDoc.current.value.toLowerCase()) ||
            d.search_specialization.includes(
              findDoc.current.value.toLowerCase()
            )
        );
      setFindingDoc(dx);
    } else {
      setFindingDoc(null);
    }
  };

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
          onChange={findDocChange}
        />
      </div>
      {foundDoc && (
        <>
          {foundDoc.length === 0 ? (
            <>No doctors found.</>
          ) : (
            <ul className="mb-2">
              {foundDoc.map((d) => (
                <li
                  onClick={() => history.push("/doctor/" + d.id)}
                  className="my-1 bg-primary-lighter rounded-sm p-1"
                >
                  {d.name}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
      <div className="mt-4 flex flex-col">
        <div className="font-medium text-xl">Nearby Doctors & Hospitals</div>
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
              <Popup>
                {m.type === "doctor" ? (
                  <div
                    className="flex flex-col space-y-1 items-center"
                    onClick={() => history.push("/doctor/" + m.profile.id)}
                  >
                    <div className="bg-primary rounded-full w-full px-2 py-1 mb-2 text-white text-center">
                      Doctor
                    </div>
                    <img
                      className="w-16 h-16 mb-2 rounded-full"
                      src={m.profile.picture}
                      alt="Doctor's Face"
                    />
                    <div className="">
                      <div className="text-lg font-bold">
                        Dr. {m.profile.name}
                      </div>
                      <div className="flex items-center space-x-2">
                        <FiPhone />
                        <div>{m.profile.contact}</div>
                      </div>
                    </div>
                    <div className="">{m.profile.specialization}</div>
                    <div className="">{m.profile.timings}</div>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-1 items-center">
                    <div className="bg-theme-red-lighter rounded-full w-full px-2 py-1 mb-2 text-white text-center">
                      Hospital
                    </div>
                    <img
                      className="w-16 h-16 mb-2"
                      src="/assets/icons/hospital.png"
                      alt="Hospital"
                    />
                    <div className="">
                      <div className="text-lg font-bold">{m.profile.name}</div>
                      <div className="flex items-center space-x-2">
                        <FiPhone />
                        <div>{m.profile.contact}</div>
                      </div>
                    </div>
                    <div className="self-start mt-2 w-full">
                      {m.doctors.length > 0 ? (
                        <>Doctors:</>
                      ) : (
                        <>No doctors present.</>
                      )}
                      {m.doctors.map((md) => (
                        <li
                          className="bg-primary-lighter rounded-md p-2 my-1 flex items-center justify-between w-full space-x-2"
                          onClick={() => history.push("/doctor/" + md.id)}
                        >
                          <div className="">
                            <div className="font-bold text-xs text-primary">
                              Dr. {md.name}
                            </div>
                            <div className="text-xs">{md.specialization}</div>
                          </div>
                          <img
                            src={md.picture}
                            alt="Doctor"
                            className="rounded-full w-10"
                          />
                        </li>
                      ))}
                    </div>
                  </div>
                )}
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
}

export default Nearby;
