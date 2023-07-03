import { Suspense, lazy } from 'react'
import { Routes, Route, HashRouter } from 'react-router-dom'
import { RouteTypes } from '../types/routeTypes'

enum RouteEnum {
  other = '*',
  login = '/login',
  game = '/game/:gameId',
}

const routes: RouteTypes = [
  {
    path: RouteEnum.login,
    name: 'loginPage',
    page: lazy(() => import('../pages/Login')),
  },
  {
    path: RouteEnum.game,
    name: 'gamePage',
    page: lazy(() => import('../pages/Game')),
  },
  {
    path: RouteEnum.other,
    name: 'otherPage',
    page: lazy(() => import('../pages/Login/index')),
  },
]

const RouteSettings = () => {
  return (
    <HashRouter>
      <Routes>
        {routes.map((item) => (
          <Route
            path={item.path}
            key={item.name}
            element={
              <Suspense fallback={<div>Loading...</div>}>
                {<item.page />}
              </Suspense>
            }
          />
        ))}
      </Routes>
    </HashRouter>
  )
}

export default RouteSettings
