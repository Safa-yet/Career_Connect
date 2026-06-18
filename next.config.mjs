/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',

        pathname: '/**',

      },
    ],
  },

   allowedDevOrigins: [
    "192.168.0.102",
  ],
};

export default nextConfig;
