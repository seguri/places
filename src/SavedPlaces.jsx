import Place from "./Place.jsx";
import starred from "./Saved Places.min.json";

export default function StarredPlaces() {
  return starred.map((f) => <Place key={f[3]} feature={f} />);
}
