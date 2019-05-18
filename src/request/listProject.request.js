import axios from "axios";
export default {
  action: async (inputs, output) => {
    await axios
      .get(
        "/back-office/api/v1/project/read?page=1&page_size=10&title="
      )
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
