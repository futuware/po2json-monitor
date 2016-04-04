var po2json = require('po2json'),
    chokidar = require('chokidar'),
    jsonfile = require('jsonfile'),
    fs = require('fs'),
    filterPoFile = require('./lib/filterPoFile.js');

if (!fs.statSync('/messages').isDirectory()) {
    throw "/messages should be a directory";
}

const inputFileName = '/messages/messages.po';
const outputFileName = '/messages/messages.json';
const filterExtensions = (process.env.FILTER_EXTENSIONS || '').split(',');

function convert() {
    fs.readFile(inputFileName, 'utf8', function (err, data) {
        if (err) {
            console.log('Error reading ' + inputFileName + ':\n' + JSON.stringify(err));
        }
        if (filterExtensions) {
            console.log('Filtering po file to only include strings from files with extensions ' + filterExtensions.join(','));
            data = filterPoFile(data, filterExtensions);
        }
        jsonData = po2json.parse(data, {format: 'jed1.x'});
        console.log('Converted successfully, saving as ' + outputFileName);
        jsonfile.writeFile(outputFileName, jsonData, {spaces: 2}, function (err) {
            if (err) {
                console.error('Error while saving ' + outputFileName + ':\n\n' + err);
            } else {
                console.log('Json successfully saved as ' + outputFileName);
            }
        });
    });
}

chokidar.watch(inputFileName, {}).on('change', function () {
    console.log('File ' + inputFileName + ' changed, converting to json');
    convert();
});

convert();
