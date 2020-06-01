/**
 * options
 *  -message
 *  -code
 */
module.exports = async function(res, options, data) {
  res.json({
    success: true,
    message: options.message,
    properties: {
      page: data.page,
      page_size: data.page_size,
      total: data.total
    },
    payload: data.payload
  });
};
