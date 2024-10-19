import { renderToString } from "react-dom/server";
import { Star } from "lucide-react";
import { DivIcon, Icon } from "leaflet";
import Place from "./Place.jsx";
import starred from "./Saved Places.min.json";

const iconStyle = {
  color: "#ffd800",
  fill: "#ffd800",
  stroke: "#000000",
  strokeWidth: 1,
};

const icon = () =>
  new Icon({
    iconUrl: `data:image/svg+xml,${encodeURIComponent(renderToString(<Star style={iconStyle} />))}`,
    iconSize: [24, 24],
    className: "lucide-star",
  });

export default function StarredPlaces() {
  return starred.map((f) => <Place key={f[3]} feature={f} icon={icon()} />);
}
