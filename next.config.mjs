/** @type {import('next').NextConfig} */

import nextPWA from "next-pwa";

const withPWA = nextPWA({
  dest: "public",
  reloadOnOnline: true,
  disable: false,
});

const nextConfig = {
  images: {
    domains: ["api.qrserver.com", "ygokgtgl7r.ufs.sh"],
  },
};

export default withPWA(nextConfig);
