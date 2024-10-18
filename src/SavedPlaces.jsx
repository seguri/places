import { renderToString } from "react-dom/server";
import { Star } from "lucide-react";
import { DivIcon, Icon } from "leaflet";
import Place from "./Place.jsx";
import starred from "./Saved Places.min.json";

const icon = () => new DivIcon({ html: renderToString(<Star />) });

export default function StarredPlaces() {
  return starred.map((f) => <Place key={f[3]} feature={f} icon={icon()} />);
}
