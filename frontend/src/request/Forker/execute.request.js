import axios from "axios";
import Authorization from "@/helper/AuthorizationToken"
export default {
  action: async (inputs, output) => {
    await axios
      .post("/api/v1/fork/execute", {
        origin_id: inputs.origin_id,
        forker_title: inputs.forker_title,
        forker_description: inputs.forker_description,
        forker_share_status: inputs.forker_share_status
      }, {
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
