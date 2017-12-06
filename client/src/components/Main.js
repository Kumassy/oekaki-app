require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
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
import ThreadPage from './ThreadPageComponent';


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

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        threads: []
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    axios.get(`${_host}/home`).then((json) => {
      this.setState({
        threads: json.data.threads
      });
    });
  }

  render() {
    const threads = this.state.threads;

    const list = threads.map(thread =>
      <li key={thread.post.id}>
        <Link to={`thread/${thread.id}`}>
          <Post image={`${_host}/${thread.post.image}`}
                timestamp={thread.post.timestamp}
                text={thread.post.answer}
                userName={thread.post.user.username}
                userAvatar={`${_host}/${thread.post.user.avatar}`} />
        </Link>
      </li>);

    return (
      <div>
        {list}
      </div>
    );
  }
}


// class ThreadPage extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//         thread: {}
//     };
//   }
//
//   componentDidMount() {
//     this.fetchData(this.props.match.params.id);
//   }
//   componentWillReceiveProps(nextProps) {
//     if (this.props.match.params.id !== nextProps.match.params.id) {
//       this.fetchData(nextProps.match.params.id);
//     }
//   }
//
//   fetchData(id) {
//     // return _posts[id];
//     axios.get(`${_host}/threads/${id}`).then((json) => {
//       this.setState({
//         thread: json.data
//       });
//     });
//   }
//
//   render() {
//     const thread = this.state.thread;
//     const posts = thread.posts || [];
//     const comments = thread.comments || [];
//
//     return (
//       <div className="thread">
//         <ul className="posts">
//           {posts.map(post =>
//             <li key={post.id}>
//               <Post image={`${_host}/${post.image}`}
//                     timestamp={post.timestamp}
//                     text={post.answer}
//                     userName={post.user.username}
//                     userAvatar={`${_host}/${post.user.avatar}`} />
//             </li>)}
//             <li key="new-post">
//               <NewPost></NewPost>
//             </li>
//         </ul>
//         <ul className="comments">
//           {comments.map(comment =>
//             <li key={comment.id}>
//               <Comment  userAvatar={`${_host}/${comment.user.avatar}`}
//                         userName={comment.user.username}
//                         comment={comment.comment}
//                         timestamp={comment.timestamp} />
//             </li>)}
//             <li key="new-comment">
//               <NewComment></NewComment>
//             </li>
//         </ul>
//       </div>
//     );
//   }
// }

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
      <Post image={`${_host}/${post.image}`}
            text={post.text} />
    );
  }
  // render() {
  //   // const post = this.fetchData(this.props.match.params.id);
  //   const post = this.state.post;
  //
  //   return (
  //     <div>
  //       <ul>
  //         <li>{post.id}</li>
  //         <li>{post.text}</li>
  //         <img src={`${_host}/${post.image}`} />
  //       </ul>
  //     </div>
  //   );
  // }
}

const PostsIndex = ({posts, comments, match}) => (
  <div>
    <ul className="post-index">
      {posts.map(post =>
        <li key={post.id}>
          <Link to={`${match.url}/${post.id}`}>
            <Post image={`${_host}/${post.image}`}
                  text={post.text} />
          </Link>
        </li>)}
    </ul>
    <ul className="comment-index">
      {comments.map(comment =>
        <li key={comment.id}>
          <Comment  userAvatar={`${_host}/${comment.user.avatar}`}
                    userName={comment.user.username}
                    comment={comment.comment}
                    timestamp="2017-01-01 12:22" />
        </li>)}
    </ul>
  </div>
)
class PostsPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        posts: [],
        comments: []
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
    axios.get(`${_host}/comments`).then((json) => {
      this.setState({
        comments: json.data.comments
      });
    });
  }

  render() {
    const match = this.props.match;
    return (
      <div>
        <h2>Posts</h2>

        <Switch>
          <Route exact path={`${match.url}`} render={() => <PostsIndex posts={this.state.posts} comments={this.state.comments} match={match} />}/>

          <Route path={`${match.url}/:id`} component={PostComponent}/>
        </Switch>
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
        <MuiThemeProvider>
          <div>
            <div>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/topics">Topics</Link></li>
                <li><Link to="/posts">Posts</Link></li>
              </ul>

              <hr/>


              <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/about" component={About}/>
                <Route path="/topics" component={Topics}/>
                <Route path="/posts" component={PostsPage}/>
                <Route path="/thread/:id" component={ThreadPage}/>
              </Switch>
            </div>
          </div>
        </MuiThemeProvider>
      </Router>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
