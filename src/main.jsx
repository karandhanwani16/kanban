import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import './index.css'



createRoot(document.getElementById('root')).render(
  <StrictMode>

    <App />
    <ToastContainer
      stacked
      position="bottom-right"
      autoClose={2500}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick
      rtl={false}
      pauseOnHover={true}
      theme="dark"
      transition:Bounce
    />

  </StrictMode>,
)
