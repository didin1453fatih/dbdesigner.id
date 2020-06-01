module.exports = {
  inputs: {
    body: {
      additionalProperties: false,
      type: "object",
      required: [
        "origin_id",
        "forker_title",
        "forker_description",
        "forker_share_status"
      ],
      properties: {
        origin_id: {
          type: "string"
        },
        forker_title: {
          type: "string"
        },
        forker_description: {
          type: "string"
        },
        forker_share_status: {
          type: "number"
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
      err__dataNotFound: {
        message: "Data id not found"
      },
      err: {
        code: 505,
        message: "Internal Server Error"
      }
    }
  },
  action: async (inputs, outputs) => {
    try {
      var db = Mukmin.getDataModel("computate_engine");
      var origin_design = await db.project.findOne({
        where: {
          id: inputs.body.origin_id
        }
      });
      if (origin_design === undefined || origin_design === null) {
        return outputs.error.err__dataNotFound();
      }

      var forker_design_respond = await db.project.create({
        description: inputs.body.forker_description,
        title: inputs.body.forker_title,
        data_design: origin_design.data_design,
        share_status: inputs.body.forker_share_status,
        user_id: inputs.req.me.id
      });

      return outputs.success.ok(forker_design_respond);
    } catch (error) {
      console.error(error)
      return outputs.error.err()
    }
  }
};
