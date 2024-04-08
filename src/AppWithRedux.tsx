import './App.css';
import { ButtonAppBar } from './components/ButtonAppBar';

import Container from '@mui/material/Container';

import { useAppSelector } from './state/store';

import LinearProgress from '@mui/material/LinearProgress';
import { RequestStatusType } from './state/app-reducer';
import  CustomizedSnackBars  from './components/ErrorSnackbar/ErrorSnackbar';
import { Navigate, Route, Routes } from 'react-router-dom';
import { TodolistList } from './features/TodolistList/TodolistList';
import { Login } from './components/Login/Login';


const AppWithRedux = () => {

let status = useAppSelector<RequestStatusType>(state => state.app.status)

return (
    <div className="App">
        <CustomizedSnackBars />
        <ButtonAppBar />
        {status === 'loading' && <LinearProgress color="primary"/>}
        <Container fixed>
            <Routes>
                <Route path={'/'} element={<TodolistList/>}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/404'} element={<h2 style={{ alignItems: 'center' }}>PAGE NOT FOUND</h2>}/>
                <Route path={'*'} element={<Navigate to={'/404'}/>}/>
            </Routes>
        </Container>
    </div>
);

}

export default AppWithRedux;