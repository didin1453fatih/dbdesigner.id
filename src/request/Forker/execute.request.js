import axios from "axios";
export default {
  action: async (inputs, output) => {
    await axios
      .post("/back-office/api/v1/fork/execute", {
        origin_uuid: inputs.origin_uuid,
        forker_title: inputs.forker_title,
        forker_description: inputs.forker_description,
        forker_share_status: inputs.forker_share_status
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
