import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, InputGroup, Button, FormControl, Table } from 'react-bootstrap'
import { listCompanyByNumber, listRestrictedCompanies } from '../store/actions'
import Loader from '../components/Loader'
import Message from '../components/Message'

function HomeScreen() {
    const [number, setNumber] = useState('')
    const dispatch = useDispatch()
    const companyList = useSelector(state => state.companyList)
    const { companies, loading, error } = companyList 

    const searchByNumber = (e) => {
        e.preventDefault()
        if(number) {
            dispatch(listCompanyByNumber(number))
        }    
        
    }
    const searchRestrictedCompanies = () =>{
        dispatch(listRestrictedCompanies())
    }

    return (
        <Container>
            <Row >
                <Col>
                    <InputGroup className="mb-3">
                        <FormControl
                        placeholder="Enter company business number"
                        aria-label="Company business number"
                        aria-describedby="basic-addon2"
                        onChange={(e) => setNumber(e.target.value)}
                        />
                        <Button variant="primary" id="button-addon2" onClick={searchByNumber}>
                            Search
                        </Button>
                    </InputGroup>
                </Col>
                <Col className="justify-content-md-center">
                    <Button variant="outline-primary" id="button-addon2" onClick={searchRestrictedCompanies}>
                            Show All Restricted Companies
                    </Button>
                </Col>
            </Row>
            <br></br>
            { loading ? <Loader />
                :error ? <Message variant='danger'>{error}</Message>
                    :
                    <div>
                        
                        <Table className="table table-hover" >
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Company name</th>
                                    <th>Description</th>
                                    <th>Tagline</th>
                                    <th>Company email</th>
                                    <th>Business number</th>
                                    <th>Restricted</th>
                                </tr>
                            </thead>
                            <tbody>
                                {companies?.map(company => (
                                    <tr key={ company.id }>
                                        <td>{ company.id }</td>
                                        <td>{ company.company_name }</td>
                                        <td>{ company.description }</td>
                                        <td>{ company.tagline }</td>
                                        <td>{ company.company_email}</td>
                                        <td>{ company.business_number }</td>
                                        <td>{ company.restricted }</td>
                                    </tr>

                                ) )}
                            </tbody>
                            
                        </Table>
                        

                    </div>
            }
        </Container>
    )
}

export default HomeScreen
