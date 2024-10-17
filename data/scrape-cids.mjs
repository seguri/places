import { createReadStream } from "fs";
import { readFile, writeFile } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import Papa from "papaparse";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const cachePath = join(__dirname, "cache.json");

puppeteer.use(StealthPlugin());

const readCache = async () => {
  try {
    const content = await readFile(cachePath, "utf8");
    return JSON.parse(content);
  } catch {
    return {};
  }
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
    throw new Error(`${url}: no CID found`);
  }
  return BigInt(match[1]).toString();
};

const handleCookieConsent = async (page) => {
  if (page.url().startsWith("https://consent.google.com")) {
    const cookieConsentSelector = 'button[aria-label="Alle ablehnen"]';
    await page.waitForSelector(cookieConsentSelector, {
      timeout: 5000,
    });
    await page.click(cookieConsentSelector);
    console.log("Denied cookies");
  }
};

const waitForGoogleMapsUrl = async (page, timeout = 15000, interval = 1000) => {
  const desiredUrl = /\/maps\/place\/[^/]+\/@([0-9.-]+),([0-9.-]+),\d+z\//;
  return new Promise((resolve) => {
    const start = Date.now();
    const timer = setInterval(() => {
      const match = page.url().match(desiredUrl);
      if (match) {
        clearInterval(timer);
        resolve([match[2], match[1]]);
        return;
      }
      if (Date.now() - start >= timeout) {
        clearInterval(timer);
        resolve([NaN, NaN]);
        return;
      }
    }, interval);
  });
};

const main = async (filenames) => {
  const cache = await readCache();
  const browser = await puppeteer.launch({ headless: false });
  console.log("Browser launched");
  const page = await browser.newPage();

  for (const filename of filenames) {
    const csvPath = join(__dirname, filename);
    const { data } = await parseCsv(createReadStream(csvPath));
    for (const place of data) {
      const cid = parseCid(place.URL);
      if (cache[cid]) {
        // console.debug("Skipping cached CID:", cid);
        continue;
      }
      console.log("Processing:", place.Title, place.URL);
      await page.goto(`https://maps.google.com/?cid=${cid}`);
      await handleCookieConsent(page);
      const [lat, lon] = await waitForGoogleMapsUrl(page);
      if (!lat || !lon) {
        console.log("Invalid coordinates:", page.url());
        continue;
      }
      console.log("Coordinates:", lat, lon);
      cache[cid] = [lat, lon];
      await writeFile(cachePath, JSON.stringify(cache, null, 2));
      console.log("Cache has been updated");
    }
  }

  await browser.close();
  console.log("Browser closed");
};

main(["Want to go.csv", "Favourite Places.csv"]);
