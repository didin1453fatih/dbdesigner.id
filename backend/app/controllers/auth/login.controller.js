var sessionService = require("../../services/session.service")
var bcrypt = require("bcrypt");
module.exports = {
  inputs: {
    query: {},
    body: {
      additionalProperties: false,
      type: "object",
      description: "this is body to create an article",
      required: ["email", "password"],
      properties: {
        email: {
          type: "string",
          errorMessage: "Format Email harus benar",
          maxLength: 50
        },
        password: {
          type: "string",
          maxLength: 50
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
      err__need_confirmation: {
        message: "You need confirm your mail first",
        code: 402
      },
      err__combination_not_match: {
        message: "Combination not match",
        code: 401
      },
      err__format_input: {
        message: "Format Input false",
        code: 401
      }
    }
  },
  onError: async (inputs, outputs, errors) => {
    return outputs.error.err__format_input();
  },
  action: async (inputs, outputs) => {
    var bodyPass = inputs.body.password;
    var db = Mukmin.getDataModel("computate_engine");
    var userRespond = await db.user.findOne({
      where: {
        email: inputs.body.email
      }
    });

    if (userRespond !== null) {
      bcrypt.compare(bodyPass, userRespond.password, async (err, res) => {
        if (!err && res === true) {
          try {
            var token = await sessionService.make({
              id: userRespond.id,
              user_name: userRespond.user_name,
              email: userRespond.email,
              complete_name: userRespond.complete_name,
              verified: userRespond.verified,
              status: userRespond.status
            })

            return outputs.success.ok({
              token: token,
              id: userRespond.id,
              user_name: userRespond.user_name,
              email: userRespond.email,
              complete_name: userRespond.complete_name,
              verified: userRespond.verified,
              status: userRespond.status,
              gender: userRespond.gender,
              facebook_account: userRespond.facebook_account,
              github_account: userRespond.github_account,
              twitter_account: userRespond.twitter_account,
              created: userRespond.created,
              updated: userRespond.updated
            });
          } catch (error) {
            console.error(error)
            return outputs.error.err__combination_not_match();
          }
        } else {
          return outputs.error.err__combination_not_match();
        }
      });
    } else {
      return outputs.error.err__combination_not_match();
    }
  }
};
