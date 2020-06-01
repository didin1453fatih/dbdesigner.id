// vue.config.js
module.exports = {
  // options...
  devServer: {
    proxy: "http://localhost"
  },
  publicPath: process.env.NODE_ENV === "production" ? "/" : "/"
};
