module.exports = {
  inputs: {
    payload: {
      type: "object",
      description: "this is body to create an article",
      required: ["email", "password"],
      properties: {
        email: {
          type: "string"
        },
        password: {
          type: "string"
        }
      }
    }
  },
  product: {
    type: "object",
    required: ["email", "password"],
    properties: {
      email: {
        type: "string"
      },
      password: {
        type: "string"
      }
    }
  },
  outputs: {
    success: {
      ok: {
        message: "",
        productValidate: true
      }
    },
    error: {
      type: "object",
      required: ["email", "password"],
      properties: {
        email: {
          type: "string"
        },
        password: {
          type: "string"
        }
      }
    }
  },
  onError: async (inputs, outpus, errors) => {},
  action: async (inputs, outputs) => {
    console.log("Just On Experimental");
  }
};
