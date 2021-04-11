import React from "react";
import Signup from "./Signup";
import { Navbar, Nav, Container } from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import LoginPage from "./LoginPage";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";

function App() {
    return (
        <div>
            <Router>
                <Navbar bg="light">
                    {/* 1st Nav item with className mr-auto pushes the 2nd Nav item to the right */}
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/">
                            Home
                        </Nav.Link>
                        <Nav.Link as={Link} to="/publicpage">
                            PublicPage
                        </Nav.Link>
                        <Nav.Link as={Link} to="/privatepage01">
                            PrivatePage01
                        </Nav.Link>
                        <Nav.Link as={Link} to="/privatepage02">
                            PrivatePage02
                        </Nav.Link>
                    </Nav>
                </Navbar>

                <AuthProvider>
                    <Switch>
                        <PrivateRoute exact path="/" component={Dashboard} />
                        <PrivateRoute path="/update-profile" component={UpdateProfile} />
                        <Route path="/signup" component={Signup} />
                        <Route path="/login" component={LoginPage} />
                        <Route path="/forgot-password" component={ForgotPassword} />
                    </Switch>
                </AuthProvider>
            </Router>
        </div>
    );
}

export default App;
