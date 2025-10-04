import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Map from "./pages/Maps";
import BaysidePage from "./pages/BaysidePage";
import GroceryPage from "./pages/GroceryPage";
import ForestPage from "./pages/ForestPage";
import OceanPage from "./pages/OceanPage";

export default function App() {
  return (
    <Router>
      <main className="min-h-screen bg-gradient-to-br from-sky-50 to-indigo-50 p-6">
        <Routes>
          <Route path="/" element={<Map />} />
          <Route path="/bayside" element={<BaysidePage />} />
          <Route path="/grocery" element={<GroceryPage />} />
          <Route path="/forest" element={<ForestPage />} />
          <Route path="/ocean" element={<OceanPage />} />
        </Routes>
      </main>
    </Router>
  );
}
