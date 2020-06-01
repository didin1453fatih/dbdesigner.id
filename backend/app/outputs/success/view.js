/**
 * options
 *  -message
 *  -code
 */
module.exports = async function(res, options, data) {
  var tmp = {};
  if (data !== undefined) {
    Object.assign(tmp, data);
  }
  if (options.data !== undefined) {
    Object.assign(tmp, options.data);
  }
  res.render(options.path, tmp);
};
