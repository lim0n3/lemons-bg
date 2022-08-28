// next.config.js
module.exports = {
  images: {
    domains: ['littlelemonfriends.mypinata.cloud'],
  },
  webpack: (config) => {
    config.module.rules.push({ test: /\.handlebars$/, loader: 'handlebars-loader' });
    return config;
  },
};
