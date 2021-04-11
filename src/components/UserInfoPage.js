import React, { useContext, useEffect, useState } from "react";
import ReactJson from "react-json-view";
import { AuthContext } from "../contexts/AuthContext";
import useFirestore from "../hooks/useFirestore";

import { projectFirestore } from "../firebase";

const UserInfoPage = (props) => {
    let authContext = useContext(AuthContext);
    const usermeta = useFirestore("users");

    let [userInfo, setUserInfo] = useState();

    // List users collection in Firestore
    useEffect(() => {
        async function fetchData() {
            const collectionRef = projectFirestore.collection("users");
            const snapshot = await collectionRef.get();
            snapshot.forEach((doc) => {
                console.log("doc:", doc);
                console.log(doc.id, "=>", doc.data());
            });
        }
        fetchData();
    }, []);

    // Get the current user
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
            <div>
                UserMeta: <ReactJson src={usermeta} collapsed="true" />
            </div>
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
