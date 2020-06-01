/**
 * options
 *  -message
 *  -code
 */
module.exports = async function(res, options, data, inputs, outputs) {
  res.json({
    success: false,
    code: options.code,
    message: options.message,
    description: data
  });
};
