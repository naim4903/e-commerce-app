import React, { useState, useEffect } from "react";
import PageLayout from "../layouts/PageLayout";
import axios from "../utils/axios-instance"


const Homepage = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        getAllUsers();
    }, [])

    const getAllUsers = async () => {
        try {
            let { data } = await axios.get("user")
            if (data.length > 0) {
                setUsers(data);
            }
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <PageLayout>
            <div className="App">
                <header className="App-header">
                    <h1 className="text-4xl font-bold text-blue-500">
                        Welcome to my E-Commerce Website
                    </h1>
                    {
                        users.length > 0 && users.map(user => (
                            <div className="border-2 p-5 m-2 w-1/2" key={user._id}>
                                <p> <span>Name: </span>  {user.userName}</p>
                                <p> <span>Email: </span> {user.email}</p>
                            </div>
                        ))
                    }
                </header>
            </div>
        </PageLayout>
    )
};

export default Homepage;