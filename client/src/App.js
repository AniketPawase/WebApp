import './App.css';
import { BrowserRouter as Router,Routes, Route, Link} from 'react-router-dom';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import Login from './pages/Login';
import Registration from './pages/Registration';
import { AuthContext } from './helpers/authContext'
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  const [authState,setAuthState] = useState(false);
 
  useEffect(()=>{
    // if(localStorage.getItem('accessToken')){
    //   setAuthState(true);
    // }
    axios.get("http://localhost:3001/auth/auth",
    {headers:{
      accessToken : localStorage.getItem("accessToken"),
    } })
    .then((response)=>{
      if(response.data.error){setAuthState(false)}
      else{setAuthState(true);}
    })
  },[])

  return (
    <div className="App">

      <AuthContext.Provider value={{authState,setAuthState}}>
      <Router>
        <div className='navbar'>
        <Link to={'/'} >Go to Home Page</Link>
        <Link to={'/createPost'} >Create a Post</Link>
        {
          !authState && (
            <>
             <Link to={'/login'} >LOGIN</Link>
             <Link to={'/registration'} >Registration</Link>
            </>
          )}

        </div>
        <Routes>
          <Route exact path='/'  Component={Home} />
          <Route exact path='/createPost'  Component={CreatePost} />
          <Route exact path='/post/:id'  Component={Post} />
          <Route exact path='/login'  Component={Login} />
          <Route exact path='/registration'  Component={Registration} />
        </Routes>
      </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
