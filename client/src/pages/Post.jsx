import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import {AuthContext} from '../helpers/authContext'

function Post() {
    let {id} = useParams();
    const [postObj,setPostObj]= useState({});
    const [comments,setComments]= useState([]);
    const [newComment,setNewComment]=useState('');
    const {authState} = useContext(AuthContext)

    useEffect(()=>{
        axios.get(`http://localhost:3001/posts/${id}`).then((response)=>{
        console.log(response.data);
        setPostObj(response.data);
        });

        axios.get(`http://localhost:3001/comments/${id}`).then((response)=>{
        console.log(response.data);
        setComments(response.data);
        });
    },[id]);

    //Adding A comment
    const addComment = () =>{
        axios
        .post(
          "http://localhost:3001/comments",
          {
            commentBody: newComment,
            PostId: id,
          },
          {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            },
          }
        )
        .then((response) => {
          if (response.data.error) {
            alert(response.data.error);
          } else {
            const commentToAdd = { commentBody: newComment , username: response.data.username };
            setComments([...comments, commentToAdd]);
            setNewComment("");
          }
        });
    };

    //Deleting Comment
    const deleteComment=(id)=>{
      axios.delete(`http://localhost:3001/comments/${id}`,{
        headers:{
          accessToken: localStorage.getItem("accessToken")
        }
      })
      .then(()=>{
        setComments(comments.filter((val)=>{
          return val.id  !== id;
        }))
      })
    }



  return (
    <div className='postPage'>
     <div className='leftSide'>
      <div className='post' id='indivisual'>
      <div className='title'>{postObj.title}</div>  
      <div className='body'>{postObj.postText}</div>
      <div className='footer'>{postObj.username}</div>  
      </div>  
     </div>
     <div className='rightSide'>
        <div className='addCommentContainer'>
            <input type='text'
            value={newComment} 
            placeholder='Comment ...'
            onChange={(event)=>{setNewComment(event.target.value)}}>  
            </input>
            <button onClick={addComment}>Add Comment</button>
        </div>
        <div className='listOfComments'>
            {comments.map((comment,key)=>{
                return(
                    <div key={key} className='comment'>
                        {comment.commentBody}
                        <label><h4>Username: {comment.username}</h4></label>
                        {authState.username === comment.username ? 
                        <button
                        className='deleteButton'
                        onClick={()=>{deleteComment(comment.id)}}>X</button>: null}
                    </div>
                      );
                    })}
        </div>
     </div>
    </div>
  )
}

export default Post