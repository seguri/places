import { createReadStream, readFileSync } from "node:fs";
import { writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import Papa from "papaparse";

// Helper function to get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const cachePath = join(__dirname, "cache.json");
const cache = JSON.parse(readFileSync(cachePath, "utf8"));

const getCachedCoordinates = (url) => {
  const cid = parseCid(url);
  if (!(cid in cache)) {
    return [];
  }
  const [lat, lng] = cache[cid];
  return [parseFloat(lat), parseFloat(lng)];
};

const parseCsv = (inStream) =>
  new Promise((resolve, reject) => {
    Papa.parse(inStream, {
      header: true,
      encoding: "utf8",
      error: reject,
      complete: resolve,
    });
  });

const parseCid = (url) => {
  const match = url.match(/(?:0x[0-9a-f]+):(0x[0-9a-f]+)$/);
  if (!match) {
    throw new Error(`Invalid google_maps_url: ${url}`);
  }
  return BigInt(match[1]).toString();
};

const geoJsonTemplate = (rows) => ({
  type: "FeatureCollection",
  features: rows.map((row) => ({
    geometry: {
      coordinates: getCachedCoordinates(row.URL),
      type: "Point",
    },
    properties: {
      google_maps_url: `http://maps.google.com/?cid=${parseCid(row.URL)}`,
      location: {
        name: row.Title,
      },
    },
    type: "Feature",
  })),
});

const toGeoJson = async (filename) => {
  const csvPath = join(__dirname, filename);
  const { data } = await parseCsv(createReadStream(csvPath));
  const geoJson = geoJsonTemplate(data);
  await writeFile(
    csvPath.replace(".csv", ".json"),
    JSON.stringify(geoJson, null, 2),
  );
};

const filenames = ["Want to go.csv", "Favourite Places.csv"];
filenames.forEach(toGeoJson);
