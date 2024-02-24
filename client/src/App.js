import './App.css';
import { BrowserRouter as Router,Routes, Route, Link} from 'react-router-dom';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import Login from './pages/Login';
import Registration from './pages/Registration';

function App() {
 

  return (
    <div className="App">
      <Router>
        <div className='navbar'>
        <Link to={'/'} >Go to Home Page</Link>
        <Link to={'/createPost'} >Create a Post</Link>
        <Link to={'/login'} >LOGIN</Link>
        <Link to={'/registration'} >Registration</Link>
        </div>
        <Routes>
          <Route exact path='/'  Component={Home} />
          <Route exact path='/createPost'  Component={CreatePost} />
          <Route exact path='/post/:id'  Component={Post} />
          <Route exact path='/login'  Component={Login} />
          <Route exact path='/registration'  Component={Registration} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
