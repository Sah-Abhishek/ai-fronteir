import { BrowserRouter } from 'react-router-dom'
import './App.css'
import AppRoutes from './AppRoutes'
import '@fontsource/inter'; // Defaults to weight 400
import { Toaster } from 'react-hot-toast';



function App() {

  return (
    <BrowserRouter>
      <Toaster position="top-middle" reverseOrder={false} />

      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
