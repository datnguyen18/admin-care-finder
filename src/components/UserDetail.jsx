import React, { Component } from 'react';
import classNames from 'classnames'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Paper, Grid, AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Avatar from '@material-ui/core/Avatar';

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
});
class UserDetail extends Component {
  render() {
    const { classes, user } = this.props;
    console.log(user)
    return (
      <div >
        <AppBar style={{ backgroundColor: '#2196F3' }} position="ralative" className={classes.appBar}>
          <Toolbar >
            <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.flex}>
              User Information
            </Typography>
          </Toolbar>
        </AppBar>
        <Paper className={classes.paper}>
          <Grid container justify="center" alignItems="center">
            <Avatar alt={user.firstName} src={user.avatar} className={classes.bigAvatar} />
          </Grid>

          <Table>
            <TableBody>
              <TableRow className={classes.row}>
                <TableCell>
                  First Name
              </TableCell>
                <TableCell>
                  {user.firstName}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  Last Name
              </TableCell>
                <TableCell>
                  {user.lastName}
              </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  Role
              </TableCell>
                <TableCell>
                  {user.permission}
              </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  Phone Number
              </TableCell>
                <TableCell>
                  {user.phoneNumber}
              </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  Email
              </TableCell>
                <TableCell>
                  {user.email}
              </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(UserDetail);