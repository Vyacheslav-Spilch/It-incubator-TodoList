import { v1 } from 'uuid'
// import { deleteTasksAC } from "./tasks-reducer"
// import { addTodolistAC, changeFilterAC, changeTodolistAC, removeTodolistAC, todolistsReducer } from "./todolist-reducer"

// let todolistId1: string
// let todolistId2: string

// let startState: Array<any>

// test ('correct filter of todolist should be changed', () => {
//     todolistId1 = v1()
//     todolistId2 = v1()
//     startState = [
//         {id: todolistId1, title: 'What to learn', filter: 'all'},
//         {id: todolistId2, title: 'What to buy', filter: 'all'}
//     ]

//     let newFilter: filterValuesType = 'completed'
//     const action = {
//         type: 'CHANGE-TODOLIST-FILTER',
//         id: todolistId2,
//         filter: newFilter
//     }

//     const endState = todolistsReducer(startState, changeFilterAC(todolistId2, action.filter))

//     expect(endState[0].filter).toBe('all')
//     expect(endState[1].filter).toBe(newFilter)
// })

// test('deleting the selected todolist', () => {
//     todolistId1 = v1()
//     todolistId2 = v1()
//     startState = [
//         {id: todolistId1, title: 'What to learn', filter: 'all'},
//         {id: todolistId2, title: 'What to buy', filter: 'all'}
//     ]
//     const action = removeTodolistAC(todolistId1)
//     const endTodolistState = todolistsReducer(startState, action)

//     expect(endTodolistState.length).toBe(1)
//     expect(endTodolistState[0].title).toBe('What to buy')
// })
