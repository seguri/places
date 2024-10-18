import Place from "./Place.jsx";
import favourite from "./Favourite Places.min.json";

export default function FavouritePlaces() {
  return favourite.map((f) => <Place key={f[3]} feature={f} />);
}
