import "./styles/App.css";
import {Navigate, Outlet, Route, Routes} from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import UserProfile from "./pages/UserProfile/UserProfile";
import NoMatch from "./pages/NoMatch/NoMatch";
import {Collapse, Container, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from "reactstrap";
import {useEffect, useState} from "react";

function App() {

    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<Home/>}/>
                <Route path="login" element={<Login/>}/>
                <Route path="user" element={<UserProfile/>}/>

                <Route path="*" element={<NoMatch/>}/>
            </Route>
        </Routes>
    );
}

function Layout(args) {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("accessToken")?.length > 0);

    useEffect(() => {
        setIsLoggedIn(localStorage.getItem("accessToken")?.length > 0);
    }, [localStorage.getItem("accessToken")]);

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div className="main-app">
            {!isLoggedIn && (
                <Navigate to={"/login"} replace={true} />
            )}
            <Navbar {...args}>
                <NavbarBrand href="/">Datos AI</NavbarBrand>
                <NavbarToggler onClick={toggle}/>
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="me-auto" navbar>
                        <NavItem>
                            <NavLink href="/login">Login</NavLink>
                        </NavItem>
                    </Nav>
                    <NavItem>
                        <NavLink href="/user">Profile</NavLink>
                    </NavItem>
                </Collapse>
            </Navbar>

            <hr/>

            <Container className="container-fluid border main-container" fluid="sm">
                <Outlet/>
            </Container>
        </div>
    );
}

export default App;
