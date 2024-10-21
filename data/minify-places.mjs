import { readFileSync, writeFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Helper function to get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const calcPaths = (inFilename) => {
  const inPath = path.join(__dirname, inFilename);
  const outPath = path.join(
    __dirname,
    "..",
    "public",
    inFilename.replace(".json", ".min.json"),
  );
  return [inPath, outPath];
};

const isBlank = (str) => !str || /^\s*$/.test(str);

// Function to extract cid from google_maps_url
const extractCid = (url) => {
  const match = url.match(/cid=([0-9]+)/);
  if (!match) {
    throw new Error(`Invalid google_maps_url: ${url}`);
  }
  return match[1];
};

const isValidFeature = (feature) => {
  const name = feature?.properties?.location?.name;
  const [lat, lon] = feature?.geometry?.coordinates ?? [NaN, NaN];
  return !isBlank(name) && lat && lon;
};

const flattenFeature = (feature) => [
  feature.geometry.coordinates[1], // lat
  feature.geometry.coordinates[0], // lon
  feature.properties.location.name,
  extractCid(feature.properties.google_maps_url),
];

const minifyPlace = (filename) => {
  const [inPath, outPath] = calcPaths(filename);
  const data = readFileSync(inPath, "utf8");
  const features = JSON.parse(data);
  const minified = features.features.filter(isValidFeature).map(flattenFeature);
  writeFileSync(outPath, JSON.stringify(minified));
};

const filenames = [
  "Saved Places.json",
  "Want to go.json",
  "Favourite Places.json",
];
filenames.forEach(minifyPlace);
