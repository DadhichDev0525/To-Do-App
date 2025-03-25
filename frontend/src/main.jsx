import { StrictMode,useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider} from 'react-redux'
import { store } from './store/index.js'
import './index.css'
import router from './AppRouter.jsx'
import { RouterProvider } from 'react-router-dom'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store} >
    <RouterProvider router={router}  />
    </Provider>
  </StrictMode>,
)
