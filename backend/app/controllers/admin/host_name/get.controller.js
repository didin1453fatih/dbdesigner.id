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
        return outputs.success.ok({
            host_name: Mukmin.getConfig("app").url
        })
    }
};
