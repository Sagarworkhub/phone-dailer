import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css';
import { Layout } from './Layout.tsx';
import { CallingScreen, Dialer, IncomingCallScreen } from './pages';

const root = document.getElementById('root');

if (!root) {
    throw new Error('Root element not found');
}

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Dialer />,
            },
            {
                path: 'calling/:phoneNumber',
                element: <CallingScreen />,
            },
            {
                path: 'incoming/:phoneNumber',
                element: <IncomingCallScreen />,
            },
        ],
    },
]);

createRoot(root).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
);
