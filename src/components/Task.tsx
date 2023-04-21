import { Trash } from "@phosphor-icons/react";

import styles from './Task.module.css';

interface TaskProps {
    content: string;
    onDeleteTask: (task: string) => void;
  }
  
  export function Task({ content, onDeleteTask }: TaskProps) {

    function handleDeleteTask() {
        onDeleteTask(content)
    }
    
    return (
        <div className={styles.task}>
            <div className={styles.customCheckbox}>
                <input type="checkbox" id="checkbox-1"/>
                <label htmlFor="checkbox-1" ></label>
            </div>
            <p className={styles.description}>{content}</p>
            <button onClick={handleDeleteTask} className={styles.trashbox}>
                <Trash className={styles.trash}/>
            </button>
        </div>
    )
}