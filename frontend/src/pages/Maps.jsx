import React from "react";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import L from "leaflet";
import bay from "../phaser/assets/baysidelogo.jpg";
import grocery from "../phaser/assets/fairway.jpg";
import forest from "../phaser/assets/forest.jpg";
import ocean from "../phaser/assets/ocean.jpg";
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router-dom";

// Use Google Maps-style pin icon
const googlePinIcon = new L.Icon({
  iconUrl:
    "https://maps.google.com/mapfiles/ms/icons/red-dot.png", // classic Google Maps pin
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const landmarks = [
  { title: "Bayside Middle School", img: bay, lat: 48.569444, lng: -123.453333, route: "/bayside" },
  { title: "Fairway Market", img: grocery, lat: 48.57527, lng: -123.44559, route: "/grocery" },
  { title: "Gowlland Tod (Forest)", img: forest, lat: 48.54278, lng: -123.52083, route: "/forest" },
  { title: "Brentwood Bay", img: ocean, lat: 48.5861, lng: -123.4644, route: "/ocean" },
];

export default function Map() {
  const center = [48.574167, -123.455556];
  const navigate = useNavigate();

  return (
    <div className="h-[80vh] w-full rounded-xl shadow-lg border-4 border-indigo-300">
         <h2 className="font-bold text-2xl text-indigo-700 mb-4 text-center">
        🌟 Explore Brentwood Bay! 🌟
      </h2>
      <MapContainer center={center} zoom={13} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {landmarks.map((lm, idx) => (
          <Marker
            key={idx}
            position={[lm.lat, lm.lng]}
            icon={googlePinIcon}
            eventHandlers={{
              click: () => navigate(lm.route),
            }}
          >
            {/* Tooltip shows image on hover */}
            <Tooltip
              direction="top"
              offset={[0, -10]}
              opacity={1}
              className="bg-white border rounded p-1 shadow-lg"
            >
              <div className="text-center">
                <img src={lm.img} alt={lm.title} className="w-24 h-24 object-cover rounded mb-1" />
                <div className="text-sm font-semibold">{lm.title}</div>
              </div>
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
