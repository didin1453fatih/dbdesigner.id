/**
 * options
 *  -message
 *  -code
 */
module.exports = async function(res, options, data) {
  res.json({
    success: false,
    message: options.message,
    description: data
  });
};
