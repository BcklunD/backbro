import { Navbar } from "react-bootstrap";
import './layout.css';

const NavbarJs = (props) => {
    return (
        <Navbar bg="dark" variant="dark" className="sticky-nav">
            <Navbar.Brand>Backbro Fastigheter</Navbar.Brand>
            <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
                {props.namn}
            </Navbar.Text>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavbarJs;