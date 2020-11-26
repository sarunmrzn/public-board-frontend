import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  TextField,
  Box,
  Typography,
  Button,
  CircularProgress,
} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import { signupUser } from "../redux/actions/userActions";

const styles = ({ theme }) => ({ ...theme });

const Signup = (props) => {
  const {
    classes,
    UI: { loading, errors },
    signupUser,
  } = props;

  const [state, setState] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    errors: {},
  });

  useEffect(() => {
    setState({ ...state, errors });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const signupSubmit = (e) => {
    e.preventDefault();
    const newUserData = {
      email: state.email,
      password: state.password,
      confirmPassword: state.confirmPassword,
      username: state.username,
    };
    signupUser(newUserData, props.history);
  };

  return (
    <Box className={classes.mainContainer}>
      <Box className={classes.mainForm}>
        <Typography variant="h2" className={classes.formTitle}>
          Sign up
        </Typography>
        <form noValidate onSubmit={signupSubmit} className={classes.submitForm}>
          <TextField
            className={classes.textField}
            margin="dense"
            variant="outlined"
            fullWidth
            id="username"
            name="username"
            type="username"
            label="Username"
            helperText={state?.errors?.username}
            error={state?.errors?.username ? true : false}
            value={state.username}
            onChange={handleChange}
          />
          <TextField
            className={classes.textField}
            margin="dense"
            variant="outlined"
            fullWidth
            id="email"
            name="email"
            type="email"
            label="Email"
            helperText={state?.errors?.email}
            error={state?.errors?.email ? true : false}
            value={state.email}
            onChange={handleChange}
          />
          <TextField
            className={classes.textField}
            margin="dense"
            variant="outlined"
            fullWidth
            id="password"
            name="password"
            type="password"
            label="Password"
            helperText={state?.errors?.password}
            error={state?.errors?.password ? true : false}
            value={state.password}
            onChange={handleChange}
          />
          <TextField
            className={classes.textField}
            margin="dense"
            variant="outlined"
            fullWidth
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            helperText={state?.errors?.confirmPassword}
            error={state?.errors?.confirmPassword ? true : false}
            value={state.confirmPassword}
            onChange={handleChange}
          />
          {state?.errors?.general && (
            <Typography variant="body2" className={classes.generalError}>
              {state?.errors?.general}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={25} />
            ) : (
              <Typography>Sign up</Typography>
            )}
          </Button>
          <small>
            <Link to="/login">
              <Typography>Login</Typography>
            </Link>
          </small>
        </form>
      </Box>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionToProps = {
  signupUser,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(Signup));
