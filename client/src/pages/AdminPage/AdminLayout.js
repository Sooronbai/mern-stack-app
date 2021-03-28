import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {Container} from 'react-bootstrap'
import {Header} from './Header'
import {Clients} from './Clients'

export const AdminLayout = () => {
  return (
    <>
      <Header/>
      <Container>
        <Switch>
          <Route path="/admin/clients" exact>
            <Clients/>
          </Route>
          <Redirect to="/admin/clients"/>
        </Switch>
      </Container>
    </>
  )
}
