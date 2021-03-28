import React, {useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {Button, Col, Container, Form} from 'react-bootstrap'

export const CreatePage = () => {
  const {loading, request, error, clearError} = useHttp()
  const [form, setForm] = useState({fullName: '', inn: '', telephone: '', address: ''})

  const changeHandler = event => {
    setForm({...form, [event.target.name]: event.target.value})
  }

  const formHandler = async () => {
    try {
      await request('/api/client', 'POST', {...form})
      clearError()
      setForm({fullName: '', inn: '', telephone: '', address: ''});
    } catch (e) {
    }

  }
  return (
    <Container>
      <Form>
        <Form.Row>
          <Col>
            <h1>Форма</h1>
          </Col>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="fullName">
            <Form.Control
              type="text"
              name="fullName"
              value={form.fullName}
              isInvalid={error?.message}
              onChange={changeHandler}
              placeholder="Введите ФИО"
              required
            />
            {error?.fullName && (
              <Form.Control.Feedback type="invalid">
                {error?.fullName}
              </Form.Control.Feedback>
            )}
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="telephone">
            <Form.Control
              type="text"
              name="telephone"
              value={form.telephone}
              isInvalid={error?.message}
              onChange={changeHandler}
              placeholder="Введите телефон"
              required
            />
            {error?.telephone && (
              <Form.Control.Feedback type="invalid">
                {error?.telephone}
              </Form.Control.Feedback>
            )}
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="address">
            <Form.Control
              type="text"
              name="address"
              value={form.address}
              onChange={changeHandler}
              isInvalid={error?.message}
              placeholder="Введите адрес"
              required
            />
            {error?.address && (
              <Form.Control.Feedback type="invalid">
                {error?.address}
              </Form.Control.Feedback>
            )}
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="inn">
            <Form.Control
              type="text"
              name="inn"
              value={form.inn}
              onChange={changeHandler}
              isInvalid={error?.message}
              placeholder="Введите ИНН"
              required
            />
            {error?.inn && (
              <Form.Control.Feedback type="invalid">
                {error?.inn}
              </Form.Control.Feedback>
            )}
            {error?.message && (
              <Form.Control.Feedback type="invalid">
                {error?.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Col className="d-flex justify-content-end">
            <Button
              type="submit"
              variant="outline-danger"
              className="rounded-pill"
              onClick={formHandler}
              disabled={loading}
            >
              Отправить
            </Button>
          </Col>
        </Form.Row>
      </Form>
    </Container>
  )
}
