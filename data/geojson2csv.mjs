import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import debug from "debug";
import Papa from "papaparse";

// Helper function to get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const parseCid = (googleMapsUrl) => {
  const url = new URL(googleMapsUrl);
  const cid = url.searchParams.get("cid");
  if (!cid) {
    throw new Error(`No cid found in ${feature.properties.google_maps_url}`);
  }
  return cid;
};

const validateFeature = (feature) => {
  const log = debug("geojson2csv:validateFeature");
  const lazyStringifyFeature = () => JSON.stringify(feature);
  if (!feature.geometry) {
    log("Missing geometry:", lazyStringifyFeature());
    return false;
  }
  if (!feature.geometry.coordinates) {
    log("Missing coordinates:", lazyStringifyFeature());
    return false;
  }
  if (!feature.geometry.coordinates.length) {
    log("Missing coordinates length:", lazyStringifyFeature());
    return false;
  }
  if (!feature.properties) {
    log("Missing properties:", lazyStringifyFeature());
    return false;
  }
  if (!feature.properties.google_maps_url) {
    log("Missing google_maps_url:", lazyStringifyFeature());
    return false;
  }
  if (!feature.properties.location) {
    log("Missing location:", lazyStringifyFeature());
    return false;
  }
  if (!feature.properties.location.name) {
    log("Missing location name:", lazyStringifyFeature());
    return false;
  }
  return true;
};

const featureToCsvRow = (feature) => [
  parseCid(feature.properties.google_maps_url),
  feature.geometry.coordinates[1],
  feature.geometry.coordinates[0],
  feature.properties.location.name,
];

const toCsv = (json) =>
  Papa.unparse({
    fields: ["cid", "lat", "lon", "name"],
    data: json.features.filter(validateFeature).map(featureToCsvRow),
  });

const convert = ([jsonInput, csvOutput]) => {
  const jsonPath = join(__dirname, jsonInput);
  const csvPath = join(__dirname, csvOutput);
  console.log(`Converting '${jsonPath}' to '${csvPath}'`);
  const json = JSON.parse(readFileSync(jsonPath, "utf8"));
  console.log("Input JSON:", JSON.stringify(json).substring(0, 120), "...");
  const csv = toCsv(json);
  // CSV is not as nice as JSON... This is here just to print something
  console.log("Output CSV:", csv.length, "chars");
  writeFileSync(csvPath, csv, "utf8");
};

Object.entries({
  "Favourite Places.json": "Favourites.supabase.csv",
  "Saved Places.json": "Saved.supabase.csv",
  "Want to go.json": "Wishlist.supabase.csv",
}).forEach(convert);
