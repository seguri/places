import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import StarredPlaces from "./SavedPlaces.jsx";
import WantToGo from "./WantToGo.jsx";
import FavouritePlaces from "./FavouritePlaces.jsx";

export default function Places() {
  return (
    <MapContainer center={[45.475, 9.214]} zoom={13}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <StarredPlaces />
      <WantToGo />
      <FavouritePlaces />
    </MapContainer>
  );
}
