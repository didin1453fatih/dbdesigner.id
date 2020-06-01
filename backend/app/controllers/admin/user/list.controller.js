module.exports = {
    inputs: {
        query: {
            additionalProperties: false,
            type: "object",
            description: "this is keyword to filter username or email",
            required: ["keyword"],
            properties: {
                keyword: {
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
            err: {
                code: 500,
                message: "Internal system error"
            }
        }
    },
    action: async (inputs, outputs) => {
        var db = Mukmin.getDataModel("computate_engine");

        var users = await db.user.findAll({
            where: {
                user_name: {
                    [Sequelize.Op.like]: "%" + inputs.query.keyword + "%"
                }
            }
        })

        return outputs.success.ok(users)
    }
};
