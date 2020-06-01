const bcrypt = require("bcrypt");

module.exports = {
    inputs: {
        query: {},
        body: {
            type: "object",
            description: "this is body to create an article",
            required: [
                "user_name",
                "complete_name",
                "gender",
                "email",
                "password",
                "password_confirm"
            ],
            properties: {
                user_name: {
                    type: "string",
                    maxLength: 50
                },
                complete_name: {
                    type: "string"
                },
                gender: {
                    type: "string"
                },
                email: {
                    type: "string"
                },
                password: {
                    type: "string"
                },
                password_confirm: {
                    type: "string"
                }
            }
        }
    },
    outputs: {
        success: {
            ok: {
                message:
                    "Account created. Mail server is busy. Check your mail after 10 minute"
            }
        },
        error: {
            err__emailUseInAnotherAccount: {
                code: 121,
                message: "Email used in another account"
            },
            err__passwordConfirmationNotMatch: {
                code: 123,
                message: "Password confirmation not match"
            },
            err: {
                code: 505,
                message: "Registration Failure"
            }
        }
    },
    action: async (inputs, outputs) => {
        var db = Mukmin.getDataModel("computate_engine");
        //check email password confirmation
        if (inputs.body.password !== inputs.body.password_confirm) {
            return outputs.success.err__passwordConfirmationNotMatch();
        }

        try {
            bcrypt.hash(inputs.body.password, 10, async function (err, hash) {
                if (!err) {

                    var userRespond = await db.user.findOne({
                        where: {
                            email: inputs.body.email
                        }
                    })

                    if (userRespond !== null) {
                        return outputs.error.err__emailUseInAnotherAccount();
                    }

                    var userRespond = await db.user.create({
                        user_name: inputs.body.user_name,
                        email: inputs.body.email,
                        complete_name: inputs.body.complete_name,
                        verified: true,
                        status: 0,
                        password: hash,
                        gender: inputs.body.gender,
                        token_email_verify: null,
                        token_email_verify_expired_at: null
                    });

                    return outputs.success.ok({
                        id: userRespond.id,
                        user_name: userRespond.user_name,
                        email: userRespond.email,
                        complete_name: userRespond.complete_name,
                        verified: userRespond.verified,
                        status: userRespond.status,
                        gender: userRespond.gender,
                        created: userRespond.created,
                        updated: userRespond.updated
                    });
                } else {
                    return outputs.error.err();
                }
            });
        } catch (error) {
            return outputs.error.err();
        }
    }
};
