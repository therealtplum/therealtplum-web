import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/travel", "/travel/", "/travel/*", "/api/"],
      },
    ],
    sitemap: "https://therealtplum.com/sitemap.xml",
  };
}


