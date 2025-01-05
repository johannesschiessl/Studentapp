/** @type {import('next').NextConfig} */

import nextPWA from "next-pwa";

const withPWA = nextPWA({
  dest: "public",
  reloadOnOnline: true,
  disable: false,
});

const nextConfig = {
  images: {
    domains: ["api.qrserver.com", "utfs.io"],
  },
};

export default withPWA(nextConfig);
