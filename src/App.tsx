import React from 'react';
import './App.css';
import Outlet from './components/Outlet';
import MainHeader from './components/MainHeader';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import OverlayController from './controllers/OverlayController';
import { UserProvider } from './contexts/UserContext';
import ToastController from './controllers/ToastController';
import PlanViewer from './components/PlanViewer';
import { SocketControllerProvider } from './contexts/SocketControllerContext';
import ProfilePage from './components/ProfilePage';

function App() {
    return (
        <UserProvider>
            <SocketControllerProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path='/plan/:planId' element={<Outlet header={<MainHeader />} isHeaderFixed isHeaderHideable><PlanViewer /></Outlet>} />
                        <Route path='/profile' element={<Outlet header={<MainHeader />} isHeaderFixed isHeaderHideable><ProfilePage /></Outlet>} />
                    </Routes>
                </BrowserRouter>

                <OverlayController />
                <ToastController />
            </SocketControllerProvider>
        </UserProvider>
    );
}

export default App;
