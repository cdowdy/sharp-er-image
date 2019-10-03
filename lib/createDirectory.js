const mkdirp = require('make-dir');


async function createDirectory( paths , options ) {

    if ( Array.isArray(paths) ) {
        paths.forEach( ( path ) => {
            // promises.push( path );
            return Promise.all([mkdirp(path, options)])
        });
    } else {
        await mkdirp(paths, options);
    }
}

module.exports = createDirectory;