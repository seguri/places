import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import PropTypes from "prop-types";
import StarredPlaces from "./SavedPlaces.jsx";
import WantToGo from "./WantToGo.jsx";
import FavouritePlaces from "./FavouritePlaces.jsx";

/**
 * You must use the `useMap` hook inside a child of `MapContainer`.
 */
function FlyToCurrentLocation({ setPosition }) {
  const map = useMap();
  useEffect(() => {
    map.locate({ enableHighAccuracy: true }).once("locationfound", (e) => {
      const { lat, lng } = e.latlng;
      console.log("Current location: ", lat, lng);
      setPosition([lat, lng]);
      map.setView([lat, lng], map.getZoom());
    });
  }, []); // Run only once
  return null;
}

export default function Places() {
  const [position, setPosition] = useState([45.475, 9.214]);

  return (
    <MapContainer center={position} zoom={13}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <FlyToCurrentLocation setPosition={setPosition} />
      <StarredPlaces />
      <WantToGo />
      <FavouritePlaces />
    </MapContainer>
  );
}

FlyToCurrentLocation.propTypes = {
  setPosition: PropTypes.func.isRequired,
};
