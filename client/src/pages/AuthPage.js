import React, {useContext, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {Button, Col, Container, Form, Row} from 'react-bootstrap'
import {useHistory} from 'react-router-dom';

export const AuthPage = () => {
  const auth = useContext(AuthContext)
  const history = useHistory()
  const {loading, request, error} = useHttp()
  const [form, setForm] = useState({
    userName: '', password: ''
  })


  const changeHandler = event => {
    setForm({...form, [event.target.name]: event.target.value})
  }

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', {...form})
      auth.login(data.token, data.userId)
      history.push('/admin')
    } catch (e) {
    }
  }
  console.log(error);
  return (
    <Container>
      <Form>
        <Row>
          <Col md={{span: 4, offset: 4}}>
            <Form.Group controlId="userName">
              <Form.Label>Имя пользователя</Form.Label>
              <Form.Control
                type="text"
                name="userName"
                value={form.userName}
                onChange={changeHandler}
                isInvalid={error.message}
                placeholder="Имя пользователя"
                required
              />
              {error?.userName && (
                <Form.Control.Feedback type="invalid">
                  {error?.userName}
                </Form.Control.Feedback>
              )}
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={{span: 4, offset: 4}}>
            <Form.Group controlId="password">
              <Form.Label>Пароль</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={form.password}
                onChange={changeHandler}
                isInvalid={error?.message}
                placeholder="Пароль"
                required
              />
              {error?.password && (
                <Form.Control.Feedback type="invalid">
                  {error?.password}
                </Form.Control.Feedback>
              )}
              {error?.message && (
                <Form.Control.Feedback type="invalid">
                  {error?.message}
                </Form.Control.Feedback>
              )}
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={{span: 4, offset: 4}}>
            <Button
              variant="primary"
              onClick={loginHandler}
              disabled={loading}
              block
            >
              Войти
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  )
}
