import React, {Suspense} from "react"
import axios from "axios"
import {getJwt} from "../../helpers/getJwt"
import Alert from "../../helpers/Alert"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import UserProfile from '../protected/Profile'

const LazyAdminTableComponent = React.lazy(() => import("./AdminTable"));

function Admin(props) {
    const [isError, setIsError] = React.useState(undefined);
    const [users, setUsers] = React.useState([]);
    const [checkedUsers, setCheckedUsers] = React.useState([]);

    React.useEffect(() => {
        axios.get("/auth/admin/getAdminPage", 
        { headers: {
                Authorization: getJwt()
            }
        }).then(response => {
            if(!response.data) setIsError(true)
            else {
                setUsers(response.data);
                setIsError(false);
            }
        }).catch((error) => {
            console.log("Access denied!" + error);
            setIsError(true);
        });
    }, [users]);

    const addCheckedUser = (user) => {
        setCheckedUsers(checkedUsers.concat([user]));
    }
    const removeCheckedUser = (user) => {
        setCheckedUsers(checkedUsers.filter(checkedUser => checkedUser !== user&&checkedUser));
    }

    const changeUsersStatus = (newStatus) => {
        checkedUsers.forEach(function(checkedUser) {
            axios.post("/auth/admin/changeUserStatus", {
                "userId": checkedUser,
                "newStatus": newStatus
            }, { headers: { 
                    Authorization: getJwt() 
            }}).catch(() => setIsError(true));
        })
        setCheckedUsers([]);
    }

    const deleteUsers = () => {
        checkedUsers.forEach(function(checkedUser) {
            axios.post("/auth/admin/deleteUser", {
                userId: checkedUser
            }, { headers: { 
                    Authorization: getJwt() 
            }}).catch(() => setIsError(true));
        })
        setCheckedUsers([]);
    }

    return (
        <div style={{marginTop:'56px'}}>
            {isError===undefined&&<p>Loading...</p>}
            {isError===true&&<Alert msg="Access denied." type="danger"/>}
            {isError===false&&<>
                <Alert msg="Hello, Admin!" type="success"/>
                <Suspense fallback = {
                        <div>Loading...</div> }> 
                <LazyAdminTableComponent 
                    users = {users}
                    addCheckedUser = {addCheckedUser}
                    removeCheckedUser = {removeCheckedUser}
                    checkedUsers={checkedUsers}
                    changeUsersStatus = {changeUsersStatus}
                    deleteUsers = {deleteUsers}
                /> 
                </Suspense> 
            </>}
          
        </div>
    )
}

export default Admin;