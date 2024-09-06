/** @type {import('next').NextConfig} */

import nextPWA from "next-pwa";

const withPWA = nextPWA({
  dest: "public",
  reloadOnOnline: true,
  disable: false,
});

const nextConfig = {};

export default withPWA(nextConfig);
