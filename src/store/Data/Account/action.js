import { message } from "ant-design-vue";
import ReadAccount from "@/request/readAccount.request";
import UpdateAccount from "@/request/updateAccount.request";
import ChangePassword from "@/request/changePassword.request";
import ResendEmailConfirmation from "@/request/resendEmailConfirmation.request";
import Logout from "@/request/logoutAccount.request";
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
        complete_name: context.state.fullName,
        id: context.state.id,
        gender: context.state.gender
      });
      respondAccount = respondAccount.payload;
      message.success("Updated", 2);
      context.commit("setFullName", respondAccount.complete_name);
      context.commit("setGender", respondAccount.gender);
      context.commit("setUsername", respondAccount.user_name);
      context.commit("setEmail", respondAccount.email);
      context.commit("setId", respondAccount.id);
      context.commit("setVerified", respondAccount.verified);
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
      context.commit("setFullName", respondAccount.complete_name);
      context.commit("setGender", respondAccount.gender);
      context.commit("setUsername", respondAccount.user_name);
      context.commit("setEmail", respondAccount.email);
      context.commit("setId", respondAccount.id);
      context.commit("setVerified", respondAccount.verified);
      if (respondAccount.verified === false) {
        context.commit("setVisibleAccountInformation", true);
        context.commit(
          "setMessageAccountInformation",
          "Your email need verify"
        );
      } else {
        context.commit("setVisibleAccountInformation", false);
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
  globalReadAccount: request2(async context => {
    context.rootCommit("GlobalLoading/setVisible", true);
    try {
      var respondAccount = await requestHelper(ReadAccount);
      respondAccount = respondAccount.payload;
      context.commit("setFullName", respondAccount.complete_name);
      context.commit("setGender", respondAccount.gender);
      context.commit("setUsername", respondAccount.user_name);
      context.commit("setEmail", respondAccount.email);
      context.commit("setId", respondAccount.id);
      context.commit("setVerified", respondAccount.verified);
      if (respondAccount.verified === false) {
        context.commit("setVisibleAccountInformation", true);
        context.commit(
          "setMessageAccountInformation",
          "Your email need verify"
        );
      } else {
        context.commit("setVisibleAccountInformation", false);
      }
    } catch (error) {
      if (error.code === 10) {
        if (context.inputs.uuid === null) {
          message.error("Login first to start design", 3);
          context.rootCommit("LeftPanel/setVisible", true);
          context.rootCommit("LeftPanel/setPanelName", "login");
        } else {
          message.error("You are guest", 2);
        }
      } else {
        message.error(error.message, 2);
      }
      context.commit("setVisibleAccountInformation", true);
      context.commit("setMessageAccountInformation", "You are guest");
    }
    context.rootCommit("GlobalLoading/setVisible", false);
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
  }),
  logoutAccount: request2(async context => {
    // context.commit("setLoadingChangePassword", true);
    context.rootCommit("GlobalLoading/setVisible", true);
    try {
      await requestHelper(Logout);
      message.success("Logout", 2);
      context.rootCommit("GlobalLoading/setVisible", false);
      setTimeout(() => {
        window.location.href = "/";
      }, 500);
    } catch (error) {
      if (error.code === 10) {
        message.error("Login first to logout", 2);
        context.rootCommit("LeftPanel/setVisible", true);
        context.rootCommit("LeftPanel/setPanelName", "login");
      } else {
        message.error(error.message, 2);
      }
      context.rootCommit("GlobalLoading/setVisible", false);
    }
  })
};
