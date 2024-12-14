



import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import { Toaster } from './components/ui/toaster';


function App() {
  return (
    <div className='min-h-screen bg-gray-50'>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
      <Toaster /> 

    </div>
  )
}

export default App
