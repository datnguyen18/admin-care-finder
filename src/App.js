import React, { Component } from 'react'
import Login from './components/Login'

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
        {!this.state.login?<Login loginState={this.setLoginState}/>:<div>aaaa</div>}
      </div>
    )
  }
}



export default App
