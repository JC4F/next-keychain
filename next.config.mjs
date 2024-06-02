/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Basic redirect
      {
        source: "/",
        destination: "/product",
        permanent: true,
      },
    ];
  },
  images: {
    domains: ["uploadthing.com", "utfs.io", "lh3.googleusercontent.com"],
  },
};

export default nextConfig;
