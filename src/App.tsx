import { type } from 'os';
import React, { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import { TaskType, TodoList } from './Todolist';

export type filterValuesType = 'all' | 'active' | 'completed'
type todoListsType = {id: string, title: string, filter: filterValuesType}


const App = () => {

  let todolistID1 = v1()
  let todolistID2 = v1()

  let [todolists, setTodolists] = useState<Array<todoListsType>>([
      {id: todolistID1, title: 'What to learn', filter: 'all'},
      {id: todolistID2, title: 'What to buy', filter: 'all'},
  ])

  let [tasks, setTasks] = useState({
      [todolistID1]: [
          {id: v1(), title: 'HTML&CSS', isDone: true},
          {id: v1(), title: 'JS', isDone: true},
          {id: v1(), title: 'ReactJS', isDone: false},
      ],
      [todolistID2]: [
          {id: v1(), title: 'Rest API', isDone: true},
          {id: v1(), title: 'GraphQL', isDone: false},
      ]
  })


// let [tasks, setTasks] = useState<Array<TaskType>>([
//   {id: v1(), title: "CSS", isDone: true},
//   {id: v1(), title: "JS", isDone: true},
//   {id: v1(), title: "React", isDone: false},
//   {id: v1(), title: "ES&/TypeScript", isDone: false},
// ])

// let [todoList, setTodoList] = useState<Array<TodoListType>> ([
//   {
//     id: v1(),
//     title: "What to learn",
//     filter: "all",
//   },
//   {
//     id: v1(),
//     title: "What to bye",
//     filter: "all",
//   },
// ])

const deleteTasks = (todolistID: string, taskId: string) => {
  setTasks({...tasks, [todolistID]: tasks[todolistID].filter(el => el.id !== taskId)})
}

const addTask = (newTitle: string) => {
  // let newTask: TaskType = {
  //   id: v1(),
  //   title: newTitle,
  //   isDone: false,
  // }
  // setTasks([newTask, ...tasks])
}

const changeTaskStatus = (taskId: string, newIsDoneValue: boolean) => {
  // let nexTask: Array<TaskType> = tasks.map(el => el.id === taskId ? {...el, isDone: newIsDoneValue} : el)
  // setTasks(nexTask)
}

const changeTasks = (taskTodoListIs: string, filterValues: filterValuesType) => {
  setTodolists(todolists.map(el => el.id === taskTodoListIs ? {...el, filter: filterValues} : el))
}




  return (
    <div className="App">
      {todolists.map(el => {
        let taskForTodoList = tasks[el.id]
        if(el.filter === "active") {
          taskForTodoList = tasks[el.id].filter(el => el.isDone === false)
        }
        if(el.filter === "completed") {
          taskForTodoList = tasks[el.id].filter(el => el.isDone === true)
        }
        return (
          <TodoList 
          title={el.title} 
          tasks={taskForTodoList} 
          deleteTasks={deleteTasks} 
          changeTasks={changeTasks} 
          addTask={addTask}
          filter={el.filter}
          todoListId={el.id}
          changeTaskStatus={changeTaskStatus}
        /> 
        )
      })}
    </div>
  );
}

export default App;


{/* <TodoList 
          title={"What is learn"} 
          tasks={filteredTasks} 
          deleteTasks={deleteTasks} 
          changeTasks={changeTasks} 
          addTask={addTask}
          filter={filter}
          changeTaskStatus={changeTaskStatus}
        /> */}
