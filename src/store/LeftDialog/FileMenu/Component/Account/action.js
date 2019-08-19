import { message } from "ant-design-vue";
import ReadAccount from "@/request/readAccount.request";
import UpdateAccount from "@/request/updateAccount.request";
import ChangePassword from "@/request/changePassword.request";
import ResendEmailConfirmation from "@/request/resendEmailConfirmation.request";
import { request2, requestHelper } from "@/helper/RequestConnector";
export default {
  resendEmailConfirmation: request2(async context => {
    context.commit("setLoding", true);
    try {
      var respondConfirmation = await requestHelper(ResendEmailConfirmation);
      message.success(respondConfirmation.message, 5);
    } catch (error) {
      if (error.code === 10) {
        message.error("Login first to update account", 2);
        context.rootCommit("LeftPanel/setVisible", true);
        context.rootCommit("LeftPanel/setPanelName", "login");
      } else {
        message.error(error.message, 2);
      }
    }
    context.commit("setLoding", false);
  }),
  updateAccount: request2(async context => {
    context.commit("setLoding", true);
    try {
      var respondAccount = await requestHelper(UpdateAccount, {
        complete_name: context.rootState.Data.Account.fullName,
        id: context.rootState.Data.Account.id,
        gender: context.rootState.Data.Account.gender
      });
      respondAccount = respondAccount.payload;
      message.success("Updated", 2);
      context.rootCommit(
        "Data/Account/setFullName",
        respondAccount.complete_name
      );
      context.rootCommit("Data/Account/setGender", respondAccount.gender);
      context.rootCommit("Data/Account/setUsername", respondAccount.user_name);
      context.rootCommit("Data/Account/setEmail", respondAccount.email);
      context.rootCommit("Data/Account/setId", respondAccount.id);
      context.rootCommit("Data/Account/setVerified", respondAccount.verified);
    } catch (error) {
      if (error.code === 10) {
        message.error("Login first to update account", 2);
        context.rootCommit("LeftPanel/setVisible", true);
        context.rootCommit("LeftPanel/setPanelName", "login");
      } else {
        message.error(error.message, 2);
      }
    }
    context.commit("setLoding", false);
  }),
  readAccount: request2(async context => {
    context.commit("setLoding", true);
    try {
      var respondAccount = await requestHelper(ReadAccount);
      respondAccount = respondAccount.payload;
      context.rootCommit(
        "Data/Account/setFullName",
        respondAccount.complete_name
      );
      context.rootCommit("Data/Account/setGender", respondAccount.gender);
      context.rootCommit("Data/Account/setUsername", respondAccount.user_name);
      context.rootCommit("Data/Account/setEmail", respondAccount.email);
      context.rootCommit("Data/Account/setId", respondAccount.id);
      context.rootCommit("Data/Account/setVerified", respondAccount.verified);
      if (respondAccount.verified === false) {
        context.rootCommit("TopAlert/setVisible", true);
        context.rootCommit("TopAlert/setMessage", "Your email need verify");
      } else {
        context.rootCommit("TopAlert/setVisible", false);
      }
    } catch (error) {
      if (error.code === 10) {
        message.error("Login first to read account", 2);
        context.rootCommit("LeftPanel/setVisible", true);
        context.rootCommit("LeftPanel/setPanelName", "login");
      } else {
        message.error(error.message, 2);
      }
    }
    context.commit("setLoding", false);
  }),
  changePassword: request2(async context => {
    context.commit("setLoadingChangePassword", true);
    try {
      await requestHelper(ChangePassword, {
        old_password: context.state.oldPassword,
        new_password: context.state.newPassword,
        confirm_new_password: context.state.confirmNewPassword
      });
      message.success("Updated", 2);
      context.commit("setVisibleChangePassword", false);
    } catch (error) {
      if (error.code === 10) {
        message.error("Login first to change password", 2);
        context.rootCommit("LeftPanel/setVisible", true);
        context.rootCommit("LeftPanel/setPanelName", "login");
      } else {
        message.error(error.message, 2);
      }
    }
    context.commit("setLoadingChangePassword", false);
  })
};
