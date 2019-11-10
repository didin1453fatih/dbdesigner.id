// vue.config.js
module.exports = {
  // options...
  devServer: {
    proxy: "http://localhost:81"
  },
  publicPath: process.env.NODE_ENV === "production" ? "/static/" : "/"
};
