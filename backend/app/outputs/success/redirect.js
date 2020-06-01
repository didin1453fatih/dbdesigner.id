/**
 * options
 *  -message
 *  -code
 */
module.exports = async function(res, options, data) {
  if (data === undefined) {
    return res.redirect(options.location);
  } else {
    return res.redirect(options.location + data);
  }
};
