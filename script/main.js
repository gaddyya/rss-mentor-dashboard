const fs = require('fs');
const finalArray = require('./components/finalArray');

const json = JSON.stringify(finalArray, 0, 2);

fs.writeFile('./src/JSON/data.json', json, 'utf8', () => {
    console.log('writing is done!');
});
