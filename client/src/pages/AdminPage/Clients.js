import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from '../../hooks/http.hook'
import {AuthContext} from '../../context/AuthContext'
import {Loader} from '../../components/Loader'
import {Col, Row, Table} from 'react-bootstrap'

export const Clients = () => {
  const [clients, setClients] = useState([])
  const {loading, request} = useHttp()
  const {token} = useContext(AuthContext)

  const fetchClients = useCallback(async () => {
    try {
      const fetched = await request('/api/client', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setClients(fetched)
    } catch (e) {
    }
  }, [token, request])

  useEffect(() => {
    fetchClients()
  }, [fetchClients])

  if (loading) {
    return <Loader/>
  }

  return (
    <Row>
      <Col>
        <Table className="my-3" bordered hover striped responsive size="sm">
          <thead>
          <tr>
            <th>#</th>
            <th>ФИО</th>
            <th>Телефон</th>
            <th>Адрес</th>
          </tr>
          </thead>
          <tbody>
          {clients.map((client, idx) => (
            <tr key={`client-${idx}`}>
              <td>{idx + 1}</td>
              <td>{client.fullName}</td>
              <td>{client.telephone}</td>
              <td>{client.address}</td>
            </tr>
          ))}
          {clients.length === 0 && (
            <tr>
              <td className="text-center" colSpan={5}>Пусто</td>
            </tr>
          )}
          </tbody>
        </Table>
      </Col>
    </Row>
  )
}
