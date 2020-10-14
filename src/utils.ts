/* This module exports common functions to other modules */

// Destroys a directory at a specified path
const destroyDirectory = (path: string): void => {
    require("fs-extra").removeSync(path);
};

module.exports = { destroyDirectory };
