import React, { Component } from 'react'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
class App extends Component {
  state ={
    login: false
  }

  setLoginState = (login) => {
    this.setState({login})
  }
  render() {
    return(
      <div>
        {!this.state.login?<Login loginState={this.setLoginState}/>:<Dashboard/>}
      </div>
    )
  }
}



export default App
