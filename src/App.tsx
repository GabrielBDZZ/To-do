import { Header } from './components/Header';
import { Tasks } from './components/Tasks';

import styles from './App.module.css';

import './global.css';

export function App() {

  const tasks = [
    {},
  ]

  return (
    <div>
      <Header />
      {tasks.map(() => {
        return <Tasks key={tasks.length}/>
      })}
    </div>
  )
}