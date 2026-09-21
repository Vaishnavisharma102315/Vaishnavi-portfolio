/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  reactStrictMode: true,
  images: {
    formats: ["image/webp", "image/avif"],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: "webpack-glsl-loader",
        },
      ],
    });
    return config;
  },
};

module.exports = nextConfig;
