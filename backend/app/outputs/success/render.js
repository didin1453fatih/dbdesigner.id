/**
 * options
 *  -message
 *  -code
 */
module.exports = async function(res, options, data) {
  res.render(options.path, data);
};
