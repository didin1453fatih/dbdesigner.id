module.exports = {
  inputs: {
    query: {},
    body: {
      additionalProperties: true,
      type: "object",
      description: "this is body to create an article",
      properties: {
        gender: {
          type: ["string"],
          maxLength: 10
        },
        complete_name: {
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
      err__notFound: {
        message: "id not found"
      }
    }
  },
  action: async (inputs, outputs) => {
    var db = Mukmin.getDataModel("computate_engine");
    var userUpdateRespond = await db.user.update(
      {
        complete_name: inputs.body.complete_name,
        gender: inputs.body.gender
      },
      {
        where: {
          id: inputs.req.me.id
        }
      }
    );
    if (userUpdateRespond[0] === 1) {
      var userRespond = await db.user.findByPk(inputs.req.me.id);
      return outputs.success.ok({
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
    } else {
      return outputs.error.err__notFound();
    }
  }
};
