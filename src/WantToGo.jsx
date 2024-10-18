import Place from "./Place.jsx";
import wannago from "./Want to go.min.json";

export default function WantToGo() {
  return wannago.map((f) => <Place key={f[3]} feature={f} />);
}
