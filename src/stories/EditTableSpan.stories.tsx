import type { Meta, StoryObj } from '@storybook/react';
import {action} from '@storybook/addon-actions'
import { EditTableSpan } from '../EditTableSpan';




const meta: Meta<typeof EditTableSpan> = {
    title: 'TODOLIST/EditTableSpan',
    component: EditTableSpan,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        callBack: {
            description: 'Value EditableSpan changed',
            action: 'clicked'
        },
    },
    args: {
        oldTitle: 'HTML'
    }
}
export default meta
type Story = StoryObj<typeof EditTableSpan>

export const EditTableSpanStory: Story = {
    args: {
        oldTitle: 'HTML'
    },
}