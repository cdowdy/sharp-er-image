"use strict";

const path = require('path');
const sharp = require('sharp');


function getImageName(image) {
    return path.parse(image).name
}

function getSaveAsName(image, newName, sharpOptions) {
    if (!newName) {
        return getImageName(image) + '.' + sharpOptions.format;
    } else {
        return newName + '.' + sharpOptions.format;
    }
}


function convert(image, sharpOptions, saveAs = '') {

    return new Promise((resolve, reject) => {
        sharp(image)
        // need rotate here if we strip metadata because some
        // images have exif orientation supplied
            .rotate()
            .withMetadata(sharpOptions.withMetadata)
            .toFormat(sharpOptions.format, sharpOptions[sharpOptions.format])
            .toFile(getSaveAsName(image, saveAs, sharpOptions))
            .then(info => {
                resolve(info);
            })
            .catch(err => {
                reject(err)
            })
    })
}

module.exports = convert;