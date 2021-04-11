import React, { useContext, useEffect, useState } from "react";
import ReactJson from "react-json-view";
import { AuthContext } from "../contexts/AuthContext";

export const UserInfoPage = (props) => {
    let authContext = useContext(AuthContext);
    let [userInfo, setUserInfo] = useState();

    useEffect(() => {
        let currentUser = authContext.currentUser;
        console.log("within UserInfoPage this is currentUser:", currentUser);
        console.log("within UserInfoPage this is currentUser copy:", Object.assign({}, currentUser));
        setUserInfo(currentUser);
        console.log("typeOf:", typeof currentUser);
    }, [authContext]);

    return (
        <div style={{ margin: "40px" }}>
            <div>User Info Page</div>
            <div>Custom message = {props.custom_message}</div>
            <br />
            <h2>Selected Properties</h2>
            <div>Current User Email: {userInfo?.email}</div>
            <div>Current User UID: {userInfo?.uid}</div>
            <br />
            <h2>Entire User Info Object</h2>
            <ReactJson src={userInfo} collapsed="1" />
        </div>
    );
};

UserInfoPage.defaultProps = {
    custom_message: "No custom message provided via props",
};

export default UserInfoPage;
