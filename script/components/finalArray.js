const XLSX = require('xlsx');
const pair = require('./pair');
const taskAll = require('./taskAll');
const taskCheked = require('./taskChecked');

const listMentorTask = XLSX.readFile(
    'data/Mentor-students pairs.xlsx',
);

const sheet = listMentorTask.Sheets['pairs'];
const sheetGit = listMentorTask.Sheets['second_name-to_github_account'];

const fieldMapping = {
    'nameMentor': 'A',
    'nameStudent': 'B',
};

const fieldMapGit = {
    'name': 'A',
    'surname': 'B',
    'github': 'E',
};

const getGit = (sheetGit, currentRow) => {
    if (sheetGit[fieldMapGit.github + currentRow].v.charAt(0) !== 'h') {
        const git = {
            nameMentor: `${sheetGit[fieldMapGit.name + currentRow].v} ${sheetGit[fieldMapGit.surname + currentRow].v}`,
            github: 'none',
        };
        return git;
    } else {
        const git = {
            nameMentor: `${sheetGit[fieldMapGit.name + currentRow].v} ${sheetGit[fieldMapGit.surname + currentRow].v}`,
            github: sheetGit[fieldMapGit.github + currentRow].v.slice(19),
        };
        return git;
    }
};

const getGits = sheetGit => {
    const rows = Array.from({ length: 147 }, (v, k) => k + 1).slice(1);

    return rows.map(row => {
        return getGit(sheetGit, row);
    });
};

const git = getGits(sheetGit).filter(r => r);

let listStudents = {};
const arrayPairMentorStud = [];

const getStudent = (sheet, pair, currentRow) => {
    listStudents = {};
    const numberMentorArray = arrayPairMentorStud
        .findIndex(obj => obj.nameMentor === sheet[fieldMapping.nameMentor + currentRow].v);
    if (numberMentorArray === -1) {
        const numberMentor = pair
            .findIndex(obj => obj.nameMentor === sheet[fieldMapping.nameMentor + currentRow].v);
        const numberGit = git.findIndex(obj => obj.nameMentor === pair[numberMentor].nameMentor);

        listStudents[sheet[fieldMapping.nameStudent + currentRow].v] = taskAll;
        const students = {
            nameMentor: pair[numberMentor].nameMentor,
            github: git[numberGit].github.toLowerCase(),
            nameStudents: listStudents,
        };
        arrayPairMentorStud.push(students);
    } else {
        arrayPairMentorStud[numberMentorArray]
            .nameStudents[sheet[fieldMapping.nameStudent + currentRow].v] = taskAll;
    }
};
const getStudents = (sheet, pair) => {
    const rows = Array.from({ length: 789 }, (v, k) => k + 1).slice(1);

    return rows.map(row => {
        return getStudent(sheet, pair, row);
    });
};

getStudents(sheet, pair).filter(r => r);

const finalArray = [];
let newObj = {};
let statistic = {};
let students = {};

for (let i = 0; i < arrayPairMentorStud.length; i++) {
    newObj = {};
    students = {};
    statistic = {};
    newObj.nameMentor = arrayPairMentorStud[i].nameMentor;
    newObj.github = arrayPairMentorStud[i].github;

    const numMentorChange = taskCheked[0]
        .map(e => { return e.nameMentor.toLowerCase(); })
        .indexOf(arrayPairMentorStud[i].github.toLowerCase());
    if (numMentorChange !== -1) {
        for (const key in arrayPairMentorStud[i].nameStudents) {
            if (taskCheked[0][numMentorChange].nameStudents[key]) {
                statistic = Object.assign({}, taskAll[0],
                    taskCheked[0][numMentorChange].nameStudents[key][0]);
            } else {
                statistic = Object.assign({}, taskAll[0]);
            }
            students[key] = [statistic];
            statistic = {};
        }

        newObj.nameStudents = students;
        finalArray.push(newObj);
        students = {};
    } else {
        newObj.nameStudents = arrayPairMentorStud[i].nameStudents;
        finalArray.push(newObj);
    }
}

module.exports = finalArray;
