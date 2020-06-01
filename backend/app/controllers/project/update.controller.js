module.exports = {
  inputs: {
    query: {},
    body: {
      additionalProperties: false,
      type: "object",
      description: "this is body to create an article",
      required: ["title", "description", "id"],
      properties: {
        id: {
          type: "string",
          maxLength: 100
        },
        title: {
          type: "string",
          maxLength: 100
        },
        description: {
          type: "string",
          maxLength: 500
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
      err__projectNotFound: {
        message: "Project not found"
      },
      err__failure: {
        message: "Internal server error"
      }
    }
  },
  action: async (inputs, outputs) => {
    try {
      var db = Mukmin.getDataModel("computate_engine");
      var projectRespond = await db.project.update(
        {
          description: inputs.body.description,
          title: inputs.body.title
        },
        {
          where: {
            id: inputs.body.id,
            user_id: inputs.req.me.id
          }
        }
      );
      if (projectRespond[0] > 0) {
        var projectData = await db.project.findOne({
          attributes: [
            "id",
            "title",
            "description"
          ],
          where: {
            id: inputs.body.id
          },
        })
        return outputs.success.ok(projectData);
      } else {
        return outputs.error.err__projectNotFound();
      }
    } catch (error) {
      return outputs.error.err__failure();
    }
  }
};
