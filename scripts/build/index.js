const extract = require('extract-md-data');
const path = require('path');
const config = require('../../config');

console.log('Starting build...');

const contentDir = path.resolve(__dirname, '..', '..', config.contentDir);

const data = extract(contentDir, contentDir, { omitContent: true }); // TODO: update lib to deafult to single path source

console.log({ data });

// Build homepage
// Build project page
// Build blog pages
const blogPagesData = data.filter((d) => d.relativeDir.match(/^blog\//));
