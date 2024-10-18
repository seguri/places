# places

A simple tool to map your saved places and starred locations exported from Google Maps using [Google Takeout](https://takeout.google.com/).

## Importing Google Takeout data

This software currently supports importing the following data from Google Takeout:

- Saved Places.json
- Want to go.csv
- Favourite places.csv

To import your data, follow these steps:

1. Place the files above in the `data` directory.
2. (Optional) CSV files are provided without coordinates; build a cache of coordinates with `npm run scrape-cids`.
3. Run `npm run dev` or `npm run build` to convert the CSV files to GeoJSON and then minify all GeoJSON files.

A sample of how the GeoJSON data inside `Saved Places.json` should look like:

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "geometry": {
        "coordinates": [135.7711607, 35.005657],
        "type": "Point"
      },
      "properties": {
        "date": "2024-01-01T01:00:00Z",
        "google_maps_url": "http://maps.google.com/?cid=5268313959699959636",
        "location": {
          "address": "Japan, 〒604-8013 Kyoto, Nakagyo Ward, 先斗町 松本町160 栞ビル1F",
          "country_code": "JP",
          "name": "Kappa Sushi"
        }
      },
      "type": "Feature"
    }
  ]
}
```
