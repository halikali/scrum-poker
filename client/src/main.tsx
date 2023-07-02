import ReactDOM from 'react-dom/client'

import './style/index.scss'
import RouteSettings from './core/routes.tsx'
import { SocketProvider } from './context/SocketContext.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <SocketProvider>
    <RouteSettings />
  </SocketProvider>
)
