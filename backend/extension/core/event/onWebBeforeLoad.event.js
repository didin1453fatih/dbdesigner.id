var express = require("express");
var bodyParser = require("body-parser");
var bearerToken = require('express-bearer-token');
module.exports = {
  /**
   * event :{
   *  app : app,
   *  Mukmin : Mukmin,
   *  arg : arg
   * }
   */
  onEvent: async event => {
    console.log("ON WE B BEFORE LOAD lll" + JSON.stringify(event.app));
    var app = event.app;

    await app.get("/system_health", function (request, response) {
      return response.json({
        success: true
      })
    });


    // if (process.env.APP_ENVIRONMENT !== 'DEVELOPMENT') {
    //   await app.use(function (request, response) {
    //     if (!request.secure) {
    //       var target = "https://" + request.headers.host + request.url
    //       console.log("Redirecting to " + target)
    //       response.redirect(target);
    //     }
    //   });
    // }

    // if (process.env.APP_ENVIRONMENT !== 'DEVELOPMENT') {
    //   app.all('*', function (req, res, next) {
    //     //http://docs.aws.amazon.com/ElasticLoadBalancing/latest/DeveloperGuide/TerminologyandKeyConcepts.html#x-forwarded-proto
    //     if (req.get('x-forwarded-proto') != "https") {
    //       res.set('x-forwarded-proto', 'https');
    //       res.redirect('https://' + req.get('host') + req.url);
    //     } else {
    //       next();
    //     }
    //   });
    // }

    await app.use(bodyParser.urlencoded({ extended: false }));
    console.log("ON yyy");
    await app.use(bodyParser.json({limit: '100Mb'}));
    await app.use(bearerToken({
      headerKey: 'Bearer'
    }));
    console.log("Assets static");
    console.log(await Mukmin.getPath("assets"));
    app.use("/", express.static(await Mukmin.getPath("../frontend/dist")));
    app.set("views", "./app/views");
    app.set("view engine", "ejs");
    app.set("trust proxy", 1); // trust first proxy
  }
};
