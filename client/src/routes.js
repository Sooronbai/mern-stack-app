import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {CreatePage} from './pages/CreatePage'
import {AuthPage} from './pages/AuthPage'
import {AdminLayout} from './pages/AdminPage/AdminLayout';

export const useRoutes = isAuthenticated => {

  return (
    <Switch>
      <Route path="/sign-in" exact>
        <AuthPage/>
      </Route>
      {isAuthenticated && (
        <Route path="/admin">
          <AdminLayout/>
        </Route>
      )}
      <Route path="/" exact>
        <CreatePage/>
      </Route>
      <Redirect to="/"/>
    </Switch>
  )
}
