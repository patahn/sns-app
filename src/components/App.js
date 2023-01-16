import React from "react";
import { auth } from "../firebaseSetup";
import Router from "./Router";

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(auth.currentUser);

  React.useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    })
  }, []);

  return (
    <div className="App">
      <Router isLoggedIn={isLoggedIn} />
    </div>
  );
}

export default App;
