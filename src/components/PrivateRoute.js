import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function PrivateRoute({ component: Component, ...rest }) {
    // Equivalent to useContext(AuthContext)
    const { currentUser } = useAuth();

    return (
        <Route
            {...rest}
            render={(props) => {
                // If user is authenticated show desired component, otherwise redirect to login route
                return currentUser ? <Component {...props} /> : <Redirect to="/login" />;
            }}
        ></Route>
    );
}
