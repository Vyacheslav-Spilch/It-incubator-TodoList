import axios from "axios"
import { appActions } from "state/app-reducer"
import { AppDispatchType } from "state/store"


export const handleServerNetworkError = (err: unknown, dispatch: AppDispatchType) => {
    let errorMessage = 'Some error occurred'

    if(axios.isAxiosError(err)) {
        errorMessage = err.response?.data?.message || err?.message || errorMessage
    } else if(err instanceof Error) {
        errorMessage = `Native error ${err.message}`
    } else {
        errorMessage = JSON.stringify(err, null, 2)
    }

    dispatch(appActions.setAppError({ error: errorMessage }))
    dispatch(appActions.setAppStatus({ status: 'failed' }))
}