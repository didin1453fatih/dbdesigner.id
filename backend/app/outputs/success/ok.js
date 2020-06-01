/**
 * options
 *  -message
 *  -code
 */
module.exports = async function(res, options, data) {
  res.json({
    success: true,
    message: options.message,
    payload: data
  });
};
