import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Auth from "../pages/Auth";
import Home from "../pages/Home";

function Router({ isLoggedIn }) {
    return (
        <BrowserRouter>
            <Switch>
                {isLoggedIn ? (
                    <>                        
                        <Route exact={true} path="/">
                            <Home />
                        </Route>

                        <Redirect from="/*" to="/" />
                    </>
                ) : (
                    <>
                        <Route exact={true} path="/">
                            <Auth />
                        </Route>

                        <Redirect from="/*" to="/" />
                    </>
                )}
            </Switch>
        </BrowserRouter>
    );
}

export default Router;