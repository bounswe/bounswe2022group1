
/** @type {import('next').NextConfig} */


const removeImports = require("next-remove-imports")();

const nextConfig = removeImports({
  reactStrictMode: true,
  env: {
    API_URL: "http://3.89.218.253:8000/app",
  },
});

module.exports = nextConfig;