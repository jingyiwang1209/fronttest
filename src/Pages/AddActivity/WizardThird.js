import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { withStyles } from "material-ui/styles";
import Button from "material-ui/Button";
import FileInput from "./FileInput";
import KeyboardArrowLeft from "material-ui-icons/KeyboardArrowLeft";
import validate from "../../Utility/validate";
import PageHeader from "../PageHeader";


const styles = theme => ({

    imageWrapper:{
        display: "flex",
        flexFlow:'row wrap',
    },

    image:{
        flex: 1
    },

    button: {
        margin: theme.spacing.unit,
        width: "95%",
    }
});

class WizardThird extends Component {
    render() {

        const { handleSubmit, pristine, previousPage, submitting } = this.props;
        const { classes } = this.props;
        return (
            <div className="wrapper">
                <PageHeader onClick={previousPage} title="上传照片" />

                <form onSubmit={handleSubmit}>
                    <div className={classes.imageWrapper}>
                        <Field
                            component={FileInput}
                            name="img1"
                            className={classes.image}
                        />

                    </div>
                    <Button
                        type="submit"
                        color="primary"
                        raised
                        className={classes.button}
                        id='btn'
                    >
                        提交
                    </Button>
                </form>
            </div>
        );
    }
}

export default reduxForm({
    form: "wizard",
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    validate
})(withStyles(styles)(WizardThird));