import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import bay from "../phaser/assets/baysidelogo.jpg";
import grocery from "../phaser/assets/fairway.jpg";
import forest from "../phaser/assets/forest.jpg";  
import ocean from "../phaser/assets/ocean.jpg";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// --- Fix Leaflet marker icons (so they render in React) ---
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});


const icons = {
  school: new L.Icon({
    iconUrl: bay,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  }),
  grocery: new L.Icon({
    iconUrl: grocery,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  }),
  forest: new L.Icon({
    iconUrl: forest,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  }),
  ocean: new L.Icon({
    iconUrl: ocean,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  }),
};


const landmarks = [
  {
    title: "Bayside Middle School",
    desc: "Local middle school (Grades 6–8).",
    lat: 48.569444,
    lng: -123.453333,
    icon: icons.school,
    route: "/bayside",
  },
  {
    title: "Fairway Market",
    desc: "Grocery store nearby.",
    lat: 48.57527,
    lng: -123.44559,
    icon: icons.grocery,
    route: "/grocery",
  },
  {
    title: "Gowlland Tod (Forest)",
    desc: "Trails & viewpoints.",
    lat: 48.54278,
    lng: -123.52083,
    icon: icons.forest,
    route: "/forest",
  },
 {
  title: "Brentwood Bay",
  desc: "A beautiful coastal village known for kayaking, whale watching, and the Butchart Gardens nearby.",
  lat: 48.5861,
  lng: -123.4644,
  icon: icons.ocean,   // you could also create a kayak 🛶 or nature 🌿 icon
  route: "/ocean"
}

];


import { useNavigate } from "react-router-dom";

export default function Map() {
  const center = [48.574167, -123.455556];
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-br from-sky-100 to-indigo-100 p-4 rounded-xl shadow-lg h-[80vh] border-4 border-indigo-300">
      <h2 className="font-bold text-2xl text-indigo-700 mb-2 text-center">
        🌟 Explore Brentwood Bay! 🌟
      </h2>
      <MapContainer
        center={center}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
        className="rounded-lg"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {landmarks.map((lm, idx) => (
          <Marker
            key={idx}
            position={[lm.lat, lm.lng]}
            icon={lm.icon}
            eventHandlers={{
              click: () => navigate(lm.route),
            }}
          >
            <Popup>
              <div className="text-center">
                <strong className="text-indigo-700">{lm.title}</strong>
                <br />
                <span className="text-sm text-gray-600">{lm.desc}</span>
                <br />
                <button
                  onClick={() => navigate(lm.route)}
                  className="mt-2 px-2 py-1 bg-indigo-500 text-white rounded text-xs hover:bg-indigo-600"
                >
                  Go →
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
