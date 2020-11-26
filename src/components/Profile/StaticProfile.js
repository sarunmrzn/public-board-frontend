import React from "react";
import { Paper, Box, Link as MuiLink, Typography } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import dayjs from "dayjs";
import { LocationOn, CalendarToday, LinkedIn } from "@material-ui/icons";
import { Link } from "react-router-dom";

const styles = ({ theme }) => ({ ...theme });

const StaticProfile = ({
  profile: { username, createdAt, bio, website, location, imageUrl },
  classes,
}) => {
  return (
    <Box style={{ marginTop: "80px" }}>
      <Paper className={classes.profile}>
        <Box className={classes.profileImgWrapper}>
          <img src={imageUrl} alt="profile" className={classes.profileImg} />
        </Box>
        <hr />
        <Box className={classes.profileDetails}>
          <MuiLink
            component={Link}
            to={`/users/${username}`}
            color="primary"
            variant="h5"
            className={classes.profileCentered}
          >
            @{username}
          </MuiLink>
          {bio && (
            <Typography variant="body2" className={classes.profileCentered}>
              {bio}
            </Typography>
          )}
          {location && (
            <Box className={classes.iconTextCombo}>
              <LocationOn color="primary" />
              <span>{location}</span>
            </Box>
          )}
          {website && (
            <Box className={classes.iconTextCombo}>
              <LinkedIn color="primary" />
              <a href={website} target="_blank" rel="noopener noreferrer">
                {website}
              </a>
            </Box>
          )}
          <Box className={classes.iconTextCombo}>
            <CalendarToday color="primary" />
            <span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default withStyles(styles)(StaticProfile);
