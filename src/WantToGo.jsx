import { useState, useEffect } from "react";
import { Icon } from "leaflet";
import Place from "./Place.jsx";

const icon = () =>
  new Icon({
    iconUrl: "/eye.svg",
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
