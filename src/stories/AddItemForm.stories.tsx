import { Button, TextField } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react'
import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import { AddItemForm, AddItemFormProps } from '../AddItemForm'
import { stylesButton } from '../components/Styled'
import { action } from '@storybook/addon-actions'

// import { Button } from './Button';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof AddItemForm> = {
    title: 'TODOLIST/AddItemForm',
    component: AddItemForm,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {
        callBack: {
            description: 'Button clicked inside form',
            action: 'clicked',
        },
    },
}

export default meta
type Story = StoryObj<typeof AddItemForm>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

export const AddItemFormStory: Story = {}
// export const AddItemFormWithErrorStory: Story = {}

const AddItemFormWithError = React.memo((props: AddItemFormProps) => {
    const [taskTitle, setTaskTitle] = useState<string>('')
    const [error, setError] = useState<string | null>('Error - empty string')

    const addTaskHandler = () => {
        if (taskTitle.trim()) {
            props.callBack(taskTitle)
            setTaskTitle('')
        } else {
            setError('Error - empty string')
            setTaskTitle('')
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTaskTitle(e.currentTarget.value)
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error) {
            setError(null)
        }
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }

    return (
        <div className="input_and_btn">
            <TextField
                size="small"
                id="outlined-basic"
                value={taskTitle}
                label={error ? error : 'Add task...'}
                variant="outlined"
                onChange={onChangeHandler}
                onKeyDown={onKeyDownHandler}
                error={!!error}
                onBlur={() => setError(null)}
            />
            <Button onClick={addTaskHandler} variant="contained" color="info" style={stylesButton}>
                +
            </Button>
        </div>
    )
})

export const AddItemFormWithErrorStory: Story = {
    render: () => <AddItemFormWithError callBack={action('Button clicked inside form')} />,
}
