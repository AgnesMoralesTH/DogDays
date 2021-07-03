import React, {Fragment, Component} from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Users from './components/users/Users'
import Search from './components/users/Search'
import Alert from './components/layout/Alert'
import About from './components/pages/About'
import axios from 'axios'
import './App.css';

class App extends Component{
  state = {
    users: [],
    loading: false,
    alert: null,
  }
  searchUsers = async text =>{
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${
      process.env.REACT_APP_GITHUB_CLIENT_ID
    }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    console.log(res.data)
    this.setState({ users: res.data.items, loading: false});
  }

  clearUsers = () => this.setState({users: [], loading: false })
  
  setAlert = (msg, type)  => {
    this.setState({alert:{msg,type}})
    
    setTimeout(() => this.setState({alert: null}), 5000)
  }

  render(){
    const {users, loading, alert } = this.state;
    return (
      <Router>
      <div className="App">
        <Navbar />
        <div className="container">
        <Alert alert={alert} />
        <Switch>
        <Route exact path='/about' component={About} />
          <Route exact path='/' render={props => (
            <Fragment>
              <Search setAlert={this.setAlert} 
              searchUsers={this.searchUsers} 
              clearUsers={this.clearUsers} 
              showClear={this.state.users.length > 0 ? true : false} />
              <Users loading={loading} users={users} />
            </Fragment>
            
            )}  />
            
        </Switch>
          
        </div>
      </div>
      </Router>
    );

  }
}

export default App;
