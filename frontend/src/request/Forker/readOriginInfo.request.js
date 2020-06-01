import axios from "axios";
import Authorization from "@/helper/AuthorizationToken"
export default {
  action: async (inputs, output) => {
    await axios
      .get(`/api/v1/fork/readOriginInfo?id=${inputs.id}`, {
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
