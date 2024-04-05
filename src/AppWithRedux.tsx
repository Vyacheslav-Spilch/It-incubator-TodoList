import './App.css';
import { ButtonAppBar } from './components/ButtonAppBar';

import Container from '@mui/material/Container';

import { useAppSelector } from './state/store';

import LinearProgress from '@mui/material/LinearProgress';
import { RequestStatusType } from './state/app-reducer';
import  CustomizedSnackBars  from './components/ErrorSnackbar/ErrorSnackbar';
import { Route, Routes } from 'react-router-dom';
import { TodolistList } from './features/TodolistList/TodolistList';
import { Login } from './components/Login/Login';


const AppWithRedux = () => {

let status = useAppSelector<RequestStatusType>(state => state.app.status)

return (
    <div className="App">
        <CustomizedSnackBars />
        <ButtonAppBar />
        {status === 'loading' && <LinearProgress color="primary" />}
        <Container fixed>
            <Routes>
                <Route path={'/'} element={<TodolistList/>}/>
                <Route path={'/login'} element={<Login/>}/>
            </Routes>
        </Container>
    </div>
);

}

export default AppWithRedux;