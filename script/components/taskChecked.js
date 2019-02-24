const XLSX = require('xlsx');

const listChekedTask = XLSX.readFile(
    'data/Mentor score.xlsx',
);

const sheetScore = listChekedTask.Sheets['Form Responses 1'];

const fildMapMentorScore = {
    'nameMentor': 'B',
    'nameStudent': 'C',
    'nameTask': 'D',
};

const tasksChekedAll = [];
let listStudentsTaskChecked = {};
let listTaskChecked = {};

const getTaskCheked = (sheetScore, currentRow) => { 
    const number = tasksChekedAll.findIndex(obj => obj.nameMentor
      === sheetScore[fildMapMentorScore.nameMentor + currentRow].v.slice(19));
   
    if (number === -1) {
        listTaskChecked = {};
        listTaskChecked[sheetScore[fildMapMentorScore.nameTask + currentRow].v] = 'Checked';
        listStudentsTaskChecked[sheetScore[fildMapMentorScore.nameStudent + currentRow].v
            .slice(19).toLowerCase()] = [listTaskChecked];
    
        const taskCheked = {
            'nameMentor': sheetScore[fildMapMentorScore.nameMentor + currentRow].v.slice(19),
            'nameStudents': listStudentsTaskChecked,
        };

        tasksChekedAll.push(taskCheked);
        listTaskChecked = {};
        listStudentsTaskChecked = {};  
    
        return tasksChekedAll;
    } else {
        for (const key in tasksChekedAll[number].nameStudents) {     
            if (key.toLowerCase() === sheetScore[fildMapMentorScore.nameStudent + currentRow].v
                .slice(19).toLowerCase()) {        
                tasksChekedAll[number].nameStudents[sheetScore[fildMapMentorScore.nameStudent + currentRow].v.slice(19).toLowerCase()][0][`${sheetScore[fildMapMentorScore.nameTask + currentRow].v}`] = 'Checked'; 
        
                return tasksChekedAll;
            }      
        }     
        listTaskChecked = {};
        listTaskChecked[sheetScore[fildMapMentorScore.nameTask + currentRow].v] = 'Checked';
        tasksChekedAll[number].nameStudents[sheetScore[fildMapMentorScore.nameStudent 
          + currentRow].v.slice(19).toLowerCase()] = [listTaskChecked];
        listTaskChecked = {};
      
        return tasksChekedAll;
    }
};

const getTasksCheked = sheetScore => {
    const rows = Array.from({ length: 1865 }, (v, k) => k + 1).slice(1);
    return rows.map(row => {
        return getTaskCheked(sheetScore, row);
    });
};

const taskCheked = getTasksCheked(sheetScore).filter(r => r);

module.exports = taskCheked;
