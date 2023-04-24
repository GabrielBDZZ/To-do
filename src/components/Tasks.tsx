import clipboard from '../../src/assets/Clipboard.svg'
import plus from '../assets/plus.svg'

import { useState } from 'react'

import { Task } from './Task'

import styles from './Tasks.module.css'

export function Tasks() {

    const [tasks, setTasks] = useState<string[]>([])

    function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const newTaskText = event.target.task.value

        setTasks([...tasks, newTaskText])

        event.target.task.value = ''
    }

    function deleteTask(taskToDelete: string) { 
        const tasksWithoutDeleted = tasks.filter (task => {
            return task !== taskToDelete
        })

        setTasks(tasksWithoutDeleted)
    }
    
return (
        <>
        <form onSubmit={handleCreateNewTask} className={styles.newTask}>
            <input name='task' placeholder='Adicione uma nova tarefa' required></input>
            <button type='submit'>Criar <img src={plus}/></button>
        </form>

        <div className={styles.component}>
            <div className={styles.head}>
                <p className={styles.created}>Tarefas criadas <span>{tasks.length}</span></p>
                <p className={styles.done}>Concluídas <span> {`${tasks.length <= 0 && tasks.length}`}</span></p>
            </div>

            <div className={styles.body}>
                {tasks.length === 0 ? 
                <div className={styles.noTask}>
                    <img src={clipboard}/>
                    <strong>Você ainda não tem tarefas cadastradas</strong>
                    <p>Crie tarefas e organize seus itens a fazer</p>
                </div>
                :
                <div>
                    {tasks.map( task => {
                        return <Task key={task} content={task} onDeleteTask={deleteTask}/>
                    })}
                </div>
                }
            </div>
        </div>
        </>
    )
}