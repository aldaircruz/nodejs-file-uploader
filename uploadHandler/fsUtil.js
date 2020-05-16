const path = require('path');
const fs = require('fs');
const util = require('util');

const exists = util.promisify(fs.exists);
const mkdir = util.promisify(fs.mkdir);
const rename = util.promisify(fs.rename);

const ensureExists = async (path) => {

    const fileExists = await exists(path);

    if (!fileExists) {
        return mkdir(path);
    }

    return Promise.resolve();
}

const joinPaths = (...paths) => {
    return path.join(...paths);
}

module.exports = {
    exists,
    mkdir,
    ensureExists,
    joinPaths,
    rename
}