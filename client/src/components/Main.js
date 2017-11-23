require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import axios from 'axios';

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
const _host = 'http://localhost:3000';

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

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

class PostComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        post: {}
    };
  }

  componentDidMount() {
    this.fetchData(this.props.match.params.id);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.id !== nextProps.match.params.id) {
      this.fetchData(nextProps.match.params.id);
    }
  }

  fetchData(id) {
    // return _posts[id];
    axios.get(`${_host}/posts/${id}`).then((json) => {
      // return json.data.posts;
      console.log(this.state);
      this.setState({
        post: json.data
      });
      console.log(this.state);
    });
  }

  render() {
    // const post = this.fetchData(this.props.match.params.id);
    const post = this.state.post;

    return (
      <div>
        <ul>
          <li>{post.id}</li>
          <li>{post.text}</li>
          <img src={`${_host}/${post.image}`} />
        </ul>
      </div>
    );
  }
}

class PostsComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        posts: []
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    axios.get(`${_host}/posts`).then((json) => {
      // return json.data.posts;
      console.log(this.state);
      this.setState({
        posts: json.data.posts
      });
      console.log(this.state);
    });
  }

  render() {
    const match = this.props.match;
    return (
      <div>
        <h2>Posts</h2>
        <ul>
          {this.state.posts.map(post => <li key={post.id}><Link to={`${match.url}/${post.id}`}>{post.text}</Link></li>)}
        </ul>

        <Route path={`${match.url}/:id`} component={PostComponent}/>
      </div>
    )
  }
}

class AppComponent extends React.Component {
  render() {
    return (
      // <div className="index">
      //   <img src={yeomanImage} alt="Yeoman Generator" />
      //   <div className="notice">Please edit <code>src/components/Main.js</code> to get started!</div>
      // </div>
      <Router>
        <div>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/topics">Topics</Link></li>
            <li><Link to="/posts">Posts</Link></li>
          </ul>

          <hr/>

          <Route exact path="/" component={Home}/>
          <Route path="/about" component={About}/>
          <Route path="/topics" component={Topics}/>
          <Route path="/posts" component={PostsComponent}/>
        </div>
      </Router>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
