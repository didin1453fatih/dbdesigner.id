module.exports = {
  inputs: {
    query: {},
    body: {}
  },
  outputs: {
    success: {
      ok: {
        message: 'ok'
      }
    },
    error: {
      err: {
        code: 505,
        message: "Registration only from CLI admin "
      }
    }
  },
  action: async (inputs, outputs) => {
    return outputs.error.err();
  }
};
