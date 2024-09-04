const path = require("path");

module.exports = function () {
  return {
    name: "npsmeter",
    getClientModules() {
      return [path.resolve(__dirname, "./route")];
    },
  };
};
