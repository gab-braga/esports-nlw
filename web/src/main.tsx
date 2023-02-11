import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

const elementRoot = document.getElementById('root') as HTMLElement

ReactDOM.createRoot(elementRoot).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
