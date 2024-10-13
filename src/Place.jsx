import { Marker, Popup } from "react-leaflet";
import PropTypes from "prop-types";

export default function Place({ name, url, lat, lon }) {
  return (
    <Marker position={[lat, lon]}>
      <Popup>
        <a href={url} target="_blank" rel="noopener noreferrer">
          {name}
        </a>
      </Popup>
    </Marker>
  );
}

Place.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  lat: PropTypes.number.isRequired,
  lon: PropTypes.number.isRequired,
};
