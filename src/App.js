import React, { useState, useCallback } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

// layouts

import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";

// views without layouts

import Landing from "views/Landing.js";
import Profile from "views/Profile.js";
import Index from "views/Index.js";

import { AuthContext } from "components/context/auth-context";

const App = () =>  {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const login = useCallback(() => {
        setIsLoggedIn(true);
    }, []);
    const logout = useCallback(() => {
        setIsLoggedIn(false);
    })

    let routes;

    if (isLoggedIn) {
        routes = (
            <React.Fragment>
                <Route path="/admin" component={Admin} />
                <Route path="/auth" component={Auth} />
            </React.Fragment>
        )
    }
    else {
        routes = (
            <React.Fragment>                
                <Route path="/auth" component={Auth} />
            </React.Fragment>
        )
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            <BrowserRouter>
                <Switch>
                {/* add routes with layouts */}


                { routes }
                {/* <Route path="/admin" component={Admin} />
                <Route path="/auth" component={Auth} /> */}


                {/* add routes without layouts */}
                {/* <Route path="/landing" exact component={Landing} />
                <Route path="/profile" exact component={Profile} /> */}
                {/* <Route path="/" exact component={Admin} /> */}
                {/* add redirect for first page */}
                <Redirect from="*" to="/auth" />
                </Switch>
            </BrowserRouter>
        </AuthContext.Provider>   
    );
};

export default App;
  
