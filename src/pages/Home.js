import React from "react";
import { auth } from "../firebaseSetup";

function Home() {
    function signOut() {
        auth.signOut();
    }

    function deleteAccount() {
        auth.currentUser.delete();
    }

    return <div>
        <div className="container">
            Main Container
        </div>

        <br />
        <br />

        <button className="home-button" onClick={signOut}>Log Out</button>
        <br />
        <button className="home-button" onClick={deleteAccount}>Delete Account</button>
    </div>
}

export default Home;