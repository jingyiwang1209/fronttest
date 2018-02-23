import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import validate from "../../Utility/validate";
import { TextField } from "redux-form-material-ui";
import Button from "material-ui/Button";

import { withStyles } from "material-ui/styles";
import { LinearProgress } from "material-ui/Progress";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../Actions";
import { withRouter } from "react-router";
import PasswordSetVisibility from "../presenter/PasswordSetVisibility";
import PageHeader from "../../Pages/PageHeader";

const styles = theme => ({
  progress: {
    width: "95%",
    margin: "auto",
    backgroundColor: "#1976D2"
  },

  button: {
    margin: theme.spacing.unit,
    width: "95%"
  },

  hint: {
    position: "absolute",
    right: 6,
    bottom: 10,
    fontSize: 10,
    color: "grey",
    zIndex: 1000
  },

  hintColor: {
    color: "grey"
  }
});

class LoginForm extends Component {
  state = {
    completed: 100
  };

  submitForm(values) {
    console.log("loginin", values);
    this.props.userLogin(values, this.props.history);
  }

  render() {
    const { classes } = this.props;
    const { handleSubmit } = this.props;

    return (
      <form
        className="wrapper"
        onSubmit={handleSubmit(this.submitForm.bind(this))}
      >
        <PageHeader history={this.props.history} title="登录账户" />
        <div className="flex-form-wrapper">
          <LinearProgress
            className={classes.progress}
            mode="determinate"
            color="secondary"
            value={this.state.completed}
          />
        </div>
        <div className="flex-form-wrapper">
          <span className={classes.hint}>
            <Link to="/" className={classes.hintColor}>
              忘记邮箱？
            </Link>
          </span>
          <Field
            name="email"
            component={TextField}
            className="text-field"
            label="输入邮箱地址"
          />
        </div>
        <div className="flex-form-wrapper" style={{ marginBottom: 20 }}>
          <Field
            name="password"
            type="password"
            component={PasswordSetVisibility}
            className="text-field"
            label="输入密码 - 六位数"
            props={this.props}
          />
          <span className={classes.hint}>
            <Link to="/" className={classes.hintColor}>
              忘记密码？
            </Link>
          </span>
        </div>

        <div className="flex-form-wrapper">
          <Button
            type="submit"
            color="primary"
            raised
            className={classes.button}
            id="btn"
          >
            点击登陆
          </Button>
        </div>
        <div className="input-error" style={{ textAlign: "center" }}>
          {this.props.errorMessage}
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    errorMessage: state.UserAuth.error
  };
};

LoginForm = reduxForm({
  form: "loginForm",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(withStyles(styles)(LoginForm));

export default (LoginForm = connect(mapStateToProps, actions)(
  withRouter(LoginForm)
));