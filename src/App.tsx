import React, { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import { TaskType, TodoList } from './Todolist';

export type filterValuesType = 'all' | 'active' | 'completed'


const App = () => {
//   let tasks1 = [
//     {id: 1, title: "CSS", isDone: true},
//     {id: 2, title: "JS", isDone: true},
//     {id: 3, title: "React", isDone: false},
// ]
//   let tasks2 = [
//     {id: 1, title: "Terminator", isDone: true},
//     {id: 2, title: "XXX", isDone: false},
//     {id: 3, title: "Gentlemen of fortune", isDone: true},
// ] 

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

const changeStatus = (taskId: string, isDone: boolean) => {
  let task = tasks.find(t => t.id === taskId)
  if(task) {
    task.isDone = isDone
    setTasks([...tasks])
  }
}

  return (
    <div className="App">
        <TodoList title={"What is learn"} 
        tasks={filteredTasks} 
        deleteTasks={deleteTasks} 
        changeTasks={changeTasks} 
        addTask={addTask}
        filter={filter}/>
    </div>
  );
}

export default App;
