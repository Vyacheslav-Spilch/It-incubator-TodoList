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
      {id: todolistID1, title: 'Skills #1', filter: 'all'},
      {id: todolistID2, title: 'Skills #2', filter: 'all'},
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


const deleteTasks = (todolistID: string, taskId: string) => {
  let currentTasks = tasks[todolistID]
  let filteredTasks = currentTasks.filter(el => el.id !== taskId)
  tasks[todolistID] = filteredTasks
  setTasks({...tasks})
  
  // setTasks({...tasks, [todolistID]: tasks[todolistID].filter(el => el.id !== taskId)})
}

const addTask = (todoListID: string, newTitle: string) => {
  //создаем новый объект, типа TaksType
  let newTask = {
    id: v1(),
    title: newTitle,
    isDone: false
  }
  // делаем копию исходного объекта, затем для того, чтобы создать дубликат ([key]: Array),
  // указываем в качестве ключа идентификатор, под которым, у нас находится нужный массив, 
  // и далее делаем копию этого массива (не забывая указать ключ массива), со всеми исходными элементами,
  // добавляя в его начало, новый объект
  setTasks({...tasks, 
    [todoListID]: [newTask, ...tasks[todoListID]]
  })
}

const changeTaskStatus = (todolistID: string, taskId: string, newIsDoneValue: boolean) => {
  setTasks({...tasks, 
    [todolistID]: tasks[todolistID].map(el => el.id === taskId ? {...el, isDone: newIsDoneValue} : el)
  })
}

const changeTasks = (tasktodolistID: string, filterValues: filterValuesType) => {
  setTodolists(todolists.map(el => el.id === tasktodolistID ? {...el, filter: filterValues} : el))
}
const deleteTodolist = (todoListID: string) => {
  setTodolists(todolists.filter(el => el.id !== todoListID))
  //Очищаем данные о обьекте, после его удаления
  delete tasks[todoListID]
  todolists.pop()
}


  
  
  let todoListContent = todolists.length !== 0 
  ? 
  todolists.map(el => {
    let taskForTodoList = tasks[el.id]
    if(el.filter === "active") {
      taskForTodoList = tasks[el.id].filter(el => el.isDone === false)
    }
    else if(el.filter === "completed") {
      taskForTodoList = tasks[el.id].filter(el => el.isDone === true)
    }
    return (
      <TodoList 
      title={el.title} 
      tasks={taskForTodoList} 
      deleteTasks={deleteTasks} 
      deleteTodolist={deleteTodolist}
      changeTasks={changeTasks} 
      addTask={addTask}
      filter={el.filter}
      todoListId={el.id}
      changeTaskStatus={changeTaskStatus}
    />
    )
  }) 
  : 
  <div className='container-title'><span className='title'>Список задач пуст</span></div>




  return (
    <div className="App">
      {todoListContent}
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
