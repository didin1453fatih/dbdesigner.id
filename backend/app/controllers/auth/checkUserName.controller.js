module.exports = {
  inputs: {
    body: {
      additionalProperties: false,
      type: "object",
      description: "this is body to create an article",
      required: ["user_name"],
      properties: {
        user_name: {
          type: "string",
          maxLength: 250
        }
      }
    }
  },
  outputs: {
    success: {
      ok: {
        message: "ok"
      }
    },
    error: {
      err: {
        message: "username is exist"
      }
    }
  },
  action: async (inputs, outputs) => {
    var db = Mukmin.getDataModel("computate_engine");
    var userRespond = await db.user.findOne({
      where: {
        user_name: inputs.body.user_name
      }
    });
    if (userRespond === null) {
      outputs.success.ok();
    } else {
      outputs.error.err();
    }
  }
};
