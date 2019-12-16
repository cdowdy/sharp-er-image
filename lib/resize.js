'use strict';

const path = require('path');
const sharp = require('sharp');
const fs = require('fs');
const mergeConfig = require('./config');
const createDir = require('make-dir');
const defaultOutputDir = path.normalize( path.dirname(require.main.filename) );

const validExtension = require('./validOutputExtensions');



 function resize({ inputImage = '', outputDirectory = '', sharpOptions = {} } = {}) {

     if (!inputImage) {
         throw new Error('missing an input image to the resize function');
     }


    return new Promise(  (resolve, reject )=> {
        const filePathObj = path.parse(inputImage);
        const options = mergeConfig(sharpOptions);

         sharp(inputImage)
            // need rotate here if we strip metadata because some
            // images have exif orientation supplied
            .rotate()
            .withMetadata(options.withMetadata)
            .resize( options.resizeOptions )
            .toBuffer( { resolveWithObject: true } )
            .then( async imageData => {
                let bufferData = imageData.data;
                let inputImageName = filePathObj.name;
                let nameSize = imageData.info.width;
                let fileToWrite = `${ inputImageName }-${ nameSize }w${filePathObj.ext}`;

                if ( outputDirectory ) {
                    let outputObj = path.parse( outputDirectory );
                    let finalOutPutObject = {
                        'ext' : outputObj.ext,
                        'dir' : outputObj.dir,
                        'name': outputObj.name,
                        'base': outputObj.base
                    };

                    if ( outputObj.ext && !validExtension(outputObj.ext) ) {
                        console.error(`Invalid output image extension. Should be one of: jpeg/jpg, webp, png. 
You gave: '${outputObj.base}'. 
Saving as a ${ outputObj.name }${ filePathObj.ext }`);

                        /**
                         * the new output object if the extension is invalid.
                         * we take the input objects extension and use it for both the 'ext' key and the base
                         * @type {{ext: string, base: string}}
                         */
                        const target = {
                            'ext': filePathObj.ext,
                            'base': outputObj.name + filePathObj.ext
                        };
                        finalOutPutObject = Object.assign( outputObj, target );
                    }

                    let directoryToCreate = path.join( defaultOutputDir, finalOutPutObject.dir );
                    fileToWrite = path.join( directoryToCreate,
                        `${ finalOutPutObject.name }-${ nameSize }w${finalOutPutObject.ext}`
                    );

                   await createDir( directoryToCreate);
                }

                fs.writeFile(fileToWrite, bufferData, (err) => {
                    if (err) throw err;
                    resolve(imageData.info);
                });

            })
            .catch(err => {
                reject(err)
            })
    })
}

module.exports = resize;