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
import { loginUser } from "../redux/actions/userActions";

const styles = ({ theme }) => ({ ...theme });

const Login = (props) => {
  const {
    classes,
    UI: { loading, errors },
    loginUser,
  } = props;

  const [state, setState] = useState({
    email: "",
    password: "",
    errors: errors,
  });

  useEffect(() => {
    setState({ ...state, errors });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: state.email,
      password: state.password,
    };
    loginUser(userData, props.history);
  };

  return (
    <Box className={classes.mainContainer}>
      <Box className={classes.mainForm}>
        <Typography variant="h2" className={classes.formTitle}>
          Login
        </Typography>
        <form noValidate onSubmit={loginSubmit} className={classes.submitForm}>
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
          {state?.errors?.general && (
            <Typography variant="body2" className={classes.generalError}>
              {state?.errors?.general}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            className={classes.submitButton}
          >
            {loading ? (
              <CircularProgress size={25} />
            ) : (
              <Typography>Login</Typography>
            )}
          </Button>
          <small>
            <Link to="/signup">
              <Typography>Sign up</Typography>
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
  loginUser,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(Login));
