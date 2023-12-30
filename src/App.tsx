import React, { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import { TaskType, TodoList } from './Todolist';

export type filterValuesType = 'all' | 'active' | 'completed'


const App = () => {

let [tasks, setTasks] = useState<Array<TaskType>>([
  {id: v1(), title: "CSS", isDone: true},
  {id: v1(), title: "JS", isDone: true},
  {id: v1(), title: "React", isDone: false},
  {id: v1(), title: "ES&/TypeScript", isDone: false},
])

const deleteTasks = (id: string) => {
  setTasks(tasks.filter(el => el.id !== id))
}

const [filter, setFilter] = useState<filterValuesType>('all')

const filteredTasks = filter === 'active' 
  ? tasks.filter(el => el.isDone === false) 
  : filter === 'completed' 
  ? tasks.filter(el => el.isDone === true) 
  : tasks

const changeTasks = (filter: filterValuesType) => {
  setFilter(filter)
}

const addTask = (newTitle: string) => {
  let newTask: TaskType = {
    id: v1(),
    title: newTitle,
    isDone: false,
  }
  setTasks([newTask, ...tasks])
}

const changeTaskStatus = (taskId: string, newIsDoneValue: boolean) => {
  let nexTask: Array<TaskType> = tasks.map(el => el.id === taskId ? {...el, isDone: newIsDoneValue} : el)
  setTasks(nexTask)
}

  return (
    <div className="App">
        <TodoList title={"What is learn"} 
        tasks={filteredTasks} 
        deleteTasks={deleteTasks} 
        changeTasks={changeTasks} 
        addTask={addTask}
        filter={filter}
        changeTaskStatus={changeTaskStatus}/>
    </div>
  );
}

export default App;
