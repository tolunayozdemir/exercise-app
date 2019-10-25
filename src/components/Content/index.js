import React, { Fragment, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import ListSubheader from "@material-ui/core/ListSubheader";
import Card from "@material-ui/core/Card";
import IconButton from "@material-ui/core/IconButton";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import CardContent from "@material-ui/core/CardContent";

import StarBorder from "@material-ui/icons/StarBorder";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import EditForm from "../Dialogs/EditForm";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%"
    },
    nested: {
        paddingLeft: theme.spacing(4)
    },
    card: {
        minWidth: 275
    },
    title: {
        fontSize: 14
    },
    pos: {
        marginBottom: 12
    }
}));

const Content = ({
    muscles,
    exercises,
    filterCategoriesByMuscle,
    onDeleteExercise,
    onEditExercise
}) => {
    const classes = useStyles();
    const [currentExerciseId, setCurrentExerciseId] = useState("");
    const [editMode, setEditMode] = useState(false);

    return (
        <Grid container spacing={2}>
            {/* left panel */}
            <Grid item xs={6}>
                <Paper>
                    {editMode ? (
                        <EditForm setOpen={setEditMode} open={editMode} exerciseId = {currentExerciseId} submitEdit= {onEditExercise} />
                    ) : null}
                    <List
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        subheader={
                            <ListSubheader
                                component="div"
                                id="nested-list-subheader"
                            >
                                Exercise List
                            </ListSubheader>
                        }
                        className={classes.root}
                    >
                        {muscles.map(muscle => {
                            const exercisesForMuscle = filterCategoriesByMuscle(
                                muscle
                            );
                            return (
                                <Fragment>
                                    <ListItem>
                                        <ListItemIcon>
                                            <InboxIcon />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={
                                                muscle.charAt(0).toUpperCase() +
                                                muscle.slice(1)
                                            }
                                        />
                                    </ListItem>

                                    <List component="div" disablePadding>
                                        {exercisesForMuscle.map(exercise => (
                                            <ListItem
                                                button
                                                className={classes.nested}
                                                onClick={() => {
                                                    setCurrentExerciseId(
                                                        exercise.id
                                                    );
                                                }}
                                            >
                                                <ListItemIcon>
                                                    <StarBorder />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={exercise.title}
                                                />
                                                <ListItemSecondaryAction>
                                                    <IconButton
                                                        edge="end"
                                                        aria-label="comments"
                                                        onClick={() => {
                                                            setEditMode(true);
                                                            setCurrentExerciseId(
                                                                exercise.id
                                                            );
                                                        }}
                                                    >
                                                        <EditIcon />
                                                    </IconButton>
                                                    <IconButton
                                                        onClick={() =>
                                                            onDeleteExercise(
                                                                exercise.id
                                                            )
                                                        }
                                                        edge="end"
                                                        aria-label="comments"
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                        ))}
                                    </List>
                                </Fragment>
                            );
                        })}
                    </List>
                </Paper>
            </Grid>
            {/* right panel */}

            <Grid item xs={6}>
                <Paper>
                    {currentExerciseId ? (
                        exercises
                            .filter(ex => ex.id === currentExerciseId)
                            .map(exercise => (
                                <Card className={classes.card}>
                                    <CardContent>
                                        <Typography
                                            className={classes.title}
                                            color="textSecondary"
                                            gutterBottom
                                        >
                                            {exercise.categories
                                                .charAt(0)
                                                .toUpperCase() +
                                                exercise.categories.slice(1)}
                                        </Typography>
                                        <Typography variant="h5" component="h2">
                                            {exercise.title}
                                        </Typography>
                                        <Typography
                                            className={classes.pos}
                                            color="textSecondary"
                                        >
                                            <br />
                                            Description:
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            component="p"
                                        >
                                            {exercise.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            ))
                    ) : (
                        <Typography variant="h6">
                            Please select an exercise from left panel.
                        </Typography>
                    )}
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Content;
