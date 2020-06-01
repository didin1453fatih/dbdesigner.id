/**
 * How to config SSL
 * https://stackoverflow.com/questions/2355568/create-a-openssl-certificate-on-windows
 *
 */
module.exports = {
  port: 80,
  url: process.env.APP_URL,
  secure: {
    status: false,
    properties: {
      key: process.env.SECURE_PROPERTIES_KEY,
      cert: process.env.SECURE_PROPERTIES_CERT
    }
  },
  database_ssl_ca: "",
  database_ssl_key: "",
  database_ssl_cert: "",
};
