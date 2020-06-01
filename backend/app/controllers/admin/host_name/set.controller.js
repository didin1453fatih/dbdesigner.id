module.exports = {
    inputs: {
        body: {
            additionalProperties: false,
            type: "object",
            description: "this is hostname to set url",
            required: ["host_name"],
            properties: {
                host_name: {
                    type: "string"
                }
            }
        }
    },
    outputs: {
        success: {
            ok: {
                message: "success"
            }
        }
    },
    action: async (inputs, outputs) => {
        Mukmin.changeConfig("app", "url", inputs.body.host_name)
        return outputs.success.ok({
            host_name: Mukmin.getConfig("app").url
        })
    }
};
