module.exports = {
  inputs: {
    query: {
      additionalProperties: false,
      type: "object",
      description: "this is body to create an article",
      required: ["title", "page", "page_size"],
      properties: {
        title: {
          type: "string",
          maxLength: 50
        },
        page: {
          type: "number",
          minimum: 1
        },
        page_size: {
          type: "number",
          maximum: 1,
          maximum: 20
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
        message: "Failure"
      }
    }
  },
  action: async (inputs, outputs) => {
    try {
      var db = Mukmin.getDataModel("computate_engine");
      var offset = inputs.query.page_size * (inputs.query.page - 1);
      var projectRespond = await db.project.findAndCountAll({
        limit: inputs.query.page_size,
        offset: offset,
        attributes: [
          "id",
          "title",
          "description",
          "likes",
          "viewers",
          "share_status",
          "created",
          "updated"
        ],
        where: {
          title: {
            [Sequelize.Op.like]: "%" + inputs.query.title + "%"
          },
          user_id: inputs.req.me.id
        },
        order: [["created", "DESC"]]
      });
      return outputs.success.ok(
        projectRespond.rows,
        projectRespond.count,
        inputs.query.page,
        inputs.query.page_size
      );
    } catch (error) {
      console.error(error)
      return outputs.error.err();
    }
  }
};
