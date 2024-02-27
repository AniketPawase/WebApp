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
import PageNotFound from './pages/PageNotFound';
import Profile from './pages/Profile';
import ChangePassword from './pages/ChangePassword';

function App() {

  const [authState,setAuthState] = useState({username:"",
                                            id: 0,
                                            status: false});
 
  useEffect(()=>{
    axios.get("http://localhost:3001/auth/auth",
    {headers:{
      accessToken : localStorage.getItem("accessToken"),
    } })
    .then((response)=>{
      if(response.data.error){setAuthState({...authState,status: false})}
      
      else{setAuthState({
          username: response.data.username,
          id: response.data.id,
          status:true
      })};
    })
  },[authState])

  //Logout
  const logout=()=>{
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false })
  }

return (
  <div className="App">
    <AuthContext.Provider value={{authState,setAuthState}}>
    <Router>
      <div className='navbar'>
        <div className='links'>
      {
        !authState.status ?  (
          <>
            <Link to={'/login'} >LOGIN</Link>
            <Link to={'/registration'} >Registration</Link>
          </>
        ) :
        <>
        <Link to={'/'}>Home Page</Link>
        <Link to={'/createPost'}>Create A Post</Link>
        </>} 
        </div>
        <div className='loggedInContainer'>
            <h5>{authState.username}</h5>
            {authState.status && <button onClick={logout}> Logout</button>}
        </div>
      </div>
      <Routes>
        <Route exact path='/'  Component={Home} />
        <Route exact path='/createPost'  Component={CreatePost} />
        <Route exact path='/post/:id'  Component={Post} />
        <Route exact path='/login'  Component={Login} />
        <Route exact path='/registration'  Component={Registration} />
        <Route exact path='/profile/:id'  Component={Profile} />
        <Route exact path='/changePassword'  Component={ChangePassword} />
        <Route exact path='*'  Component={PageNotFound} />
      </Routes>
    </Router>
    </AuthContext.Provider>
  </div>
);
}

export default App;
