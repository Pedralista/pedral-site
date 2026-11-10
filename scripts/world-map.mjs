// Builds public/images/world-delivered.svg: Natural Earth outlines (world-atlas),
// Equal Earth projection, delivered-to countries in gold. Not part of the build.
// To regenerate: in a scratch folder run `npm i world-atlas@2.0.2 topojson-client@3.1.0 d3-geo@3.1.1`,
// copy this file there, then `node world-map.mjs <path to public/images/world-delivered.svg>`.
import fs from "node:fs";
import { feature, merge } from "topojson-client";
import { geoEqualEarth, geoPath, geoCentroid, geoBounds } from "d3-geo";

const out = process.argv[2];
const load = (r) => {
  const t = JSON.parse(fs.readFileSync(new URL(`./node_modules/world-atlas/countries-${r}.json`, import.meta.url)));
  return feature(t, t.objects.countries).features.filter((f) => f.id !== "010"); // drop Antarctica
};
// Shapes: 110m is light enough for a web page. Natural Earth draws de facto
// borders; we draw internationally recognised ones (UN position):
//  - Crimea belongs to Ukraine (Natural Earth puts it in Russia),
//  - Western Sahara is not part of Morocco (Natural Earth gives Morocco the
//    area west of the berm). Morocco is only lit north of 27°40'N.
let maWsBase;
const topo110 = JSON.parse(fs.readFileSync(new URL("./node_modules/world-atlas/countries-110m.json", import.meta.url)));
{
  const geoms = topo110.objects.countries.geometries;
  const ru = geoms.find((g) => g.id === "643");
  const ua = geoms.find((g) => g.id === "804");
  // Crimea = the Russia polygon whose bounds sit on the peninsula.
  const crimeaIdx = ru.arcs.findIndex((poly) => {
    const f = feature(topo110, { type: "Polygon", arcs: poly });
    const [[w, s], [e, n]] = geoBounds(f);
    return w > 32 && e < 37 && s > 44 && n < 46.5;
  });
  if (crimeaIdx < 0) throw new Error("Crimea polygon not found");
  const crimea = { type: "Polygon", arcs: ru.arcs[crimeaIdx] };
  ru.arcs = ru.arcs.filter((_, i) => i !== crimeaIdx);
  const merged = merge(topo110, [ua, crimea]); // one shape, no line across the isthmus
  ua.type = merged.type === "MultiPolygon" ? "MultiPolygon" : "Polygon";
  ua._merged = merged;
  // Grey base for Morocco + Western Sahara as one shape, so no de facto line
  // (the berm) shows inside Western Sahara.
  const ma = geoms.find((g) => g.id === "504");
  const ws = geoms.find((g) => g.id === "732");
  maWsBase = { type: "Feature", geometry: merge(topo110, [ma, ws]) };
}
const all = topo110.objects.countries.geometries
  .map((g) => (g._merged ? { type: "Feature", id: g.id, properties: g.properties, geometry: g._merged } : feature(topo110, g)))
  .filter((f) => f.id !== "010"); // drop Antarctica
const fine = load("50m"); // only to place dots on places too small for 110m

// ISO 3166 numeric codes of the delivery countries (warehouse export + Kickstarter
// 'Shipped' + the two resent Maestros), Nov 2026.
const DELIVERED = {
  US: "840", GB: "826", SE: "752", AU: "036", FR: "250", CH: "756", CA: "124", DE: "276",
  ES: "724", NL: "528", DK: "208", IE: "372", CZ: "203", RO: "642", PL: "616", IT: "380",
  FI: "246", NO: "578", IS: "352", BE: "056", GE: "268", UA: "804", IL: "376", AE: "784",
  QA: "634", ZA: "710", JP: "392", HK: "344", SG: "702", MY: "458", PH: "608", TH: "764",
  ID: "360", IN: "356", MX: "484", PR: "630", CW: "531", SA: "682",
  // Shipped by Kevin directly (2026-11-10):
  CD: "180", GH: "288", NG: "566", MA: "504",
};
const ids = new Set(Object.values(DELIVERED));
const found = new Set(fine.map((f) => f.id));
const missing = Object.entries(DELIVERED).filter(([, n]) => !found.has(n));
if (missing.length) throw new Error("not in map data: " + JSON.stringify(missing));

const W = 1000;
const projection = geoEqualEarth().fitWidth(W, { type: "FeatureCollection", features: all });
const path = geoPath(projection).digits(1);
const [[, y0], [, y1]] = path.bounds({ type: "FeatureCollection", features: all });
const H = Math.ceil(y1 - y0 + 4);
projection.translate([projection.translate()[0], projection.translate()[1] - y0 + 2]);

const MOROCCO = "504";
// Grey base: every country not delivered to, plus Morocco + Western Sahara as
// one shape so the part south of 27°40'N stays grey under the clipped gold.
const rest =
  all.filter((f) => !ids.has(f.id) && f.id !== "732").map((f) => path(f)).join("") + path(maWsBase);
const hit = all.filter((f) => ids.has(f.id));
const inShapes = new Set(hit.map((f) => f.id));
const lit = hit.filter((f) => f.id !== MOROCCO).map((f) => path(f)).join("");
const morocco = hit.filter((f) => f.id === MOROCCO).map((f) => path(f)).join("");
// Equal Earth draws parallels as straight lines, so the 27°40'N border is a
// horizontal cut.
const cutY = projection([-10, 27 + 40 / 60])[1].toFixed(1);

// Small places would vanish at this size: mark them with a dot. Uses the main
// 50m feature for each code (largest area), so no stray islands sharing a code.
const main = new Map();
for (const f of fine) if (ids.has(f.id) && (!main.has(f.id) || path.area(f) > path.area(main.get(f.id)))) main.set(f.id, f);
const small = [...main.values()].filter((f) => !inShapes.has(f.id) || path.area(f) < 40);
const dots = small
  .map((f) => {
    const [x, y] = projection(geoCentroid(f));
    return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3.2"/>`;
  })
  .join("");
const dotted = small.map((f) => f.properties.name);

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="World map of the countries Pedral watches have been delivered to">
<path d="${rest}" fill="#f5f2eb" fill-opacity="0.07" stroke="#111d20" stroke-width="0.4"/>
<defs><clipPath id="ma"><rect x="0" y="0" width="${W}" height="${cutY}"/></clipPath></defs>
<path d="${lit}" fill="#c9a84c" fill-opacity="0.8" stroke="#111d20" stroke-width="0.4"/>
<path d="${morocco}" clip-path="url(#ma)" fill="#c9a84c" fill-opacity="0.8" stroke="#111d20" stroke-width="0.4"/>
<g fill="#c9a84c" stroke="#111d20" stroke-width="1.2">${dots}</g>
</svg>
`;
fs.writeFileSync(out, svg);
console.log("shapes lit:", hit.length, "total covered:", new Set([...inShapes, ...small.map((f) => f.id)]).size, "dots:", (dots.match(/circle/g) || []).length, "size KB:", (svg.length / 1024).toFixed(0), "viewBox", W, H);
console.log("dotted:", dotted.join(", "));
