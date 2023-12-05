import React from 'react';
import './App.css';
import { tasks1, tasks2, TodoList } from './Todolist';


const App = () => {
  return (
    <div className="App">
        <TodoList title={"What is learn"} tasks={tasks1}/>
        <TodoList title={"Movies"} tasks={tasks2}/>
    </div>
  );
}

export default App;
