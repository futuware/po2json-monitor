var po2json = require('po2json'),
    chokidar = require('chokidar'),
    jsonfile = require('jsonfile'),
    fs = require('fs');

const inputFileName = '/messages/messages.po';
const outputFileName = '/messages/messages.json';

chokidar.watch(inputFileName, {}).on('change', function(path) {
    console.log('File ' + inputFileName + ' changed, converting to json');
    po2json.parseFile(path, { format: 'jed1.x' }, function(err, jsonData) {
        console.log('Converted successfully, saving as ' + outputFileName);
        jsonfile.writeFile(outputFileName, jsonData, { spaces: 2 }, function(err) {
            if (err) {
                console.error('Error while saving ' + outputFileName + ':\n\n' + err);
            } else {
                console.log('Json successfully saved as ' + outputFileName);
            }
        });
    });
});
