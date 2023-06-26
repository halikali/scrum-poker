import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RouteTypes } from '../types/routeTypes'

enum RouteEnum {
  other = '*',
  login = '/login',
}

const routes: RouteTypes = [
  {
    path: RouteEnum.login,
    name: 'loginPage',
    page: lazy(() => import('../pages/Login')),
  },
  {
    path: RouteEnum.other,
    name: 'otherPage',
    page: lazy(() => import('../pages/Login/index')),
  },
]

const RouteSettings = () => {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  )
}

export default RouteSettings
