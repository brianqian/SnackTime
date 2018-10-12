import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import KeyboardVoiceICon from '@material-ui/icons/KeyboardVoice';
import Icon from '@material-ui/core/Icon';
import Modal from '@material-ui/core/Modal';
import SaveIcon from '@material-ui/icons/Save';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';



const styles = {
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    modal: {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate (-50%, -50%)"
    }
};

class DeleteStaff extends Component {
    state = {
        staffs: [],
    }

    componentWillMount() {
        console.log("did mouint");
        this.getAllStaff();
    }

    getAllStaff = () => {
        console.log("funciton run");
        fetch("/api/getallstaff").then(res => res.json())
            .then(staffs => {
                console.log("Get all staffs", staffs);
                this.setState({ staffs: staffs })
            })
    }

    handleClick = (id, name, email) => {
        // console.log("Sasha says this has been clicked");
        this.setState({ id: id, name: name, email: email, clickedDelete: true }, function () {
            console.log(this.state);
        });
    };

    delete = () => {
        fetch("/api/removestaff", {
            method: "DELETE",
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                staffId: this.state.id
            }),
        }).then(res => res.json())
            .then(result => {
                console.log(result);
                this.setState({
                    clickedDelete: false,
                })
                this.getAllStaff();
            })
    }

    noDelete = () => {
        this.setState({
            clickedDelete: false
        })
    }

    render() {
        const { classes, fullScreen } = this.props;
        const bull = <span className={classes.bullet}>•</span>;
        return (
            <div>
                {this.state.staffs.map(staff => {
                    return (<Card className={classes.card}>
                        <CardContent>
                            <p>{staff.name}</p>
                            <p>{staff.email}</p>
                            <Button onClick={() => this.handleClick(staff.id, staff.name, staff.email)} value={staff.id} variant="contained" color="secondary" className={classes.button}>
                                Delete
                            <DeleteIcon className={classes.rightIcon} />
                            </Button>
                        </CardContent>
                    </Card>)
                })}
                {this.state.clickedDelete &&
                    <div>
                        <Dialog
                            fullScreen={fullScreen}
                            open={this.state.clickedDelete}
                            onClose={this.noDelete}
                            aria-labelledby="responsive-dialog-title"
                        >
                            <DialogTitle id="responsive-dialog-title">{"Delete this staff?"}</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    <p>{this.state.name}</p>
                                    <p>{this.state.email}</p>
                            </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.delete} color="primary">
                                    Yes
                            </Button>
                                <Button onClick={this.noDelete} color="primary" autoFocus>
                                    Cancel
                            </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                }
            </div>
        )
    }
}

DeleteStaff.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(DeleteStaff);