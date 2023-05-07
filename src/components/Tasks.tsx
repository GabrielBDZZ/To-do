import clipboard from '../../src/assets/Clipboard.svg';
import plus from '../assets/plus.svg';

import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Task } from './Task';

import styles from './Tasks.module.css';

interface TaskItem {
  id: string;
  title: string;
  isChecked: boolean;
}

export function Tasks() {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);

  function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newTaskText = event.currentTarget.task.value;

    const newTask = { id: uuidv4(), title: newTaskText, isChecked: false };

    setTasks([...tasks, newTask]);

    event.currentTarget.task.value = '';
  }

  function deleteTask(taskId: string) {
    const taskToDelete = tasks.find((task) => task.id === taskId);
    const tasksWithoutDeleted = tasks.filter((task) => task.id !== taskId);
  
    setTasks(tasksWithoutDeleted);
  
    if (taskToDelete?.isChecked) {
      setCompletedTasks((prevCompletedTasks) =>
        prevCompletedTasks.filter((taskId) => taskId !== taskToDelete.id)
      );
    }
  }
  

  function handleToggleTask(taskId: string) {
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    const task = tasks[taskIndex];

    const updatedTask = { ...task, isChecked: !task.isChecked };

    setTasks([
      ...tasks.slice(0, taskIndex),
      updatedTask,
      ...tasks.slice(taskIndex + 1),
    ]);

    if (updatedTask.isChecked) {
      setCompletedTasks([...completedTasks, updatedTask.id]);
    } else {
      const completedTaskIndex = completedTasks.findIndex(
        (completedTask) => completedTask === updatedTask.id
      );

      setCompletedTasks([
        ...completedTasks.slice(0, completedTaskIndex),
        ...completedTasks.slice(completedTaskIndex + 1),
      ]);
    }
  }

  const created = tasks.length;
  const done = completedTasks.length;

  return (
    <>
      <form onSubmit={handleCreateNewTask} className={styles.newTask}>
        <input name="task" placeholder="Adicione uma nova tarefa" required />
        <button type="submit">
          Criar <img src={plus} />
        </button>
      </form>

      <div className={styles.component}>
        <div className={styles.head}>
          <p className={styles.created}>
            Tarefas criadas <span>{created}</span>
          </p>
          <p className={styles.done}>
            Concluídas <span> {`${done} de ${created}`}</span>
            </p>
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
                        return <Task 
                        key={task.id}
                        id={task.id}
                        content={task.title}
                        onDeleteTask={deleteTask}
                        checked={task.isChecked}
                        onToggleTask={handleToggleTask}
                        />
                    })}
                </div>
                }
            </div>
        </div>
        </>
    )
}