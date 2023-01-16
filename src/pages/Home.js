import React from "react";
import { auth } from "../firebaseSetup";
import firebase from "firebase";

function Home() {
    async function signOut() {
        await auth.signOut();
    }

    return <div>
        <div className="container">
            Main Container
        </div>

        <button className="home-button" onClick={signOut}>Log Out</button>
    </div>
}

export default Home;