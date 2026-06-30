import fs from "fs";
import routes from "./src/routes.js";

const domain = "https://chennaibeats.com";

const today = new Date().toISOString().split("T")[0];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>

<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

${routes
  .map(
    (route) => `
  <url>
    <loc>${domain}${route.path}</loc>
    <lastmod>${today}</lastmod>
    <priority>${route.priority}</priority>
  </url>`
  )
  .join("")}

</urlset>`;

fs.writeFileSync("./public/sitemap.xml", sitemap);

console.log("✅ Chennai Beats sitemap generated!");