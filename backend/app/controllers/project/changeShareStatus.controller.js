module.exports = {
  inputs: {
    query: {},
    body: {
      additionalProperties: false,
      type: "object",
      required: ["id", "share_status"],
      properties: {
        id: {
          type: "string"
        },
        share_status: {
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
      }
    }
  },
  /**
   * If status is 0 (private), password is not required.
   * If status is 2 (public), password is optional. You can use null for no password and set if need password
   */
  action: async (inputs, outputs) => {
    var db = Mukmin.getDataModel("computate_engine");
    var dataRespond = await db.project.findOne({
      where: {
        id: inputs.body.id,
        user_id: inputs.req.me.id
      }
    });

    if (dataRespond === undefined || dataRespond === null) {
      return outputs.error.err__dataNotFound();
    }
    // Initial state is for private
    var updatedData = {
      share_status: 0,
      share_link: null
    };
    if (inputs.body.share_status === 0) {
      // Nothing to do
    } else if (inputs.body.share_status === 1) {
      //  for next feature
    } else if (inputs.body.share_status === 2) {
      updatedData.share_status = 2;
      updatedData.share_link =
        Mukmin.getConfig("app").url +
        "?action=open&shared=public&uuid=" +
        dataRespond.id;
    }

    var updatedRespond = await db.project.update(updatedData, {
      where: {
        id: inputs.body.id,
        user_id: inputs.req.me.id
      }
    });
    if (updatedRespond[0] == 1) {
      dataRespond = await db.project.findByPk(dataRespond.id);
      return outputs.success.ok({
        id: dataRespond.id,
        share_status: dataRespond.share_status,
        share_link: dataRespond.share_link
      });
    } else {
      return outputs.error.data_not_found();
    }
  }
};
