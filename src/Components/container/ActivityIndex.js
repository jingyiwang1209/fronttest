import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import _ from "lodash";
import { withStyles } from "material-ui/styles";

import * as actions from "../../Actions";
import IconButton from "material-ui/IconButton";
import LocationOn from "material-ui-icons/LocationOn";
import MonetizationOn from "material-ui-icons/MonetizationOn";

import LocalOffer from "material-ui-icons/LocalOffer";
import Star from "material-ui-icons/Star";
import StarBorder from "material-ui-icons/StarBorder";
import StarHalf from "material-ui-icons/StarHalf";

import Person from "material-ui-icons/Person";

import travel from "../../Assets/Images/sichuan.jpg";

import Card, {
  CardHeader,
  CardMedia,
  CardContent,
  CardActions
} from "material-ui/Card";
import Avatar from "material-ui/Avatar";

import FavoriteIcon from "material-ui-icons/Favorite";
import ShareIcon from "material-ui-icons/Share";
import List, { ListItem, ListItemIcon, ListItemText } from "material-ui/List";

import Slide from "material-ui/transitions/Slide";
import AppBar from "material-ui/AppBar";

import Button from "material-ui/Button";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import KeyboardArrowLeft from "material-ui-icons/KeyboardArrowLeft";

import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  withMobileDialog
} from "material-ui/Dialog";

import PersonProfile from "../../Pages/PersonProfile";
import { Link } from "react-router-dom";
import RatingSummary from "../../Pages/RatingSummary";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const styles = {

  flex: {
    flex: 1
  },
  media: {
    height: 224,
    position: "relative"
  },

  icon: {
    width: 15,
    height: 15,
    verticalAlign: "-2px"
  },
  right:{
    marginRight:30
  },
  bottom:{
    marginBottom:10
  },
  heartOn:{
    color:"#F44336"
  },
  numberOfLikes:{
    fontSize:"1.2rem"
  }
};

class ActivityIndex extends Component {
  state = {
    open: false,
  };


  handleClose = () => {
    this.setState({ open: false });
  };

  renderService(services) {
    const icon = this.props.classes.icon;
    return services.map(service => {
      return (
        <span style={{ marginRight: 6 }} key={service}>
          <LocalOffer className={icon} />
          &nbsp;{service}
        </span>
      );
    });
  }

  renderStar(num) {
    const icon = this.props.classes.icon;
    const starWrapper = [];

    for (let i = 0; i < 5; i++) {
      if (num - i > 0 && num - i < 1) {
        starWrapper[i] = <StarHalf key={i} className={icon} />;
      } else if (i < num) {
        starWrapper[i] = <Star key={i} className={icon} />;
      } else {
        starWrapper[i] = <StarBorder key={i} className={icon} />;
      }
    }

    return starWrapper;
  }

  handleLikes(event, itemId) {
    event.preventDefault();
    event.stopPropagation();
     // cannot "like" until you login/signup
    if (!localStorage.getItem("jwtToken")) {
      this.setState({
        open: true
      });
    }else{
       this.props.submitLikes(itemId);
    }

  }

  renderItems() {
    const classes = this.props.classes;
    const { activityData } = this.props;

    return _.map(activityData, item => {
      return (
        <Link to={`/activity/${item.id}`} className="unlink" key={item.id}>
          <Card className="card">
            <CardMedia className={classes.media} image={travel} title="travel">
              <span
                style={{
                  position: "absolute",
                  right: 10,
                  top: 10,
                  color: "#fff"
                }}
              >
                <LocationOn
                  className={classes.icon}
                  style={{ color: "#fff" }}
                />{" "}
                {item.location}
              </span>
              <span
                style={{
                  position: "absolute",
                  bottom: 0,
                  width: "100%",
                  height: "12%",
                  padding: 4,
                  color: "#fff",
                  backgroundColor: "rgba(0,0,0,0.6)"
                }}
              >
                {item.theme}
              </span>
            </CardMedia>
            <CardContent>
              <div
                style={{
                  marginBottom: 10
                }}
              >
                <div style={{ float: "left" }}>
                  <MonetizationOn className={classes.icon} /> &nbsp;{item.budget}
                </div>
                <div style={{ float: "right" }}>
                  {this.renderStar(item.averageScore)}星 &nbsp;{item.numOfRater}{" "}
                  人评价
                </div>
                <div style={{ clear: "both" }} />
              </div>

              <div style={{ marginBottom: 10 }} className={classes.link}>
                <Person className={classes.icon} />
                &nbsp;{item.username}
              </div>

              <div>{this.renderService(item.services)}</div>
            </CardContent>

            <CardActions disableActionSpacing>
              <IconButton
                aria-label="Add to favorites"
                onClick={event => {
                  this.handleLikes(event, item.id);
                }}
              >
                <FavoriteIcon className={item.likes === 0 ? "" : classes.heartOn}/>
                 <span className={classes.numberOfLikes}>&nbsp;{item.likes}</span>
              </IconButton>
              <IconButton aria-label="Share">
                <ShareIcon />
              </IconButton>
            </CardActions>
          </Card>
        </Link>
      );
    });
  }

  render() {
    const { fullScreen, classes } = this.props;

    return (
      <List>
        <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{"请登录"}</DialogTitle>
          <DialogContent>
            <div className={classes.bottom}>
            <Link to="/login" className={classes.right}>
              <Button color="primary" raised>
                登陆已有账户
              </Button>
            </Link>
            <Link to="/signup">
              <Button color="primary" raised>
                创建新账户
              </Button>
            </Link>
            </div>
            <DialogContentText>
              注册代表已经同意<Link to="/">服务条款</Link>，<Link to="/">隐私政策</Link>，<Link to="/">免责声明</Link>，<Link to="/">保障计划条款</Link>，<Link to="/">使用政策须知</Link>。
              </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              稍后再说
            </Button>
          </DialogActions>
        </Dialog>
        {this.renderItems()}
      </List>
    );
  }
}

export default connect(null, actions)(withStyles(styles)(ActivityIndex));