import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

import firebaseConfig from "../../Util/firebaseConfig";
import {User} from "../../Util/User";
import Login from "../Auth/login";
import Signup from "../Auth/signup";
import Navbar from "../Navbar/navbar";
import DisplayProject from "../DisplayProject/displayProject";
import Profile from "../Profile/userProfile";

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alertMessage: '',
            checkUser() {
                if(!User.isLoggedIn) {
                    return false;
                }
                else return true;
            }
        };
        firebase.initializeApp(firebaseConfig);

        User.getUserFromCookie()

        this.login = this.login.bind(this);
        this.signUp = this.signUp.bind(this);
        this.logOut = this.logOut.bind(this);
        this.modifyUser = this.modifyUser.bind(this);
        this.changeAlertMessageState = this.changeAlertMessageState.bind(this);
        this.addProject = this.addProject.bind(this);
    }

    login(email, password, changeUserState, doAlert) {
        firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
            var currentUser = firebase.auth().currentUser;
            firebase.database().ref('users/'+currentUser.uid+'/uname').on("value", function(snapshot) {
                currentUser.uname=snapshot.val();
                changeUserState(currentUser);
                window.location="/"+currentUser.uid;
            },
            function(error) {
                console.log(error.message);
            });
        }).catch(function(error) {
            doAlert(error.message);
        });
    }

    signUp(email, uname, password, doAlert) {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
            //successful sign up
            var userId = firebase.auth().currentUser.uid;
            console.log(userId);
            firebase.database().ref('users/'+userId).set({
                email: email,
                uname: uname
            }).then(() => window.location="/login").catch(function(error) {
                console.log(error.message);
                doAlert(error.message);
            });
        }).catch(function(error) {
            doAlert(error.message);
        })
    }

    modifyUser(userData) {
        User.changeUser(userData);
    }

    changeAlertMessageState(message) {
        this.setState({alertMessage: message});
    }

    logOut() {
        firebase.auth().signOut().then(() => {
            User.logOut();
            window.location="/login";
        });
    }

    addProject(uid, values) {
        console.log(values);
        var postData = {
            name: values.title,
            link: values.sourceLink,
            live: values.liveLink,
            description: values.description,
          };
          //push static data into dB
          var projectKey = firebase.database().ref("users/" + uid + "/projects").push().key;
          
          postData.id = projectKey;

          projectKey = firebase.database().ref("users/" + uid + "/projects").push(postData).key;
    
          values.pics.forEach((pic) => {
            //upload images to firebase storage
            var uploadTask = firebase.storage().ref("images/" + uid + "/" + pic.name).put(pic);

            uploadTask.on(
              "state_changed",
              function (snapshot) {
                //function to track images upload
                var progress =
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                //progress scale for a progress bar
              },
              function (error) {
                //if any error occured, display
                alert(error.code);
              },
              function () {
                console.log("getting download link");
                //getting download link
                uploadTask.snapshot.ref.getDownloadURL().then(function (url) {
                  firebase.database().ref("users/"+uid +"/projects/"+projectKey+"/images").push(url);
                });
              }
            );
          });
    }

    loadProject(uid, callback) {
        firebase
          .database()
          .ref("users/" + uid + "/projects")
          .on(
            "value",
            function (snapshot) {
              //get json object from DB
              callback(snapshot.val());
            },
            function (error) {
              callback(error.message);
            }
          );
    }

    doesUserExist(uid, callback) {
        console.log("in user exists");
        firebase.database().ref("/users/"+uid).once("value", function(snapshot) {
            if(snapshot.val()) {
                console.log("user exists");
                callback(1);
            }
            else {
                console.log("user doesn't exist");
                callback(0);
            }
        })
    }

    loadProfile(uid, callback) {
        firebase
          .database()
          .ref("users/" + uid)
          .on(
            "value",
            function (snapshot) {
              //get json object from DB
              callback(snapshot.val());
            },
            function (error) {
              callback(error.message);
            }
          );
    }

    render() {
        return (
            <Router>
                <Navbar isLoggedIn={this.state.checkUser} doLogOut={this.logOut} currentUser={User.currentUser} addProject={this.addProject} />
                <Switch>
                    <Route path="/login">
                        <Login isLoggedIn={this.state.checkUser} doLogin={this.login} currentUser={User.currentUser} onLogin={this.modifyUser} alertMessage={this.state.alertMessage} doAlert={this.changeAlertMessageState} />
                    </Route>
                    <Route path="/signup">
                        <Signup isLoggedIn={this.state.checkUser} doSignUp={this.signUp} currentUser={User.currentUser} alertMessage={this.state.alertMessage} doAlert={this.changeAlertMessageState} />
                    </Route>
                    <Route path="/:uid/projects" render={(props) => <DisplayProject loadProject={this.loadProject} checkUser={this.doesUserExist} {...props} />} />
                    <Route path="/:uid" render={(props) => <Profile loadProfile={this.loadProfile} checkUser={this.doesUserExist} {...props} />} />
                    <Route path="/">
                        <Login isLoggedIn={this.state.checkUser} doLogin={this.login} currentUser={User.currentUser} onLogin={this.modifyUser} alertMessage={this.state.alertMessage} doAlert={this.changeAlertMessageState} />
                    </Route>
                </Switch>
            </Router>
        );
    }
}

export default Main;