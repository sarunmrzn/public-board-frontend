import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { AppBar, Toolbar, Button } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import { Home } from "@material-ui/icons";
import MyButton from "../../util/MyButton";
import CreatePost from "../Post/CreatePost";
import Notifications from "./Notifications";

const styles = ({ theme }) => ({
  ...theme,
  toolBar: {
    display: "flex",
    justifyContent: "center",
  },
});

const Navbar = ({ authenticated, classes }) => {
  return (
    <AppBar>
      <Toolbar className={classes.toolBar}>
        {authenticated ? (
          <>
            <CreatePost />
            <Link to="/">
              <MyButton tip="Home">
                <Home />
              </MyButton>
            </Link>
            <MyButton tip="Notifications">
              <Notifications />
            </MyButton>
          </>
        ) : (
          <>
            {" "}
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/signup">
              Sign Up
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = (state) => ({
  authenticated: state.user?.authenticated,
});

const mapActionToProps = {};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(Navbar));
