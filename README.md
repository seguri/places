# places

A simple tool to map your saved places and starred locations exported from Google Maps using [Google Takeout](https://takeout.google.com/).

## Importing Google Takeout data

This software currently supports importing the following data from Google Takeout:

- Saved Places.json

It will in the future support importing the following data:

- Want to go.csv
- Favourite places.csv

To import your data, follow these steps:

1. Place your `Saved Places.json` file in the `data` directory.
2. Run `npm run minify-places` to minify the data. A new file `src/Saved Places.min.json` will be created.

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
