module.exports = {

  // AUTH


  "POST /api/v1/auth/registration": {
    action: "auth/registration"
  },


  "POST /api/v1/auth/login": {
    action: "auth/login"
  },


  "GET /api/v1/auth/logout": {
    action: "auth/logout",
    policies: ["user"]
  },



  "POST /api/v1/auth/checkUserName": {
    action: "auth/checkUserName"
  },


  "POST /api/v1/emailLinkConfirmation": {
    action: "auth/emailLinkConfirmation"
  },


  "POST /api/v1/auth/resetPasswordRequest": {
    action: "auth/resetPasswordRequest"
  },


  "POST /api/v1/auth/resetPassword": {
    action: "auth/resetPassword"
  },




  // PROJECT

  "POST /api/v1/project/new": {
    action: "project/new",
    policies: ["user"]
  },

  "GET /api/v1/project/getList": {
    action: "project/getList",
    policies: ["user"]
  },

  "GET /api/v1/project/open": {
    action: "project/open",
    policies: ["publicAuth"]
  },


  "POST /api/v1/project/save": {
    action: "project/save",
    policies: ["user"]
  },


  "POST /api/v1/project/update": {
    action: "project/update",
    policies: ["user"]
  },


  "POST /api/v1/project/changeShareStatus": {
    action: "project/changeShareStatus",
    policies: ["user"]
  },


  "POST /api/v1/project/delete": {
    action: "project/delete",
    policies: ["user"]
  },


  "GET /api/v1/account/me": {
    action: "account/me",
    policies: ["user"]
  },


  "POST /api/v1/account/update": {
    action: "account/update",
    policies: ["user"]
  },



  "POST /api/v1/account/changePassword": {
    action: "account/changePassword",
    policies: ["user"]
  },



  "GET /api/v1/account/resendEmailVerification": {
    action: "account/resendEmailVerification",
    policies: ["user"]
  },


  "GET /api/v1/fork/readOriginInfo": {
    action: "fork/readOriginInfo",
    policies: ["user"]
  },


  "POST /api/v1/fork/execute": {
    action: "fork/execute",
    policies: ["user"]
  },


  "GET /": {
    action: "app/app"
  },

  "GET /api/v1/backend.version": {
    action: "app/version"
  },



  // Admin
  "POST /api/v1/admin/user/add": {
    action: "admin/user/add"
  },
  "GET /api/v1/admin/user/list": {
    action: "admin/user/list"
  },
  "GET /api/v1/admin/user/getOne": {
    action: "admin/user/getOne"
  },
  "POST /api/v1/admin/user/edit": {
    action: "admin/user/edit"
  },


  "GET /api/v1/admin/host_name/get": {
    action: "admin/host_name/get"
  },  

  "POST /api/v1/admin/host_name/set": {
    action: "admin/host_name/set"
  },  


};
