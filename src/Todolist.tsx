import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { AddItemForm } from "./AddItemForm";
import { filterValuesType } from "./App";
import { EditTableSpan } from "./EditTableSpan";
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };




export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

type TodoPropsType = {
    title: string
    tasks: Array<TaskType>
    filter: filterValuesType
    todoListId: string

    deleteTasks: (todolistID: string, id: string) => void
    deleteTodolist: (todoListID: string) => void
    changeTasks: (taskTodoListID: string, filter: filterValuesType) => void
    addTask: (todoListID: string, newTitle: string) => void
    changeTaskStatus: (todolistID: string, taskId: string, newIsDoneValue: boolean) => void
    updateTask: (todoListId: string,taskId: string, title: string) => void
    updateTodolist: (todoListId: string, title: string) => void
}


export const TodoList = ({
    title, 
    tasks,
    filter,
    todoListId,
    
    deleteTasks,
    deleteTodolist, 
    changeTasks, 
    addTask,
    changeTaskStatus,
    updateTask,
    updateTodolist,
}: TodoPropsType) => {


    const tasksList: JSX.Element = tasks.length !== 0 
    ?   <ul>
            {tasks.map((el: TaskType) => {

            const updateTaskHandler = (title: string) => {
                updateTask(todoListId, el.id, title)
            }

                return (
                <li key={el.id}>
                    <Checkbox 
                    size='small'
                    color='info'
                    {...label} 
                    defaultChecked 
                    checked={el.isDone}
                    onChange={(e) => changeTaskStatus(todoListId, el.id, e.currentTarget.checked)}
                    />
                    {/* <input
                        type="checkbox" 
                        checked={el.isDone}
                        onChange={(e) => changeTaskStatus(todoListId, el.id, e.currentTarget.checked)}
                    /> */}
                    <EditTableSpan oldTitle={el.title} isDone={el.isDone} callBack={updateTaskHandler}/>
                    <IconButton aria-label="delete" onClick={() => deleteTasks(todoListId, el.id)}>
                        <DeleteIcon className='delete-todolist'/>
                    </IconButton>
                </li>
            )
        })}
        </ul> 
    : filter === "all" 
    ? <span className="filter_span">Task list is empty</span> 
    : <span className="filter_span">The list of {filter} is empty</span>


    const onClickAllHandler = () => changeTasks(todoListId, 'all')
    const onClickActiveHandler = () => changeTasks(todoListId, 'active')
    const onClickCompletedHandler = () => changeTasks(todoListId, 'completed')

    const deleteTodolistsHandler = () => {
        deleteTodolist(todoListId)
    }

    const addTaskHandler = (title: string) => {
        addTask(todoListId, title)
    }

    const updateTodolistHandler = (title: string) => {
        updateTodolist(todoListId, title)
    }

    return (
        <div>
            <div className="todoList">
                    <h3>
                        <EditTableSpan oldTitle={title} callBack={updateTodolistHandler}/> 
                        <IconButton aria-label="delete" onClick={deleteTodolistsHandler}>
                            <DeleteIcon className='delete-todolist'/>
                        </IconButton>
                    </h3>
                        <AddItemForm callBack={addTaskHandler}/>
                    {tasksList}
                <div>
                <Button 
                    variant={filter === 'all' ? 'contained' : 'outlined'} 
                    color='info'
                    onClick={onClickAllHandler}
                    >
                    All
                </Button>
                <Button 
                    variant={filter === 'active' ? 'contained' : 'outlined'} 
                    color='info' 
                    onClick={onClickActiveHandler}
                    >
                    Active
                </Button>
                <Button 
                    variant={filter === 'completed' ? 'contained' : 'outlined'} 
                    color='info'
                    onClick={onClickCompletedHandler}
                    >
                    Completed
                </Button>
                </div>
            </div>
        </div>
    )
} 