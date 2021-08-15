import React from 'react'
import { Navbar, Container, Nav,  } from 'react-bootstrap'

function Header() {
    return (
        <header>
            <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <Navbar.Brand href="/">Companies</Navbar.Brand>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
