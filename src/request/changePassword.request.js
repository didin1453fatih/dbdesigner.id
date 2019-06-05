import axios from "axios";
export default {
  action: async (inputs, output) => {
    await axios
      .post("/back-office/api/v1/account/changePassword", {
        old_password: inputs.old_password,
        new_password: inputs.new_password,
        confirm_new_password: inputs.confirm_new_password
      })
      .then(function(response) {
        if (response.data.success) {
          return output.success(response.data);
        } else {
          return output.error(response.data.message);
        }
      })
      .catch(function(error) {
        return output.error(error);
      });
  }
};
