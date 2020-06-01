module.exports = {
  inputs: {
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
        message: "Contact admin for reset password"
      }
    }
  },
  action: async (inputs, outputs) => {
    return outputs.error.err();
  }
};
