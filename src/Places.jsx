import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import Place from "./Place.jsx";
import starred from "./Saved Places.json";

const isBlank = (str) => !str || /^\s*$/.test(str);

export default function Places() {
  return (
    <MapContainer center={[45.475, 9.214]} zoom={13}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {starred.features
        .filter((feature) => !isBlank(feature?.properties?.location?.name))
        .map(({ geometry, properties }) => (
          <Place
            key={properties.google_maps_url}
            name={properties.location.name}
            url={properties.google_maps_url}
            lat={geometry.coordinates[1]}
            lon={geometry.coordinates[0]}
          />
        ))}
    </MapContainer>
  );
}
