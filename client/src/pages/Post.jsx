import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'

function Post() {
    let {id} = useParams();
    const [postObj,setPostObj]= useState({});
    const [comments,setComments]= useState([]);
    const [newComment,setNewComment]=useState('');

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
        axios.post('http://localhost:3001/comments',
                    {commentBody: newComment,
                    PostId : id, 
                   })
            .then((response)=>{
            console.log("commentAdded");
            const commentToAdd = {commentBody: newComment}
            setComments([...comments,commentToAdd])
            setNewComment(' ')
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
                    </div>
                      );
                    })}
        </div>
     </div>
    </div>
  )
}

export default Post