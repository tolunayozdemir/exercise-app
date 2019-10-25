import React, { Fragment } from "react";

import Footer from "./Footer";
import Header from "./Header";

export default props => (
    <Fragment>
        <Header onAddExercise = {props.onAddExercise}/>
            {props.children}
        <Footer />
    </Fragment>
);
