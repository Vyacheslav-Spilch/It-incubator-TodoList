import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'
// import {Task} from '../Task';
// import { useState } from 'react';

// // More on how to set up stories at:
// // https://storybook.js.org/docs/react/writing-stories/introduction#default-export
// const meta: Meta<typeof Task> = {
//     title: 'TODOLIST/Task',
//     component: Task,
//     // This component will have an automatically generated Autodocs entry:
//     // https://storybook.js.org/docs/react/writing-docs/autodocs
//     tags: ['autodocs'],
//     args: {
//         task: {id: 'sdfslfjl', title: 'JS', isDone: true},
//         todoListId: 'skjdh1232'
//     },
//     argTypes: {
//         changeTaskStatus: {
//             description: 'Status changed inside Task',
//             action: 'clicked'
//         },
//         updateTaskTitle: {
//             description: 'Title changed inside Task',
//             action: 'clicked'
//         },
//         deleteTasks: {
//             description: 'Remove Button clicked changed inside Task',
//             action: 'clicked'
//         },
//     }
//     // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
// };

// export default meta;
// type Story = StoryObj<typeof Task>;

// // More on component templates:
// // https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// export const TaskIsNotDoneStory: Story = {};

// export const TaskIsDoneStory: Story = {
//     args: {
//         task: {id: '12wsdewfijdei', title: 'TypeScript', isDone: false},
//     },
// };

// export const TaskStory = () => {
//     const todolistId = 'dsfjhjkhfds'
//     const [task, setTask] = useState({id: 'sdfslfjl', title: 'JS', isDone: true})
//     const ChangeTaskStatus = () => setTask({...task, isDone: !task.isDone})

//     return (
//         <Task
//             changeTaskStatus={ChangeTaskStatus}
//             deleteTasks={action('Delete task')}
//             updateTaskTitle={action('Change task title')}
//             task={task}
//             todoListId={todolistId}
//         />
//     )
// }
