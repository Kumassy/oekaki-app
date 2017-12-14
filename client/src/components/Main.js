require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import { connect } from 'react-redux';
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

import {
  fetchLoggedInUser,
} from '../actions/index';

import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Tabs, Tab} from 'material-ui/Tabs';
import {List, ListItem} from 'material-ui/List';
import HomeIcon from 'material-ui/svg-icons/action/home';
import UsersListIcon from 'material-ui/svg-icons/social/people';
import SearchUsersIcon from 'material-ui/svg-icons/action/search';
import PostsListIcon from 'material-ui/svg-icons/image/collections';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import StarIcon from 'material-ui/svg-icons/action/help';
import FontIcon from 'material-ui/FontIcon';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

import { _host } from '../clientHttp';
import Header from './HeaderComponent';
import Post from './PostComponent';
import Comment from './CommentComponent';
import Login from './LoginComponent';
import UserIconButton from './UserIconButtonComponent';
import ThreadPage from './ThreadPageComponent';
import HomePage from './HomePageComponent';
import UsersPage from './UsersPageComponent';
import UserPage from './UserPageComponent';
import UsersSearchPage from './UsersSearchPageComponent';
import PostsPage from './PostsPageComponent';
import SettingsPage from './SettingsPageComponent';
import LoginPage from './LoginPageComponent';
import WelcomePage from './WelcomePageComponent';


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

class AppInitializer extends React.Component {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchLoggedInUser());
  }
  render () {
    return (<div/>)
  }
}
const AppInitializerContainer = connect()(AppInitializer);

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
              <AppInitializerContainer/>
              <AppBar
                title={<span>おえかきしりとり</span>}
                showMenuIconButton={false}
                iconElementRight={<UserIconButton/>}
              />
              <div className="container">
                <div className="left-panel">
                  <List>
                    <Link to="/home" className="link"><ListItem primaryText="ホーム" leftIcon={<HomeIcon />} /></Link>
                    <Link to="/users" className="link"><ListItem primaryText="ユーザー一覧" leftIcon={<UsersListIcon />} /></Link>
                    <Link to="/users/search" className="link"><ListItem primaryText="ユーザー検索" leftIcon={<SearchUsersIcon />} /></Link>
                    <Link to="/posts" className="link"><ListItem primaryText="画像一覧" leftIcon={<PostsListIcon />} /></Link>
                    <Link to="/settings" className="link"><ListItem primaryText="設定" leftIcon={<SettingsIcon />} /></Link>
                    <Link to="/welcome" className="link"><ListItem primaryText="あそびかた" leftIcon={<StarIcon />} /></Link>
                  </List>
                </div>
                <br/>

                <hr/>


                <div className="main">
                  <Switch>
                    <Route exact path="/" component={WelcomePage}/>
                    <Route path="/welcome" component={WelcomePage}/>
                    <Route path="/home" component={HomePage}/>
                    <Route path="/about" component={About}/>
                    <Route exact path="/users/search" component={UsersSearchPage}/>
                    <Route path="/users/:id" component={UserPage}/>
                    <Route path="/users" component={UsersPage}/>
                    <Route path="/posts" component={PostsPage}/>
                    <Route path="/topics" component={Topics}/>
                    <Route path="/login" component={LoginPage}/>
                    <Route path="/settings" component={SettingsPage}/>
                    <Route path="/threads/:id" component={ThreadPage}/>
                  </Switch>
                </div>
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
