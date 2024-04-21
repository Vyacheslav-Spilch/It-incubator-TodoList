import './App.css'
import { ButtonAppBar } from './components/ButtonAppBar'

import Container from '@mui/material/Container'

import { useAppDispatch, useAppSelector } from './state/store'

import LinearProgress from '@mui/material/LinearProgress'
import { RequestStatusType } from './state/app-reducer'
import CustomizedSnackBars from './components/ErrorSnackbar/ErrorSnackbar'
import { Navigate, Route, Routes } from 'react-router-dom'
import { TodolistList } from './features/TodolistList/TodolistList'
import { Login } from './components/Login/Login'
import { useEffect } from 'react'
import { loginMeTC } from './components/Login/auth-reducer'
import { CircularProgress } from '@mui/material'

const AppWithRedux = () => {
    const status = useAppSelector<RequestStatusType>((state) => state.app.status)
    const isInitialized = useAppSelector<boolean>((state) => state.app.isInitialized)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(loginMeTC())
    }, [])

    if (!isInitialized) {
        return (
            <div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
                <CircularProgress />
            </div>
        )
    }

    return (
        <div className="App">
            <CustomizedSnackBars />
            <ButtonAppBar />
            {status === 'loading' && <LinearProgress color="primary" />}
            <Container fixed>
                <Routes>
                    <Route path={'/'} element={<TodolistList />} />
                    <Route path={'/login'} element={<Login />} />
                    <Route path={'/404'} element={<h2 style={{ alignItems: 'center' }}>PAGE NOT FOUND</h2>} />
                    <Route path={'*'} element={<Navigate to={'/404'} />} />
                </Routes>
            </Container>
        </div>
    )
}

export default AppWithRedux
