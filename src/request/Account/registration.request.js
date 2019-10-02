import axios from "axios";
export default {
  action: async (inputs, output) => {
    await axios
      .post("/front-office/api/account/registration", {
        user_name: inputs.user_name,
        complete_name: inputs.complete_name,
        gender: inputs.gender,
        email: inputs.email,
        password: inputs.password,
        password_confirm: inputs.password_confirm
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
