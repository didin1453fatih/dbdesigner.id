var sessionService = require("../../services/session.service")
module.exports = {
  inputs: {
    query: {},
    body: {}
  },
  outputs: {
    success: {
      ok: {
        message: "success"
      }
    },
    error: {
      err__failure: {
        message: "Logout problem"
      }
    }
  },
  action: async (inputs, outputs) => {
    try {
      await sessionService.destroy(inputs.req.me.token)
      outputs.success.ok();
    } catch (error) {
      console.error(error)
      return outputs.error.err__failure();
    }
  }
};
