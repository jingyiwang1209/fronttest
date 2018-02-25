import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../Actions";
import { withStyles } from "material-ui/styles";
import PropTypes from "prop-types";
import IconButton from "material-ui/IconButton";
import LocationOn from "material-ui-icons/LocationOn";
import MonetizationOn from "material-ui-icons/MonetizationOn";
import AccessTime from "material-ui-icons/AccessTime";
import LocalOffer from "material-ui-icons/LocalOffer";
import Wish from "./Wish";

import Card, {
  CardHeader,
  CardMedia,
  CardContent,
  CardActions
} from "material-ui/Card";
import Avatar from "material-ui/Avatar";

import List, { ListItem, ListItemIcon, ListItemText } from "material-ui/List";
import Slide from "material-ui/transitions/Slide";
import AppBar from "material-ui/AppBar";
import Dialog from "material-ui/Dialog";
import Button from "material-ui/Button";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import KeyboardArrowLeft from "material-ui-icons/KeyboardArrowLeft";
import { Link } from "react-router-dom";




function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const styles = theme => ({
  icon: {
    width: 15,
    height: 15,
    verticalAlign: "-2px"
  },

  content: {
    display:"flex",
    flexFlow:"column",
    justifyContent:"center",
  },

  firstline: {
    display: "flex",
    flexFlow:"row nowrap",
    justifyContent: "space-between",
    alignItems:"center",
    paddingBottom:10
  },

  right: {
    fontSize: "1.5rem",
    fontWeight: "bold"
  }
});

class WishIndex extends Component {
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

  renderItems() {
    const { classes, theme } = this.props;
    const { wishes } = this.props;
    if (!wishes) {
      return <div>loading...</div>;
    }

    return wishes.map(wish => {
      return (
        <Link to={`/wish/${wish.id}`} key={wish.id} className="unlink">
          <Card className="card" key={wish.id}>
              <CardContent className={classes.content}>
                <div className={classes.firstline}>
                  <div style={{ fontWeight: "bold", fontSize:"1.2rem" }}>{wish.location}</div>
                  <div className={classes.right}>{wish.budget} 元/人</div>
                </div>
                <div style={{paddingBottom:10}}>
                  <AccessTime className={classes.icon} /> {wish.departdate} 出发
                </div>
                <div>{this.renderService(wish.services)}</div>
              </CardContent>

          </Card>
        </Link>
      );
    });
  }

  render() {
    return <List>{this.renderItems()}</List>;
  }
}

export default connect(null, actions)(
  withStyles(styles, { withTheme: true })(WishIndex)
);