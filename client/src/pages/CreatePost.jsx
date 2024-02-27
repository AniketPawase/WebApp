import React, { useContext } from 'react'
import axios from  'axios';
import {Formik, Form, Field,ErrorMessage} from 'formik'
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import {AuthContext} from '../helpers/authContext'
import { useEffect } from 'react';

function CreatePost() {
    const navigate = useNavigate();
    const {authState} = useContext(AuthContext);

    useEffect(()=>{
        if(! localStorage.getItem("accessToken")){
            navigate('/login')
        }
    },[authState.status,navigate])

    const initialValues={
        title:"",
        postText:"",
    };

    const validationSchema = Yup.object().shape({
        title:Yup.string().required(),
        postText: Yup.string().required() ,
    })

    const onSubmit =(data)=>{
        axios.post('http://localhost:3001/posts',data,{
            headers:{
                accessToken: localStorage.getItem("accessToken")
            }
        })
        .then((response)=>{
            console.log(response.data);
            navigate('/');
            });                                         
    }

  return (
    <div className='createPostPage'>
        <Formik 
        initialValues={initialValues}
        onSubmit={onSubmit} 
        validationSchema={validationSchema}
        >
        <Form className='formContainer'>
            <label>Title: </label>   
            <ErrorMessage name='title' component="span" />    
            <Field id="inputCreatePost" 
            name="title" 
            placeholder="(Ex. Title" />

            <label>Post: </label>   
            <ErrorMessage name='postText' component="span" />  
            <Field id="inputCreatePost" 
            name="postText" 
            placeholder="(Ex. The info of post" />

            <button type='submit'>Create Post</button>
        </Form>
        </Formik>
    </div>
  )
}

export default CreatePost