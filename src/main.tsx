import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Toaster } from "react-hot-toast";
import './index.css'
import {store} from '../src/store/index.tsx'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')!).render(
  <>
    {/* <StrictMode> */}
    <Provider store={store}>
    <Toaster position="top-right" />
    <App />
    </Provider>
  {/* </StrictMode> */}
  </>

)
