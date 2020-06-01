module.exports = {
  inputs: {
    query: {
      additionalProperties: false,
      type: "object",
      required: ["id"],
      properties: {
        id: {
          type: "string"
        }
      }
    },
    body: {}
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
      err__privateDesign: {
        message: "This is private design"
      }
    }
  },
  action: async (inputs, outputs) => {
    var db = Mukmin.getDataModel("computate_engine");
    var dataRespond = await db.project.findOne({
      where: {
        id: inputs.query.id
      },
      include: [
        {
          model: db.user
        }
      ]
    });

    if (dataRespond === undefined || dataRespond === null) {
      return outputs.error.err__dataNotFound();
    }

    // if (dataRespond.share_status === 0) {
    //   return outputs.error.err__privateDesign();
    // }
    return outputs.success.ok({
      title: dataRespond.title,
      description: dataRespond.description,
      share_status: dataRespond.share_status,
      owner: dataRespond.user.user_name
    });
  }
};
