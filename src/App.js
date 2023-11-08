import './css/App.css';
import { Outlet, useLocation } from 'react-router';
import Nav from './components/Nav';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Nav />
            <Outlet />
        </QueryClientProvider>
    );
}

export default App;
