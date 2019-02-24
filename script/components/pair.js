const XLSX = require('xlsx');

const listMentorTask = XLSX.readFile(
    'data/Mentor-students pairs.xlsx',
);

const sheet = listMentorTask.Sheets['pairs'];

const fieldMapping = {
    'nameMentor': 'A',
    'nameStudent': 'B',
};

const getPair = (sheet, currentRow) => {
    if ((currentRow === 789) || (sheet[fieldMapping.nameMentor + currentRow].v
      !== sheet[fieldMapping.nameMentor + (currentRow + 1)].v)) {
        const pair = {
            nameMentor: sheet[fieldMapping.nameMentor + currentRow].v,
        };
        return pair;
    }
};
const getPairs = sheet => {
    const rows = Array.from({ length: 789 }, (v, k) => k + 1).slice(1);
    return rows.map(row => {
        return getPair(sheet, row);
    });
};
function removeDuplicates(objectsArray) {
    const usedObjects = {};
    for (let i = objectsArray.length - 1; i >= 0; i--) {
        const obj = JSON.stringify(objectsArray[i]);
  
        if (usedObjects[obj]) {
            objectsArray.splice(i, 1);
        } else {
            usedObjects[obj] = true;          
        }
    }
    return objectsArray;
}
  
const pair = removeDuplicates(getPairs(sheet).filter(r => r));

module.exports = pair;
