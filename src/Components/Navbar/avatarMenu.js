import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  title: {
    marginLeft: "10px",
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
}));

export default function AvatarMenu(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    console.log("going to sign out");
    props.doLogOut();
  };

  const copy_projects_url = () => {
    let url_now = window.location.href;
    let url_parts = url_now.split("/");
    let last_part = url_parts[url_parts.length-1];
    let projects_url;
    if(last_part==="projects")
    {
      projects_url = url_now ;
    }
    else
    {
      projects_url = url_now + "/projects";
    }
    navigator.clipboard.writeText(projects_url);
    setAnchorEl(null);
  };

  var avatarSrc = "/assets/userImg/user.svg";
  var navMenu, username;
  if (props.isLoggedIn()) {
    if ("dp" in props.currentUser) {
      avatarSrc = props.currentUser.dp;
    }
    username = props.currentUser.uname;
    var uid = props.currentUser.uid;
    var profileLink = "/" + uid;
    var allProjectsLink = "/" + uid + "/projects";
    navMenu = (
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={copy_projects_url}>Share Profile</MenuItem>
        <Link to={profileLink} className="navLinks">
          <MenuItem onClick={handleClose} className="navLinks">
            My Profile
          </MenuItem>
        </Link>
        <Link to={allProjectsLink} className="navLinks">
          <MenuItem onClick={handleClose} className="navLinks">
            Projects
          </MenuItem>
        </Link>
        <MenuItem onClick={() => handleLogOut()}>Logout</MenuItem>
      </Menu>
    );
  } else {
    username = "Anonymous";
    navMenu = (
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Link to="/login" className="navLinks">
          <MenuItem onClick={handleClose} className="navLinks">
            Login
          </MenuItem>
        </Link>
        <Link to="/signup" className="navLinks">
          <MenuItem onClick={handleClose} className="navLinks">
            Signup
          </MenuItem>
        </Link>
      </Menu>
    );
  }

  return (
    <>
      <Avatar
        alt="Remy Sharp"
        src={avatarSrc}
        style={{ margin: "10px", cursor: "pointer" }}
        onClick={handleClick}
      />
      {navMenu}
      <Typography className={classes.title} variant="h6" noWrap>
        {username}
      </Typography>
    </>
  );
}
