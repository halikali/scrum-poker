import React from 'react'
import ReactDOM from 'react-dom/client'

import RouteSettings from './core/routes.tsx'
import './style/index.scss'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouteSettings />
  </React.StrictMode>
)
