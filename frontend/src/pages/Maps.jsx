import React from "react";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import L from "leaflet";
import bay from "../phaser/assets/baysidelogo.jpg";
import grocery from "../phaser/assets/fairway.jpg";
import forest from "../phaser/assets/forest.jpg";
import ocean from "../phaser/assets/ocean.jpg";
import "leaflet/dist/leaflet.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Google Maps-style pin
const googlePinIcon = new L.Icon({
    iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
});

// Cultural context + images
const landmarks = [
    {
        title: "Bayside Middle School",
        img: bay,
        lat: 48.569444,
        lng: -123.453333,
        route: "/bayside",
        context: "Established in 1975, Bayside Middle School is a hub for local education and community activities."
    },
    {
        title: "Fairway Market",
        img: grocery,
        lat: 48.57527,
        lng: -123.44559,
        route: "/grocery",
        context: "A local favorite, Fairway Market sources fresh produce from nearby farms and supports sustainable practices."
    },
    {
        title: "Gowlland Tod (Forest)",
        img: forest,
        lat: 48.54278,
        lng: -123.52083,
        route: "/forest",
        context: "This forest reserve is home to old-growth Douglas firs and trails that connect to historic Indigenous lands."
    },
    {
        title: "Brentwood Bay",
        img: ocean,
        lat: 48.5861,
        lng: -123.4644,
        route: "/ocean",
        context: "A scenic coastal village known for kayaking, whale watching, and the famous Butchart Gardens."
    },
];

export default function Map() {
    const center = [48.574167, -123.455556];
    const navigate = useNavigate();

    return (
        <div className="h-[80vh] w-full rounded-xl shadow-lg border-4 border-indigo-300 overflow-hidden">
               {/* 🌈 Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="h-[10vh] flex flex-col justify-center items-center bg-gradient-to-r from-sky-200 via-indigo-200 to-purple-200 shadow-md"
      >
        <h2 className="font-bold text-3xl text-indigo-800 drop-shadow-md">
          🌊 Explore Brentwood Bay! 🌊
        </h2>
       
      </motion.div>
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
                        <Tooltip
                            direction="top"
                            offset={[0, -10]}
                            opacity={1}
                            className="bg-white rounded-xl shadow-xl p-3 max-w-xs text-center border-l-4 border-indigo-500"
                        >
                            <div className="flex flex-col items-center gap-2">
                                <img
                                    src={lm.img}
                                    alt={lm.title}
                                    className="w-24 h-24 object-cover rounded-full border-2 border-indigo-300 shadow-md"
                                />
                                <div className="font-bold text-indigo-700 text-sm">{lm.title}</div>
                                <p className="text-gray-600 text-xs break-words whitespace-normal">{lm.context}</p>
                            </div>
                        </Tooltip>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}
