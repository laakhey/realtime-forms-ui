import Dashboard from '../Dashboard/Dashboard';
import './App.css';
import React from "react";
import Login from "./Login";

function App() {

    const username: string | null = sessionStorage.getItem("username");
    const opportunityId: string | null = sessionStorage.getItem("opportunityId");

    const isLoggedIn = username && opportunityId;

    const renderContent = () => {
        if (isLoggedIn) {
            return (<div>
                <Dashboard username={username} opportunityId={opportunityId} formId="input-1"/>
            </div>)
        }
        return <Login/>
    }

    return (
        <div className="container">
            {renderContent()}
        </div>
    );
}

export default App;
