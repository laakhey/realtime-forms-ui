import './App.css';
import React from "react";

function Login() {

    const usernameErrorMessage = "Username is required";
    const opportunityIdErrorMessage = "Opportunity ID is required";

    const [username, setUsername] = React.useState("");
    const [opportunityId, setOpportunityId] = React.useState("");

    const [usernameError, setUsernameError] = React.useState(false);
    const [opportunityIdError, setOpportunityIdError] = React.useState(false);


    const onFormSubmit = (event: any) => {
        event.preventDefault();

        setOpportunityIdError(false);
        setUsernameError(false);

        if (opportunityId.trim().length === 0) {
            setOpportunityIdError(true);
            return;
        }

        if (username.trim().length === 0) {
            setUsernameError(true);
            return;
        }

        sessionStorage.setItem("username", username);
        sessionStorage.setItem("opportunityId", opportunityId);
        window.location.reload();
    }

    const onOpportunityIdChange = (e: any) => {
        setOpportunityId(e.target.value);
    }

    const onUsernameChange = (e: any) => {
        setUsername(e.target.value);
    }

    return (
        <div className="vstack gap-2 col-md-2 mx-auto mt-5">
            <form onSubmit={(e) => onFormSubmit(e)} noValidate>
                <div className="small text-danger mb-lg-3">Please enter opportunity id and username to begin</div>
                <div className="form-group">
                    <label htmlFor="opportunityId">Opportunity ID: </label>
                    <input type="text" className="form-control" id="opportunityId"
                           placeholder="Enter OpportunityId" onKeyUp={onOpportunityIdChange}/>
                    {opportunityIdError && <small className="text-danger">{opportunityIdErrorMessage}</small>}
                </div>
                <div className="form-group mt-3">
                    <label htmlFor="username">Username: </label>
                    <input type="text" className="form-control" id="username" placeholder="Username"
                           onKeyUp={onUsernameChange}/>
                    {usernameError && <small className="text-danger">{usernameErrorMessage}</small>}
                </div>

                <button type="submit" className="btn btn-primary mt-4">Submit</button>
            </form>
        </div>
    );
}

export default Login;
