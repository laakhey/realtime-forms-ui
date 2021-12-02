import Dashboard from '../Dashboard/Dashboard';
import Input from '../Input/Input';
import './App.css';
import React from "react";
import Login from "./Login";
import Nav from "./Nav";

function App() {

    const username: string | null = sessionStorage.getItem("username");
    const opportunityId: string | null = sessionStorage.getItem("opportunityId");

    const isLoggedIn = username && opportunityId;

    console.log(username, opportunityId);
    const renderContent = () => {
        if (isLoggedIn) {
            return (<div>
                <Dashboard formId="input-1" />
                <h1>Welcome {username}</h1>
                <h2>Opportunity Id: {opportunityId}</h2>
            </div>)
        }
        return <Login />
    }

    return (
        <div className="container">
            <div className="row">
                <Nav />
            </div>
            {renderContent()}
        </div>
    );
}

export default App;
