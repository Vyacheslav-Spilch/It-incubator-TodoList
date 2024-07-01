import React, { useCallback, useEffect, useMemo } from 'react'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import { AddItemForm } from '../../AddItemForm'
import { EditTableSpan } from '../../EditTableSpan'
import Button from '@mui/material/Button'
import { Task } from '../Task/Task'
import { TaskStatuses, TaskType } from '../../api/todolist-api'
import { useAppDispatch } from '../../state/store'
import { RequestStatusType } from '../../state/app-reducer'
import { FilterValuesType } from './TodolistsState/todolist-reducer'
import { getTasks, tasksThunks } from 'features/Task/TaskState/tasks-reducer'
const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

// export type TaskType = {
//     id: string,
//     title: string,
//     isDone: boolean
// }

type TodoPropsType = {
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    entityStatus: RequestStatusType
    todoListId: string

    deleteTasks: (todolistID: string, id: string) => void
    deleteTodolist: (todoListID: string) => void
    changeTasks: (taskTodoListID: string, filter: FilterValuesType) => void
    addTask: (todoId: string, title: string) => void
    changeTaskStatus: (todolistID: string, taskId: string, status: TaskStatuses) => void
    updateTaskTitle: (todoListId: string, taskId: string, title: string) => void
    updateTodolist: (todoListId: string, title: string) => void
}

export const TodoList = React.memo(
    ({
        title,
        tasks,
        filter,
        entityStatus,
        todoListId,

        deleteTasks,
        deleteTodolist,
        changeTasks,
        addTask,
        changeTaskStatus,
        updateTaskTitle,
        updateTodolist,
    }: TodoPropsType) => {
        useMemo(() => {
            if (filter === 'active') {
                tasks = tasks.filter((el) => el.status === TaskStatuses.New)
            } else if (filter === 'completed') {
                tasks = tasks.filter((el) => el.status === TaskStatuses.Completed)
            }
            return tasks
        }, [tasks, filter])


        const dispatch = useAppDispatch()

        useEffect(() => {
            dispatch(tasksThunks.getTasks(todoListId))
        }, [])



        
        const tasksList: JSX.Element =
            tasks.length !== 0 ? (
                <ul>
                    {tasks?.map((el: TaskType) => {
                        return (
                            <Task
                                key={el.id}
                                task={el}
                                todoListId={todoListId}
                                deleteTasks={deleteTasks}
                                updateTaskTitle={updateTaskTitle}
                                changeTaskStatus={changeTaskStatus}
                            />
                        )
                    })}
                </ul>
            ) : filter === 'all' ? (
                <span className="filter_span">Task list is empty</span>
            ) : (
                <span className="filter_span">The list of {filter} is empty</span>
            )

        const onClickAllHandler = useCallback(() => changeTasks(todoListId, 'all'), [changeTasks, todoListId])
        const onClickActiveHandler = useCallback(() => changeTasks(todoListId, 'active'), [changeTasks, todoListId])
        const onClickCompletedHandler = useCallback(() => changeTasks(todoListId, 'completed'), [changeTasks, todoListId],)

        const deleteTodolistsHandler = () => {
            deleteTodolist(todoListId)
        }

        const addTaskHandler = useCallback(
            (title: string) => {
                addTask(todoListId, title)
                changeTasks(todoListId, 'all')
            },
            [addTask, changeTasks, todoListId],
        )

        const updateTodolistHandler = useCallback(
            (title: string) => {
                updateTodolist(todoListId, title)
            },
            [updateTodolist, todoListId],
        )

        return (
            <div className="todoList">
                <div>
                    <h3>
                        <EditTableSpan oldTitle={title} callBack={updateTodolistHandler} />
                        <IconButton
                            aria-label="delete"
                            onClick={deleteTodolistsHandler}
                            disabled={entityStatus === 'loading'}
                            sx={entityStatus === 'loading' ? { opacity: '50%' } : { opacity: '100%' }}
                        >
                            <DeleteIcon className="delete-todolist" />
                        </IconButton>
                    </h3>
                    <AddItemForm filter={filter} callBack={addTaskHandler} disabled={entityStatus === 'loading'} />
                    {tasksList}
                    <div>
                        <Button
                            variant={filter === 'all' ? 'contained' : 'outlined'}
                            color="info"
                            onClick={onClickAllHandler}
                        >
                            All
                        </Button>
                        <Button
                            variant={filter === 'active' ? 'contained' : 'outlined'}
                            color="info"
                            onClick={onClickActiveHandler}
                        >
                            Active
                        </Button>
                        <Button
                            variant={filter === 'completed' ? 'contained' : 'outlined'}
                            color="info"
                            onClick={onClickCompletedHandler}
                        >
                            Completed
                        </Button>
                    </div>
                </div>
            </div>
        )
    },
)

// interface intButton extends ButtonProps {}

//     const ButtonMemo = memo(({variant, color, onClick, title, ...rest}: intButton) => {
//         return <Button
//             variant={variant}
//             color={color}
//             onClick={onClick}
//             {...rest}
//             >
//             {title}
//         </Button>
//     })
