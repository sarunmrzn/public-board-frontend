import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  Menu,
  MenuItem,
  IconButton,
  Tooltip,
  Typography,
  Badge,
} from "@material-ui/core";
import {
  Notifications as NotificationIcon,
  Favorite,
  Chat,
} from "@material-ui/icons";
import { markNotificationsRead } from "../../redux/actions/userActions";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const Notifications = (props) => {
  const { notifications, markNotificationsRead } = props;
  const [state, setState] = useState({
    anchorEl: null,
  });
  let notificationIcon;

  dayjs.extend(relativeTime);

  if (notifications?.length > 0) {
    notifications.filter((not) => not.read === false).length > 0
      ? (notificationIcon = (
          <Badge
            badgeContent={
              notifications.filter((not) => not.read === false).length
            }
            color="secondary"
          >
            <NotificationIcon />
          </Badge>
        ))
      : (notificationIcon = <NotificationIcon />);
  } else {
    notificationIcon = <NotificationIcon />;
  }

  const handleOpen = (e) => {
    setState({ ...state, anchorEl: e.target });
  };

  const handleClose = () => {
    setState({ ...state, anchorEl: null });
  };

  const onMenuOpened = () => {
    const unreadNotiIds = notifications
      .filter((not) => !not.read)
      .map((not) => not.notificationId);
    markNotificationsRead(unreadNotiIds);
  };

  return (
    <>
      <Tooltip placement="top" title="Notifications">
        <IconButton
          aria-owns={state.anchorEl ? "simple-menu" : undefined}
          aria-haspopup="true"
          onClick={handleOpen}
        >
          {notificationIcon}
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={state.anchorEl}
        open={Boolean(state.anchorEl)}
        onClose={handleClose}
        onEntered={onMenuOpened}
      >
        {notifications?.length > 0 ? (
          notifications.map((not) => {
            const verb = not.type === "like" ? "liked" : "commented on";
            const time = dayjs(not.createdAt).fromNow();
            const iconColor = not.read ? "primary" : "secondary";
            const icon =
              not.type === "like" ? (
                <Favorite color={iconColor} style={{ marginRight: 10 }} />
              ) : (
                <Chat color={iconColor} style={{ marginRight: 10 }} />
              );
            return (
              <MenuItem key={not.createdAt} onCLick={handleClose}>
                {icon}
                <Typography
                  component={Link}
                  color="default"
                  variant="body1"
                  to={`/users/${not.recipient}/post/${not.postId}`}
                >
                  {not.sender} {verb} your post {time}
                </Typography>
              </MenuItem>
            );
          })
        ) : (
          <MenuItem onClick={handleClose}>You have no notifications</MenuItem>
        )}
      </Menu>
    </>
  );
};

const mapStateToProps = (state) => ({
  notifications: state.user.notifications,
});

const mapActionToProps = {
  markNotificationsRead,
};

export default connect(mapStateToProps, mapActionToProps)(Notifications);
