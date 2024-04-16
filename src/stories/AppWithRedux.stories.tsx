import type { Meta, StoryObj } from '@storybook/react'
import { Provider } from 'react-redux'
import AppWithRedux from '../AppWithRedux'
import { ReduxStoreProviderDecorator } from './ReduxStoreProviderDecorator'
import { store } from '../state/store'

const meta: Meta<typeof AppWithRedux> = {
    title: 'TODOLIST/AppWithRedux',
    component: AppWithRedux,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    decorators: [ReduxStoreProviderDecorator],
}
export default meta
type Story = StoryObj<typeof AppWithRedux>

export const AppWithReduxStory: Story = {}
