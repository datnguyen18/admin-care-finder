import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import { Paper, Grid, AppBar, Toolbar, Typography, IconButton, FormControl, InputLabel, Select, Input, MenuItem, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios'

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

    width: theme.spacing.unit * 70,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    alignItems: 'center'
  },
  flex: {
    flex: 1,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
  bigAvatar: {
    margin: 10,
    width: 200,
    height: 200,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    width: theme.spacing.unit * 70,
  },
});

class EditUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      closeButton:true,
      role: ""
    }
  }

  handleClose = () => {
    this.setState({ closeButton: false }, () => {
      this.props.closeButton(this.state.closeButton)
    })
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  confirmButton = () => {
    if(this.props.user.permission === this.state.role) {
      this.setState({ closeButton: false }, () => {
        this.props.closeButton(this.state.closeButton)
      })
    }else {
      let body = {}
      body.permission = this.state.role;
      console.log(this.state.role)
      axios.patch('http://localhost:3000/user/permission/' + this.props.user._id,body,{
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(resp => {
          console.log(resp.data)
          this.setState({ closeButton: false }, () => {
            this.props.closeButton(this.state.closeButton)
          })
      }).catch(err => console.log(err))
    }
  }

  render() {
    const { classes, user } = this.props
    return (
      <div >
        <AppBar style={{ backgroundColor: '#2196F3' }} position="ralative" className={classes.appBar}>
          <Toolbar >
            <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.flex}>
              Change Role
            </Typography>
            <Button color="inherit" onClick={this.confirmButton}>
                Confirm
            </Button>
          </Toolbar>
        </AppBar>
        <Paper className={classes.paper}>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="age-native-simple">Role</InputLabel>
              <Select
                native
                value={this.state.role}
                onChange={this.handleChange('role')}
                input={<Input id="age-native-simple" />}
              >
                <option></option>
                <option value={"USER"}>USER</option>
                <option value={"DOCTOR"}>DOCTOR</option>
              </Select>
            </FormControl>
          </form>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(EditUser);