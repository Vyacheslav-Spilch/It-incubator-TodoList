import React from 'react';
import './App.css';
import { TodoList } from './Todolist';


const App = () => {
  let tasks1 = [
    {id: 1, title: "CSS", isDone: true},
    {id: 2, title: "JS", isDone: true},
    {id: 3, title: "React", isDone: false},
]

//   let tasks2 = [
//     {id: 1, title: "Terminator", isDone: true},
//     {id: 2, title: "XXX", isDone: false},
//     {id: 3, title: "Gentlemen of fortune", isDone: true},
// ] 

  const removeTask = (id: number) => {
    tasks1 = tasks1.filter(el => el.id !== id)
  }
  return (
    <div className="App">
        <TodoList title={"What is learn"} tasks={tasks1} removeTask={removeTask}/>
        <TodoList title={"Movies"} tasks={tasks1} removeTask={removeTask}/>
    </div>
  );
}

export default App;
