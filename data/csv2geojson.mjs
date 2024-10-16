import { createReadStream } from "fs";
import { writeFile } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import Papa from "papaparse";

// Helper function to get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const parse = (inStream) =>
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

const geoJsonTemplate = (features) => ({
  type: "FeatureCollection",
  features: features.map((feature) => ({
    geometry: {
      coordinates: [],
      type: "Point",
    },
    properties: {
      google_maps_url: `http://maps.google.com/?cid=${parseCid(feature.URL)}`,
      location: {
        name: feature.Title,
      },
    },
    type: "Feature",
  })),
});

const toGeoJson = async (filename) => {
  const csvPath = join(__dirname, filename);
  const { data } = await parse(createReadStream(csvPath));
  const geoJson = geoJsonTemplate(data);
  await writeFile(
    csvPath.replace(".csv", ".json"),
    JSON.stringify(geoJson, null, 2),
  );
};

const filenames = ["Want to go.csv", "Favourite Places.csv"];
filenames.forEach(toGeoJson);
