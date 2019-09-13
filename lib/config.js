"use strict";

function mergeConfig(config) {
    let defaultConfig = {
        skipOnEnlargement: false,
        extractBeforeResize: false,
        extractAfterResize: false,
        flatten: false,
        negate: false,
        rotate: false,
        flip: false,
        flop: false,
        blur: false,
        sharpen: false,
        threshold: false,
        gamma: false,
        grayscale: false,
        normalize: false,
        progressive: false,
        withMetadata: false,
        compressionLevel: 6,
        format: null,
        trim: false,
        resize: false,
        resizeOptions: {
            width: null,
            height: null,
            options: {
                fit: 'cover', // options available: cover (default, contain, fill, inside, outside
                position: 'centre',
                background: {r:0,g:0,b:0,alpha:1},
                kernel: 'lanczos3',
                withoutEnlargement: false,
                fastShrinkOnLoad: true
            }
        },
        jpeg: {
            quality: 80,
            progressive: true,
            // chromaSubsampling: '4.2:0'
            trellisQuantisation: false,
            overshootDeringing: false,
            optimizeScans: false,
            optimizeCoding: false,
            quantizationTable : 0,
            force: true
        },
        png: {
            progressive: false,
            compressionLevel: 9,
            adaptiveFiltering: false,
            palette: false,
            quality: 100,
            colors: 256,
            dither: 1.0,
            force: true
        },
        webp: {
            quality: 80,
            alphaQuality: 100,
            lossless: false,
            nearLossless: false,
            smartSubsample: false,
            reductionEffort: 4,
            force: true
        }
    };

    return Object.assign( {}, defaultConfig, config );
}

module.exports = mergeConfig;