import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Helper function to get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the input and output JSON files
const inputFilePath = path.join(__dirname, "Saved Places.json");
const outputFilePath = path.join(
  __dirname,
  "..",
  "src",
  "Saved Places.min.json",
);

const isBlank = (str) => !str || /^\s*$/.test(str);

// Function to extract cid from google_maps_url
const extractCid = (url) => {
  const match = url.match(/cid=([0-9]+)/);
  if (!match) {
    throw new Error(`Invalid google_maps_url: ${url}`);
  }
  return match[1];
};

// Read the input JSON file
fs.readFile(inputFilePath, "utf8", (err, data) => {
  if (err) {
    console.error('Error reading "Saved Places.json":', err);
    return;
  }

  // Parse the JSON data
  const places = JSON.parse(data);

  // Flatten and minify the data
  const minifiedPlaces = places.features
    .filter((feature) => !isBlank(feature?.properties?.location?.name))
    .map((feature) => [
      feature.geometry.coordinates[1], // lat
      feature.geometry.coordinates[0], // lon
      feature.properties.location.name,
      extractCid(feature.properties.google_maps_url),
    ]);

  // Write the minified data to a new JSON file
  fs.writeFile(
    outputFilePath,
    JSON.stringify(minifiedPlaces),
    "utf8",
    (err) => {
      if (err) {
        console.error("Error writing the JSON file:", err);
        return;
      }
      console.log(
        `${minifiedPlaces.length} places have been minified and written to ${outputFilePath}`,
      );
    },
  );
});
