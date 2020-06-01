import axios from "axios";
export default {
  action: async (inputs, output) => {
    await axios
      .post("/api/v1/auth/checkUserName", {
        user_name: inputs.user_name
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
