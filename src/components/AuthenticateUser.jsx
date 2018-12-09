import React, { Component } from 'react';
import classNames from 'classnames'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Paper, Button, Modal, Typography } from '@material-ui/core/';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core/'

import CardMedia from '@material-ui/core/CardMedia';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';

import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
  appBar: {
    position: "relative",
  },
  flex: {
    flex: 1,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: "#757575",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

class AuthenticateUser extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      listUser: [],
      user:{},
      openModal: false
    }
  }

  async componentDidMount() {
    const response = await fetch('http://localhost:3000/doctor/unauthenticated')
    const data = await response.json();
    console.log(data.doctors)
    this.setState({ listUser: data.doctors })

  }

  openModal = async (id) => {
    this.setState({ openModal: true })
    const response = await fetch(`http://localhost:3000/user/${id}`)
    const data = await response.json()
    console.log(data)
    this.setState({ user:data.user })
  }

  handleClose = () => {
    this.setState({ openModal: false })
  }

  verifyUser = async () => {
    const response = await fetch(`http://localhost:3000/doctor/authorization/${this.state.user._id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    const responseUnauthenticatedDoctor =  await fetch('http://localhost:3000/doctor/unauthenticated')
    const data = await responseUnauthenticatedDoctor.json();
    this.setState({ listUser: data.doctors })
    this.setState({openModal: false})
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <CustomTableCell>First Name</CustomTableCell>
                <CustomTableCell>Last Name</CustomTableCell>
                <CustomTableCell>Gender</CustomTableCell>
                <CustomTableCell>Permission</CustomTableCell>
                <CustomTableCell></CustomTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.listUser.map((user, index) => {
                return (
                  <TableRow key={user._id} className={classes.row}>
                    <CustomTableCell component="th" scope="row">
                      {user.firstName}
                    </CustomTableCell>
                    <CustomTableCell >{user.lastName}</CustomTableCell>
                    <CustomTableCell >{user.gender}</CustomTableCell>
                    <CustomTableCell >{user.permission}</CustomTableCell>
                    <CustomTableCell>
                      <Button onClick={() => this.openModal(user._id)} className={classes.button}>Detail</Button>
                    </CustomTableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
        <Dialog
          
          open={this.state.openModal}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >

          <AppBar style={{ backgroundColor: '#2196F3' }} position="fixed" className={classes.appBar}>
            <Toolbar >
              <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.flex}>
                Information
              </Typography>
              <Button color="inherit" onClick={this.verifyUser}>
                Confirm
              </Button>
              <Button color="inherit" onClick={this.handleClose}>
                Decline
              </Button>
            </Toolbar>
          </AppBar>
          <List>
            <ListItem>
              <ListItemText primary="First Name" secondary={this.state.user.firstName} />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="Last Name" secondary={this.state.user.lastName} />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="Email" secondary={this.state.user.email} />
            </ListItem>
            <Divider />
            <ListItem style={{flexDirection: "column"}}>
              <ListItemText style={{alignSelf: "flex-start"}} primary="Image of identification"/>
              <img src={this.state.user.imageOfIdentificationBack}/>
              <img src={this.state.user.imageOfIdentificationFront}/>
            </ListItem>
            <ListItem  style={{flexDirection: "column"}}>
              <ListItemText style={{alignSelf: "flex-start"}} primary="Image of diploma"/>
              <img src={this.state.user.imageOfDiploma}/>
            </ListItem>
          </List>
        </Dialog>
      </div>
    );
  }
}


AuthenticateUser.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(AuthenticateUser);