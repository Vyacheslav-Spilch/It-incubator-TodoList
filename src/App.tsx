import React, { useState } from 'react';
import './App.css';
import { TodoList } from './Todolist';


const App = () => {
  let tasks1 = [
    {id: 1, title: "CSS", isDone: true},
    {id: 2, title: "JS", isDone: true},
    {id: 3, title: "React", isDone: false},
]
const [tasks, setTasks] = useState(tasks1)
const removeTask = (id: number) => {
  setTasks(tasks.filter(el => el.id !== id))
}
let [filter, setFilter] = useState("All")

let filteredTasks = tasks
if(filter === "Complited") {
  filteredTasks = tasks.filter(el => el.isDone === true)
}
if(filter === "Active") {
  filteredTasks = tasks.filter(el => el.isDone === false)
}

//   let tasks2 = [
//     {id: 1, title: "Terminator", isDone: true},
//     {id: 2, title: "XXX", isDone: false},
//     {id: 3, title: "Gentlemen of fortune", isDone: true},
// ] 

  return (
    <div className="App">
        <TodoList title={"What is learn"} tasks={filteredTasks} removeTask={removeTask}/>
    </div>
  );
}

export default App;
