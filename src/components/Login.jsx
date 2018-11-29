import React, { Component } from 'react';
import classNames from 'classnames'

import { withStyles } from '@material-ui/core/styles'
import { TextField, InputAdornment, IconButton, MuiThemeProvider, Button, Typography } from '@material-ui/core/'
import SupervisedUserCircle from '@material-ui/icons/SupervisedUserCircle'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import PasswordIcon from '@material-ui/icons/LockOutlined'

class Login extends Component {
  state= {
    username: '',
    password: '',
    showPassword: false
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value })
  }

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword })
  }

  handClickLogin = () => {
    this.props.loginState(true)
  }

  render() {
    const { classes } = this.props
    document.body.style = 'background: #0277bd'
    return (

        <div className={classes.container}>
          <form className={classes.form}>
            <img alt='logo' src={ require('../img/logo.png') } className={classes.img}/>
            <Typography variant="display1">
              CARE FINDER
            </Typography>
            <Typography variant="subtitle1">Web management</Typography>            
            <TextField
              id="outlined-simple-start-adornment"
              className={classNames(classes.margin, classes.textField)}
              variant="outlined"
              label="Username"
              onChange={this.handleChange('username')}
              InputProps={{
                startAdornment: <InputAdornment position="start">
                  <SupervisedUserCircle/>
                </InputAdornment>,
              }}
            />
            <TextField
              id="outlined-adornment-password"
              className={classNames(classes.margin, classes.textField)}
              variant="outlined"
              type={this.state.showPassword ? 'text' : 'password'}
              label="Password"
              value={this.state.password}
              onChange={this.handleChange('password')}
              InputProps={{
                startAdornment: <InputAdornment position="start">
                <PasswordIcon/>
              </InputAdornment>,
                endAdornment: (
                  <InputAdornment variant="filled" position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={this.handleClickShowPassword}
                    >
                      {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button 
              variant="contained" 
              color="primary" 
              className={classes.button}
              onClick={this.handClickLogin}
            >
              Login
            </Button>
          </form>
      </div>

    )
  }
}
const styles = theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    background: '#0277bd',
    height: '100vh'
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  textField: {
    width: 350
  },
  form: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: 450,
    background: '#eceff1', 
    borderRadius: 3,
    boxShadow: '0 10px 20px rgba(0, 0, 0, .19), 0 6px 6px rgba(0, 0, 0, .23)',
    paddingBottom: 20 
  },
  button:{
    width: 350,
    marginTop: 20,
    background:'#0277bd',
    marginBottom: 20
  },
  img: {
    width:138,
    height: 138,
    marginBottom: 15,
    marginTop: 30,
  },
  display1: {
    fontSize: 28,
    fontWeight: 100,
    lineHeight: 1.2,
    color: '#757575',
    textTransform: 'inherit',
    letterSpacing: 'inherit',
  }
})



export default withStyles(styles)(Login)