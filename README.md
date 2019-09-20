Library to convert, resize, resize and convert and generate responsive images using [Sharp](https://sharp.pixelplumbing.com/en/stable/)
  
  ---
  

Converting Images:  
------------------ 
You can convert any valid Sharp input image - JPEG, PNG, WebP, TIFF, GIF and SVG -  to any web safe Sharp supported image ie. to PNG, JPEG, Webp images

Conversion config:  
You'll need to supply, at minimum,  a "format" option. This determines what image format you'll convert your input image to.  

```javascript
const convertConfig = {
    format: 'webp',
};
``` 
The above configuration will convert any gif, jpeg/jpg, png, TIFF or SVG to a webp image. 

__Example__  
Example converting a JPEG image to a Webp Image.  

```javascript  
const SharperImage = require('./index');
const path = require('path');
const filePath = path.join(__dirname, '/path/to/example-image.jpeg');
const config = {
    format: 'webp',
    jpg: {
        quality: 75
    }
};
const image = new SharperImage( filePath, config);
image.convert().then(r => r );
// example-image.jpeg converted to webp saved as example-image.webp
```  

You also have the option to pass in a new name to save the image as.   
```javascript  
const image = new SharperImage( filePath, config);
image.convert('my-new-filename').then(r => r );  
// example-image.jpeg saved as a webp image named my-new-filename.webp
```

Otherwise it will be saved to the root directory as the same name as the input with the new file format. the above example using an image called ``example-image.jpeg``  will be saved as ``example-image.webp``

__options:__  
Here are the defaults used to convert an image to a specific format. 

```javascript
const defaultConfig = {
    // other settings
        jpeg: {
            quality: 80,
            progressive: true,
            chromaSubsampling: '4.2:0',
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
}
```

__FYI__   
Since jpg/jpeg images can have both a ``jpg`` or a ```jpeg``` file extension you'll need to be aware of how you name your JPG/JPEG conversion options. Sharp, internally uses the ``JPEG`` spelling. The above config mentioned in "options" uses ```JPEG``` so if your ```format``` option uses _jpg_ you'll also need to supply a config spelled the same way. Example:  
```javascript
const config = {
    withMetadata: true,
    resize: true,
    resizeOptions: {
        width: 400
    },
    format: 'jpg', // <- convert to a jpeg image with the jpg extension
    jpg: { // <- jpg options
        // your options like:
        quality: 75
    }
};
```