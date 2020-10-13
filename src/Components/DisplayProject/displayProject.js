import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Project from "./project";
import BackToTop from "../MaterialUI/scrollTop";
import Toolbar from "@material-ui/core/Toolbar";
import CircularProgress from "../MaterialUI/circularProgress";
import SimpleSnackbar from "../MaterialUI/warningSnackbar";

class DisplayProjects extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            error: false
        };
    }

    componentDidMount() {
        //first check if user exists, then make call to get project data
        this.props.checkUser(this.props.match.params.uid, (val) => {
            this.loadingProject(val);
        });
    }

    loadingProject(val) {
        console.log(val+" user status");
        if(val) {
            //user exists
            this.props.loadProject(this.props.match.params.uid, (projectData) => {
                console.log(projectData);
                if(!projectData) {
                    //no projects
                    this.setState({isLoading: false, userExists: true, projectData: null});
                }
                else if(typeof projectData !== 'object') {
                    //an error occured
                    this.setState({isLoading: false, userExists: true, error: true, errorMessage: projectData});
                }
                else {
                    var projectDatas = Object.values(projectData);
                    projectDatas.map((oneData) => {
                    oneData.images = Object.values(oneData.images);
                    });
                    this.setState({isLoading: false, userExists: true, projectData: projectDatas});
                }
            });
        }
        else {
            this.setState({isLoading: false, userExists: false});
        }
    }

    render() {

        if(this.state.isLoading) {
            return <CircularProgress />;
        }
        else {
            if(!this.state.userExists) {
                //no such user exists
                return (
                    <div>
                        <h1>User doesn't exists</h1>
                    </div>
                );
            }
            else {
                //user exists
                if(!this.state.projectData) {
                    return (
                        <div>
                            <h1>No projects yet</h1>
                        </div>
                    );
                }
                else if(this.state.error) {
                    //some error occured
                    return <SimpleSnackbar message={this.state.errorMessage} />
                }
                else {
                    //project are there
                    return (
                        <Grid container>
                          <Grid item xs={12}>
                            <Toolbar id="back-to-top-anchor" style={{ minHeight: "30px" }} />
                            <Grid
                              container
                              justify="center"
                              spacing={2}
                              style={{ width: "100%" }}
                            >
                              {this.state.projectData.map((project) => (
                                <Grid key={project.id} item>
                                  <Project project={project} />
                                  {/* <Slides project={selectedProject} /> */}
                                </Grid>
                              ))}
                            </Grid>
                            <BackToTop />
                          </Grid>
                        </Grid>
                      );
                    
                }
            } 
        }

    }

}

export default DisplayProjects;