import { useState, useEffect } from "react";
import { renderToString } from "react-dom/server";
import { Eye } from "lucide-react";
import { Icon } from "leaflet";
import Place from "./Place.jsx";

const iconStyle = {
  color: "#4cbb17",
  fill: "#4cbb17",
  stroke: "#000000",
  strokeWidth: 1,
};

const icon = () =>
  new Icon({
    iconUrl: `data:image/svg+xml,${encodeURIComponent(renderToString(<Eye style={iconStyle} />))}`,
    iconSize: [24, 24],
    className: "lucide-flag",
  });

export default function WantToGo() {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    fetch("/Want to go.min.json")
      .then((response) => response.json())
      .then((data) => setFeatures(data));
  }, []);

  return features.map((f) => <Place key={f[3]} feature={f} icon={icon()} />);
}
