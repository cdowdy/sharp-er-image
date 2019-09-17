"use strict";

const path = require('path');
const sharp = require('sharp');
const mergeConfig = require('./config');


class Convert {
    constructor( image, sharpOptions ) {
        this.image = image;
        this.options = mergeConfig(sharpOptions);
    }

    /**
     *
     * @returns {string}
     */
    getImageName() {
        return path.parse(this.image).name;
    }

    /**
     *
     * @param saveAsName
     * @returns {string}
     */
    getSaveAsName( saveAsName ) {
        if (!saveAsName) {
            return this.getImageName() + '.' + this.options.format;
        } else {
            return saveAsName + '.' + this.options.format;
        }
    }

    /**
     * get the options to pass to 'toFormat'
     * @returns {*}
     */
    getFormatOptions() {
        return this.options[this.options.format];
    }

    /**
     *
     * @param saveAsName
     * @returns {Promise<unknown>}
     */
    convert(saveAsName) {
        return new Promise( ( resolve, reject ) =>{
            sharp(this.image)
            // need rotate here if we strip metadata because some
            // images have exif orientation supplied
                .rotate()
                .withMetadata(this.options.withMetadata)
                .toFormat(this.options.format, this.getFormatOptions())
                .toFile( this.getSaveAsName(saveAsName) )
                .then(info => {
                    resolve(info);
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
}

module.exports = Convert;