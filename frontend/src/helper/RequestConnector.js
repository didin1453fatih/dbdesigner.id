export function requestHelper(request, inputs) {
  return new Promise((resolve, reject) => {
    var output = {
      success: function(value) {
        resolve(value);
      },
      error: function(value) {
        reject(value);
      }
    };
    return request.action(inputs, output);
  });
}
export function request2(callback) {
  return function(context, inputs) {
    return new Promise(async (resolve, reject) => {
      var output = {
        success: function(value) {
          resolve(value);
        },
        error: function(value) {
          reject(value);
        }
      };
      context["rootCommit"] = function(location, value) {
        context.commit(location, value, { root: true });
      };
      context["rootDispatch"] = function(location, value) {
        context.dispatch(location, value, { root: true });
      };
      context["inputs"] = inputs;
      context["outputs"] = output;
      var respond = await callback(context);
      return resolve(respond);
    });
  };
}

