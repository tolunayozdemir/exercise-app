import React, { Component } from "react";
import { categories, exercises } from "./store";
import Layout from "./components/layout";
import Content from "./components/Content";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories,
            exercises
        };
    }
    

    getExerciseByCategory = category => {
        return this.state.exercises.filter(ex => ex.categories === category);
    };

    handleExerciseDelete = id => {
        const newExercises = this.state.exercises.filter(
            exercise => exercise.id !== id
        );
        console.log(this.state.exercises);
        this.setState({
            exercises: newExercises
        });
    };

    handleExerciseAdd = exercise => {
        const id = exercise.title.replace(/\s+/g, "-").toLowerCase();
        this.setState({
            exercises: [...this.state.exercises, { ...exercise, id: id }]
        });
    };

    handleExerciseEdit = (id, form) => {
        let exercise = this.state.exercises.filter(ex => ex.id !== id);
        this.setState({
            exercises: [
                ...exercise,
                {
                    id: id,
                    ...form
                }
            ]
        })
    }


    render() {
        return (
            <Layout onAddExercise={this.handleExerciseAdd}>
                <Content
                    muscles={this.state.categories}
                    exercises={this.state.exercises}
                    filterCategoriesByMuscle={this.getExerciseByCategory}
                    onDeleteExercise={this.handleExerciseDelete}
                    onEditExercise={this.handleExerciseEdit}
                />
            </Layout>
        );
    }
}

export default App;
