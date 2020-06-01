module.exports = {
  inputs: {},
  outputs: {
    success: {
      ok: {
        message: "success"
      }
    }
  },
  action: async (inputs, outputs) => {
    return outputs.res.sendFile(Mukmin.getPath('../frontend/dist/index.html'))
  }
};
