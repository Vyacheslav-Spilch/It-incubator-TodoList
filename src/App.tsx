import React, { useState } from 'react';
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

const [tasks, setTasks] = useState<Array<TaskType>>([
  {id: 1, title: "CSS", isDone: true},
  {id: 2, title: "JS", isDone: true},
  {id: 3, title: "React", isDone: false},
  {id: 4, title: "ES&/TypeScript", isDone: false},
])

const deleteTasks = (id: number) => {
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

  return (
    <div className="App">
        <TodoList title={"What is learn"} tasks={filteredTasks} deleteTasks={deleteTasks} changeTasks={changeTasks}/>
    </div>
  );
}

export default App;
