import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import store from './store/index.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReduxProvider store={store} >
      <App />
    </ReduxProvider>
  </React.StrictMode>,
)
