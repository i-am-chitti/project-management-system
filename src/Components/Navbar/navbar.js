import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import AddProject from "./addProject";
import Searchbar from "./searchBar";
import AvatarMenu from "./avatarMenu";


export default function Navbar(props) {
  // const classes = useStyles();
    return (
      <AppBar position="static">
        <Toolbar>
          <AvatarMenu isLoggedIn={props.isLoggedIn} doLogOut={props.doLogOut} currentUser={props.currentUser} />
          <AddProject isLoggedIn={props.isLoggedIn} addProject={props.addProject} currentUser={props.currentUser} />
          <Searchbar />
        </Toolbar>
      </AppBar>
    );
}
