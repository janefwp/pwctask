import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, InputGroup, Button, FormControl, Table } from 'react-bootstrap'
import { listCompanyByNumber, listRestrictedCompanies } from '../store/actions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'

function HomeScreen({history}) {
    const [number, setNumber] = useState('')
    const [valid, setValid] = useState(true)
    const [display, setDisplay] = useState(false)
    const [restrictedList, setRestrictedList] = useState(false)
    const dispatch = useDispatch()
    const companyList = useSelector(state => state.companyList)
    const { companies, loading, error, page, pages, total } = companyList 
    let keyword = history.location.search

    const searchByNumber = (e) => {
        e.preventDefault()
        if(number) {
            dispatch(listCompanyByNumber(number))
        }
        setDisplay(true)
        
    }
    const searchRestrictedCompanies = () =>{
        // dispatch(listRestrictedCompanies())
        setDisplay(true)
        setRestrictedList(true)
    }
    useEffect(() => {
        if(restrictedList){
            dispatch(listRestrictedCompanies(keyword))
        }    
    }, [dispatch, keyword, restrictedList])

    const inputHandler =(e) => {
        let  inputValue = e.target.value;
        let newValue = inputValue.replace('-', '')
        if(!isNaN(newValue)){
            setValid(true);
            setNumber(inputValue)
        }
        else {
            setValid(false)
        }
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
                        onChange={inputHandler}
                        />
                        <Button variant="primary" id="button-addon2" onClick={searchByNumber} disabled={!valid}>
                            Search
                        </Button>
                    </InputGroup>
                    {!valid && (
                        <div style={{ color: "red" }}>Only 0-9 and '-' is accepted</div>
                    )}
                </Col>
                <Col className="justify-content-md-center">
                    <Button variant="outline-primary" id="button-addon2" onClick={searchRestrictedCompanies}>
                            Show All Restricted Companies
                    </Button>
                </Col>
            </Row>
            <br></br>
            {display && 
                <div>
                { loading ? <Loader />
                :error ? <Message variant='danger'>{error}</Message>
                    :
                    <div>
                        <p>{total} result(s) found</p>
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
                        <Paginate pages={pages} page={page}/>

                    </div>
            }
                
            </div>}


        </Container>
    )
}

export default HomeScreen
