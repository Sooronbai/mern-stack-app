import React, {useContext} from 'react'
import {NavLink, useHistory} from 'react-router-dom'
import {AuthContext} from '../../context/AuthContext'
import {Nav, Navbar} from 'react-bootstrap'

export const Header = () => {
  const history = useHistory()
  const auth = useContext(AuthContext)

  const logoutHandler = event => {
    event.preventDefault()
    auth.logout()
    history.push('/')
  }

  return (
    <Navbar bg="dark" variant="dark" sticky="top">
      <Navbar.Brand>Админка</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav"/>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={NavLink} to="/admin/clients">Клиенты</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          <a
            href="/"
            onClick={logoutHandler}
          >
            Выйти
          </a>
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  )
}
