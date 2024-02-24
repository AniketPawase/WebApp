import React from 'react'
import axios from  'axios';
import { useEffect,useState } from 'react';
import {useNavigate} from 'react-router-dom';

function Home() {
  
  const navigate = useNavigate();
  const [listOfPosts,setlistOfPosts]= useState([]);


    useEffect(()=>{
        axios.get('http://localhost:3001/posts').then((response)=>{
        console.log(response.data);
        setlistOfPosts(response.data);
        });
      },[]);

      return (
        <div className="App">
          {listOfPosts.map((value, key) => {
            return (
              <div className='post'
                onClick={()=>{navigate(`/post/${value.id}`)}} 
                key={key}> 
                <div className='title'>{value.title}</div>
                <div className='body'>{value.postText}</div>
                <div className='footer'>{value.username}</div>
              </div>
            );
          })}
        </div>
      );
      
}

export default Home