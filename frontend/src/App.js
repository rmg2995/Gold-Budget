import React, { Component, Fragment, useState, useEffect } from "react";
import { Switch, Route, NavLink, useHistory } from "react-router-dom";
import TheContext from "./TheContext";
import Home from "./components/home/Home";
import NotFound from "./components/404/NotFound.js";
import SignUp from "./components/auth/SignUp";
import LogIn from "./components/auth/LogIn";
import Profile from "./components/profile/Profile";
import actions from "./api/index";
import GoogleAuth from "./components/auth/GoogleAuth";
import GoogleAuthLogin from "./components/auth/GoogleAuthLogin";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import Navbar from "./components/nav/Navbar";
import Form from "./components/Form";
import Transactions from "./components/Transactions";
import MeetTeam from "./components/MeetTeam";
const App = () => {
  let [user, setUser] = useState(null);

  useEffect(() => {
    async function getUser() {
      let user = await actions.getUser();
      console.log("user is", user);
      setUser(user?.data);
    }
    getUser();
  }, []);

  const logOut = async () => {
    let res = await actions.logOut();
    setUser(null);
  };

  const history = useHistory();

  return (
    <TheContext.Provider value={{ history, user, setUser }}>
      <div className="form-body">
        <Navbar />

        <nav>
          {user ? (
            <Fragment>
              <h3>Welcome Back, {user.email}!</h3>
              <NavLink className="nav-links" onClick={logOut} to="/">
                Log Out
              </NavLink>
            </Fragment>
          ) : (
            <Fragment>
              <NavLink className="nav-links" to="/sign-up">
                Sign Up |
              </NavLink>
              <NavLink className="nav-links" to="/log-in">
                Log In{" "}
              </NavLink>
            </Fragment>
          )}
          <br />
          {!user && <GoogleAuth />}
          {!user && <GoogleAuthLogin />}
        </nav>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => <Home {...props} />}
          />
          <Route
            exact
            path="/sign-up"
            render={(props) => <SignUp {...props} />}
          />
          <Route
            exact
            path="/log-in"
            render={(props) => <LogIn {...props} />}
          />
          <Route
            exact
            path="/profile"
            render={(props) => <Profile {...props} user={this.state} />}
          />
          <Route
            exact
            path="/add-transactions"
            render={(props) => <Form {...props} />}
          />
          <Route
            exact
            path="/transactions"
            render={(props) => <Transactions {...props} />}
          />
          <Route exact path="/meet-team" render={() => <MeetTeam />} />
          <Route component={NotFound} />
        </Switch>
      </div>

      {/* {user?.email}
      <nav>
        <NavLink to="/">Home</NavLink>

        {user ? (
          <Fragment>
            <NavLink onClick={logOut} to="/">
              Log Out
            </NavLink>
            <NavLink to="/profile">Profile</NavLink>
          </Fragment>
          ) : (
          <Fragment>
            <NavLink to="/sign-up">Sign Up</NavLink>
            <NavLink to="/log-in">Log In</NavLink>
          </Fragment>
        )}
      </nav>
      <Switch>
        <Route exact path="/" render={(props) => <Home {...props} />} />
        <Route
          exact
          path="/sign-up"
          render={(props) => <SignUp {...props} setUser={setUser} />}
        />
        <Route
          exact
          path="/log-in"
          render={(props) => <LogIn {...props} setUser={setUser} />}
        />
        <Route
          exact
          path="/profile"
          render={(props) => <Profile {...props} />}
        />

        <Route component={NotFound} />
      </Switch>
      {!user && <GoogleAuth setUser={setUser} />}
      {!user && <GoogleAuthLogin setUser={setUser} />} */}

      <NotificationContainer />
    </TheContext.Provider>
  );
};
export default App;
