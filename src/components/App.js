import React from "react";
import { auth } from "../firebaseSetup";
import Router from "./Router";

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(auth.currentUser);
  const [user, setUser] = React.useState(auth.currentUser);

  React.useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        setIsLoggedIn(true);
        setUser(user);
      } else {
        setIsLoggedIn(false);
      }
    })
  }, []);

  return (
    <div className="App">
      <Router user={user} isLoggedIn={isLoggedIn} />
    </div>
  );
}

export default App;
