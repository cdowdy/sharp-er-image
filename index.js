'use strict';

const path = require('path');
const Convert = require('./lib/convert');
const createDir = require('./lib/createDirectory');
const resizeImage = require('./lib/resize');


function convert() {

}


/**
 *
 * @param files
 * @param outputDir
 * @param sharpOptions
 * @returns {Promise<unknown[]>}
 */
function resize( files, outputDir, sharpOptions ) {
 let promises = [];
    files.forEach( ( file ) => {
        sharpOptions.forEach( (config) => {
            promises.push(
                resizeImage( { inputImage: file, outputDirectory: outputDir, sharpOptions: config } )
            )
        })
    });
    return Promise.all(promises)
}


module.exports = {
    resize: resize,
    convert: convert

};