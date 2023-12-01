import logo from './logo.svg';
import './App.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Apartments } from './components/Apartments.tsx';

function App() {
  const queryClient = new QueryClient();
  
  return (
    <QueryClientProvider client={queryClient}>
      <Apartments />
    </QueryClientProvider>
  );
}

export default App;
