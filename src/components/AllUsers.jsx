import React, { Component } from 'react';
import classNames from 'classnames'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Paper, Button, Modal, Typography, Icon } from '@material-ui/core/';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton} from '@material-ui/core/'
import Fab from '@material-ui/core/Fab'
import CardMedia from '@material-ui/core/CardMedia';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Visibility from '@material-ui/icons/Visibility'
import Edit from '@material-ui/icons/Edit'
import Clear from '@material-ui/icons/Clear'
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import UserDetail from './UserDetail'
// import EditUser from './EditUser'
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
  icon: {
    marginLeft: theme.spacing.unit * 1,
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
    const response = await fetch('http://localhost:3000/user')
    const data = await response.json();

    this.setState({ listUser: data.users })

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
                <CustomTableCell>No.</CustomTableCell>
                <CustomTableCell>First Name</CustomTableCell>
                <CustomTableCell>Last Name</CustomTableCell>
                <CustomTableCell>Gender</CustomTableCell>
                <CustomTableCell>ROLE</CustomTableCell>
                <CustomTableCell>Email</CustomTableCell>
                <CustomTableCell></CustomTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.listUser.map((user, index) => {
                return (
                  <TableRow key={user._id} className={classes.row}>
                    <CustomTableCell>{index+1}</CustomTableCell>
                    <CustomTableCell component="th" scope="row">
                      {user.firstName}
                    </CustomTableCell>
                    <CustomTableCell >{user.lastName}</CustomTableCell>
                    <CustomTableCell >{user.gender}</CustomTableCell>
                    <CustomTableCell >{user.permission}</CustomTableCell>
                    <CustomTableCell >{user.email}</CustomTableCell>
                    <CustomTableCell>
                      <IconButton onClick={() => this.openModal(user._id)} className={classes.icon}>
                        <Visibility  color="primary" />
                      </IconButton>
                      <IconButton className={classes.icon}>
                        <Edit />
                      </IconButton>
                      <IconButton className={classes.icon}>
                        <Clear color="secondary"/>
                      </IconButton>
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

          <UserDetail user={this.state.user}/>
        </Dialog>
      </div>
    );
  }
}


AuthenticateUser.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(AuthenticateUser);