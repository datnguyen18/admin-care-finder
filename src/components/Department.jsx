import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios'
const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: "#757575",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
  fab: {
    margin: theme.spacing.unit,
  },
  absolute: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3,
  },
});

class Department extends Component {
  constructor(props) {
    super(props)
    this.state = {
      departments: [],
      open: false,
      name: ''
    }
  }
  async componentDidMount() {
    const response = await fetch('http://localhost:3000/department/')
    const data = await response.json();
    console.log(data.doc)
    this.setState({ departments: data.doc })
  }

  addDepartment = async () => {
    let body = {}
    body.name = this.state.name
    axios.post('http://localhost:3000/department/',body,{
      headers: {
        'Content-Type': 'application/json',
      }
    }).then((doc) => {
      fetch('http://localhost:3000/department/')
        .then(resp => resp.json())
        .then(data => this.setState({ departments: data.doc }))
      
    })
    .catch(err => console.log(err))
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value })
  }

  handleOpen = () => {
    this.setState({open: true})
  }
  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props

    return (
      <Paper className={classes.root}>
        <Tooltip title="Add" aria-label="Add">
          <Fab onClick={this.handleOpen} color="primary" className={classes.absolute}>
            <AddIcon />
          </Fab>
        </Tooltip>
        <Table>
          <TableHead>
            <TableRow>
              <CustomTableCell>No.</CustomTableCell>
              <CustomTableCell>Name</CustomTableCell>
              <CustomTableCell>Numbers of locations</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.departments.map((department, index) => {
              return (
                <TableRow className={classes.row} key={department._id}>
                  <CustomTableCell>{index+1}</CustomTableCell>
                  <CustomTableCell>{department.name}</CustomTableCell>
                  <CustomTableCell>{department.locations.length}</CustomTableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">ADD NEW DEPARTMENT</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="email"
              style={{width: 500}}
              onChange={this.handleChange('name')}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.addDepartment} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    );
  }
}



Department.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Department);