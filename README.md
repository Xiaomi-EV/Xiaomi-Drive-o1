# Xiaomi-Drive-o1 project page

This is the standalone static site for the `page` branch. It presents the current `DriveFoundry` manuscript narrative, method diagrams, structured-data loop, adaptive inference paths and reported evaluation evidence.

## Local run

From this directory, run any static HTTP server, for example:

```text
python -m http.server 4173
```

Then open `http://localhost:4173/`.

The page has no build step or third-party runtime dependency. `index.html`, `styles.css` and `script.js` are the complete site surface. The current MiMo-WAM figures are staged under `assets/mimo/`; the earlier reference set remains under `assets/figures/`. Their provenance is recorded in [`assets-manifest.md`](assets-manifest.md).

## Evidence boundary

The source project is a manuscript and figure set under active development. Values shown on the page are marked as reported evidence; fields described as pending or `TBD` in the manuscript are not presented as final results. Author names, checkpoints, datasets, training code, licenses and release URLs are intentionally not inferred.

## GitHub Pages

Set the repository Pages source to the `page` branch and its root directory. The branch includes `.nojekyll` so the static files are served without a Jekyll build.
