import axios from "axios";
export default {
  action: async (inputs, output) => {
    await axios
      .post("/api/v1/auth/resetPassword", {
        token: inputs.token,
        password: inputs.password,
        password_verify: inputs.password_verify
      })
      .then(function(response) {
        if (response.data.success) {
          return output.success(response.data);
        } else {
          return output.error(response.data);
        }
      })
      .catch(function(error) {
        return output.error(error);
      });
  }
};
