import React from 'react'
import axios from  'axios';
import { useEffect,useState } from 'react';
import {useNavigate} from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';

function Home() {
  
  const navigate = useNavigate();
  const [listOfPosts,setlistOfPosts]= useState([]);
  const [likedPosts,setLikedPosts]= useState([]);


  useEffect(()=>{
      axios.get('http://localhost:3001/posts',{
        headers: { accessToken: localStorage.getItem("accessToken")}
      }).then((response)=>{
      console.log(response.data.listOfPosts);
      console.log(response.data.likedPosts);
      setlistOfPosts(response.data.listOfPosts);
      setLikedPosts(
        response.data.likedPosts.map((like)=>{
          return like.PostId;
        }));
      });
  },[]);

  const likeAPost =(postId)=>{
    axios.post("http://localhost:3001/likes",{ PostId : postId},{
      headers: { accessToken: localStorage.getItem("accessToken")}
    }).then((response)=>{
      setlistOfPosts(listOfPosts.map((post)=>{
        if(post.id === postId){
          if(response.data.liked){
            return {...post,Likes:[post.Likes,0]}
          }else{
            const likeArray= post.Likes;
            likeArray.pop();
            return {...post,Likes: likeArray}
          }
        }
        else{
          return post
        }
      }));
      if(likedPosts.includes(postId)){
        setLikedPosts(likedPosts.filter((id)=>{
          return id !== postId;
        }));
      }
      else{
        setLikedPosts([...likedPosts,postId])
      }
    })
  }

  return (
    <div className="App">
      {listOfPosts.map((value, key) => {
        return (
          <div className='post' key={key}> 
            <div className='title'>{value.title}</div>
            <div className='body'
            onClick={()=>{navigate(`/post/${value.id}`)}} 
            key={key}
            >{value.postText}</div>
            <div className='footer'>
              <div className='username'>{value.username}</div>
              <div className='buttons'>
              <FavoriteIcon 
               onClick={()=>{
                likeAPost(value.id)}}
                className={likedPosts.includes(value.id)?
                "unlikeBttn" : "likeBttn"}
              />
              <label >{value.Likes.length}</label>
              </div>
              </div>
          </div>
        );
      })}
    </div>
  );
      
}

export default Home