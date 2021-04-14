import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase";

// This is a React Custom Hook (as it's name starts with "use")

const useUserRoleByUID = (UID, email) => {
    const [userRole, setUserRole] = useState([]);

    useEffect(() => {
        if ((UID, email)) {
            // Get firestore reference to document named by users UID
            var firebaseDocRef = projectFirestore.collection("users").doc(UID);

            firebaseDocRef
                .get()
                .then((doc) => {
                    if (doc.exists) {
                        console.log("Document data:", doc.data());
                        setUserRole(doc);
                    } else {
                        // doc.data() will be undefined in this case
                        console.log(`No such document for UID=${UID}`);
                        if (UID.length > 10) {
                            // Write a doc
                            console.log(`Creating a userrole doc for UID=${UID}`);
                            firebaseDocRef.set({
                                approved: false,
                                email: email,
                            });
                        }
                    }
                })
                .catch((error) => {
                    console.log("Error getting document:", error);
                });
        }
        // return a cleanup function which gets called automatically when needed
        // return () => unsub;
    }, [UID]);

    // Return a useState variable to caller
    return userRole;
};

export default useUserRoleByUID;
