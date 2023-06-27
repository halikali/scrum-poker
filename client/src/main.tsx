import React from 'react'
import ReactDOM from 'react-dom/client'

import './style/index.scss'
import RouteSettings from './core/routes.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouteSettings />
  </React.StrictMode>
)
