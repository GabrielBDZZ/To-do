import { Trash } from "@phosphor-icons/react";

import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

import styles from './Task.module.css';

interface TaskProps {
    content: string;
    onDeleteTask: (task: string) => void;
    checked: boolean;
    id: string;
    onToggleTask: (taskId: string) => void;
  }
  
  export function Task({ content, onDeleteTask, checked, id, onToggleTask}: TaskProps) {
      
      function handleDeleteTask() {
          onDeleteTask(String(id))
        }

        const inputId = uuidv4();
        const labelId = uuidv4();
        
        const [checkboxIsChecked, setCheckboxIsChecked] = useState(checked);
    
        const handleToggleTask = () => {
            setCheckboxIsChecked(!checkboxIsChecked);
            onToggleTask(id);
          };

    return (
        <div className={styles.task}>
            <div className={styles.customCheckbox}>
            <input type="checkbox" id={inputId} checked={checkboxIsChecked} onChange={handleToggleTask} />
                <label htmlFor={inputId} id={labelId} ></label>
            </div>
            <p className={`${styles.description} ${checkboxIsChecked === true && styles.taskFinished}`}>{content}</p>
            <button onClick={handleDeleteTask} className={styles.trashbox}>
                <Trash className={styles.trash}/>
            </button>
        </div>
    )
}