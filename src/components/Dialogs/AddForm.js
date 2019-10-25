import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddIcon from "@material-ui/icons/Add";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { categories } from "../../store";

const useStyles = makeStyles(theme => ({
    fab: {
        margin: theme.spacing(1)
    },
    extendedIcon: {
        marginRight: theme.spacing(1)
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 300
    }
}));

export default function AddForm(props) {
    const [open, setOpen] = React.useState(false);
    const [formValues, setFormValues] = React.useState({
        title: "",
        categories: "",
        description: ""
    });

    const { handleAddExercise } = props;

    const classes = useStyles();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = name => event => {
        setFormValues({ ...formValues, [name]: event.target.value });
    };

    const handleSubmitForm = () => {
        handleClose();
        handleAddExercise(formValues);
        
    }

    return (
        <div>
            <Fab
                onClick={handleClickOpen}
                aria-label="add"
                className={classes.fab}
                size="small"
            >
                <AddIcon />
            </Fab>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create Exercise</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To create exercise please fill the form.
                    </DialogContentText>
                    <TextField
                        id="standard-name"
                        label="Title"
                        className={classes.formControl}
                        value={formValues.title}
                        onChange={handleChange("title")}
                        margin="normal"
                    />
                    <br />
                    <FormControl className={classes.formControl}>
                        <InputLabel>Muscle</InputLabel>
                        <Select value = {formValues.categories}  onChange={handleChange("categories")}>
                            {categories.map(category => (
                                <MenuItem value = {category}>
                                    {category}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <br />
                    <TextField
                        id="standard-name"
                        label="Description"
                        className={classes.formControl}
                        value={formValues.description}
                        onChange={handleChange("description")}
                        margin="normal"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSubmitForm} color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
