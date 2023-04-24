import { Trash } from "@phosphor-icons/react";

import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

import styles from './Task.module.css';

interface TaskProps {
    content: string;
    onDeleteTask: (task: string) => void;
  }
  
  export function Task({ content, onDeleteTask,}: TaskProps) {
      
      function handleDeleteTask() {
          onDeleteTask(content)
        }

        const inputId = uuidv4();
        const labelId = uuidv4();
        
        const [checkboxIsChecked, setCheckboxIsChecked] = useState(false);
    
    return (
        <div className={styles.task}>
            <div className={styles.customCheckbox}>
            <input type="checkbox" id={inputId} onChange={() => setCheckboxIsChecked(!checkboxIsChecked)}/>
                <label htmlFor={inputId} id={labelId} ></label>
            </div>
            <p className={`${styles.description} ${checkboxIsChecked === true && styles.taskFinished}`}>{content}</p>
            <button onClick={handleDeleteTask} className={styles.trashbox}>
                <Trash className={styles.trash}/>
            </button>
        </div>
    )
}