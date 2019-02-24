import React from 'react';
import '../css/table.css';

const Table = (props) => {
    if (props.selectedOption) {
        const arrayKey = Object.keys(props.selectedOption.nameStudents);
        arrayKey.unshift('');

        const links = ['codejam-cv', 'presentation', 'codejam-corejs', 'codejam-notification', 'markup-2018q3', 'rs-school-activist', 'youtube', 'codejam-scoreboard', 'game', '#'];
        
        return (
            <table>
                <thead>
                    <tr>{arrayKey.map((h, i) => <th key={i}><a href={`https://github.com/${h}`}>{h}</a></th>)}</tr>
                </thead>
                <tbody>
                    {
                        Object.keys(props.selectedOption.nameStudents[arrayKey[1]][0])
                            .map((k, i) => {            
                                return (              
                                    <tr key={i}>        
                                        <td><a href={`https://github.com/rolling-scopes-school/tasks/blob/2018-Q3/tasks/${links[i]}.md`}>{k}</a></td>
                                        {
                                            Object.keys(props.selectedOption.nameStudents)
                                                .map((key, j) =>
                                                    <td key={j} className={props
                                                        .selectedOption
                                                        .nameStudents[arrayKey[j + 1]][0][k]}>
                                                    </td>)
                                        }                
                                    </tr>
                                );            
                            })
                    }
                </tbody> 
            </table>
        );    
    }
    return null;
};

export default Table;
