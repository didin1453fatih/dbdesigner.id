module.exports = {
  inputs: {
    query: {},
    body: {
      additionalProperties: false,
      type: "object",
      description: "this is body to create an article",
      required: ["title", "description"],
      properties: {
        title: {
          type: "string",
          maxLength: 50
        },
        description: {
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
      err: {
        message: "Failure",
        code: 12
      },
      err__failure: {
        message: "Failure create",
        code: 401
      }
    }
  },
  // onError: async (inputs, outputs, error) => {
  //   return outputs.error.err__failure(error);
  // },
  action: async (inputs, outputs) => {
    try {
      var db = Mukmin.getDataModel("computate_engine");
      var projectRespond = await db.project.create({
        description: inputs.body.description,
        title: inputs.body.title,
        user_id: inputs.req.me.id
      });

      return outputs.success.ok(projectRespond);
    } catch (error) {
      console.log(error)
      return outputs.error.err__failure("internal system error");
    }
  }
};
