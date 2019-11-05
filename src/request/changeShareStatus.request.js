import axios from "axios";
export default {
  action: async (inputs, output) => {
    await axios
      .post("/back-office/api/v1/project/changeShareStatus", {
        uuid: inputs.uuid,
        share_status: inputs.share_status
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
