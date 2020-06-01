module.exports = {
  inputs: {
    query: {},
    body: {
      additionalProperties: false,
      type: "object",
      description: "this is body to create an article",
      required: ["data_design", "id"],
      properties: {
        id: {
          type: "string",
          maxLength: 100
        },
        data_design: {
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
      err__notFound: {
        message: "Project not found"
      },
      err__failure: {
        message: "Internal system error"
      }
    }
  },
  action: async (inputs, outputs) => {
    try {
      var db = Mukmin.getDataModel("computate_engine");
      var projectRespond = await db.project.update(
        {
          data_design: inputs.body.data_design
        },
        {
          where: {
            id: inputs.body.id,
            user_id: inputs.req.me.id
          }
        }
      );

      if (projectRespond[0] > 0) {
        return outputs.success.ok();
      } else {
        return outputs.error.err__notFound();
      }

    } catch (error) {
      return outputs.error.err__failure();
    }
  }
};
