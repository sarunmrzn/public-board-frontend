import React from "react";
import jwtDecode from "jwt-decode";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";
import { Provider } from "react-redux";
import {
  ThemeProvider as MuiThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";

import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, getUserData } from "./redux/actions/userActions";

import AuthRoute from "./util/AuthRoute";
import themeObject from "./util/theme";
import Navbar from "./components/Nav";
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import User from "./pages/user";

import "./App.css";

const theme = createMuiTheme(themeObject);
const token = localStorage.FBIdToken;
const baseURL = process.env.REACT_APP_FIREBASE_URL;
axios.defaults.baseURL = baseURL;

if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <AuthRoute exact path="/login" component={Login} />
            <AuthRoute exact path="/signup" component={Signup} />
            <Route exact path="/users/:username" component={User} />
            <Route
              exact
              path="/users/:username/post/:postId"
              component={User}
            />
          </Switch>
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
};

export default App;
