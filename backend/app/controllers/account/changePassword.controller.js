var bcrypt = require("bcrypt");
module.exports = {
  inputs: {
    query: {},
    body: {
      additionalProperties: false,
      type: "object",
      description: "this is body to create an article",
      required: ["old_password", "new_password", "confirm_new_password"],
      properties: {
        old_password: {
          type: "string",
          maxLength: 150
        },
        new_password: {
          type: "string",
          maxLength: 150
        },
        confirm_new_password: {
          type: "string",
          maxLength: 150
        }
      }
    }
  },
  outputs: {
    success: {
      ok: {
        message: "success"
      }
    },
    error: {
      err__confirmationPasswordNotMatch: {
        message: "confirmation new password not same"
      },
      err__oldPassword: {
        message: "old password not same"
      },
      err__failureChangePassword: {
        message: "failure contact cs"
      },
      err__userNotFound:{
        message: "user not found"
      }
    }
  },
  action: async (inputs, outputs) => {
    var db = Mukmin.getDataModel("computate_engine");
    if (inputs.body.new_password !== inputs.body.confirm_new_password) {
      return outputs.error.err__confirmationPasswordNotMatch();
    }
    console.log('inputs.body.old_password ' + inputs.body.old_password)

    var user = await db.user.findByPk(inputs.req.me.id);
    
    if(user===null){
      return outputs.err__userNotFound()
    }

    bcrypt.compare(
      inputs.body.old_password,
      user.password,
      (err, res) => {
        if (!err && res === true) {
          try {
            bcrypt.hash(inputs.body.new_password, 10, async function (
              err,
              hash
            ) {
              if (!err) {
                try {
                  await db.user.update(
                    {
                      password: hash
                    },
                    {
                      where: {
                        id: user.id
                      }
                    }
                  );
                  return outputs.success.ok();
                } catch (error) {
                  return outputs.error.err__failureChangePassword(error);
                }
              } else {
                return outputs.error.err__failureChangePassword(error);
              }
            });
          } catch (error) {
            return outputs.error.err__failureChangePassword();
          }
        } else {
          return outputs.error.err__oldPassword();
        }
      }
    );
  }
};
