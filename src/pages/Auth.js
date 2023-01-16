import React from "react";
import { auth } from "../firebaseSetup";

function Auth() {
    const [newUser, setNewUser] = React.useState(true);
    const [username, setUsername] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    function toggleAccount(event) {
        event.preventDefault();
        setNewUser(prev => !prev);
    }

    function onChange(event) {
        const { target: { value, name } } = event;

        if (name === "username") {
            setUsername(value);
        } else if (name === "password") {
            setPassword(value);
        } else if (name === "email") {
            setEmail(value);
        }
    }

    async function createUser(event) {
        event.preventDefault();

        let result;
        if (newUser) {
            result = await auth.createUserWithEmailAndPassword(email, password).then(result => {
                console.log(result.user);
                result.user.updateProfile({
                    displayName: username
                });
            });
        } else {
            result = await auth.signInWithEmailAndPassword(email, password);
        }
    }

    return <div>
        {newUser ? (
            <form onSubmit={createUser}>
                <h1>Create Account</h1>
                <input required onChange={onChange} value={username} name="username" type="text" placeholder="Your username" />
                <br />
                <input required onChange={onChange} value={email} name="email" type="email" placeholder="Your email" />
                <br />
                <input required onChange={onChange} value={password} name="password" type="password" placeholder="Your password" />
                <br />
                <input type="submit" value="Create Account" />
                <br />
                <button onClick={toggleAccount}>Go to Login</button>
            </form>
        ) : (
            <form onSubmit={createUser}>
                <h1>Log in</h1>
                <input required onChange={onChange} value={email} name="email" type="email" placeholder="Your email" />
                <br />
                <input required onChange={onChange} value={password} name="password" type="password" placeholder="Your password" />
                <br />
                <input type="submit" value="Login" />
                <br />
                <button onClick={toggleAccount}>Go to Create Account</button>
            </form>
        )}
    </div>
}

export default Auth;