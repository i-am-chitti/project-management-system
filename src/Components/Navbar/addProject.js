import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddIcon from "@material-ui/icons/Add";
import { DropzoneArea } from "material-ui-dropzone";
import IconButton from "@material-ui/core/IconButton";


export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [values, setValues] = React.useState({
    title: "",
    sourceLink: "",
    liveLink: "",
    description: "",
    pics: [],
  });

  if(!props.isLoggedIn()) {
    return <></>;
  }

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    console.log(values);
    console.log(prop);
  };

  const handleDropBoxChange = (file) => {
    values.pics = file;
  };

  const handleSubmit = () => {
    //check all input text boxes to be filled with their respective values, email box with an email
    if (!values.pics.length) alert("Add at least one pic");
    else {
      props.addProject(props.currentUser.uid, values);
      //upload completed
      //must be added some confirmation here
    }
  };

  return (
    <div>
      <IconButton aria-label="search" color="inherit" onClick={handleClickOpen}>
        <AddIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Project</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="name"
            label="Title"
            onChange={handleChange("title")}
            type="text"
            fullWidth
          />
          <TextField
            margin="dense"
            id="source_link"
            label="Source Code Link"
            onChange={handleChange("sourceLink")}
            type="text"
            fullWidth
          />
          <TextField
            margin="dense"
            id="live_link"
            label="Live Project Link"
            type="text"
            onChange={handleChange("liveLink")}
            fullWidth
          />
          <TextField
            id="description"
            label="Description"
            onChange={handleChange("description")}
            fullWidth
            multiline
            style={{ marginBottom: "15px" }}
          />
          <DropzoneArea
            acceptedFiles={["image/*"]}
            id="projectScreenshots"
            onChange={(file) => handleDropBoxChange(file)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleSubmit()} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
