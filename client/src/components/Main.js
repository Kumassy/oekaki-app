require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import { Provider } from 'react-redux';
import configureStore, { history } from '../stores/configureStore';
import { ConnectedRouter } from 'react-router-redux'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom';
import axios from 'axios';

import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';

import { _host } from '../clientHttp';
import Header from './HeaderComponent';
import Post from './PostComponent';
import Comment from './CommentComponent';
import Login from './LoginComponent';
import ThreadPage from './ThreadPageComponent';
import HomePage from './HomePageComponent';
import UsersPage from './UsersPageComponent';
import PostsPage from './PostsPageComponent';
import SettingsPage from './SettingsPageComponent';


const _posts = [
  {
    'id': 1,
    'text': 'textbody',
    'image': 'image.png'
  },
  {
    'id': 2,
    'text': 'aasdfbody',
    'image': 'image.jpg'
  },
  {
    'id': 3,
    'text': 'ssssfdsfsdf',
    'image': 'fsdfsdds.jpg'
  }
];

const About = () => (
  <div>
    <h2>About</h2>
  </div>
)

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic}/>
    <Route exact path={match.url} render={() => (
      <h3>Please select a topic.</h3>
    )}/>
  </div>
)

const store = configureStore();

class AppComponent extends React.Component {
  render() {
    return (
      // <div className="index">
      //   <img src={yeomanImage} alt="Yeoman Generator" />
      //   <div className="notice">Please edit <code>src/components/Main.js</code> to get started!</div>
      // </div>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <MuiThemeProvider>
            <div>
              <div>
                <ul>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/about">About</Link></li>
                  <li><Link to="/topics">Topics</Link></li>
                  <li><Link to="/users">Users</Link></li>
                  <li><Link to="/posts">Posts</Link></li>
                  <li><Link to="/threads/1">/thread/1</Link></li>
                  <li><Link to="/threads/2">/thread/2</Link></li>
                  <li><Link to="/settings">/settings</Link></li>
                </ul>
                <Login></Login>

                <hr/>


                <Switch>
                  <Route exact path="/" component={HomePage}/>
                  <Route path="/about" component={About}/>
                  <Route path="/users" component={UsersPage}/>
                  <Route path="/posts" component={PostsPage}/>
                  <Route path="/topics" component={Topics}/>
                  <Route path="/login" component={Topics}/>
                  <Route path="/settings" component={SettingsPage}/>
                  <Route path="/threads/:id" component={ThreadPage}/>
                </Switch>
              </div>
            </div>
          </MuiThemeProvider>
        </ConnectedRouter>
      </Provider>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
