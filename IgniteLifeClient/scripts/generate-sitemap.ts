import { createWriteStream } from "fs";
import { SitemapStream, streamToPromise } from "sitemap";

(async () => {
  const sitemap = new SitemapStream({
    hostname: "https://www.ignitelife.com.au",
  });

  sitemap.write({ url: "/", changefreq: "monthly", priority: 1.0 });
  sitemap.write({ url: "/about", changefreq: "monthly", priority: 0.7 });
  sitemap.write({ url: "/heather", changefreq: "monthly", priority: 0.7 });
  sitemap.end();

  const xml = await streamToPromise(sitemap).then((data) => data.toString());

  // Write to public folder
  createWriteStream("public/sitemap.xml").write(xml);

  console.log("✅ Sitemap saved as public/sitemap.xml");
})();
