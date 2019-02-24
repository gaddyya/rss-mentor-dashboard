import React from 'react';
import '../css/table.css';

const Descrition = (props) => {
    if (props.selectedOption) {
        const description = ['time for cheking is gone and no mark from mentor', 'checked by mentor', 'students working on that task now', 'need to check', 'task in todo state'];
        const nameClass = ['time', 'Checked', 'Progress', 'Checking', 'ToDo'];
        return (
            <table>
                <tbody>
                    {
                        description.map((k, i) => 
                            <tr key={i}>
                                <td className={`${nameClass[i]}`}></td>       
                                <td>{`${description[i]}`}</td>
                            </tr>)
                    }
                </tbody> 
            </table>
        );    
    }
    return null;
};

export default Descrition;
