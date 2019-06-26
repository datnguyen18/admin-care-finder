import React, { Component } from 'react';
import classNames from 'classnames'
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Paper } from '@material-ui/core/';
import {Dialog, IconButton} from '@material-ui/core/'
import Visibility from '@material-ui/icons/Visibility'
import Edit from '@material-ui/icons/Edit'
import Clear from '@material-ui/icons/Clear'
import Slide from '@material-ui/core/Slide';
import UserDetail from './UserDetail'
import EditUser from './EditUser'
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';

const ColorLinearProgress = withStyles({
  colorPrimary: {
    backgroundColor: '#b2dfdb',
  },
  barColorPrimary: {
    backgroundColor: '#00695c',
  },
})(LinearProgress);

const ColorCircularProgress = withStyles({
  root: {
    color: '#00695c',
  },
})(CircularProgress);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    flexGrow:1
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
  progress: {
    justifyContent: 'center',
    alignItems: 'center',
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
      openModalUserDetail: false,
      openModalEditUser: false,
      openModalDeleteUser: false,
      loading: false
    }
  }

  async componentDidMount() {
    const response = await fetch('http://localhost:3000/user')
    const data = await response.json();
    setTimeout(() => {
      this.setState({ listUser: data.users, loading: true })
    },1200)

  }

  openModalUserDetail = async (id) => {
    this.setState({ openModalUserDetail: true })
    const response = await fetch(`http://localhost:3000/user/${id}`)
    const data = await response.json()
    console.log(data)
    this.setState({ user:data.user })
  }

  openModalEditUser = async (id) => {
    
    const response = await fetch(`http://localhost:3000/user/${id}`)
    const data = await response.json()
    console.log(data)
    this.setState({ openModalEditUser: true })
    this.setState({ user:data.user })
  }

  openModalDeleteUser = async (id) => {
    this.setState({openModalDeleteUser: true})
  }

  handleCloseUserDetail = () => {
    this.setState({ openModalUserDetail: false })
  }

  handleCloseEditUser = () => {
    this.setState({ openModalEditUser: false })
  }
  handleCloseDeleteUser = () => {
    this.setState({openModalDeleteUser: false})
  }



  handleCloseButtonEditUser = async (state) => {
    this.setState({openModalEditUser: state})
    const response = await fetch('http://localhost:3000/user')
    const data = await response.json();

    this.setState({ listUser: data.users })
  }

  handleCloseButtonUserDetail = (state) => {
    this.setState({openModalUserDetail: state})
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        {this.state.loading===false? 
        <Grid container
          alignItems="center"
          justify="center"
          style={{ minHeight: '60vh' }}>
          <ColorCircularProgress className={classes.progress} />
        </Grid>
      :
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
                    <IconButton onClick={() => this.openModalUserDetail(user._id)} className={classes.icon}>
                      <Visibility  color="primary" />
                    </IconButton>
                    <IconButton onClick={() => this.openModalEditUser(user._id)} className={classes.icon}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => this.openModalDeleteUser(user._id)} className={classes.icon}>
                      <Clear color="secondary"/>
                    </IconButton>
                  </CustomTableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
      }
        
        <Dialog
          open={this.state.openModalUserDetail}
          onClose={this.handleCloseUserDetail}
          TransitionComponent={Transition}
        >
          <UserDetail closeButton={this.handleCloseButtonUserDetail} user={this.state.user}/>
        </Dialog>

        <Dialog
          open={this.state.openModalEditUser}
          onClose={this.handleCloseEditUser}
          TransitionComponent={Transition}
        >
          <EditUser closeButton={this.handleCloseButtonEditUser} user={this.state.user}/>
        </Dialog>

        <Dialog
          open={this.state.openModalDeleteUser}
          onClose={this.handleCloseDeleteUser}
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