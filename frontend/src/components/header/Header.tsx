import { Nav, Navbar, NavbarBrand } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import './Header.scss'

export default function Header() {

    return (
        <Navbar className="px-3 bg-body-tertiary">
            <Link to={''} className="link-underline-opacity-0 links">
                <NavbarBrand>Juke Bar</NavbarBrand>
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <NavLink to={'/drinks'} className='links text-secondary'>
                        Boissons
                    </NavLink>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}