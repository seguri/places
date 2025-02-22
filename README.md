# places

A simple tool to map your saved places and starred locations exported from Google Maps using [Google Takeout](https://takeout.google.com/).

![screenshot](https://github.com/user-attachments/assets/c1a2fd63-13de-42f1-9d30-f036ed76e3e5)

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

**More details for my future self**

As you've seen, Google provides one JSON and two CSV.
The JSON contains all you need: name, coordinates and cid.
The CSV files are worse: they contain a cid at the end of the URL, no coordinates, and sometimes no name.
These files require that you open a browser for each URL to get the coordinates and name, and this process is not always successful.
I took notes on which places (cids) failed, but I doubt I'll ever spend time trying to reconstruct the name of the missing places just by looking at the map.

I moved this application to supabase to take advantage of the advanced RBAC, and for that I need to convert all my data back to CSV to bulk import it to supabase.
The script I use to prepare the bulk import is not part of the build process of this application, but it's runnable with `npm run geojson2csv` after you've built the geojson as previously documented.