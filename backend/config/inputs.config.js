/**
 * More learn about JSON schema validator in
 * https://github.com/epoberezkin/ajv#options
 */
module.exports = {
  body_options: {
    allErrors: true,
    jsonPointers: true
  },
  query_options: {
    allErrors: true,
    jsonPointers: true,
    coerceTypes: true
  },
  /**
   * param akan khusus menggunakan coerceTypes yaitu mekanisme untuk bisa mengubah struktur tipe  dalam pengecekan ajv
   * hal ini dilakukana karena param akan bernilai string semua
   */
  params_options: {
    allErrors: true,
    jsonPointers: true,
    removeAdditional: "failing",
    coerceTypes: true
  },
  loadValidator: (bodyValidator, queryValidator, paramsValidator) => {
    require("ajv-errors")(bodyValidator, { singleError: true });
    require("ajv-errors")(queryValidator, { singleError: true });
    require("ajv-errors")(paramsValidator, { singleError: true });
  }
};
