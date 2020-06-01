module.exports = {
    inputs: {},
    outputs: {
        success: {
            ok: {
                message: process.env.VERSION
            }
        }
    },
    action: async (inputs, outputs) => {
        return outputs.success.ok();
    }
};
