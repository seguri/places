import { Marker, Popup } from "react-leaflet";
import PropTypes from "prop-types";

export default function Place({ feature, icon }) {
  const [lat, lon, name, url] = feature;
  return (
    <Marker position={[lat, lon]} icon={icon}>
      <Popup>
        <a href={url} target="_blank" rel="noopener noreferrer">
          {name}
        </a>
      </Popup>
    </Marker>
  );
}

Place.propTypes = {
  feature: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  ).isRequired,
  icon: PropTypes.object,
};
