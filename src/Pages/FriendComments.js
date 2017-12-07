import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "material-ui/styles";
import classNames from "classnames";
import Button from "material-ui/Button";
import Star from "material-ui-icons/Star";
import Avatar from "material-ui/Avatar";
import pic from "../Assets/Images/profile.jpg";

const styles = theme => ({
    wrapper: {
        width: "90%",
        margin: "auto",
        marginTop: 20,
        marginBottom: 50
    },
    friendWrapper: {
        listStyle: "none",
        padding: 0
    },
    icon: {
        width: 15,
        height: 15,
        verticalAlign: "-2px"
    },
    avatar: {
        margin: 10
    },

    bigAvatar: {
        width: 40,
        height: 40,
        display: "inline-block"
    },

    subHeader: {
        display: "flex",
        flexFlow: "row nowrap",
        justifyContent: "space-between",
        alignItems: "center"
    },

    comment: {
        width: "95%",
        margin: "auto"
    },

    space: {
        marginBottom: 20
    },
    button: {
        margin: theme.spacing.unit
    }
});

class FriendComments extends Component {
    state = {
        showAll: false
    };

    renderStars(numOfStars) {
        const classes = this.props.classes;
        var starWrapper = [];
        for (let i = 0; i < numOfStars; i++) {
            starWrapper.push(<Star className={classes.icon} />);
        }

        return starWrapper;
    }

    renderFriends(friendData) {
        const classes = this.props.classes;
        const initalFriendData = [friendData[0]];
        let friends = this.state.showAll ? friendData : initalFriendData;
        return friends.map(friend => {
            return [
                <li className={classes.space}>
                    <div className={classes.subHeader}>
                        <div className={classes.subHeader}>
                            <Avatar
                                alt="friend pic"
                                src={pic}
                                className={classNames(
                                    classes.avatar,
                                    classes.bigAvatar
                                )}
                            />
                            {friend.name}
                        </div>
                        <div>{this.renderStars(friend.stars)}</div>
                    </div>
                    <div className={classNames(classes.space, classes.comment)}>
                        {friend.comment}
                    </div>
                    <div style={{ float: "right" }}>{friend.date}</div>
                    <div style={{ clear: "both" }} />
                </li>
            ];
        });
    }

    render() {
        const classes = this.props.classes;
        const friendData = this.props.storyData.friendComments;
        return (
            <div className={classes.wrapper}>
                <ul className={classes.friendWrapper}>
                    {this.renderFriends(friendData, classes)}
                </ul>
                <div style={{ textAlign: "center" }}>
                    <Button
                        raised
                        color="primary"
                        className={classes.button}
                        onClick={() =>
                            this.setState(prevState =>({
                                showAll: !prevState.showAll
                            }))}
                    >
                        {this.state.showAll ? "收回评论" : "查看全部评论"}
                    </Button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        storyData: state.StoryDataReducer
    };
};
export default connect(mapStateToProps)(withStyles(styles)(FriendComments));