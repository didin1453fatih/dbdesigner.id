/**
 * Protected still under development
 */
module.exports = {
  inputs: {
    body: {},
    query: {
      additionalProperties: false,
      type: "object",
      description: "this is body to create an article",
      required: ["uuid"],
      properties: {
        uuid: {
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
    },
    error: {
      err: {
        message: "Internal error",
        code: 505
      },
      err__notFound: {
        message: "Data not found",
        code: 22
      },
      err__notAuthorized: {
        message: "Design not authorized to you",
        code: 10
      },
      err__needPassword: {
        message: "Input design password",
        code: 23
      },
      err__wrongPassword: {
        message: "Your password is wrong",
        code: 25
      }
    }
  },
  action: async (inputs, outputs) => {
    try {
      var db = Mukmin.getDataModel("computate_engine");
      var projectRespond = await db.project.findByPk(inputs.query.uuid);
      if (projectRespond === null) {
        return outputs.error.err__notFound();
      } else {
        if (projectRespond.share_status === 0) {
          /**
           * Private
           * share_status == 0
           */
          if (inputs.req.me == null) {
            return outputs.error.err__notAuthorized();
          }
          if (projectRespond.user_id === inputs.req.me.id) {
            return outputs.success.ok(projectRespond);
          } else {
            return outputs.error.err__notAuthorized();
          }
        } else if (projectRespond.share_status === 2) {
          return outputs.success.ok(projectRespond);
        }
      }
    } catch (error) {
      console.error(error);
      return outputs.error.err();
    }
  }
};
