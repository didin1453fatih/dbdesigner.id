/**
 * Do in this for custome auth
 * it must return user object like user with
 * user={
 *  name : "didin",
 *  sex  : "male"
 * }
 * Untuk On auth ini seharusnya langsung di simpan di session store saja datanya.
 * Nggak usah dilakukan pengecekan lagi di database.
 * Konfigurasi database dan system session akan ditempatkan di plugin
 */
var sessionService = require("../services/session.service")

module.exports = async function (token) {
  try {
    var sessionRespond = await sessionService.read(token)
    return sessionRespond
  } catch (error) {
    console.log(error)
    return null
  }
};
