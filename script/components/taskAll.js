const XLSX = require('xlsx');

const listTasks = XLSX.readFile(
    'data/Tasks.xlsx',
);

const sheetTasks = listTasks.Sheets['Sheet1'];

const fildMapTasks = {
    'nameTask': 'A',
    'statusTask': 'C',
};

const tasks = {};

const getTask = (sheetTasks, currentRow) => {   
    let status; 
    if (sheetTasks[fildMapTasks.statusTask + currentRow].v === 'Checked') {
        status = 'time is over';
    } else {
        status = sheetTasks[fildMapTasks.statusTask + currentRow].v;
    }
    const task = {
        'nameTask': sheetTasks[fildMapTasks.nameTask + currentRow].v,
        'statusTask': status,
    };

    tasks[String(task.nameTask)] = task.statusTask;
    tasks['Presentation'] = 'time is over';

    if (currentRow === 10) {
        return tasks;
    }   
};

const getTasks = sheetTasks => {
    const rows = Array.from({ length: 10 }, (v, k) => k + 1).slice(1);

    return rows.map(row => {
        return getTask(sheetTasks, row);
    });
};

const taskAll = getTasks(sheetTasks).filter(r => r);

module.exports = taskAll;
