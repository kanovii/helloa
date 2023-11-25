import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import Home from './pages/Home';
import Character from './pages/Character';
import NotFound from './pages/NotFoun';
import Test from './pages/Test';

const router = createHashRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <NotFound />,
        children: [
            {
                index: true,
                path: '/',
                element: <Home />,
            },
            {
                path: '/character',
                element: <Character />,
            },
            {
                path: '/test',
                element: <Test />,
            },
        ],
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider basename={process.env.PUBLIC_URL} router={router} />
    </React.StrictMode>
);
