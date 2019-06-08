import axios from "axios";
export default {
  action: async (inputs, output) => {
    await axios
      .get("/back-office/api/v1/project/delete?id=" + inputs.id)
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
