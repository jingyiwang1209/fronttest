import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { withStyles } from "material-ui/styles";
import { Link } from "react-router-dom";
import classNames from "classnames";
import Avatar from "material-ui/Avatar";
import LocationOn from "material-ui-icons/LocationOn";
import LocalOffer from "material-ui-icons/LocalOffer";
import Star from "material-ui-icons/Star";
import deepOrange from "material-ui/colors/deepOrange";
import sichuan from "../Assets/Images/sichuan.jpg";
import pic from "../Assets/Images/profile.jpg";
import Button from "material-ui/Button";
import IconButton from "material-ui/IconButton";
import Slide from "material-ui/transitions/Slide";
import AppBar from "material-ui/AppBar";
import Dialog from "material-ui/Dialog";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import KeyboardArrowLeft from "material-ui-icons/KeyboardArrowLeft";
import PersonProfileDetails from "../Components/container/PersonProfileDetails";

import * as actions from "../Actions";

const styles = theme => ({
    wrapper: {
        width: '95vw',
        maxWidth:600,
        margin: "auto",
        marginBottom: 50,
        marginTop: 60
    },

    imageWrapper: {
        position: "relative"
    },

    image: {
        width: "100%",
        maxWidth: "100%",
        height: 224,
        marginBottom: 40
    },
    avatar: {
        margin: 10
    },

    bigAvatar: {
        width: 60,
        height: 60,
        position: "absolute",
        left: "50%",
        top: 180,
        marginLeft: "-30px"
    },

    innerWrapper: {
        textAlign: "center"
    },

    serviceWrapper: {
        display: "flex",
        flexDirection: "row nowrap",
        justifyContent: "space-around",
        marginBottom: 20
    },
    space: {
        marginBottom: 10
    },
    icon: {
        width: 15,
        height: 15,
        verticalAlign: "-2px"
    },
    button: {
        margin: theme.spacing.unit,
        marginBottom: 20
    },
    root: {
        margin: theme.spacing.unit,
        width: "95%",
        padding: 15
    },
    flex: {
        flex: 1
    },

    link: {
        cursor: "pointer",
        color: "#337ab7"
    }
});

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class PersonProfile extends Component {
    state = {
        open: false
    };

    handleClickOpen = name => {
        this.setState({ open: true });
    };

    handleRequestClose = () => {
        this.setState({ open: false });
    };

    componentWillMount(){
        const userId = this.props.match.params.userId
        this.props.fetchUser(userId)
    }


    renderService(services) {
        const icon = this.props.classes.icon;

        return services.map(service => {
            return (
                <span style={{ marginRight: 6 }}>
                    <LocalOffer className={icon} />
                    &nbsp;{service}
                </span>
            );
        });
    }

    renderStar(nums) {
        const icon = this.props.classes.icon;
        var starWrapper = [];
        for (let i = 0; i < nums; i++) {
            starWrapper.push(<Star className={icon} />);
        }
        return starWrapper;
    }

    render() {
        const classes = this.props.classes;
        const { user } = this.props;
        if(!user){
            return <div>loading</div>
        }

        return (
            <div>
                <Dialog
                    fullScreen
                    open={this.state.open}
                    onRequestClose={this.handleRequestClose}
                    transition={Transition}
                >
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton
                                color="contrast"
                                onClick={this.handleRequestClose}
                                aria-label="Close"
                            >
                                <KeyboardArrowLeft />
                            </IconButton>
                            <Typography
                                type="title"
                                color="inherit"
                                className={classes.flex}
                            >
                                {user.username}的资料
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <PersonProfileDetails profile={user} />
                </Dialog>

                <div className={classes.wrapper}>
                    <div className={classes.imageWrapper}>
                        <img className={classes.image} src={sichuan} />
                        <Avatar
                            alt="profile pic"
                            src={pic}
                            className={classNames(
                                classes.avatar,
                                classes.bigAvatar
                            )}
                        />
                    </div>
                    <div className={classes.innerWrapper}>
                        <h4
                            className={classes.space}
                            style={{ fontWeight: "bold" }}
                        >
                            {user.username}
                        </h4>
                        <div className={classes.space}>
                            <LocationOn className={classes.icon} />
                             {user.city}
                        </div>
                        <div className={classes.space}>


                        </div>
                        <div className={classes.serviceWrapper}>

                        </div>
                        <Button
                            color="primary"
                            raised
                            className={classes.button}
                            onClick={this.handleClickOpen}
                        >
                            更多我的资料哦
                        </Button>
                        <Link to={`/story/${user.id}`}>
                            <h2
                                className={classes.link}
                            >
                                我在这座城市的故事
                            </h2>
                        </Link>
                        <Button color="primary" raised className={classes.root}>
                            一起参与吧
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.UserReducer
    };
};

export default connect(mapStateToProps, actions)(
    withRouter(withStyles(styles)(PersonProfile))
);