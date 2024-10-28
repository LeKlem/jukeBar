import { Nav, Navbar } from "react-bootstrap";

export default function Header() {
    return (
        <Navbar className="px-3 bg-body-tertiary">
                <Navbar.Brand href="#home">Juke Bar</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
        </Navbar>
    )
}