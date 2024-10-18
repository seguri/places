import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import Place from "./Place.jsx";
import starred from "./Saved Places.min.json";
import wannago from "./Want to go.min.json";
import favourite from "./Favourite Places.min.json";

export default function Places() {
  return (
    <MapContainer center={[45.475, 9.214]} zoom={13}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {starred.map((feature) => (
        <Place
          key={feature[3]}
          name={feature[2]}
          url={`http://maps.google.com/?cid=${feature[3]}`}
          lat={feature[0]}
          lon={feature[1]}
        />
      ))}
      {wannago.map((feature) => (
        <Place
          key={feature[3]}
          name={feature[2]}
          url={`http://maps.google.com/?cid=${feature[3]}`}
          lat={feature[0]}
          lon={feature[1]}
        />
      ))}
      {favourite.map((feature) => (
        <Place
          key={feature[3]}
          name={feature[2]}
          url={`http://maps.google.com/?cid=${feature[3]}`}
          lat={feature[0]}
          lon={feature[1]}
        />
      ))}
    </MapContainer>
  );
}
