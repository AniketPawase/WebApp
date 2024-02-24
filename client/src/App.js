import './App.css';
import { BrowserRouter as Router,Routes, Route, Link} from 'react-router-dom';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';

function App() {
 

  return (
    <div className="App">
      <Router>
        <div className='navbar'>
        <Link to={'/createPost'} >Create a Post</Link>
        <Link to={'/'} >Go to Home Page</Link><br></br>
        </div>
        <Routes>
          <Route exact path='/'  Component={Home} />
          <Route exact path='/createPost'  Component={CreatePost} />
          <Route exact path='/post/:id'  Component={Post} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
