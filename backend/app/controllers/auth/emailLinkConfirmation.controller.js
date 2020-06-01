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
        message: "Contact admin for confirmation"
      }
    }
  },
  action: async (inputs, outputs) => {
    return outputs.error.err();
  }
};
