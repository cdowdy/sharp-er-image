"use strict";

// TODO: should remove the unsupported format from here since we can convert GIFs to animated Webps
module.exports = function (extension) {

    switch (extension) {
        case '.jpg':
        case '.jpeg':
        case '.png':
        case '.webp':
            return true;
        default:
            return false;
    }
};