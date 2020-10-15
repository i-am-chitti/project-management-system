import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import { DropzoneArea } from "material-ui-dropzone";
import Chip from "@material-ui/core/Chip";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";

export default function EditProfile(props) {
  const [values, setValues] = React.useState({
    name: "",
    bio: "",
    skill: "",
    skills: [],
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    console.log(values);
    console.log(prop);
  };

  const addSkill = () => {
    if (!values.skill) {
      //Error here
    } else {
      setValues(() => {
        const skills = [...values.skills, values.skill];
        return {
          name: values.name,
          bio: values.bio,
          skills,
          skill: "",
        };
      });
    }
    console.log(values);
  };
  const handleDelete = (event) => {
    console.log(event.target);
    //I don't know what to do
  };
  const handleDropBoxChange = (file) => {
    values.pics = file;
  };
  const handleSubmit = () => {
    //what happens here?
  };
  var ID = function () {
    //To generate random id for key in chip component
    return "_" + Math.random().toString(36).substr(2, 9);
  };
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Edit Profile</DialogTitle>
      <DialogContent>
        <TextField
          required="true"
          margin="dense"
          id="name"
          label="Name"
          onChange={handleChange("name")}
          type="text"
          fullWidth
        />
        <TextField
          id="bio"
          label="Bio"
          onChange={handleChange("bio")}
          fullWidth
          multiline
        />
        <Box display="flex" alignItems="center">
          <TextField
            margin="dense"
            id="skills"
            label="Skills"
            type="text"
            onChange={handleChange("skill")}
            fullWidth
            style={{ marginBottom: "15px" }}
          />
          <IconButton
            aria-label="add"
            style={{ height: "min-content" }}
            size="medium"
            onClick={addSkill}
          >
            <AddIcon fontSize="inherit" />
          </IconButton>
        </Box>

        <Box id="skills">
          {values.skills.map((ele) => {
            return (
              <Chip
                color="primary"
                onDelete={handleDelete}
                style={{ margin: "7px" }}
                label={ele}
                key={ID}
              />
            );
          })}
        </Box>
        <DropzoneArea
          acceptedFiles={["image/*"]}
          id="userPic"
          onChange={(file) => handleDropBoxChange(file)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={() => handleSubmit()} color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
