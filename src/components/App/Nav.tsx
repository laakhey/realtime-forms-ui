import React from "react";

function Nav() {

    const onLogOut = () => {
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('opportunityId');
        window.location.reload();
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">HOME</a>
            <div id="avatar-list" className="avatar-list float-end">
                {/*<button type="button" className="btn btn-secondary avatar" data-bs-toggle="tooltip" data-bs-placement="top"*/}

                <button className="avatar" data-bs-toggle="tooltip" data-bs-placement="top" title="name of user">
                </button>
                <button className="avatar" data-bs-toggle="tooltip" data-bs-placement="top" title="name of user">
                </button>
                <button className="avatar" data-bs-toggle="tooltip" data-bs-placement="top" title="name of user">
                </button>
                <button className="avatar" data-bs-toggle="tooltip" data-bs-placement="top" title="name of user">
                </button>
                <button className="avatar" data-bs-toggle="tooltip" data-bs-placement="top" title="name of user">
                </button>

            </div>
            <div className="collapse navbar-collapse float-end" id="navbarSupportedContent">
                <button className="btn btn-outline-success my-2 my-sm-0" onClick={onLogOut}>Log Out</button>
            </div>
        </nav>
    );
}

export default Nav;
