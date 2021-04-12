import React, { useContext, useEffect, useState } from "react";
import ReactJson from "react-json-view";
import { AuthContext } from "../contexts/AuthContext";
import useUserRoleList from "../hooks/useUserRoleList";

const UserInfoPage = (props) => {
    let authContext = useContext(AuthContext);
    const usermeta = useUserRoleList("users");

    let [userInfo, setUserInfo] = useState(null);

    // Get the current user and record into our state
    useEffect(() => {
        let currentUser = authContext.currentUser;
        setUserInfo(currentUser);
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
            <h2>UserMeta (Roles)</h2>
            <div>
                <ReactJson src={usermeta} collapsed="2" />
            </div>
            <br />
            <h2>Entire User Info Object</h2>
            {userInfo ? <ReactJson src={userInfo} collapsed="1" /> : <span>No User Defined</span>}
        </div>
    );
};

UserInfoPage.defaultProps = {
    custom_message: "No custom message provided via props",
};

export default UserInfoPage;
