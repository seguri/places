import { renderToString } from "react-dom/server";
import { Flag } from "lucide-react";
import { DivIcon } from "leaflet";
import Place from "./Place.jsx";
import wannago from "./Want to go.min.json";

const icon = () => new DivIcon({ html: renderToString(<Flag />) });

export default function WantToGo() {
  return wannago.map((f) => <Place key={f[3]} feature={f} icon={icon()} />);
}
