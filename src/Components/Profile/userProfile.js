import React, { Component } from "react";
import CircularProgress from "../MaterialUI/circularProgress";
import SimpleSnackbar from "../MaterialUI/warningSnackbar";

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            error: false
        }
    }

    componentDidMount() {
        this.props.checkUser(this.props.match.params.uid, (doesExists) => {
            this.loadingProfile(doesExists);
        })
    }

    loadingProfile(doesExists) {
        console.log(doesExists+" user status");
        if(doesExists) {
            this.props.loadProfile(this.props.match.params.uid, (profileData) => {
                console.log(profileData);
                if(typeof profileData !== "object") {
                    this.setState({isLoading: false, userExists: true, error: true, errorMessage: profileData});
                }
                else {
                    this.setState({isLoading: false, userExists: true, profileData: profileData});
                }
            });
        }
        else {
            this.setState({isLoading: false, userExists: false});
        }
    }

    render() {
        if(this.state.isLoading) return <CircularProgress />;
        else {
            if(!this.state.userExists) {
                return (
                    <div>
                        <h1>User doesn't exists</h1>
                    </div>
                );
            }
            else if(this.state.error) {
                return <SimpleSnackbar message={this.state.errorMessage} />
            }
            else {
                //valid profile
                return (
                    <div id="profilePage">
                      <div className="back"></div>
                      <div id="leader">
                        <div id="top">
                          <div className="pic">
                            <img src="/assets/userImg/user.png" alt="Baba yaga" />
                          </div>
                <div className="name">{this.state.profileData.uname}</div>
                          <div className="about">" Hii Guys "</div>
                        </div>
              
                        <div id="bottom">
                          <div className="skills">
                            <div className="title">Skills</div>
                            <hr className="line"></hr>
                            <div className="list">
                              <ul>
                                <li>Japanese jiu-jitsu</li>
                                <li>Tactical three-gun</li>
                                <li>Standing Judo</li>
                                <li>Kick Ass</li>
                                <li>Take names</li>
                                <li>Pencil Killing</li>
                                <li>Be Cool</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
            }
        }
    }

}

export default Profile;