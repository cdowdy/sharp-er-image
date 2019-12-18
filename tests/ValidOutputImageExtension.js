import test from "ava";
import validOutput from '../lib/validOutputExtensions';
import path from 'path';
const imagePath = path.join(__dirname, '../tests/images');



test( 'Proper Image Format', async t => {
    t.true(
        await validOutput( path.parse(imagePath + 'olga-kononenko-FdSD_9r8Uy8.jpeg').ext )
    );
    t.true(
        await validOutput( path.parse(imagePath + 'olga-kononenko-FdSD_9r8Uy8.jpg').ext )
    );
    t.true(
        await validOutput( path.parse(imagePath + 'olga-kononenko-FdSD_9r8Uy8.webp').ext )
    );
    t.true(
        await validOutput( path.parse(imagePath + 'olga-kononenko-FdSD_9r8Uy8.png').ext )
    );
});

test( "Unsupported Image Format", async t => {
    t.false(
        await validOutput( path.parse(imagePath + 'olga-kononenko-FdSD_9r8Uy8.gif').ext )
    );
});