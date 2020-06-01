import axios from "axios";
import Authorization from "@/helper/AuthorizationToken.js"
export default {
  action: async (inputs, output) => {
    await axios
      .get(
        "/api/v1/project/getList?page=1&page_size=10&title=" +
        inputs.title, {
        headers: Authorization.getAuth()
      })
      .then(function (response) {
        if (response.data.success) {
          return output.success(response.data);
        } else {
          return output.error(response.data);
        }
      })
      .catch(function (error) {
        return output.error(error);
      });
  }
};
