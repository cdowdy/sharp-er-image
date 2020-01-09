"use strict";

const path = require('path');
const sharp = require('sharp');
const mergeConfig = require('./config');

/**
 *
 * @param image
 * @returns {string}
 */
const getImageName = ( image ) => {
    return path.parse(image).name;
};

/**
 *
 * @param options
 * @returns {*}
 */
const getFormatOptions = ( options ) => {
    if (!options[options.format]) {
        throw new Error("missing the config 'format' option to convert an image to.");
    } else {
        return options[options.format];
    }
};

/**
 *
 * @param saveAsName
 * @param options
 * @returns {string}
 */
const saveImageAsName = ( saveAsName, options ) => {
    if (!saveAsName) {
            return getImageName() + '.' + options.format;
        } else {
            return saveAsName + '.' + options.format;
        }
};


/**
 *
 * @param inputImage
 * @param saveAsName
 * @param sharpOptions
 * @returns {Promise<unknown>}
 */
function convert(inputImage, saveAsName, sharpOptions) {
    const options = mergeConfig(sharpOptions);

    if (!inputImage) {
        throw new Error('missing an input image to convert');
    }
    return new Promise((resolve, reject) => {
        sharp(inputImage)
            // need rotate here if we strip metadata because some
            // images have exif orientation supplied
            .rotate()
            .withMetadata( options.withMetadata )
            .resize( options.resizeOptions )
            .toFormat(options.format, getFormatOptions( options ) )
            .toFile( saveImageAsName( saveAsName, options ) )
            .then(info => {
                resolve(info);
            })
            .catch(err => {
                reject(err)
            })
    })
}

// class Convert {
//     constructor( image, sharpOptions ) {
//         this.image = image;
//         this.options = mergeConfig(sharpOptions);
//     }
//
//     /**
//      *
//      * @returns {string}
//      */
//     getImageName() {
//         return path.parse(this.image).name;
//     }
//
//     /**
//      *
//      * @param saveAsName
//      * @returns {string}
//      */
//     getSaveAsName( saveAsName ) {
//         if (!saveAsName) {
//             return this.getImageName() + '.' + this.options.format;
//         } else {
//             return saveAsName + '.' + this.options.format;
//         }
//     }
//
//     /**
//      * get the options to pass to 'toFormat'
//      * @returns {*}
//      */
//     getFormatOptions() {
//         if (!this.options[this.options.format] ) {
//             throw new Error("missing the config 'format' option to convert an image to.");
//         } else {
//             return this.options[this.options.format];
//         }
//
//     }
//
//     /**
//      *
//      * @param saveAsName
//      * @returns {Promise<unknown>}
//      */
//     convert(saveAsName) {
//         return new Promise( ( resolve, reject ) =>{
//             sharp(this.image)
//             // need rotate here if we strip metadata because some
//             // images have exif orientation supplied
//                 .rotate()
//                 .withMetadata(this.options.withMetadata)
//                 .resize(this.options.resizeOptions)
//                 .toFormat(this.options.format, this.getFormatOptions())
//                 .toFile( this.getSaveAsName(saveAsName) )
//                 .then(info => {
//                     resolve(info);
//                 })
//                 .catch(err => {
//                     reject(err)
//                 })
//         })
//     }
// }

module.exports = convert;