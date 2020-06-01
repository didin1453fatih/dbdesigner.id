module.exports = {
    inputs: {
        query: {
            additionalProperties: false,
            type: "object",
            description: "this is username",
            required: ["username"],
            properties: {
                username: {
                    type: "string"
                }
            }
        },
        body: {}
    },
    outputs: {
        success: {
            ok: {
                message: "ok"
            }
        },
        error: {
            err__user_not_found: {
                code: 500,
                message: "User not found"
            }
        }
    },
    action: async (inputs, outputs) => {
        var db = Mukmin.getDataModel("computate_engine");

        var user = await db.user.findOne({
            where: {
                user_name: inputs.query.username

            }
        })
        if (user === undefined || user === null) {
            return outputs.error.err__user_not_found()
        }

        return outputs.success.ok(user)
    }
};
