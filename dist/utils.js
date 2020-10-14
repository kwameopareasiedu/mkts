/* This module exports common functions to other modules */
// Destroys a folder at a specified path
var destroyDirectory = function (path) {
    require("fs-extra").removeSync(path);
};
module.exports = { destroyDirectory: destroyDirectory };
