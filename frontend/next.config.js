// next.config.js

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { hostname: "source.unsplash.com" },
      { hostname: "images.unsplash.com" },
      { hostname: "cdn.pixabay.com" },
      { hostname: "i.ibb.co" },
      { hostname: "images.pexels.com" },
      { hostname: "unsplash.com" },
      { hostname: "plus.unsplash.com" },
      { hostname: "landingfoliocom.imgix.net" },
    ],
  },
  env: {
      BACKEND_URL: "http://localhost:8000",
  },
};

module.exports = nextConfig;