import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import AuthenticateUser from './AuthenticateUser'
import AllUsers from './AllUsers'
const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  tabs: {
    flex: 1,
    justifyContent: "center"
  }
});

class Department extends Component {
  state = {
    value: 'one',
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };
  
  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar style={{ backgroundColor: '#2196F3' }} position="static">
          <Tabs fullWidth className={classes.tabs} value={value} onChange={this.handleChange}>
            <Tab value="one" label="Unauthenticated Users" />
            <Tab value="three" label="All Users" />
          </Tabs>
        </AppBar>
        {value === 'one' && <AuthenticateUser/>}
        {value === 'three' && <AllUsers/>}
      </div>
    );
  }
}

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

Department.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Department);