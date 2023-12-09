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

//   let tasks2 = [
//     {id: 1, title: "Terminator", isDone: true},
//     {id: 2, title: "XXX", isDone: false},
//     {id: 3, title: "Gentlemen of fortune", isDone: true},
// ] 

  return (
    <div className="App">
        <TodoList title={"What is learn"} tasks={tasks} removeTask={removeTask}/>
    </div>
  );
}

export default App;
