import { renderToString } from "react-dom/server";
import { Heart } from "lucide-react";
import { DivIcon } from "leaflet";
import Place from "./Place.jsx";
import favourite from "./Favourite Places.min.json";

const icon = () => new DivIcon({ html: renderToString(<Heart />) });

export default function FavouritePlaces() {
  return favourite.map((f) => <Place key={f[3]} feature={f} icon={icon()} />);
}
