import { renderToString } from "react-dom/server";
import { Heart } from "lucide-react";
import { Icon } from "leaflet";
import Place from "./Place.jsx";
import favourite from "./Favourite Places.min.json";

const iconStyle = {
  color: "#ff2400",
  fill: "#ff2400",
  stroke: "#000000",
  strokeWidth: 1,
};

const icon = () =>
  new Icon({
    iconUrl: `data:image/svg+xml,${encodeURIComponent(renderToString(<Heart style={iconStyle} />))}`,
    iconSize: [24, 24],
    className: "lucide-heart",
  });

export default function FavouritePlaces() {
  return favourite.map((f) => <Place key={f[3]} feature={f} icon={icon()} />);
}
