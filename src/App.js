import './App.css';
import React, {Component} from 'react';
import { Redirect, Route, Switch } from 'react-router';
import Home from './components/Home';
import DownloadForm from './components/DownloadForm';
import UploadForm from './components/UploadForm';

class App extends Component{
  render(){
    let container = null
    container = (
      <React.Fragment>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/getit" exact={true} component={DownloadForm}/>
          <Route path="/sendit" exact={true} component={UploadForm}/>
          <Redirect to="/404"/>
        </Switch>
      </React.Fragment>
    )
    return container;
  }
}

export default App;
