import clipboard from '../../src/assets/Clipboard.svg'
import plus from '../assets/plus.svg'

import { useState } from 'react'

import { Task } from './Task'

import styles from './Tasks.module.css'

export function Tasks() {
    
    const [tasks, setTasks] = useState<string[]>([])
    const [done, setDone] = useState<number>(0);

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

    function toggleTask(task: string, isChecked: boolean) {
        if (isChecked) {
            setDone(done + 1)
        }
    }

    const created = tasks.length


      console.log(done)
    
return (
        <>
        <form onSubmit={handleCreateNewTask} className={styles.newTask}>
            <input name='task' placeholder='Adicione uma nova tarefa' required></input>
            <button type='submit'>Criar <img src={plus}/></button>
        </form>

        <div className={styles.component}>
            <div className={styles.head}>
                <p className={styles.created}>Tarefas criadas <span>{created}</span></p>
                <p className={styles.done}>Concluídas <span> {`${done} de ${created}`}</span></p>
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
                        return <Task key={task} content={task} onDeleteTask={deleteTask} onToggleTask={toggleTask} checked={false}/>
                    })}
                </div>
                }
            </div>
        </div>
        </>
    )
}